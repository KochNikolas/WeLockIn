import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Plus } from 'lucide-react';
import { categories, mockMessages as initialMessages } from '../data/mockData';
import type { Message } from '../types';

const ChallengeChat: React.FC = () => {
  const { slug, challengeId } = useParams<{ slug: string, challengeId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const category = categories.find(c => c.slug === slug);
  const challenge = category?.challenges.find(c => c.id === challengeId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: 'u1', // Current user
      userName: 'Nikolas',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nikolas',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  if (!category || !challenge) return null;

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white active:bg-white/10 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-white leading-none mb-1">{challenge.title}</h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Gruppe: {challenge.participants} Teilnehmer</p>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-none"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-end space-x-3 ${msg.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* Avatar - Clickable */}
            <button 
              onClick={() => navigate(`/profile/${msg.userId}`)}
              className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 active:scale-90 transition-transform"
            >
              <img src={msg.avatar} alt={msg.userName} className="w-full h-full object-cover bg-zinc-800" />
            </button>

            {/* Message Bubble */}
            <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
              {!msg.isMe && <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 ml-2">{msg.userName}</span>}
              <div 
                className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.isMe 
                    ? 'bg-green-500 text-black rounded-tr-none' 
                    : 'bg-white/5 border border-white/5 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] font-bold text-zinc-600 mt-1 uppercase tracking-tighter">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-2 border border-white/5">
          <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Schreib etwas..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-zinc-600"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
              inputText.trim() ? 'bg-green-500 text-black' : 'bg-white/5 text-zinc-700'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeChat;
