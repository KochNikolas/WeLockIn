import React from 'react';
import { Settings as SettingsIcon, User } from 'lucide-react';

export const Settings: React.FC = () => (
  <div className="min-h-screen pb-24 flex flex-col items-center justify-center p-6">
    <SettingsIcon className="w-12 h-12 text-zinc-700 mb-4" />
    <h1 className="text-2xl font-black text-white">Einstellungen</h1>
    <p className="text-zinc-500 text-sm mt-2">Hier kannst du dein Erlebnis anpassen.</p>
  </div>
);

export const Profile: React.FC = () => (
  <div className="min-h-screen pb-24 flex flex-col items-center justify-center p-6">
    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 mb-4 flex items-center justify-center">
      <User className="w-10 h-10 text-white" />
    </div>
    <h1 className="text-2xl font-black text-white">Dein Profil</h1>
    <p className="text-zinc-500 text-sm mt-2">Level 12 &bull; 4500 XP</p>
  </div>
);
