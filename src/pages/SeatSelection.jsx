import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OrderSummary from '../components/OrderSummary';

const rows = ['N','M','L','K','J','I','H','G','F','E','D','C','B','A'];
const cols = Array.from({ length: 14 }, (_, i) => i + 1);

const SeatSelection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Estado para assentos ocupados vindos do banco
  const [occupiedSeats, setOccupiedSeats] = useState([]); 

  // BUSCA QUAIS ASSENTOS ESTÃO OCUPADOS NA SESSÃO ATUAL
  useEffect(() => {
    if (state?.session?.id) {
        fetch(`http://localhost:5000/api/cliente/sessao/${state.session.id}/assentos`)
            .then(res => res.json())
            .then(data => {
                if(data.status === 'sucesso') {
                    setOccupiedSeats(data.ocupados); // Ex: ["F5", "A1"]
                }
            })
            .catch(err => console.error("Erro ao buscar assentos:", err));
    }
  }, [state]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col lg:flex-row overflow-hidden z-0">
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        <div className="absolute top-6 left-6 z-50">
            <button onClick={() => navigate(-1)} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg"><ArrowLeft size={24} /></button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
            <h1 className="text-2xl md:text-4xl font-black text-white uppercase mb-8 drop-shadow-2xl text-center mt-16 lg:mt-0">Escolha os Assentos</h1>
            <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative animate-fade-in">
                <div className="flex flex-col gap-1 items-center">
                    {rows.map(row => (
                    <div key={row} className="flex gap-1 items-center">
                        <span className="text-[10px] font-bold text-gray-400 w-4 text-center">{row}</span>
                        {cols.map(col => {
                            const seatId = `${row}${col}`;
                            const isSelected = selectedSeats.includes(seatId);
                            // Verifica se está na lista de ocupados do banco
                            const isOccupied = occupiedSeats.includes(seatId);
                            
                            return (
                                <button 
                                    key={seatId}
                                    disabled={isOccupied}
                                    onClick={() => toggleSeat(seatId)}
                                    className={`
                                        w-5 h-5 md:w-7 md:h-7 rounded-full transition-all duration-200 shadow-sm
                                        ${isOccupied 
                                            ? 'bg-yellow-500 cursor-not-allowed opacity-50' 
                                            : isSelected 
                                                ? 'bg-green-500 scale-110 ring-2 ring-green-300 shadow-lg z-10' 
                                                : 'bg-red-500 hover:bg-red-600 hover:scale-110'
                                        }
                                    `}
                                ></button>
                            )
                        })}
                        <span className="text-[10px] font-bold text-gray-400 w-4 text-center">{row}</span>
                    </div>
                    ))}
                </div>
                <div className="w-full mt-8 flex flex-col items-center">
                     <div className="w-3/4 h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full shadow-inner mb-2 transform skew-x-12"></div>
                     <span className="text-xs text-gray-400 font-black tracking-[0.5em] uppercase">Tela</span>
                </div>
            </div>
            {/* ... Legenda igual ... */}
        </div>
      </div>
      {/* ... Sidebar igual ... */}
      <div className="w-full lg:w-96 h-auto lg:h-full bg-black/30 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col z-20 shrink-0 shadow-2xl">
        <div className="flex-1 lg:overflow-auto"><OrderSummary movie={state?.movie} session={state?.session} seats={selectedSeats} /></div>
        <div className="p-6 border-t border-white/10 bg-black/20">
             <button onClick={() => navigate('/ingressos', { state: { ...state, seats: selectedSeats } })} disabled={selectedSeats.length === 0} className="w-full bg-pink-400 hover:bg-pink-300 text-blue-950 font-black py-4 rounded-2xl text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition hover:scale-105 transform active:scale-95">ESCOLHER INGRESSOS</button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;