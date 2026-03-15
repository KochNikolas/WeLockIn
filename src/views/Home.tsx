import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
        <span className="text-4xl">👋</span>
      </div>
      <h1 className="text-3xl font-black text-white mb-2">Willkommen zurück</h1>
      <p className="text-zinc-500 max-w-[280px]">Deine tägliche Dosis Disziplin wartet auf dich.</p>
    </div>
  );
};

export default Home;
