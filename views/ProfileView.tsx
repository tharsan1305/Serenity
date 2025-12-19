
import React from 'react';
import { useApp } from '../App';
import { Card, SectionTitle, Button } from '../components/UI';
import { 
  User, 
  Settings, 
  Shield, 
  Lock, 
  CreditCard, 
  LogOut, 
  Trash2,
  ChevronRight,
  BadgeCheck,
  History
} from 'lucide-react';

const ProfileView: React.FC = () => {
  const { user, setUser } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <SectionTitle title="Account Settings" subtitle="Manage your personal information and privacy." />

      {/* User Info Header */}
      <Card className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
              {user?.isPremium && (
                <div className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3" /> Premium Member
                </div>
              )}
            </div>
            <p className="text-slate-500">{user?.mobile}</p>
            <p className="text-slate-500 text-sm">{user?.address}</p>
          </div>
          <Button variant="outline" size="sm">Edit Profile</Button>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <Shield className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800">Privacy & Security</h3>
            </div>
            <div className="p-2">
              {[
                { label: 'Anonymous Identity', desc: 'Hide your real name from counselors', active: true },
                { label: 'Biometric Login', desc: 'Use FaceID/TouchID for app access', active: false },
                { label: 'Auto-Delete Journal', desc: 'Entries delete after 30 days', active: true }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors text-left">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${item.active ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800">Subscription</h3>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Current Plan</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-800">{user?.isPremium ? 'Premium Care' : 'Free Basic'}</p>
                  <span className="text-indigo-600 font-bold">$0/mo</span>
                </div>
              </div>
              <Button className="w-full" variant={user?.isPremium ? 'outline' : 'primary'}>
                {user?.isPremium ? 'Manage Billing' : 'Upgrade to Premium'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
              <History className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800">Activity History</h3>
            </div>
            <div className="p-2">
              {[
                { label: 'Sessions Booked', val: '2 Sessions' },
                { label: 'Content Watched', val: '12 Videos' },
                { label: 'Helpdesk Tickets', val: '0 Active' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{item.val}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-rose-100 bg-rose-50/20">
            <div className="p-6">
              <h3 className="font-bold text-rose-800 mb-2">Danger Zone</h3>
              <p className="text-xs text-rose-600/70 mb-6">Once deleted, your account and all wellness data cannot be recovered.</p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => setUser(null)}>
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out from All Devices
                </Button>
                <Button variant="danger" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete My Data
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
