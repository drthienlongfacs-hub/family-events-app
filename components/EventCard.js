import { CalendarDays, MapPin, Baby, Users } from "lucide-react";

export function EventCard({ event }) {
    const isToddler = event.age_category === '16mo';
    const isKid = event.age_category === '6yo';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 transition-transform hover:scale-[1.01]">
            {event.image_url && (
                <div className="h-48 w-full bg-slate-200">
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1
            ${isToddler ? 'bg-orange-100 text-orange-700' :
                            isKid ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}
          `}>
                        {isToddler ? <Baby size={14} /> : <Users size={14} />}
                        {isToddler ? '16+ tháng' : isKid ? '6+ tuổi' : 'Cả gia đình'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {event.source_entity}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                    {event.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {event.description}
                </p>

                <div className="flex flex-col gap-2 text-sm text-slate-500 font-medium pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-indigo-500" />
                        <span>{new Date(event.event_date).toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-rose-500" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                <div className="mt-5">
                    <a
                        href={event.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2.5 px-4 bg-slate-900 text-white text-center rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                    >
                        Xem Chi Tiết Nguồn
                    </a>
                </div>
            </div>
        </div>
    );
}
