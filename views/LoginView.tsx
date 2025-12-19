
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { Button, Card } from '../components/UI';
import { Camera, ShieldCheck, User as UserIcon, Lock, Mail, MapPin, Smartphone } from 'lucide-react';

const LoginView: React.FC = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: '1',
      name: 'John Doe',
      age: '28',
      mobile: '+1 234 567 8900',
      address: 'San Francisco, CA',
      isPremium: false,
      isLoggedIn: true
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {isRegistering ? 'Join Serenity' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500">
            {isRegistering ? 'Create your safe space account' : 'Continue your journey to wellness'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && step === 2 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => fileInputRef.current?.click()}>
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-600 mb-3">
                  <Camera className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800">Selfie Verification</h4>
                <p className="text-sm text-slate-500">Required for professional counseling security</p>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" type="submit">Verify & Sign Up</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isRegistering && (
                <>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="tel" placeholder="Mobile Number" required className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                </>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>

              {isRegistering ? (
                <Button className="w-full" size="lg" type="button" onClick={() => setStep(2)}>Next Step</Button>
              ) : (
                <Button className="w-full" size="lg" type="submit">Log In</Button>
              )}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2">
          <p className="text-slate-500 text-sm">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button 
            className="text-indigo-600 font-bold text-sm hover:underline"
            onClick={() => { setIsRegistering(!isRegistering); setStep(1); }}
          >
            {isRegistering ? 'Log In' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4" />
          <span>End-to-End Encrypted & GDPR Compliant</span>
        </div>
      </Card>
    </div>
  );
};

export default LoginView;
