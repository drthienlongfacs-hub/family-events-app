export const EVENT_PROVIDERS = [
    // 🎭 KÊNH BÁO CHÍ CHÍNH THỐNG (TRỰC TIẾP RSS)
    { key: 'vne_giadinh', name: 'VnExpress (Gia đình)', url: 'https://vnexpress.net/rss/gia-dinh.rss', type: 'rss' },
    { key: 'eva_lamme', name: 'Eva.vn (Làm Mẹ)', url: 'https://eva.vn/rss/lam-me-c10.rss', type: 'rss' },
    { key: 'afamily_mebe', name: 'AFamily (Mẹ và Bé)', url: 'https://afamily.vn/me-va-be.rss', type: 'rss' },
    { key: 'tuoitre_giaoduc', name: 'Tuổi Trẻ (Giáo Dục & Trẻ Em)', url: 'https://tuoitre.vn/rss/giao-duc.rss', type: 'rss' },
    { key: 'thanhnien_gioitre', name: 'Thanh Niên (Giới trẻ)', url: 'https://thanhnien.vn/rss/gioi-tre.rss', type: 'rss' },
    { key: 'phunu_tphcm', name: 'Phụ Nữ TP.HCM (Gia đình)', url: 'https://www.phunuonline.com.vn/rss/gia-dinh.rss', type: 'rss' },

    // 🔍 KÊNH AGGREGATION & BOOLEAN CHUNG
    { key: 'q_sukien', name: 'Google (Sự kiện thiếu nhi)', url: 'https://news.google.com/rss/search?q=%22s%E1%BB%B1+ki%E1%BB%87n%22+%22thi%E1%BA%BFu+nhi%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_workshop', name: 'Google (Workshop cho bé)', url: 'https://news.google.com/rss/search?q=%22workshop%22+%22cho+b%C3%A9%22+OR+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_ngayhoi', name: 'Google (Ngày hội gia đình)', url: 'https://news.google.com/rss/search?q=%22ng%C3%A0y+h%E1%BB%99i%22+%22gia+%C4%91%C3%ACnh%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_lehoi', name: 'Google (Lễ hội thiếu nhi)', url: 'https://news.google.com/rss/search?q=%22l%E1%BB%85+h%E1%BB%99i%22+%22thi%E1%BA%BFu+nhi%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },

    // 🎪 CÁC TRUNG TÂM VĂN HÓA & KHU VUI CHƠI
    { key: 'q_nhathieunhi', name: 'Google (Nhà Thiếu Nhi TPHCM)', url: 'https://news.google.com/rss/search?q=%22nh%C3%A0+thi%E1%BA%BFu+nhi%22+OR+%22nh%C3%A0+v%C4%83n+h%C3%B3a+thanh+ni%C3%AAn%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_idecaf', name: 'Google (Kịch thiếu nhi IDECAF/Nhà Hát)', url: 'https://news.google.com/rss/search?q=%22nh%C3%A0+h%C3%A1t%22+OR+%22idecaf%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_muaroi', name: 'Google (Múa rối nước)', url: 'https://news.google.com/rss/search?q=%22m%C3%BAa+r%E1%BB%91i+n%C6%B0%E1%BB%9Bc%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_thaocamvien', name: 'Google (Sự kiện Thảo Cầm Viên)', url: 'https://news.google.com/rss/search?q=%22s%E1%BB%B1+ki%E1%BB%87n%22+OR+%22ho%E1%BA%A1t+%C4%91%E1%BB%99ng%22+%22th%E1%BA%A3o+c%E1%BA%A7m+vi%C3%AAn%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_vienbaotang', name: 'Google (Sự kiện Bảo tàng TPHCM)', url: 'https://news.google.com/rss/search?q=%22b%E1%BA%A3o+t%C3%A0ng%22+%22m%E1%BB%B9+thu%E1%BA%ADt%22+OR+%223d%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_duongsach', name: 'Google (Đường sách Nguyễn Văn Bình)', url: 'https://news.google.com/rss/search?q=%22%C4%91%C6%B0%E1%BB%9Dng+s%C3%A1ch%22+%22nguy%E1%BB%85n+v%C4%83n+b%C3%ACnh%22+%22tr%E1%BA%BB+em%22+OR+%22thi%E1%BA%BFu+nhi%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },

    // 🏛 CÁC TỔ CHỨC QUỐC TẾ & LÃNH SỰ
    { key: 'q_lespace', name: 'Google (Viện Pháp L\'Espace)', url: 'https://news.google.com/rss/search?q=%22vi%E1%BB%87n+ph%C3%A1p%22+OR+%22idecaf%22+%22tr%E1%BA%BB+em%22+OR+%22gia+%C4%91%C3%ACnh%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_americancenter', name: 'Google (American Center / US Consulate)', url: 'https://news.google.com/rss/search?q=%22l%C3%A3nh+s%E1%BB%B1+qu%C3%A1n+m%E1%BB%B9%22+OR+%22american+center%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_goethe', name: 'Google (Viện Goethe)', url: 'https://news.google.com/rss/search?q=%22vi%E1%BB%87n+goethe%22+%22v%C4%83n+h%C3%B3a%22+%22tphcm%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_britishcouncil', name: 'Google (Hội đồng Anh)', url: 'https://news.google.com/rss/search?q=%22h%E1%BB%99i+%C4%91%E1%BB%93ng+anh%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },

    // 🏢 CÁC TRUNG TÂM THƯƠNG MẠI LỚN
    { key: 'q_aeonmall', name: 'Google (Sự kiện Aeon Mall)', url: 'https://news.google.com/rss/search?q=%22aeon+mall%22+%22t%C3%A2n+ph%C3%BA%22+OR+%22b%C3%ACnh+t%C3%A2n%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+%22b%C3%A9%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_takashimaya', name: 'Google (Takashimaya / Saigon Centre)', url: 'https://news.google.com/rss/search?q=%22takashimaya%22+OR+%22saigon+centre%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_crescentmall', name: 'Google (Crescent Mall)', url: 'https://news.google.com/rss/search?q=%22crescent+mall%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+OR+%22gia+%C4%91%C3%ACnh%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_gigamall', name: 'Google (Gigamall / Vạn Hạnh Mall)', url: 'https://news.google.com/rss/search?q=%22gigamall%22+OR+%22v%E1%BA%A1n+h%E1%BA%A1nh+mall%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_vincom', name: 'Google (Vincom Landmark 81 / Đồng Khởi)', url: 'https://news.google.com/rss/search?q=%22vincom%22+%22landmark+81%22+OR+%22%C4%91%E1%BB%93ng+kh%E1%BB%9Fi%22+%22s%E1%BB%B1+ki%E1%BB%87n%22+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_tiniworld', name: 'Google (TiniWorld / Vietopia / KizCiti)', url: 'https://news.google.com/rss/search?q=%22tiniworld%22+OR+%22vietopia%22+OR+%22kizciti%22+%22ho%E1%BA%A1t+%C4%91%E1%BB%99ng%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },

    // 🏃‍♂️ HOẠT ĐỘNG THỂ CHẤT & KHOÁ TU
    { key: 'q_chaybogiadinh', name: 'Google (Giải chạy bộ gia đình)', url: 'https://news.google.com/rss/search?q=%22ch%E1%BA%A1y+b%E1%BB%99%22+OR+%22marathon%22+%22gia+%C4%91%C3%ACnh%22+OR+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_khoatumuahe', name: 'Google (Khoá tu / Trại hè)', url: 'https://news.google.com/rss/search?q=%22kh%C3%B3a+tu+m%C3%B9a+h%C3%A8%22+OR+%22tr%E1%BA%A1i+h%C3%A8%22+%22thi%E1%BA%BFu+nhi%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' },
    { key: 'q_lopnghethuat', name: 'Google (Lớp Vẽ / Nhạc / Nhảy)', url: 'https://news.google.com/rss/search?q=%22l%E1%BB%9Bp+h%E1%BB%8Dc%22+%22v%E1%BA%BD%22+OR+%22nh%E1%BA%A1c%22+OR+%22m%C3%BAa%22+%22tr%E1%BA%BB+em%22+TPHCM+when:90d&hl=vi&gl=VN&ceid=VN:vi', type: 'rss' }
];
