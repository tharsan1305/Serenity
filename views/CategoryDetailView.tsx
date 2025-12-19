
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, MOCK_VIDEOS } from '../constants';
import { Card, Button, SectionTitle } from '../components/UI';
import { ChevronLeft, Play, Calendar, Star, ThumbsUp, MessageSquare, Download, CheckCircle2 } from 'lucide-react';

const CategoryDetailView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === id);
  const videos = MOCK_VIDEOS.filter(v => v.category === id);
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isSatisfied, setIsSatisfied] = useState(false);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-4 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Player Area */}
          <Card className="p-2 bg-slate-900 aspect-video relative flex items-center justify-center group overflow-hidden">
            <img src={activeVideo.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <button className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all scale-110">
                <Play className="w-10 h-10 fill-current ml-1" />
              </button>
              <p className="text-white font-medium text-lg">Click to start video</p>
            </div>
            <div className="absolute bottom-4 right-4 z-20">
              <Button variant="ghost" size="sm" className="bg-black/50 text-white border-none hover:bg-black/70">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-extrabold text-slate-900">{activeVideo.title}</h1>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors">
                  <ThumbsUp className="w-5 h-5" /> <span className="text-sm font-bold">1.2k</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors">
                  <MessageSquare className="w-5 h-5" /> <span className="text-sm font-bold">42</span>
                </button>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {activeVideo.description} This video session is designed to provide immediate relief and long-term coping mechanisms for {category.label.toLowerCase()}.
            </p>
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-sm font-medium text-indigo-700">Did this video help you today?</p>
              <Button size="sm" variant={isSatisfied ? 'primary' : 'outline'} onClick={() => setIsSatisfied(!isSatisfied)}>
                {isSatisfied ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : null}
                {isSatisfied ? 'I Feel Better' : 'Yes, satisfied'}
              </Button>
            </div>
          </div>

          <SectionTitle title="Booking 1-to-1 Session" subtitle="Available only for active learners. Speak with a professional." />
          <Card className={`p-8 ${!isSatisfied ? 'opacity-50 grayscale' : 'border-indigo-500 shadow-indigo-100 shadow-xl'}`}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Need more personal guidance?</h3>
                <p className="text-slate-500">Book a private session with our senior {category.id} counselors. Available 24/7 for crisis support.</p>
                {!isSatisfied && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">
                    <Star className="w-3 h-3" /> Complete the video session to unlock booking
                  </div>
                )}
              </div>
              <div className="shrink-0">
                <Button size="lg" disabled={!isSatisfied} className="shadow-lg">
                  <Calendar className="w-5 h-5 mr-2" /> Book Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar / Playlists */}
        <div className="space-y-6">
          <SectionTitle title="Course Content" />
          <div className="space-y-3">
            {videos.map((v) => (
              <Card 
                key={v.id} 
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-4 ${activeVideo.id === v.id ? 'border-indigo-500 bg-indigo-50' : 'border-transparent'}`}
                onClick={() => { setActiveVideo(v); setIsSatisfied(false); }}
              >
                <div className="flex gap-3">
                  <div className="w-24 aspect-video rounded-lg overflow-hidden shrink-0 relative">
                    <img src={v.thumbnail} className="w-full h-full object-cover" alt="" />
                    {activeVideo.id === v.id && (
                      <div className="absolute inset-0 bg-indigo-600/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold line-clamp-2 ${activeVideo.id === v.id ? 'text-indigo-900' : 'text-slate-800'}`}>{v.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{v.views.toLocaleString()} views</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-slate-50 border-none">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-current" /> Category Insights
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Expert Coaches</span>
                <span className="font-bold text-slate-900">14 Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Success Rate</span>
                <span className="font-bold text-slate-900">98.2%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Wait Time</span>
                <span className="font-bold text-slate-900">&lt; 5 mins</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailView;
