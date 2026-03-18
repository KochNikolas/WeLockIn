import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import { ArrowLeft, Clock, Users, Ticket, Trophy, ExternalLink, ShieldCheck, Check } from 'lucide-react';

const ChallengeDetail: React.FC = () => {
  const { slug, challengeId } = useParams<{ slug: string, challengeId: string }>();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const category = categories.find(c => c.slug === slug);
  const challenge = category?.challenges.find(c => c.id === challengeId);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const joined = JSON.parse(localStorage.getItem('joinedChallenges') || '[]');
    if (joined.includes(challengeId)) setIsJoined(true);
  }, [challengeId]);

  const handleJoin = () => {
    const joined = JSON.parse(localStorage.getItem('joinedChallenges') || '[]');
    if (!joined.includes(challengeId)) {
      const newJoined = [...joined, challengeId];
      localStorage.setItem('joinedChallenges', JSON.stringify(newJoined));
      setIsJoined(true);
    }
  };

  if (!category || !challenge) {
    return <div className="text-white p-10">Challenge nicht gefunden.</div>;
  }

  const diffColor = challenge.difficulty === 'Anfänger' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                    challenge.difficulty === 'Mittel' ? 'text-orange-500 border-orange-500/20 bg-orange-500/5' : 
                    'text-red-500 border-red-500/20 bg-red-500/5';

  return (
    <div className="min-h-screen pb-32 overscroll-none">
      {/* Fixed Scroll-Aware Back Button */}
      <button 
        onClick={() => navigate(-1)}
        style={{ 
          opacity: scrollY > 300 ? 0 : 1,
          pointerEvents: scrollY > 300 ? 'none' : 'auto',
          top: 'calc(env(safe-area-inset-top) + 16px)'
        }}
        className="fixed left-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white z-[100] transition-opacity duration-300 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Top Banner Image — Edge-to-edge, bleeds under status bar */}
      <div className="relative w-full overflow-hidden" style={{ height: 'calc(45vh + env(safe-area-inset-top, 0px))', marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))' }}>
        <img
          src={challenge.imageUrl || category.imageUrl}
          alt={challenge.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

        {/* Metrics Grid Overlapping Image Bottom */}
        <div className="absolute bottom-6 left-0 right-0 px-6 z-10">
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <div className="glass-badge bg-white/5 backdrop-blur-md border-white/10 justify-center py-3.5">
              <Ticket className="w-3.5 h-3.5 text-green-500 mr-2" />
              <span className="text-[11px] font-black uppercase tracking-tight text-white">{challenge.jokers} Joker</span>
            </div>
            <div className={`glass-badge backdrop-blur-md border-white/10 justify-center py-3.5 ${diffColor}`}>
              <Trophy className="w-3.5 h-3.5 mr-2" />
              <span className="text-[11px] font-black uppercase tracking-tight text-current">{challenge.difficulty}</span>
            </div>
            <div className="glass-badge bg-white/5 backdrop-blur-md border-white/10 justify-center py-3.5">
              <Clock className="w-3.5 h-3.5 text-green-500 mr-2" />
              <span className="text-[11px] font-black uppercase tracking-tight text-white">{challenge.duration}</span>
            </div>
            <div className="glass-badge bg-white/5 backdrop-blur-md border-white/10 justify-center py-3.5">
              <Users className="w-3.5 h-3.5 text-green-500 mr-2" />
              <span className="text-[11px] font-black uppercase tracking-tight text-white">{challenge.participants}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 py-10 max-w-md mx-auto">
        {/* Title & Subtitle - Directly on Background */}
        <div className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mb-3 block">Active Challenge</span>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">{challenge.title}</h1>
          <p className="text-zinc-400 text-base font-medium leading-relaxed border-l-2 border-white/10 pl-5 italic">
            {challenge.subtitle}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleJoin}
          className={`w-full py-6 rounded-3xl flex items-center justify-center space-x-3 mb-10 transition-all active:scale-[0.98] shadow-2xl ${
            isJoined 
              ? 'bg-zinc-800 text-zinc-400 border border-white/5' 
              : 'bg-green-500 text-black shadow-[0_20px_40px_rgba(34,197,94,0.2)] hover:bg-green-400'
          }`}
        >
          {isJoined ? <Check className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          <span className="text-xs font-black uppercase tracking-widest">
            {isJoined ? 'Bereits beigetreten' : 'Jetzt Teilnehmen'}
          </span>
        </button>

        {/* Content Sections */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Motivation</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <p className="text-zinc-300 text-sm font-medium leading-relaxed italic text-center px-4">
              "Erfolg ist kein Zufall. Es ist harte Arbeit, Ausdauer, Lernen, Studieren, Aufopferung und vor allem Liebe zu dem, was du tust oder lernst zu tun."
            </p>
          </section>

          <section className="bg-white/5 rounded-[2rem] p-8 border border-white/5">
            <div className="flex items-center space-x-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <h2 className="text-xs font-black uppercase tracking-widest text-white">Sinn der Challenge</h2>
            </div>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed">
              Diese Challenge wurde entwickelt, um deine tägliche Disziplin zu stärken. Durch die konstante Wiederholung kleiner, aber wirkungsvoller Gewohnheiten programmierst du dein Gehirn auf langfristigen Erfolg und Gesundheit. Wir nutzen den Gruppenzwang positiv, um dich auch an schweren Tagen am Ball zu halten.
            </p>
          </section>

          {/* Website Link */}
          <a 
            href="https://welockin.app/mission" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 text-zinc-500 hover:text-white transition-colors py-4 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest underline decoration-green-500/30 group-hover:decoration-green-500 transition-all">Hier erfährst du mehr über die Hintergründe</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
};

export default ChallengeDetail;
