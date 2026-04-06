import axios from 'axios';
import * as cheerio from 'cheerio';
import { insertEvent } from './db.js';

/**
 * Parses age group strictly from text content based on Vietnamese keywords.
 */
function extractAgeCategory(text) {
    const lower = text.toLowerCase();

    if (lower.includes('6 tuổi') || lower.includes('6 years') || lower.includes('nhi đồng') || lower.includes('tiểu học')) {
        return '6yo';
    }
    if (lower.includes('16 tháng') || lower.includes('toddler') || lower.includes('1 tuổi') || lower.includes('mầm non')) {
        return '16mo';
    }
    if (lower.includes('gia đình') || lower.includes('family') || lower.includes('trẻ em') || lower.includes('kids')) {
        return 'family';
    }
    return 'general'; // Needs review
}

/**
 * Mock/Scraper for Lespace / Goethe / Embassy.
 * Since most Embassy pages require complex selectors and change often,
 * we use a centralized RSS-like logic or a robust HTML parser.
 */
export async function scrapeSampleSources() {
    console.log('[Scraper] Starting data aggregation engine...');

    // 1. Simulating Goethe Institut or US Embassy
    const mockEvents = [
        {
            id: `goethe-${Date.now()}`,
            title: "Science Film Festival for Kids",
            description: "A wonderful science film screening with interactive activities for kids. Phù hợp cho tệp trẻ em trên 6 tuổi và gia đình.",
            source_entity: "Goethe-Institut Hanoi",
            source_url: 'https://www.goethe.de/ins/vn/vi/ver.html?event_id=123',
            event_date: new Date(Date.now() + 86400000 * 2).toISOString(),
            location: "56-58 Nguyen Thai Hoc, Ba Dinh, Hanoi",
            image_url: "https://images.unsplash.com/photo-1540306121852-5beeedcfb0b0",
            age_category: '6yo'
        },
        {
            id: `amcenter-${Date.now()}`,
            title: "Storytelling Hour: American Literature (Toddlers)",
            description: "Giờ đọc truyện phát âm tiếng Anh chuẩn dành cho các bé mầm non, từ 16 tháng tuổi trở lên.",
            source_entity: "US Embassy American Center",
            source_url: 'https://vn.usembassy.gov/american-center-hanoi/event-1234',
            event_date: new Date(Date.now() + 86400000 * 4).toISOString(),
            location: "170 Ngoc Khanh, Hanoi",
            image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            age_category: '16mo'
        },
        {
            id: `lespace-${Date.now()}`,
            title: "Weekend French Cultural Fair",
            description: "Hội chợ văn hóa Pháp - Việt, trò chơi ngoài trời, thích hợp cho cả gia đình (trẻ em dưới 6 tuổi).",
            source_entity: "L'Espace (Institut Français)",
            source_url: 'https://ifv.vn/event-weekend-fair',
            event_date: new Date(Date.now() + 86400000 * 1).toISOString(),
            location: "15 Thien Quang, Hanoi",
            image_url: "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592",
            age_category: 'family'
        }
    ];

    // In a real scenario, we'll fetch HTML and load via Cheerio:
    // const { data } = await axios.get('some_url');
    // const $ = cheerio.load(data);
    // ... DOM parsing ...

    let successCount = 0;
    for (const ev of mockEvents) {
        try {
            if (ev.age_category !== 'general') {
                insertEvent(ev);
                successCount++;
            }
        } catch (e) {
            console.error('[Scraper Error]', e.message);
        }
    }

    console.log(`[Scraper] Successfully updated ${successCount} events compliant with targeted age categories.`);
    return successCount;
}

// Ensure the crawler runs independently if called.
if (process.argv[1] && process.argv[1].includes('scraper.js')) {
    scrapeSampleSources();
}
