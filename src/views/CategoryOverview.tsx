import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

const CategoryOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-12">
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
            className="premium-card group h-[240px] w-full shadow-2xl border border-white/5 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
            
            {/* New Challenges Badge */}
            {category.newCount > 0 && (
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full flex items-center space-x-1 animate-pulse">
                <span>NEW ({category.newCount})</span>
              </div>
            )}

            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <div className="mb-4">
                <h3 className="text-2xl font-black tracking-tight uppercase group-hover:translate-x-1 transition-transform">{category.name}</h3>
                <p className="text-zinc-400 text-xs font-light mt-1 max-w-[240px] leading-relaxed italic">{category.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center space-x-6 text-zinc-300">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Challenges</span>
                    <span className="text-sm font-black">{category.count}</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-6">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Aktiv dabei</span>
                    <span className="text-sm font-black">{category.totalParticipants}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ChevronRight className="w-5 h-5" />
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
