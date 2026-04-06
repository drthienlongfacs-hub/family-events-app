import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'events.json');

// Ensure directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

export async function harvestAndEnforceValidity() {
    console.log('[Harvest] Khởi động trình thu thập tĩnh cho GitHub Pages...');

    // Nguồn dữ liệu giả lập (thực tế sẽ dùng Axios parse HTML/RSS)
    const incomingEvents = [
        {
            id: `goethe-${Date.now()}`,
            title: "Science Film Festival for Kids",
            description: "A wonderful science film screening with interactive activities for kids.",
            source_entity: "Goethe-Institut Hanoi",
            source_url: 'https://www.goethe.de/ins/vn/vi/ver.html?event_id=123',
            // Valid future event (2 days ahead)
            event_date: new Date(Date.now() + 86400000 * 2).toISOString(),
            location: "56-58 Nguyen Thai Hoc, Ba Dinh, Hanoi",
            image_url: "https://images.unsplash.com/photo-1540306121852-5beeedcfb0b0",
            age_category: '6yo'
        },
        {
            id: `amcenter-${Date.now()}`,
            title: "Storytelling Hour: American Literature (Toddlers)",
            description: "Giờ đọc truyện phát âm tiếng Anh chuẩn dành cho các bé mầm non.",
            source_entity: "US Embassy American Center",
            source_url: 'https://vn.usembassy.gov/american-center-hanoi/event-1234',
            // Valid future event (4 days ahead)
            event_date: new Date(Date.now() + 86400000 * 4).toISOString(),
            location: "170 Ngoc Khanh, Hanoi",
            image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            age_category: '16mo'
        },
        {
            id: `lespace-${Date.now()}`, // EXPIRED EVENT - SHOULD BE FILTERED
            title: "Expired French Fair",
            description: "Hội chợ dã ngoại.",
            source_entity: "L'Espace",
            source_url: 'https://ifv.vn/expired',
            // Expired event (2 days ago)
            event_date: new Date(Date.now() - 86400000 * 2).toISOString(),
            location: "15 Thien Quang",
            image_url: "",
            age_category: 'family'
        }
    ];

    // 1. GATE: Enforce "Future Only" rule
    console.log('[Methodology Guard] Quét xác thực tính hiệu lực của ngày giờ...');
    const now = new Date();
    const validEvents = incomingEvents.filter(ev => new Date(ev.event_date) >= now);

    const expiredCount = incomingEvents.length - validEvents.length;
    console.log(`[Evidence] Đã loại bỏ ${expiredCount} sự kiện hết hạn.`);

    // 2. Write Static JSON
    fs.writeFileSync(DATA_FILE, JSON.stringify(validEvents, null, 2));
    console.log(`[Evidence] Đã ghi ${validEvents.length} sự kiện hợp lệ vào public/data/events.json`);
}

harvestAndEnforceValidity();
