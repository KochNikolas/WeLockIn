import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import { Target, ChevronRight, Check, X, RotateCcw, Clock, Users } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeChallenges, setActiveChallenges] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const joinedIds = JSON.parse(localStorage.getItem('joinedChallenges') || '[]');
    const allChallenges = categories.flatMap(cat => 
      cat.challenges.map(ch => ({ ...ch, categorySlug: cat.slug, categoryImageUrl: cat.imageUrl }))
    );
    const joined = allChallenges.filter(ch => joinedIds.includes(ch.id));
    setActiveChallenges(joined);
  }, [refreshKey]);

  return (
    <div className="min-h-screen pb-32 bg-zinc-950 overscroll-none">
      {/* Welcome Header */}
      <header className="px-6 pt-16 pb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white leading-tight">Guten Tag,<br />Nikolas</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase mt-2 tracking-widest">Master Your Habit</p>
          </div>
          <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-2xl shadow-xl">
            💪
          </div>
        </div>

        {/* Quick Stats Overlay (Minimal) */}
        <div className="grid grid-cols-3 gap-3 bg-white/5 border border-white/5 rounded-[2rem] p-5 backdrop-blur-md">
          <div className="text-center">
            <span className="block text-xl font-black text-white">12</span>
            <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Streak</span>
          </div>
          <div className="border-x border-white/10 text-center">
            <span className="block text-xl font-black text-green-500">420</span>
            <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Punkte</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-black text-white">3</span>
            <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Joker</span>
          </div>
        </div>
      </header>

      <main className="px-6 space-y-12">
        {/* Active Challenges Section */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Deine Challenges heute</h2>
            {activeChallenges.length > 0 && <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{activeChallenges.length} Aktiv</span>}
          </div>

          {activeChallenges.length > 0 ? (
            <div className="space-y-4">
              {activeChallenges.map((ch) => (
                <SwipeableChallenge 
                  key={ch.id} 
                  challenge={ch} 
                  onStatusUpdate={() => setRefreshKey(prev => prev + 1)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-dashed border-white/10 rounded-3xl p-10 text-center">
              <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mb-4">Noch keine aktiven Challenges</p>
              <button 
                onClick={() => navigate('/challenges')}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 py-2 px-4 border border-green-500/20 rounded-full hover:bg-green-500/5 transition-all"
              >
                Jetzt Entdecken
              </button>
            </div>
          )}
        </section>

        {/* Motivation Card */}
        <section className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgba(34,197,94,0.3)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
          <h3 className="text-2xl font-black text-black leading-tight mb-3">Keine Ausreden mehr.</h3>
          <p className="text-black/70 text-sm font-bold leading-relaxed mb-6 uppercase tracking-tight">Dein Körper schafft alles, nur dein Geist muss überzeugt werden.</p>
          <div className="flex items-center text-xs font-black text-black uppercase tracking-widest">
            Starte Jetzt <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </section>
      </main>
    </div>
  );
};

const SwipeableChallenge: React.FC<{ challenge: any, onStatusUpdate: () => void }> = ({ challenge, onStatusUpdate }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startX = useRef(0);
  const today = new Date().toISOString().split('T')[0];
  
  const status = JSON.parse(localStorage.getItem(`status_${challenge.id}`) || '{}')[today] || 'pending';

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (status !== 'pending') return;
    setIsSwiping(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = currentX - startX.current;
    setOffsetX(diff);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    
    if (offsetX > 150) {
      updateStatus('done');
    } else if (offsetX < -150) {
      updateStatus('failed');
    } else {
      setOffsetX(0);
    }
  };

  const updateStatus = (newStatus: string) => {
    const currentStatus = JSON.parse(localStorage.getItem(`status_${challenge.id}`) || '{}');
    currentStatus[today] = newStatus;
    localStorage.setItem(`status_${challenge.id}`, JSON.stringify(currentStatus));
    setOffsetX(newStatus === 'done' ? 500 : -500);
    setTimeout(() => {
      onStatusUpdate();
    }, 200);
  };

  const resetStatus = () => {
    const currentStatus = JSON.parse(localStorage.getItem(`status_${challenge.id}`) || '{}');
    delete currentStatus[today];
    localStorage.setItem(`status_${challenge.id}`, JSON.stringify(currentStatus));
    setOffsetX(0);
    onStatusUpdate();
  };

  return (
    <div className="relative group touch-none select-none overflow-hidden rounded-[2rem]">
      {/* Background Actions */}
      <div className="absolute inset-0 flex items-center justify-between px-10">
        <div className={`flex flex-col items-center justify-center transition-opacity ${offsetX > 0 ? 'opacity-100' : 'opacity-20'}`}>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black mb-1">
            <Check className="w-6 h-6" />
          </div>
          <span className="text-[8px] font-black uppercase text-green-500">Erledigt</span>
        </div>
        <div className={`flex flex-col items-center justify-center transition-opacity ${offsetX < 0 ? 'opacity-100' : 'opacity-20'}`}>
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white mb-1">
            <X className="w-6 h-6" />
          </div>
          <span className="text-[8px] font-black uppercase text-red-500">Verpasst</span>
        </div>
      </div>

      {/* Main Card */}
      <div
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(${offsetX}px)` }}
        className={`relative bg-zinc-900 border border-white/5 rounded-[2rem] h-28 overflow-hidden transition-transform ${!isSwiping ? 'duration-300' : 'duration-0'}`}
      >
        <img 
          src={challenge.imageUrl || challenge.categoryImageUrl} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />
        
        <div className="absolute inset-0 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
              status === 'done' ? 'bg-green-500 text-black border-green-500' : 
              status === 'failed' ? 'bg-red-500 text-white border-red-500' :
              'bg-white/5 text-green-500 border-white/10'
            }`}>
              {status === 'done' ? <Check className="w-6 h-6" /> : 
               status === 'failed' ? <X className="w-6 h-6" /> :
               <Target className="w-6 h-6" />}
            </div>
            <div>
              <h4 className={`text-sm font-black uppercase tracking-tight ${status === 'done' ? 'text-green-500 line-through opacity-50' : status === 'failed' ? 'text-red-500 line-through opacity-50' : 'text-white'}`}>
                {challenge.title}
              </h4>
              <div className="flex items-center space-x-3 mt-1 underline decoration-white/10">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{challenge.duration}</span>
                {status !== 'pending' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetStatus(); }}
                    className="flex items-center text-[9px] font-black text-white uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full"
                  >
                    <RotateCcw className="w-2.5 h-2.5 mr-1" /> Reset
                  </button>
                )}
              </div>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 transition-opacity ${status === 'pending' ? 'text-zinc-700 opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </div>
  );
};

export default Home;
