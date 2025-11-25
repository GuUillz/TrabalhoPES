import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SessionSelection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie;
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState('dublado');

  const sessions = [
    { id: 1, time: '14:15', room: '04', type: '2D' },
    { id: 2, time: '16:00', room: '04', type: '3D' },
    { id: 3, time: '19:00', room: '01', type: '2D' },
    { id: 4, time: '20:30', room: '04', type: '2D' },
    { id: 5, time: '21:45', room: '01', type: '2D' },
  ];

  const handleConfirm = () => {
    if (selectedSession) {
      navigate('/assentos', { state: { movie, session: { ...selectedSession, audio: selectedAudio } } });
    }
  };

  const selectedButtonStyle = 'bg-pink-400 text-blue-950 shadow-lg hover:bg-pink-300 scale-105 font-black border-pink-400';
  const unselectedButtonStyle = 'bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 font-bold';

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] overflow-y-auto z-0">
      <div className="min-h-full w-full flex flex-col items-center justify-center py-12 px-4 relative">
        <div className="fixed top-6 left-6 z-50">
            <button onClick={() => navigate(-1)} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg"><ArrowLeft size={28} /></button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center max-w-[90rem] w-full animate-fade-in">
            <div className="shrink-0 relative group">
                <img src={movie?.poster} alt="Poster" className="w-64 md:w-80 lg:w-[24rem] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover border-4 border-white/5 group-hover:border-pink-300/50 transition-all duration-500" />
            </div>
            
            <div className="text-white flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-3xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-6 drop-shadow-2xl leading-none tracking-tight">{movie?.title}</h1>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-sm md:text-base font-semibold opacity-90">
                    <span className="bg-black/30 px-4 py-2 rounded-lg border border-white/10">Classificação: <span className="text-yellow-400">{movie?.rating || '18 anos'}</span></span>
                    <span className="bg-black/30 px-4 py-2 rounded-lg border border-white/10">Duração: <span className="text-yellow-400">{movie?.duration || '120 min'}</span></span>
                    <span className="bg-black/30 px-4 py-2 rounded-lg border border-white/10">Gênero: <span className="text-yellow-400">{movie?.genre || 'Ação'}</span></span>
                </div>
                
                <div className="mb-10 flex items-center gap-4 p-2 bg-black/20 rounded-full backdrop-blur-sm border border-white/5">
                    <button onClick={() => setSelectedAudio('dublado')} className={`px-8 py-2 rounded-full text-sm md:text-base transition-all duration-300 border-2 ${selectedAudio === 'dublado' ? selectedButtonStyle : unselectedButtonStyle}`}>DUBLADO</button>
                    <button onClick={() => setSelectedAudio('legendado')} className={`px-8 py-2 rounded-full text-sm md:text-base transition-all duration-300 border-2 ${selectedAudio === 'legendado' ? selectedButtonStyle : unselectedButtonStyle}`}>LEGENDADO</button>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                    {sessions.map(sess => {
                        const isSelected = selectedSession?.id === sess.id;
                        return (
                            <button key={sess.id} onClick={() => setSelectedSession(sess)} className={`relative w-28 h-28 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg border-2 group overflow-hidden ${isSelected ? 'bg-pink-400 border-pink-400 scale-110 z-10 shadow-pink-400/40' : 'bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30'}`}>
                                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-blue-950' : 'text-gray-400'}`}>Sala {sess.room}</span>
                                <span className={`text-3xl md:text-4xl font-black tracking-tighter ${isSelected ? 'text-blue-950' : 'text-white'}`}>{sess.time}</span>
                                <div className={`mt-2 h-1 w-8 rounded-full ${isSelected ? 'bg-blue-950' : 'bg-white/20'}`}></div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className="mt-16 w-full flex justify-center">
            <button onClick={handleConfirm} disabled={!selectedSession} className={`font-black py-4 px-16 rounded-2xl text-xl shadow-2xl transition-all duration-300 transform ${selectedSession ? 'bg-pink-400 hover:bg-pink-300 text-blue-950 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(244,114,182,0.4)]' : 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-white/5'}`}>CONFIRMAR SESSÃO</button>
        </div>
      </div>
    </div>
  );
};

export default SessionSelection;