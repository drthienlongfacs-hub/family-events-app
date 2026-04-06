import axios from 'axios';
import * as cheerio from 'cheerio';
import { MethodologyLogger } from '../core/MethodologyLogger.mjs';
import { ChecklistEngine } from '../core/ChecklistEngine.mjs';
import { EventTaxonomy } from '../core/EventTaxonomy.mjs';
import { AutoEvolutionEngine } from '../core/AutoEvolutionEngine.mjs';
import { StorageAdapter } from '../adapters/StorageAdapter.mjs';
import { EVENT_PROVIDERS } from '../config/EventProviders.mjs';

const logger = new MethodologyLogger();
const checklist = new ChecklistEngine();

export class HarvesterService {
    static extractValidDate(text, pubDateFallback) {
        const DATE_REGEX = /(\d{1,2})[\/\-](\d{1,2})|ngày (\d{1,2}) tháng (\d{1,2})/;
        const match = text.match(DATE_REGEX);
        let extracted;
        if (match) {
            const day = parseInt(match[1] || match[3]);
            const month = parseInt(match[2] || match[4]) - 1;
            const currentYear = new Date().getFullYear();
            extracted = new Date(currentYear, month, day);
            const now = new Date();
            if (now.getTime() - extracted.getTime() > 90 * 86400000) extracted.setFullYear(currentYear + 1);
        } else {
            // Implicit Assumption: If news just broke about an event, it's likely happening within the next 3 days on average if unspecified.
            const d = new Date(pubDateFallback ? new Date(pubDateFallback) : Date.now());
            extracted = new Date(d.getTime() + (86400000 * 3)); // +3 Days
        }

        if (extracted.getTime() < Date.now() - 86400000) return null;
        return extracted.toISOString();
    }

    static async processCuratedIntake() {
        console.log('🔄 Extricating Multi-Platform Facebook/X/TikTok records...');
        try {
            const curated = StorageAdapter.readCurated();
            const processed = [];

            for (let i = 0; i < curated.length; i++) {
                const item = curated[i];
                const combined = item.title + ' ' + item.description;
                const evalResult = checklist.evaluate(combined, item.url);

                if (evalResult.isSafe && evalResult.score >= 40) {
                    processed.push({
                        id: `curated-${i}`,
                        title: item.title,
                        description: item.description,
                        source_entity: "Curated Intake",
                        source_url: item.url,
                        event_date: this.extractValidDate(combined) || new Date(Date.now() + 86400000 * 7).toISOString(),
                        location: "TP. Hồ Chí Minh",
                        image_url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
                        age_category: evalResult.platform,
                        category: EventTaxonomy.classify(item.title, item.description),
                        checklist: evalResult
                    });
                } else {
                    logger.recordFilterDrop('curated_intake', `Semantic Drop (Score: ${evalResult.score}): ${evalResult.failures.join(', ')}`);
                }
            }
            return { status: 'fulfilled', provider: { name: 'Multi-Platform Hybrid Intake' }, data: processed };
        } catch (e) {
            logger.recordAnomaly('curated_intake', `Failure to read local curated feeds: ${e.message}`);
            return { status: 'rejected', provider: { name: 'Curated Intake' }, error: e.message };
        }
    }

    static async enterpriseHarvest() {
        console.log('============= [ENTERPRISE F: MULTI-PLATFORM CHECKLIST STRICT MODE] =============');
        const ACTIVE_PROVIDERS = AutoEvolutionEngine.getActiveProviders(EVENT_PROVIDERS);

        const tasks = ACTIVE_PROVIDERS.map(async (provider) => {
            try {
                const response = await axios.get(provider.url, { timeout: 15000 });
                const $ = cheerio.load(response.data, { xmlMode: true });
                const items = [];

                const itemElements = $('item').toArray();
                for (let i = 0; i < itemElements.length; i++) {
                    const el = itemElements[i];
                    const title = $(el).find('title').text();
                    const descText = $(el).find('description').text().replace(/<\/?[^>]+(>|$)/g, "");
                    const pubDate = $(el).find('pubDate').text();
                    const link = $(el).find('link').text();

                    let isAlive = false;
                    try {
                        await axios.head(link, { timeout: 3000 });
                        isAlive = true;
                    } catch (err) {
                        if (err.response && err.response.status === 404) isAlive = false;
                        else isAlive = true;
                    }

                    if (!isAlive) {
                        logger.recordFilterDrop(provider.key, 'HTTP 404: Link Die/Fake News detected');
                        continue;
                    }

                    const combinedTextForAnalysis = (title + ' ' + descText).toLowerCase();
                    const evalResult = checklist.evaluate(combinedTextForAnalysis, link);

                    const validIsoDate = this.extractValidDate(combinedTextForAnalysis, pubDate);
                    if (!validIsoDate) {
                        logger.recordFilterDrop(provider.key, 'Date Expired');
                        continue;
                    }

                    // PREFLIGHT AUDIT: Differentiate thresholds for General News vs Curated Search
                    let passThreshold = false;
                    const isGeneralNews = provider.key.includes('vne_') || provider.key.includes('eva_') || provider.key.includes('afamily_') || provider.key.includes('tuoitre_') || provider.key.includes('thanhnien_') || provider.key.includes('phunu_');

                    if (isGeneralNews) {
                        // General gossip/news feeds MUST explicitly have the Event keyword AND score very high
                        passThreshold = evalResult.isSafe && evalResult.isInteractive && evalResult.score >= 60;
                    } else {
                        // Curated Google News strings (Takashimaya, Thao Cam Vien) automatically imply Location & Event
                        passThreshold = evalResult.isSafe && evalResult.score >= 40;
                    }

                    if (passThreshold) {
                        items.push({
                            id: `rss-${provider.key}-${i}`,
                            title: title.split(' - ')[0].trim(),
                            description: descText.trim().substring(0, 180) + '...',
                            source_entity: title.split(' - ').pop()?.trim() || provider.name,
                            source_url: link,
                            event_date: validIsoDate,
                            location: "TP. Hồ Chí Minh",
                            image_url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
                            age_category: evalResult.platform,
                            category: EventTaxonomy.classify(title, descText),
                            checklist: evalResult
                        });
                    } else {
                        logger.recordFilterDrop(provider.key, `Semantic Drop (Score: ${evalResult.score}): ${evalResult.failures.join(', ')}`);
                    }
                }
                return { status: 'fulfilled', provider, data: items };
            } catch (e) {
                logger.recordAnomaly(provider.key, `Network Error: ${e.message}`);
                return { status: 'rejected', provider, error: e.message };
            }
        });

        const hybridTask = this.processCuratedIntake();
        const rawResults = await Promise.allSettled([...tasks, Promise.resolve(hybridTask)]);
        const results = rawResults.map(r => r.value || r.reason);

        let validAggregatedEvents = [];
        let failCount = 0;

        results.forEach(res => {
            if (res && res.status === 'fulfilled' && res.data) {
                console.log(`✅ [Provider Success] ${res.provider.name} trả về ${res.data.length} Real Events (passed Checklist).`);
                validAggregatedEvents.push(...res.data);
            } else if (res && res.status === 'rejected') {
                console.log(`❌ [Provider Failure] Network connection error caught.`);
                failCount++;
            }
        });

        // Deduplication (URL-based)
        const uniqueEvents = Array.from(new Map(validAggregatedEvents.map(item => [item.source_url, item])).values());

        console.log(`📍 [Checklist Audit] Chốt ${uniqueEvents.length} events hợp lệ đạt chuẩn.`);
        StorageAdapter.saveEvents(uniqueEvents);

        logger.stampAudit(uniqueEvents.length, failCount);
    }
}
