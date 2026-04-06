import { CalendarDays, MapPin, Baby, Users, ShieldCheck, Star } from "lucide-react";

export function EventCard({ event }) {
    const isToddler = event.age_category === '16mo';
    const isKid = event.age_category === '6yo';

    return (
        <div className="bg-white rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
            {event.image_url && (
                <div className="relative h-56 w-full bg-slate-200">
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="object-cover w-full h-full"
                    />
                    {/* Evaluate Rating Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-800">{event.quality_score?.rating || 4.5}</span>
                        <span className="text-xs font-medium text-slate-500">({event.quality_score?.label})</span>
                    </div>
                </div>
            )}

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 text-[11px] uppercase tracking-wider font-bold rounded-full flex items-center gap-1.5
            ${isToddler ? 'bg-orange-100 text-orange-700' :
                            isKid ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}
          `}>
                        {isToddler && <Baby size={14} />}
                        {isKid && <Users size={14} />}
                        {isToddler ? '16+ tháng' : isKid ? '6+ tuổi' : 'Gia đình'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                        <ShieldCheck size={12} />
                        Đã Kiểm Duyệt
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                    {event.title}
                </h3>

                <p className="text-slate-600 mb-5 line-clamp-3 text-sm leading-relaxed">
                    {event.description}
                </p>

                <div className="flex flex-col gap-3 text-sm font-medium pt-4 border-t border-slate-100">
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
                        <span className="truncate group">{event.location}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <a
                        href={event.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3.5 px-4 bg-slate-900 text-white text-center rounded-2xl font-bold hover:bg-indigo-600 transition-all flex justify-center items-center gap-2"
                    >
                        Đăng Ký Khám Phá
                    </a>
                </div>
            </div>
        </div>
    );
}
