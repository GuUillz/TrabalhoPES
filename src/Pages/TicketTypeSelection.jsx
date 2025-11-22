import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MinusCircle, PlusCircle } from 'lucide-react';
import OrderSummary from '../components/OrderSummary';

const TicketTypeSelection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const totalSeats = state?.seats?.length || 0;
  const [inteira, setInteira] = useState(totalSeats);
  const [meia, setMeia] = useState(0);
  const currentTotal = inteira + meia;
  const totalPrice = (inteira * 30) + (meia * 15);

  const handleIncrement = (type) => {
    if (currentTotal < totalSeats) {
        if (type === 'inteira') setInteira(inteira + 1);
        if (type === 'meia') setMeia(meia + 1);
    } else {
        if (type === 'meia' && inteira > 0) { setInteira(inteira - 1); setMeia(meia + 1); }
        if (type === 'inteira' && meia > 0) { setMeia(meia - 1); setInteira(inteira + 1); }
    }
  };
  const handleDecrement = (type) => {
      if (type === 'inteira' && inteira > 0) setInteira(inteira - 1);
      if (type === 'meia' && meia > 0) setMeia(meia - 1);
  };

  return (
    // FIX NUCLEAR: fixed inset-0
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col lg:flex-row overflow-hidden z-0">
      
      {/* ÁREA ESQUERDA: Centralizada */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute top-6 left-6 z-50">
            <button onClick={() => navigate(-1)} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg">
                <ArrowLeft size={24} />
            </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase mb-12 drop-shadow-2xl text-center leading-tight">
                Selecione os<br/>tipos de ingresso
            </h1>
            
            <div className="w-full max-w-3xl flex flex-col gap-6">
                {/* Card Inteira */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 flex justify-between items-center px-6 md:px-12 shadow-xl border border-white/10 hover:bg-white/10 transition duration-300 group">
                    <div>
                        <span className="text-2xl md:text-4xl font-black text-white block mb-1 group-hover:text-pink-300 transition">INTEIRA</span>
                        <span className="text-sm md:text-lg text-gray-300 font-bold bg-black/30 px-3 py-1 rounded-lg">R$ 30,00</span>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8">
                        <button onClick={() => handleDecrement('inteira')} className="hover:scale-110 transition active:scale-90"><MinusCircle size={48} className="text-gray-400 hover:text-pink-300"/></button>
                        <span className="text-4xl md:text-5xl font-black w-16 text-center text-white drop-shadow-lg">{inteira}</span>
                        <button onClick={() => handleIncrement('inteira')} className="hover:scale-110 transition active:scale-90"><PlusCircle size={48} className="text-pink-400 hover:text-pink-300"/></button>
                    </div>
                </div>
                
                {/* Card Meia */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 flex justify-between items-center px-6 md:px-12 shadow-xl border border-white/10 hover:bg-white/10 transition duration-300 group">
                    <div>
                        <span className="text-2xl md:text-4xl font-black text-white block mb-1 group-hover:text-pink-300 transition">MEIA ENTRADA</span>
                        <span className="text-sm md:text-lg text-gray-300 font-bold bg-black/30 px-3 py-1 rounded-lg">R$ 15,00</span>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8">
                        <button onClick={() => handleDecrement('meia')} className="hover:scale-110 transition active:scale-90"><MinusCircle size={48} className="text-gray-400 hover:text-pink-300"/></button>
                        <span className="text-4xl md:text-5xl font-black w-16 text-center text-white drop-shadow-lg">{meia}</span>
                        <button onClick={() => handleIncrement('meia')} className="hover:scale-110 transition active:scale-90"><PlusCircle size={48} className="text-pink-400 hover:text-pink-300"/></button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* SIDEBAR DIREITA */}
      <div className="w-full lg:w-96 h-auto lg:h-full bg-black/30 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col z-20 shrink-0 shadow-2xl">
        <div className="flex-1 lg:overflow-auto">
             <OrderSummary movie={state?.movie} session={state?.session} seats={state?.seats} tickets={{ inteira, meia }} total={totalPrice} />
        </div>
         <div className="p-6 border-t border-white/10 bg-black/20">
             <button 
                onClick={() => navigate('/pagamento', { state: { ...state, tickets: {inteira, meia}, total: totalPrice } })}
                disabled={currentTotal !== totalSeats}
                className="w-full bg-pink-400 hover:bg-pink-300 text-blue-950 font-black py-4 rounded-2xl text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition hover:scale-105 transform active:scale-95"
             >
                IR PARA PAGAMENTO
            </button>
        </div>
      </div>
    </div>
  );
};

export default TicketTypeSelection;