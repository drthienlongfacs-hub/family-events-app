export class ChecklistEngine {
    constructor() {
        this.gates = {
            SAFETY: /(tai nạn|tử vong|phạm tội|án mạng|cháy|cảnh sát|18\+|người lớn)/i,
            AGE_AWARE: /(nhũ nhi|16 tháng|1 tuổi|2 tuổi|3 tuổi|mầm non|mẫu giáo|tiểu học|6 tuổi|cấp 1|thiếu nhi|gia đình|trẻ em|kid|thơ)/i,
            TEMPORAL: /(\d{1,2})[\/\-](\d{1,2})|ngày (\d{1,2})|hôm nay|tuần này|sắp tới/i,
            LOCATION: /(tại|địa chỉ|quận|tp\.hcm|tp hồ chí minh|nhà hát|khu vui chơi|trung tâm|trường|công viên|thảo cầm viên|online|zoom)/i,
            INTERACTIVE: /(hội thảo|sự kiện|ngày hội|trại hè|lễ hội|triển lãm|khóa học|workshop|trưng bày|vui chơi|kỹ năng|trải nghiệm)/i
        };
    }

    evaluate(text, sourceLink) {
        const context = text.toLowerCase();
        const result = {
            isSafe: !this.gates.SAFETY.test(context),
            isAgeAppropriate: this.gates.AGE_AWARE.test(context),
            hasTemporal: this.gates.TEMPORAL.test(context),
            hasLocation: this.gates.LOCATION.test(context),
            isInteractive: this.gates.INTERACTIVE.test(context),
            score: 0,
            failures: []
        };

        // Calculate score
        if (result.isSafe) result.score += 20; else result.failures.push("Safety_Violated");
        if (result.isAgeAppropriate) result.score += 20; else result.failures.push("No_Age_Tag");
        if (result.hasTemporal) result.score += 20; else result.failures.push("Missing_Date");
        if (result.hasLocation) result.score += 20; else result.failures.push("Missing_Location");
        if (result.isInteractive) result.score += 20; else result.failures.push("Not_an_Interactive_Event");

        // FB/TikTok/X domain checks
        const domainStr = sourceLink.toLowerCase();
        result.platform = 'Web';
        if (domainStr.includes('facebook.com')) result.platform = 'Facebook';
        if (domainStr.includes('tiktok.com')) result.platform = 'TikTok';
        if (domainStr.includes('twitter.com') || domainStr.includes('x.com')) result.platform = 'X';
        if (domainStr.includes('youtube.com')) result.platform = 'YouTube';

        return result;
    }
}
