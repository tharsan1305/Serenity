
import React, { useState, useEffect } from 'react';
import { SectionTitle, Card, Button } from '../components/UI';
import { summarizeJournal, getMoodRecommendation } from '../services/geminiService';
import { 
  Smile, 
  Meh, 
  Frown, 
  CloudRain, 
  Flame, 
  Save, 
  Sparkles, 
  Mic, 
  History,
  TrendingUp,
  Brain
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const moods = [
  { icon: <Smile className="w-8 h-8" />, label: 'Happy', color: 'text-emerald-500', bg: 'bg-emerald-50', value: 'happy' },
  { icon: <Meh className="w-8 h-8" />, label: 'Neutral', color: 'text-indigo-500', bg: 'bg-indigo-50', value: 'neutral' },
  { icon: <Frown className="w-8 h-8" />, label: 'Sad', color: 'text-blue-500', bg: 'bg-blue-50', value: 'sad' },
  { icon: <CloudRain className="w-8 h-8" />, label: 'Anxious', color: 'text-violet-500', bg: 'bg-violet-50', value: 'anxious' },
  { icon: <Flame className="w-8 h-8" />, label: 'Angry', color: 'text-rose-500', bg: 'bg-rose-50', value: 'angry' },
];

const mockHistory = [
  { day: 'Mon', mood: 4 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 2 },
  { day: 'Fri', mood: 4 },
  { day: 'Sat', mood: 5 },
  { day: 'Sun', mood: 4 },
];

const MoodJournalView: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalText, setJournalText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSave = async () => {
    if (!journalText) return;
    setIsSummarizing(true);
    const result = await summarizeJournal(journalText);
    setSummary(result);
    setIsSummarizing(false);
  };

  useEffect(() => {
    if (selectedMood) {
      getMoodRecommendation(selectedMood).then(res => setRecommendation(res));
    }
  }, [selectedMood]);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <SectionTitle 
        title="Daily Wellness Check-in" 
        subtitle="Track your emotions and let AI help you find clarity through journaling." 
      />

      {/* Mood Selector */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">How are you feeling right now?</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`
                flex flex-col items-center gap-3 p-4 rounded-3xl transition-all w-28
                ${selectedMood === mood.value ? `${mood.bg} ${mood.color} ring-2 ring-current ring-offset-4 scale-110 shadow-lg` : 'hover:bg-slate-50 text-slate-400'}
              `}
            >
              {mood.icon}
              <span className="text-sm font-bold">{mood.label}</span>
            </button>
          ))}
        </div>

        {recommendation && (
          <div className="mt-10 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
            <Sparkles className="w-5 h-5 text-indigo-600 mt-1 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-900 mb-1">AI Recommendation</p>
              <p className="text-sm text-indigo-700">{recommendation}</p>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Journaling Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Your Private Journal</h3>
              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all mb-4 text-slate-700 leading-relaxed"
              placeholder="What's on your mind? Don't worry about grammar, just let it flow..."
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">Encrypted & Private</p>
              <Button 
                onClick={handleSave} 
                disabled={!journalText || isSummarizing}
                className="gap-2"
              >
                {isSummarizing ? 'Summarizing...' : <><Save className="w-4 h-4" /> Save Entry</>}
              </Button>
            </div>
          </Card>

          {summary && (
            <Card className="p-6 border-l-4 border-indigo-500 bg-indigo-50/50 animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-indigo-600" />
                <h4 className="text-base font-bold text-indigo-900">AI Insight & Summary</h4>
              </div>
              <p className="text-indigo-800 italic leading-relaxed">
                "{summary}"
              </p>
            </Card>
          )}
        </div>

        {/* Mood Analytics */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Mood Trends</h3>
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockHistory}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 py-2 rounded-xl">
              <TrendingUp className="w-4 h-4" /> Improving over last 7 days
            </div>
          </Card>

          <Card className="p-6 bg-indigo-600 text-white border-none">
            <h4 className="font-bold mb-2">Did You Know?</h4>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Writing for just 15 minutes a day can improve your immune system and reduce overall stress levels.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoodJournalView;
