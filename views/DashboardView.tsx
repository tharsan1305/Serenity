
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { CATEGORIES, MOCK_VIDEOS } from '../constants';
import { SectionTitle, Card, Button } from '../components/UI';
import { Play, Calendar, Star, TrendingUp, ChevronRight } from 'lucide-react';

const DashboardView: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Hello, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500">How are you feeling today?</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => navigate('/journal')}>
            Daily Check-in
          </Button>
          <Button className="gap-2">
            <Calendar className="w-4 h-4" /> Book Session
          </Button>
        </div>
      </div>

      {/* Hero Banner / Premium Promo */}
      {!user?.isPremium && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-700 p-8 md:p-12 text-white">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Go Premium for Unlimited Expert Care</h2>
            <p className="text-indigo-100 mb-8 leading-relaxed">
              Unlock 1-to-1 sessions, priority booking, and personalized growth paths designed by psychiatric experts.
            </p>
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 border-none shadow-lg">
              Upgrade Now
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-white rotate-12 translate-x-12 translate-y-12 blur-3xl pointer-events-none"></div>
        </div>
      )}

      {/* Counseling Categories */}
      <section>
        <SectionTitle title="Counseling Categories" subtitle="Specialized support tailored to your unique challenges." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Card key={cat.id} className="group hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/category/${cat.id}`)}>
              <div className="p-6">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.label}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex items-center text-indigo-600 font-bold text-sm">
                  Explore More <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended Content */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle title="Recommended for You" />
          <Button variant="ghost" size="sm" className="text-indigo-600">See All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_VIDEOS.map((video) => (
            <Card key={video.id} className="flex flex-col h-full">
              <div className="relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-indigo-600 shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded font-bold uppercase tracking-wider">
                  {video.category}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-800 mb-1 line-clamp-1">{video.title}</h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{video.description}</p>
                <div className="mt-auto flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-400">{video.views.toLocaleString()} views</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Expert Verified</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your Wellness Journey</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Videos Watched', val: '12' },
            { label: 'Journal Entries', val: '24' },
            { label: 'Sessions Completed', val: '2' },
            { label: 'Current Streak', val: '5 Days' }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-3xl font-extrabold text-indigo-600 mb-1">{stat.val}</div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
