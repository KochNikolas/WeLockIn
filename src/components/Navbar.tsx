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
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive ? 'text-white scale-110' : 'text-zinc-600 hover:text-zinc-400'
              }`
            }
          >
            <div className="relative">
              {item.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
