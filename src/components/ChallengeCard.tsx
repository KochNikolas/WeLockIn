import React from 'react';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  subtitle: string;
  difficulty: 'Anfänger' | 'Mittel' | 'Profi';
  duration: string;
  startDate: string;
  participants: number;
  imageUrl: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  subtitle,
  difficulty,
  duration,
  startDate,
  participants,
  imageUrl,
}) => {
  return (
    <div className="premium-card group h-[450px] w-full shadow-2xl border border-white/5">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
      />
      
      {/* Overlay - Neutral grey gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        <div className="space-y-1 mb-6">
          <div className="flex items-center space-x-2 mb-3">
             <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-white text-black rounded-full">
              {difficulty}
            </span>
          </div>
          <h3 className="text-3xl font-extrabold tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
          <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-[90%]">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 border-t border-white/10 pt-6">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-semibold tracking-wide text-zinc-200 uppercase">{duration}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-semibold tracking-wide text-zinc-200 uppercase">{startDate}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-semibold tracking-wide text-zinc-200 uppercase">{participants} dabei</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Trophy className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-semibold tracking-wide text-zinc-200 uppercase">Limitierte Badge</span>
          </div>
        </div>
        
        <button className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all hover:bg-zinc-200 active:scale-[0.98]">
          Herausforderung annehmen
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
