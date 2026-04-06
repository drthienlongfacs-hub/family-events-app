import axios from 'axios';
import * as cheerio from 'cheerio';
import { MethodologyLogger } from './core/MethodologyLogger.mjs';
import { ChecklistEngine } from './core/ChecklistEngine.mjs';
import { EventTaxonomy } from './core/EventTaxonomy.mjs';
import { AutoEvolutionEngine } from './core/AutoEvolutionEngine.mjs';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'events.json');
const CURATED_INTAKE_FILE = path.join(process.cwd(), 'public', 'data', 'curated_intake.json');
const logger = new MethodologyLogger();
const checklist = new ChecklistEngine();

const EVENT_PROVIDERS = [
    // 🎭 KÊNH BÁO CHÍ CHÍNH THỐNG (TRỰC TIẾP RSS)
    { key: 'vne_giadinh', name: 'VnExpress (Gia đình)', url: 'https://vnexpress.net/rss/gia-dinh.rss', type: 'rss' },
    { key: 'eva_lamme', name: 'Eva.vn (Làm Mẹ)', url: 'https://eva.vn/rss/lam-me-c10.rss', type: 'rss' },
    { key: 'afamily_mebe', name: 'AFamily (Mẹ và Bé)', url: 'https://afamily.vn/me-va-be.rss', type: 'rss' },
    { key: 'tuoitre_giaoduc', name: 'Tuổi Trẻ (Giáo Dục & Trẻ Em)', url: 'https://tuoitre.vn/rss/giao-duc.rss', type: 'rss' },
    { key: 'thanhnien_gioitre', name: 'Thanh Niên (Giới trẻ)', url: 'https://thanhnien.vn/rss/gioi-tre.rss', type: 'rss' },

    // 🔍 KÊNH AGGREGATION & BOOLEAN (GOOGLE NEWS)
    { key: 'q_sukien', name: 'Google (Sự kiện thiếu nhi)', url: 'https://news.google.com/rss/search?q=%22s%E1%BB%B1+ki%E1%BB%87n%22+%22thi%E1%BA%BFu+nhi%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_workshop', name: 'Google (Workshop cho bé)', url: 'https://news.google.com/rss/search?q=%22workshop%22+%22cho+b%C3%A9%22+OR+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_ngayhoi', name: 'Google (Ngày hội gia đình)', url: 'https://news.google.com/rss/search?q=%22ng%C3%A0y+h%E1%BB%99i%22+%22gia+%C4%91%C3%ACnh%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_lehoi', name: 'Google (Lễ hội thiếu nhi)', url: 'https://news.google.com/rss/search?q=%22l%E1%BB%85+h%E1%BB%99i%22+%22thi%E1%BA%BFu+nhi%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_khoahoc', name: 'Google (Khóa học kỹ năng trẻ em)', url: 'https://news.google.com/rss/search?q=%22kh%C3%B3a+h%E1%BB%8Dc%22+%22k%E1%BB%B9+n%C4%83ng%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_idecaf', name: 'Google (Kịch thiếu nhi IDECAF/Nhà Hát)', url: 'https://news.google.com/rss/search?q=%22nh%C3%A0+h%C3%A1t%22+OR+%22idecaf%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_sanchoi', name: 'Google (Trung tâm thương mại sự kiện)', url: 'https://news.google.com/rss/search?q=%22trung+t%C3%A2m+th%C6%B0%C6%A1ng+m%E1%BA%A1i%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_thaocamvien', name: 'Google (Sự kiện Thảo Cầm Viên)', url: 'https://news.google.com/rss/search?q=%22s%E1%BB%B1+ki%E1%BB%87n%22+OR+%22ho%E1%BA%A1t+%C4%91%E1%BB%99ng%22+%22th%E1%BA%A3o+c%E1%BA%A7m+vi%C3%AAn%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_ve', name: 'Google (Vé sự kiện triển lãm)', url: 'https://news.google.com/rss/search?q=%22v%C3%A9+s%E1%BB%B1+ki%E1%BB%87n%22+OR+%22tri%E1%BB%83n+l%C3%A3m%22+%22gia+%C4%91%C3%ACnh%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_biendao', name: 'Google (Trại hè quân đội)', url: 'https://news.google.com/rss/search?q=%22tr%E1%BA%A1i+h%C3%A8%22+%22qu%C3%A2n+%C4%91%E1%BB%99i%22+TPHCM+when:120d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' }
];

// Helper to standardise parsing
function extractValidDate(text, pubDateFallback) {
    const DATE_REGEX = /(\d{1,2})[\/\-](\d{1,2})|ngày (\d{1,2}) tháng (\d{1,2})/;
    const match = text.match(DATE_REGEX);
    if (match) {
        const day = parseInt(match[1] || match[3]);
        const month = parseInt(match[2] || match[4]) - 1;
        const currentYear = new Date().getFullYear();
        const extracted = new Date(currentYear, month, day);
        const now = new Date();
        if (now.getTime() - extracted.getTime() > 90 * 86400000) extracted.setFullYear(currentYear + 1);
        return extracted.toISOString();
    }
    const d = new Date(pubDateFallback || Date.now());
    return new Date(d.getTime() + 86400000).toISOString();
}

function processCuratedIntake() {
    console.log('🔄 Extricating Multi-Platform Facebook/X/TikTok records...');
    try {
        const data = fs.readFileSync(CURATED_INTAKE_FILE, 'utf8');
        const curated = JSON.parse(data);
        const processed = [];

        curated.forEach((item, i) => {
            const combined = item.title + ' ' + item.description;
            const evalResult = checklist.evaluate(combined, item.url);

            if (evalResult.isSafe && evalResult.isAgeAppropriate && evalResult.hasLocation) {
                processed.push({
                    id: `curated-${i}`,
                    title: item.title,
                    description: item.description,
                    source_entity: evalResult.platform + ' Authorized',
                    source_url: item.url,
                    event_date: extractValidDate(combined, Date.now()),
                    location: "TP. Hồ Chí Minh",
                    image_url: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80",
                    age_category: "family",
                    category: EventTaxonomy.classify(item.title, item.description),
                    checklist: evalResult
                });
            } else {
                logger.recordAnomaly(evalResult.platform || 'Intake', `Dropped Event: Failed Checklist - ${evalResult.failures.join(', ')}`);
            }
        });
        return { status: 'fulfilled', provider: { name: 'Multi-Platform Hybrid Intake' }, data: processed };
    } catch (err) {
        return { status: 'rejected', reason: err };
    }
}

export async function enterpriseHarvest() {
    console.log('============= [ENTERPRISE F: MULTI-PLATFORM CHECKLIST STRICT MODE] =============');

    const ACTIVE_PROVIDERS = AutoEvolutionEngine.getActiveProviders(EVENT_PROVIDERS);

    // 1. Process Auto RSS
    const tasks = ACTIVE_PROVIDERS.map(async (provider) => {
        try {
            const response = await axios.get(provider.url, { timeout: 15000 });
            const $ = cheerio.load(response.data, { xmlMode: true });
            const items = [];
            $('item').each((i, el) => {
                const title = $(el).find('title').text();
                const descText = $(el).find('description').text().replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML
                const pubDate = $(el).find('pubDate').text();
                const link = $(el).find('link').text();

                const combinedTextForAnalysis = (title + ' ' + descText).toLowerCase();
                const evalResult = checklist.evaluate(combinedTextForAnalysis, link);

                if (evalResult.isSafe && evalResult.isAgeAppropriate && evalResult.hasLocation) {
                    items.push({
                        id: `rss-${provider.key}-${i}`,
                        title: title.split(' - ')[0].trim(),
                        description: descText.trim().substring(0, 180) + '...',
                        source_entity: title.split(' - ').pop()?.trim() || provider.name,
                        source_url: link,
                        event_date: extractValidDate(combinedTextForAnalysis, pubDate),
                        location: "TP. Hồ Chí Minh",
                        image_url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
                        age_category: evalResult.platform,
                        category: EventTaxonomy.classify(title, descText),
                        checklist: evalResult
                    });
                } else {
                    logger.recordFilterDrop(provider.key, `Semantic Drop: ${evalResult.failures.join(', ')}`);
                }
            });
            return { status: 'fulfilled', provider, data: items };
        } catch (e) {
            logger.recordAnomaly(provider.key, `Network Error: ${e.message}`);
            return { status: 'rejected', provider, error: e.message };
        }
    });

    // 2. Insert Curated Multi-Platform
    const hybridTask = processCuratedIntake();
    const rawResults = await Promise.allSettled([...tasks, Promise.resolve(hybridTask)]);

    const results = rawResults.map(r => r.value || r.reason);

    let validAggregatedEvents = [];
    let failCount = 0;

    results.forEach(res => {
        if (res.status === 'fulfilled') {
            console.log(`✅ [Provider Success] ${res.provider.name} trả về ${res.data.length} Real Events (passed Checklist).`);
            validAggregatedEvents.push(...res.data);
        } else {
            failCount++;
            // Note: ENDPOINT_ERROR anomaly is now recorded precisely within the active map loop catch block.
            console.error(`❌ [Provider Failure] Network connection error caught.`);
        }
    });

    const uniqueEvents = [];
    const titles = new Set();
    validAggregatedEvents.forEach(ev => {
        if (!titles.has(ev.title)) {
            titles.add(ev.title);
            uniqueEvents.push(ev);
        }
    });

    const now = new Date();
    const forwardEvents = uniqueEvents.filter(ev => new Date(ev.event_date).getTime() >= now.getTime() - 86400000 * 2);

    fs.writeFileSync(DATA_FILE, JSON.stringify(forwardEvents, null, 2));
    logger.stampAudit(forwardEvents.length, failCount);

    console.log(`📍 [Checklist Audit] Chốt ${forwardEvents.length} events hợp lệ đạt chuẩn.`);
}

enterpriseHarvest().catch(err => console.error("FATAL:", err));
