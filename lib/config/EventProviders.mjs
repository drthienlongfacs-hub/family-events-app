export const EVENT_PROVIDERS = [
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
