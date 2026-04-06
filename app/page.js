"use client";

import { useEffect, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { Compass, Baby, Users, MapPin, CalendarDays, Filter, ServerCrash, CheckCircle2 } from 'lucide-react';
import eventsData from '../public/data/events.json';
import evolutionLogs from '../public/data/evolution_log.json';
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [ageFilter, setAgeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    let filtered = eventsData || [];

    // Age Filter
    if (ageFilter !== 'all') {
      filtered = filtered.filter(e => e.age_category === ageFilter || e.age_category.includes(ageFilter) || e.age_category === 'family');
    }

    // Taxonomy Category Filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(e => e.category === categoryFilter);
    }

    // Timeframe Filter
    if (timeFilter !== 'all') {
      filtered = filtered.filter(e => {
        const date = parseISO(e.event_date);
        if (timeFilter === 'today') return isToday(date);
        if (timeFilter === 'week') return isThisWeek(date, { weekStartsOn: 1 });
        if (timeFilter === 'month') return isThisMonth(date);
        return true;
      });
    }

    // Sort closest events
    filtered.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    setEvents(filtered);
  }, [ageFilter, timeFilter]);

  const auditHealth = evolutionLogs?.last_audit?.health === "PASSED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700";

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <header className="bg-white/95 backdrop-blur-2xl pt-16 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-0 z-20 w-full border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Gia Đình & <span className="text-indigo-600">Sự Kiện</span>
            </h1>
            <div className="bg-rose-50 text-rose-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <MapPin size={12} /> TPHCM
            </div>
          </div>

          <p className="text-slate-500 font-medium tracking-wide text-xs mb-6 max-w-sm">
            Phân tích theo thời gian thực (Real-Data Driven). Nguồn: Cultural Centers & NGOs.
          </p>

          {/* Timeframe Chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 border-b border-slate-100 mb-4">
            <CalendarDays size={18} className="text-slate-400 mt-0.5 mr-1" />
            {['all', 'today', 'week', 'month'].map(frame => (
              <button key={frame}
                onClick={() => setTimeFilter(frame)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-bold transition-all ${timeFilter === frame ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
              >
                {frame === 'all' ? 'Mọi lúc' : frame === 'today' ? 'Hôm nay' : frame === 'week' ? 'Tuần này' : 'Tháng này'}
              </button>
            ))}
          </div>

          {/* Age Filters */}
          <div className="flex gap-3 mt-4 overflow-x-auto hide-scrollbar pb-1">
            <button
              onClick={() => setAgeFilter('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition-all ${ageFilter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              <Filter size={18} /> Tất cả độ tuổi
            </button>

            <button
              onClick={() => setAgeFilter('16mo')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition-all ${ageFilter === '16mo' ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                }`}
            >
              <Baby size={18} /> 16+ tháng
            </button>

            <button
              onClick={() => setAgeFilter('6yo')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition-all ${ageFilter === '6yo' ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
            >
              <Users size={18} /> 6+ tuổi
            </button>
          </div>

          {/* Dynamic Taxonomy Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
            {['all', 'Workshop & Kỹ năng', 'Nghệ thuật & Biểu diễn', 'Vui chơi & Dã ngoại', 'Lễ hội & Sự kiện', 'Triển lãm & Trưng bày', 'Cộng đồng & Mặc định'].map(cat => (
              <button key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[11px] font-extrabold uppercase tracking-wide transition-all border ${categoryFilter === cat ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-300 hover:text-teal-600'
                  }`}
              >
                {cat === 'all' ? 'Tất cả chủ đề' : cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="px-5 pt-8 max-w-2xl mx-auto">
        {events.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] mt-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Compass size={32} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Thông tin Trung thực</h3>
            <p className="text-slate-500 font-medium text-sm">
              Hệ thống Data-Driven không tìm thấy sự kiện nào thỏa mãn chuẩn từ khóa NGO/văn hóa của tháng này. Đây là hệ thống thời gian thực, không sử dụng dữ liệu ảo tạo cho có.
            </p>
          </div>
        )}

        {/* Operational Dashboard - Enterprise Transparency */}
        <div className="mt-8 mb-6">
          <div className="flex items-center gap-2 px-2 mb-3">
            <ServerCrash size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Audit System</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200"></div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-[13px] font-bold text-slate-800">Auto-Evolution Engine</h4>
                <p className="text-[11px] text-slate-500 font-medium">Báo cáo tình trạng mạch kết nối API (DeerFlow Ops)</p>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold flex gap-1 items-center ${auditHealth}`}>
                <CheckCircle2 size={12} /> {evolutionLogs?.last_audit?.health || "N/A"}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <ul className="text-[11px] font-medium text-slate-600 flex flex-col gap-1">
                <li>• Tổng pipeline quét: <span className="font-bold text-slate-900">{evolutionLogs?.runs}</span> phiên</li>
                <li>• Sự kiện hợp lệ duyệt hôm nay: <span className="font-bold text-slate-900">{evolutionLogs?.last_audit?.processed}</span></li>
                <li>• Node lỗi đã bị tự động ngắt (Circuit Break): <span className="font-bold text-rose-600">{evolutionLogs?.last_audit?.failed}</span> nodes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
