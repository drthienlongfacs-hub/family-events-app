/**
 * Event Taxonomy Engine
 * Standardized reference mapping for Event Classification.
 * Based on formal modality groupings for family-focused events.
 */

export const TAXONOMY_CATEGORIES = {
    WORKSHOP_SKILL: "Workshop & Kỹ năng",
    FESTIVAL_EVENT: "Lễ hội & Sự kiện",
    ARTS_PERFORMANCE: "Nghệ thuật & Biểu diễn",
    EXHIBITION: "Triển lãm & Trưng bày",
    PLAY_OUTDOOR: "Vui chơi & Dã ngoại",
    COMMUNITY_OTHER: "Cộng đồng & Mặc định"
};

export class EventTaxonomy {
    static classify(title, description) {
        const content = `${title} ${description}`.toLowerCase();

        // 1. Nghệ Thuật & Biểu Diễn
        if (/(kịch|rối nước|biểu diễn|xiếc|ca nhạc|hòa nhạc|kể chuyện|storytelling|âm nhạc|múa|ảo thuật)/.test(content)) {
            return TAXONOMY_CATEGORIES.ARTS_PERFORMANCE;
        }

        // 2. Workshop & Kỹ Năng (Học tập, thực hành)
        if (/(workshop|lớp học|khóa học|kỹ năng|stem|làm gốm|vẽ tranh|robotics|ngoại khóa|lớp vẽ)/.test(content)) {
            return TAXONOMY_CATEGORIES.WORKSHOP_SKILL;
        }

        // 3. Triển Lãm & Trưng Bày
        if (/(triển lãm|trưng bày|gallery|bảo tàng|exhibition)/.test(content)) {
            return TAXONOMY_CATEGORIES.EXHIBITION;
        }

        // 4. Vui Chơi & Dã Ngoại
        if (/(dã ngoại|cắm trại|trại hè|khu vui chơi|vận động|sân chơi|thảo cầm viên|ngoài trời|khám phá thiên nhiên|công viên)/.test(content)) {
            return TAXONOMY_CATEGORIES.PLAY_OUTDOOR;
        }

        // 5. Lễ Hội & Sự Kiện (Mass gathering, community festival)
        if (/(lễ hội|ngày hội|festival|khai mạc|hội chợ|mùa hè|sự kiện gia đình)/.test(content)) {
            return TAXONOMY_CATEGORIES.FESTIVAL_EVENT;
        }

        // Default
        return TAXONOMY_CATEGORIES.COMMUNITY_OTHER;
    }
}
