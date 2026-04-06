"use client";

import { useEffect, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { Compass, Baby, Users, MapPin, CalendarDays, Filter } from 'lucide-react';
import eventsData from '../public/data/events.json';
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [ageFilter, setAgeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    let filtered = eventsData;

    // Age Filter
    if (ageFilter !== 'all') {
      filtered = filtered.filter(e => e.age_category === ageFilter || e.age_category.includes(ageFilter) || e.age_category === 'family');
    }

    // Timeframe Filter
    if (timeFilter !== 'all') {
      filtered = filtered.filter(e => {
        const date = parseISO(e.event_date);
        if (timeFilter === 'today') return isToday(date);
        if (timeFilter === 'week') return isThisWeek(date, { weekStartsOn: 1 });
        if (timeFilter === 'month') return isThisMonth(date);
        return true; // fallback
      });
    }

    // sort by date ascending
    filtered.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    setEvents(filtered);
  }, [ageFilter, timeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <header className="bg-white px-6 pt-16 pb-6 shadow-sm sticky top-0 z-10 w-full rounded-b-3xl border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Gia Đình & <span className="text-indigo-600">Sự Kiện</span>
          </h1>
          <div className="bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <MapPin size={12} /> TPHCM
          </div>
        </div>

        <p className="text-slate-500 font-medium tracking-wide text-sm mb-6">
          Nguồn uy tín: IDECAF, The Hive, Goethe, UN & Tổ chức Xã hội
        </p>

        {/* Timeframe Chips - Horizontal Scrolling per Eventbrite benchmark */}
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
      </header>

      {/* Main Feed */}
      <main className="px-5 pt-8 max-w-lg mx-auto">
        {events.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
            <div className="text-center mt-8 text-slate-400 font-medium text-sm">
              Trang web tự động cập nhật mỗi ngày.
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm mt-10">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Compass size={32} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Chưa có sự kiện phù hợp</h3>
            <p className="text-slate-500 font-medium text-sm">
              Tuần này các Đại sứ quán và NGO (IDECAF, v.v) chưa tổ chức sự kiện cho nhóm tuổi anh/chị chọn. Đang chờ Crawler cập nhật nhé!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
