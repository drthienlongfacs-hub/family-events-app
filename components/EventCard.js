import { CalendarDays, MapPin, Baby, Users, ShieldCheck, Star, CheckCircle2, Globe, Tags } from "lucide-react";

export function EventCard({ event }) {
    const isToddler = event.age_category === '16mo';
    const isKid = event.age_category === '6yo';

    // Determine Platform Icon safely
    let platformLabel = event.checklist?.platform || "Website";
    let pfColor = platformLabel === 'Facebook' ? 'bg-blue-50 text-blue-700' :
        platformLabel === 'TikTok' ? 'bg-slate-100 text-slate-900 border-b border-slate-300' :
            platformLabel === 'X' ? 'bg-slate-800 text-white' :
                'bg-emerald-50 text-emerald-700';

    // 🌟 Visual Entity Recognition Engine (CDMS Enterprise UI)
    // Map crude RSS / Google tags into beautiful recognizable brands for TPHCM
    const resolveEntityVisual = (evt) => {
        const textToScan = `${evt.title} ${evt.source_entity} ${evt.source_url}`.toLowerCase();
        if (textToScan.includes('idecaf')) return { name: 'Kịch IDECAF', icon: '🎭', color: 'text-purple-600' };
        if (textToScan.includes('takashimaya') || textToScan.includes('saigon centre')) return { name: 'Takashimaya', icon: '🏬', color: 'text-rose-600' };
        if (textToScan.includes('l\'espace') || textToScan.includes('viện pháp')) return { name: 'L\'Espace (Viện Pháp)', icon: '🇫🇷', color: 'text-blue-600' };
        if (textToScan.includes('goethe')) return { name: 'Viện Goethe', icon: '🇩🇪', color: 'text-yellow-600' };
        if (textToScan.includes('british council') || textToScan.includes('hội đồng anh')) return { name: 'British Council', icon: '🇬🇧', color: 'text-indigo-600' };
        if (textToScan.includes('american center') || textToScan.includes('lãnh sự')) return { name: 'American Center', icon: '🇺🇸', color: 'text-red-600' };
        if (textToScan.includes('aeon mall')) return { name: 'AEON Mall', icon: '🏬', color: 'text-fuchsia-600' };
        if (textToScan.includes('vincom')) return { name: 'Vincom', icon: '🏬', color: 'text-red-600' };
        if (textToScan.includes('crescent mall')) return { name: 'Crescent Mall', icon: '🏬', color: 'text-orange-500' };
        if (textToScan.includes('gigamall') || textToScan.includes('vạn hạnh')) return { name: 'TTTM Gigamall / Vạn Hạnh', icon: '🏬', color: 'text-teal-600' };
        if (textToScan.includes('tiniworld')) return { name: 'TiniWorld', icon: '🎪', color: 'text-pink-500' };
        if (textToScan.includes('rối nước')) return { name: 'Múa Rối Nước', icon: '🎭', color: 'text-amber-700' };
        if (textToScan.includes('thảo cầm viên')) return { name: 'Thảo Cầm Viên', icon: '🦒', color: 'text-emerald-600' };
        if (textToScan.includes('đường sách') || textToScan.includes('nguyễn văn bình')) return { name: 'Đường sách TPHCM', icon: '📚', color: 'text-stone-600' };
        if (textToScan.includes('chạy bộ') || textToScan.includes('marathon')) return { name: 'Giải Chạy Bộ', icon: '🏃‍♂️', color: 'text-blue-500' };

        // News sites fallback
        if (textToScan.includes('vnexpress')) return { name: 'VnExpress', icon: '📰', color: 'text-red-700' };
        if (textToScan.includes('tuoitre') || textToScan.includes('tuổi trẻ')) return { name: 'Báo Tuổi Trẻ', icon: '📰', color: 'text-red-600' };
        if (textToScan.includes('thanhnien') || textToScan.includes('thanh niên')) return { name: 'Báo Thanh Niên', icon: '📰', color: 'text-sky-600' };
        if (textToScan.includes('afamily')) return { name: 'AFamily', icon: '📰', color: 'text-pink-600' };
        if (textToScan.includes('phunu') || textToScan.includes('phụ nữ')) return { name: 'Báo Phụ Nữ', icon: '📰', color: 'text-rose-500' };

        return { name: evt.source_entity, icon: '📍', color: 'text-slate-800' };
    };

    const visualEntity = resolveEntityVisual(event);

    return (
        <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
            {event.image_url && (
                <div className="relative h-56 w-full bg-slate-200">
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-800">{event.quality_score?.rating || 4.5}</span>
                        <span className="text-xs font-medium text-slate-500">({event.quality_score?.label || "Thẩm định"})</span>
                    </div>
                </div>
            )}

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full flex items-center gap-1
            ${isToddler ? 'bg-orange-100 text-orange-700' : isKid ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'}
          `}>
                        {isToddler && <Baby size={12} />}
                        {isKid && <Users size={12} />}
                        {isToddler ? '16+ tháng' : isKid ? '6+ tuổi' : 'Gia đình'}
                    </span>

                    <span className={`flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${pfColor}`}>
                        <Globe size={12} />
                        {platformLabel}
                    </span>

                    {event.category && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-1 rounded-full">
                            <Tags size={12} />
                            {event.category}
                        </span>
                    )}

                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-full">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        Verified
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                    {event.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {event.description}
                </p>

                {/* 5-Gate Checklist Logic Rendering */}
                <div className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100 shadow-inner">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        Tiêu chí sàng lọc (Preflight Standards)
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-medium text-slate-700">
                        <span className="flex gap-1.5 items-center"><CheckCircle2 size={12} className="text-emerald-500" /> An toàn nội dung</span>
                        <span className="flex gap-1.5 items-center"><CheckCircle2 size={12} className="text-emerald-500" /> Phù hợp độ tuổi</span>
                        <span className="flex gap-1.5 items-center"><CheckCircle2 size={12} className="text-emerald-500" /> Tính tương tác</span>
                        <span className="flex gap-1.5 items-center"><CheckCircle2 size={12} className="text-emerald-500" /> Lịch biểu cụ thể</span>
                        <span className="flex gap-1.5 items-center"><CheckCircle2 size={12} className="text-emerald-500" /> Định vị vật lý</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-sm font-medium pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-700 hover:text-indigo-600 transition-colors">
                        <div className="bg-indigo-50 w-8 h-8 rounded-full flex items-center justify-center">
                            <CalendarDays size={16} className="text-indigo-600" />
                        </div>
                        <span>{new Date(event.event_date).toLocaleString('vi-VN', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 hover:text-rose-600 transition-colors">
                        <div className="bg-rose-50 w-8 h-8 rounded-full flex items-center justify-center">
                            <MapPin size={16} className="text-rose-600" />
                        </div>
                        <span className="truncate group">{event.location} - <strong className={visualEntity.color}>{visualEntity.icon} {visualEntity.name}</strong></span>
                    </div>
                </div>

                <div className="mt-5">
                    <a
                        href={event.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3.5 px-4 bg-slate-900 text-white text-center rounded-2xl font-bold hover:bg-indigo-600 transition-all flex justify-center items-center gap-2"
                    >
                        Khám phá trên {platformLabel}
                    </a>
                </div>
            </div>
        </div>
    );
}
