import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import { ArrowLeft, Clock, Users, Trophy, Ticket } from 'lucide-react';

const ChallengeList: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return <div className="text-white p-10">Kategorie nicht gefunden.</div>;
  }

  return (
    <div className="min-h-screen pb-12">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between max-w-md mx-auto">
        <button 
          onClick={() => navigate('/challenges')}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white active:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-black uppercase tracking-widest text-white">{category.name}</h2>
        <div className="w-10" /> {/* Spacer */}
      </header>
      
      <div className="px-6 mb-8 max-w-md mx-auto">
        <p className="text-zinc-500 text-sm italic">{category.description}</p>
      </div>

      <main className="px-6 space-y-8 max-w-md mx-auto">
        {category.challenges.map((challenge) => (
          <div key={challenge.id} className="relative bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl p-8 group">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-zinc-800 text-[10px] font-black uppercase tracking-tighter text-white rounded-full">
                {challenge.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-zinc-400">
                <Ticket className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">{challenge.jokers} Joker</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white leading-tight mb-2">{challenge.title}</h3>
            <p className="text-zinc-400 text-sm font-light mb-8 leading-relaxed">
              {challenge.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-300">{challenge.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-300">{challenge.participants}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-300">Level Up</span>
              </div>
            </div>

            <button className="w-full py-4 bg-zinc-50 text-zinc-950 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all hover:bg-white active:scale-[0.97]">
              Herausforderung wählen
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                Startet: {challenge.startDate}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ChallengeList;
