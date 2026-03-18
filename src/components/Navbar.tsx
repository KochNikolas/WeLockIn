import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, Settings, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const navItems = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { to: '/challenges', icon: <Trophy className="w-5 h-5" />, label: 'Challenges' },
    { to: '/profile', icon: <User className="w-5 h-5" />, label: 'Profil' },
    { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-8 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] bg-zinc-950/40 backdrop-blur-3xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex justify-between items-center px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1.5 transition-all duration-500 ${
                isActive ? 'text-green-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'
              }`
            }
          >
            <div className={`relative p-2 rounded-xl transition-colors duration-500 ${window.location.pathname === item.to ? 'bg-green-500/10' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.15em]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
