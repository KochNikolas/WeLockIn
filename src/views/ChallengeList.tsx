import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import { ArrowLeft, Clock, Users, Ticket, Trophy } from 'lucide-react';

const ChallengeList: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return <div className="text-white p-10">Kategorie nicht gefunden.</div>;
  }

  return (
    <div className="min-h-screen pb-32">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between max-w-md mx-auto border-b border-white/5">
        <button 
          onClick={() => navigate('/challenges')}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white active:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-black uppercase tracking-widest text-white">{category.name}</h2>
        <div className="w-10" /> {/* Spacer */}
      </header>
      
      <div className="px-8 mt-8 mb-10 max-w-md mx-auto">
        <p className="text-zinc-500 text-sm font-medium italic border-l-2 border-green-500 pl-4 py-1">{category.description}</p>
      </div>

      <main className="max-w-md mx-auto relative">
        <div className="px-0 space-y-12">
          {category.challenges.reduce((acc: any[], challenge, _, original) => {
            // Group Daily Walk challenges
            if (challenge.title.toLowerCase().includes('daily walk')) {
              const dwGroup = original.filter(c => c.title.toLowerCase().includes('daily walk'));
              if (acc.find(item => item.type === 'slider')) return acc;
              acc.push({ type: 'slider', challenges: dwGroup });
              return acc;
            }
            acc.push({ type: 'single', challenge });
            return acc;
          }, []).map((item) => {
            if (item.type === 'slider') {
              return (
                <ChallengeSlider key="dw-slider" challenges={item.challenges} category={category} />
              );
            }

            return (
              <div key={item.challenge.id} className="flex flex-col space-y-2 px-6">
                <div className="px-2">
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                    Startet: <span className="text-white ml-2">{item.challenge.startDate}</span>
                  </p>
                </div>
                <ChallengeCard challenge={item.challenge} category={category} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const DOT = 6;   // px — dot diameter
const GAP = 8;   // px — gap between dots

const ChallengeSlider: React.FC<{ challenges: any[], category: any }> = ({ challenges, category }) => {
  const [head, setHead] = React.useState(0);   // leading edge (jumps fast)
  const [tail, setTail] = React.useState(0);   // trailing edge (springs)
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const headRef = React.useRef(0);
  const tailRef = React.useRef(0);
  const rafRef = React.useRef<number>(0);

  // Spring loop: tail chases head with damping
  const springLoop = React.useCallback(() => {
    const diff = headRef.current - tailRef.current;
    if (Math.abs(diff) < 0.001) {
      tailRef.current = headRef.current;
      setTail(headRef.current);
      return;
    }
    tailRef.current += diff * 0.12; // stiffness — lower = gummier
    setTail(tailRef.current);
    rafRef.current = requestAnimationFrame(springLoop);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * (challenges.length - 1) : 0;
    headRef.current = progress;
    setHead(progress);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(springLoop);
  };

  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const stride = DOT + GAP;
  const totalWidth = challenges.length * DOT + (challenges.length - 1) * GAP;

  // Pill stretches between tail and head
  const pillLeft = Math.min(tail, head) * stride;
  const pillWidth = Math.max(DOT, Math.abs(head - tail) * stride + DOT);

  return (
    <div className="space-y-4">
      <div className="px-8">
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
          Startet: <span className="text-white ml-2">{challenges[0].startDate}</span>
        </p>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-6 space-x-6"
      >
        {challenges.map((c) => (
          <div key={c.id} className="min-w-full snap-center">
            <ChallengeCard challenge={c} category={category} />
          </div>
        ))}
      </div>

      {/* Gum Pagination */}
      <div className="flex justify-center items-center pb-2">
        <div className="relative flex items-center" style={{ width: totalWidth, height: DOT, gap: GAP }}>
          {challenges.map((_, i) => (
            <div key={i} style={{ width: DOT, height: DOT }} className="rounded-full bg-zinc-700/60 shrink-0" />
          ))}
          <div
            className="absolute top-0 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
            style={{ height: DOT, width: pillWidth, left: pillLeft }}
          />
        </div>
      </div>
    </div>
  );
};

const ChallengeCard: React.FC<{ challenge: any, category: any }> = ({ challenge, category }) => {
  const navigate = useNavigate();
  const diffColor = challenge.difficulty === 'Anfänger' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                    challenge.difficulty === 'Mittel' ? 'text-orange-500 border-orange-500/20 bg-orange-500/5' : 
                    'text-red-500 border-red-500/20 bg-red-500/5';

  return (
    <div 
      onClick={() => navigate(`/category/${category.slug}/challenge/${challenge.id}`)}
      className="premium-card group h-[200px] w-full shadow-2xl cursor-pointer active:scale-[0.98] transition-transform overflow-visible"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
        <img
          src={challenge.imageUrl || category.imageUrl}
          alt={challenge.title}
          className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
        <div>
          <h3 className="text-2xl font-black text-white leading-tight group-hover:text-green-500 transition-colors">
            {challenge.title}
          </h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase mt-1 tracking-tight">{challenge.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-4">
          <div className="glass-badge bg-white/5 border-white/10 justify-center whitespace-nowrap px-3 py-2">
            <Ticket className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0" />
            <span className="text-[11px] font-black">{challenge.jokers} Joker</span>
          </div>
          <div className={`glass-badge border-white/10 justify-center whitespace-nowrap px-3 py-2 ${diffColor}`}>
            <Trophy className="w-3.5 h-3.5 mr-2 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-tighter">{challenge.difficulty}</span>
          </div>
          <div className="glass-badge bg-white/5 border-white/10 justify-center whitespace-nowrap px-3 py-2">
            <Clock className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-tighter">{challenge.duration}</span>
          </div>
          <div className="glass-badge bg-white/5 border-white/10 justify-center whitespace-nowrap px-3 py-2">
            <Users className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-tighter">{challenge.participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeList;
