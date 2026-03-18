import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, MapPin, Trophy, MessageCircle } from 'lucide-react';
import { mockUsers } from '../data/mockData';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-xl font-black uppercase text-white mb-4">User nicht gefunden</h2>
          <button onClick={() => navigate(-1)} className="text-green-500 font-bold uppercase tracking-widest text-sm">Zurück</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-12">
      {/* Hero Header */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-zinc-950" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white z-20 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
          <div className="w-32 h-32 rounded-full border-4 border-zinc-950 shadow-2xl overflow-hidden mb-6 bg-zinc-900">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">{user.name}</h1>
          <div className="flex items-center space-x-2 text-zinc-500 mt-2">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">{user.location}</span>
          </div>
        </div>
      </div>

      <main className="px-6 -mt-8 relative z-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 text-center backdrop-blur-md">
            <span className="block text-2xl font-black text-white mb-1">24</span>
            <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-500">Challenges</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 text-center backdrop-blur-md">
            <span className="block text-2xl font-black text-white mb-1">1.2k</span>
            <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-500">Punkte</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-10">
          <button 
            onClick={() => setIsAdded(!isAdded)}
            className={`flex-1 py-4 rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] ${
              isAdded 
                ? 'bg-zinc-800 text-zinc-400 border border-white/5' 
                : 'bg-green-500 text-black shadow-[0_10px_20px_rgba(34,197,94,0.3)]'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">{isAdded ? 'Hinzugefügt' : 'Hinzufügen'}</span>
          </button>
          <button className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Info Sections */}
        <div className="space-y-10">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4 px-2">Über mich</h3>
            <p className="bg-white/5 border border-white/5 rounded-3xl p-6 text-zinc-400 text-sm font-medium leading-relaxed">
              {user.bio}
            </p>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4 px-2">Badges</h3>
            <div className="flex flex-wrap gap-2 px-2">
              {user.badges?.map((badge, idx) => (
                <div key={idx} className="glass-badge bg-green-500/10 text-green-500 border-green-500/20 py-2">
                  <Trophy className="w-3 h-3 mr-2" />
                  <span className="tracking-tighter">{badge}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
