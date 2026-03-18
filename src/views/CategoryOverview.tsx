import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

const CategoryOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-32 relative overflow-x-hidden">
      <header className="px-6 pt-12 pb-8 text-center max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
          Dein Lifestyle
        </h1>
        <p className="text-zinc-400 font-medium italic">
          Wähle einen Bereich, den du meistern willst.
        </p>
      </header>

      <main className="px-6 space-y-6 max-w-md mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/category/${category.slug}`)}
            className="premium-card group h-[240px] w-full shadow-2xl cursor-pointer relative border border-white/5"
          >
            {/* Image & Gradient Container */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="gradient-overlay" />
            </div>
            
            {/* New Challenges Badge */}
            {category.newCount > 0 && (
              <div className="absolute -top-3 right-8 z-20 px-4 py-1.5 bg-green-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_5px_15px_rgba(34,197,94,0.4)] whitespace-nowrap">
                <span>NEW ({category.newCount})</span>
              </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <div className="mb-6">
                <h3 className="text-3xl font-black tracking-tighter uppercase">{category.name}</h3>
                <p className="text-zinc-400 text-[11px] font-medium mt-2 max-w-[240px] leading-relaxed opacity-80">{category.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center space-x-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Challenges</span>
                    <span className="text-base font-black transition-colors">{category.count}</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-8">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Aktiv dabei</span>
                    <span className="text-base font-black transition-colors">{category.totalParticipants}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="mt-12 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
        WeLockIn &bull; Master Your Habit
      </footer>
    </div>
  );
};

export default CategoryOverview;
