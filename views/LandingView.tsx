
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, MessageCircle } from 'lucide-react';
import { Button } from '../components/UI';

const LandingView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-hidden flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Serenity</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-8 animate-bounce">
          <Sparkles className="w-4 h-4" />
          Your Safe Space for Mental Wellness
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
          Find Your Peace <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Anywhere, Anytime.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          The all-in-one platform for professional counseling, personalized mood tracking, and AI-powered mental health support.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="gap-2" onClick={() => navigate('/login')}>
            Start Free Session <ArrowRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { icon: <ShieldCheck className="w-6 h-6" />, title: "Secure & Private", desc: "Your data is end-to-end encrypted and completely anonymous if you choose." },
            { icon: <HeartPulse className="w-6 h-6" />, title: "Expert Counseling", desc: "Connect with verified professionals in specialized categories." },
            { icon: <MessageCircle className="w-6 h-6" />, title: "24/7 Support", desc: "AI-powered journaling and SOS mode for instant help when you need it." }
          ].map((f, i) => (
            <div key={i} className="text-left p-6 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all">
              <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100">
        © 2024 Serenity Mental Wellness App. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingView;
