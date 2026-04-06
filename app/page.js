"use client";

import { useEffect, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { Compass, Baby, Users, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents(filter);
  }, [filter]);

  const fetchEvents = async (selectedFilter) => {
    setLoading(true);
    try {
      const { data } = await axios.get('./data/events.json');
      // local filtering logic
      let filtered = data;
      if (selectedFilter !== 'all') {
        filtered = data.filter(e => e.age_category === selectedFilter || e.age_category.includes(selectedFilter) || e.age_category === 'family');
      }
      // sort by date ascending (closest events first)
      filtered.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      setEvents(filtered);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Premium Header */}
      <header className="bg-white px-6 pt-14 pb-6 shadow-sm sticky top-0 z-10 w-full rounded-b-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Gia Đình & <span className="text-indigo-600">Sự Kiện</span>
        </h1>
        <p className="text-slate-500 font-medium tracking-wide">
          Cập nhật từ Đại Sứ Quán & Tổ Chức Uy Tín
        </p>

        {/* Filters */}
        <div className="flex gap-3 mt-6 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
          >
            <Compass size={18} /> Khám phá
          </button>

          <button
            onClick={() => setFilter('16mo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition-all ${filter === '16mo' ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
              }`}
          >
            <Baby size={18} /> 16+ tháng
          </button>

          <button
            onClick={() => setFilter('6yo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-bold transition-all ${filter === '6yo' ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
          >
            <Users size={18} /> 6+ tuổi
          </button>
        </div>
      </header>

      {/* Main Feed */}
      <main className="px-5 pt-8 max-w-lg mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-medium animate-pulse">Đang rà soát nguồn thông tin...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
            <div className="text-center mt-8 text-slate-400 font-medium text-sm">
              Bạn đã xem hết sự kiện trong ngày
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm mt-10">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Compass size={32} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Chưa có sự kiện mới</h3>
            <p className="text-slate-500 font-medium text-sm">
              Trình thu thập dữ liệu đang chờ các hoạt động phù hợp cho độ tuổi bạn chọn.
            </p>
          </div>
        )}
      </main>

    </div>
  );
}
