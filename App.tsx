
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  User as UserIcon, 
  BookOpen, 
  LineChart, 
  Settings, 
  Bell,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { User, CategoryType } from './types';
import DashboardView from './views/DashboardView';
import CategoryDetailView from './views/CategoryDetailView';
import ProfileView from './views/ProfileView';
import LoginView from './views/LoginView';
import MoodJournalView from './views/MoodJournalView';
import LandingView from './views/LandingView';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, isSidebarOpen, toggleSidebar } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return <>{children}</>;

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Mood & Journal', path: '/journal', icon: <LineChart className="w-5 h-5" /> },
    { label: 'Profile', path: '/profile', icon: <UserIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Serenity
            </span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => toggleSidebar()}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                  ${location.pathname === item.path ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => { setUser(null); navigate('/'); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors mt-auto"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:block text-sm text-slate-500 font-medium italic">
            "One step at a time, you are doing great."
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-400 to-violet-400 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>

        {/* SOS Floating Action */}
        <button 
          className="fixed bottom-6 right-6 w-14 h-14 bg-rose-500 text-white rounded-full shadow-lg shadow-rose-200 flex items-center justify-center hover:bg-rose-600 transition-all hover:scale-110 active:scale-95 z-50 group"
          onClick={() => alert("SOS Mode: Connecting you to a counselor immediately...")}
        >
          <ShieldAlert className="w-6 h-6" />
          <span className="absolute right-16 bg-rose-500 text-white px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
            Panic / SOS
          </span>
        </button>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, isSidebarOpen, toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen) }}>
      <HashRouter>
        <Layout>
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<LandingView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="*" element={<LandingView />} />
              </>
            ) : (
              <>
                <Route path="/" element={<DashboardView />} />
                <Route path="/category/:id" element={<CategoryDetailView />} />
                <Route path="/journal" element={<MoodJournalView />} />
                <Route path="/profile" element={<ProfileView />} />
                <Route path="*" element={<DashboardView />} />
              </>
            )}
          </Routes>
        </Layout>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
