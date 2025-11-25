import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const AdminPrices = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('inteira');
  
  // Estilos padronizados
  const selectedStyle = "bg-pink-400 text-blue-950 shadow-lg scale-105 font-black border-pink-400 z-10";
  const unselectedStyle = "bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 font-bold";

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col items-center justify-center z-0">
      
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/admin')} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg">
            <ArrowLeft size={28} />
        </button>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-yellow-100 uppercase mb-12 tracking-wide drop-shadow-lg text-center">
        Atualizar Tabela de Preços
      </h1>

      <div className="w-full max-w-2xl px-8 flex flex-col gap-8">
        
        {/* Seletor */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/10 shadow-xl">
            <div className="text-white font-bold text-center py-2 uppercase tracking-wider text-sm mb-4 opacity-80">
                Selecione o tipo de ingresso a ser alterado
            </div>
            <div className="flex gap-4 p-2 bg-black/20 rounded-2xl">
                <button onClick={() => setSelectedType('inteira')} className={`flex-1 py-4 rounded-xl transition-all duration-300 border-2 uppercase tracking-widest ${selectedType === 'inteira' ? selectedStyle : unselectedStyle}`}>Inteira</button>
                <button onClick={() => setSelectedType('promo')} className={`flex-1 py-4 rounded-xl transition-all duration-300 border-2 uppercase tracking-widest ${selectedType === 'promo' ? selectedStyle : unselectedStyle}`}>Promoção Semanal</button>
            </div>
        </div>

        {/* Input */}
        <div>
            <div className="bg-pink-400 rounded-t-2xl py-3 text-center font-bold text-blue-950 uppercase tracking-wider shadow-lg relative z-10">
                Novo Valor (R$)
            </div>
            <div className="bg-black/20 p-6 rounded-b-2xl border-2 border-t-0 border-white/10 backdrop-blur-sm">
                <input type="number" placeholder="00.00" className="w-full bg-white/90 text-blue-950 font-black text-center text-4xl py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 placeholder-gray-300 shadow-inner"/>
            </div>
        </div>

        {/* Botão Confirmar - CORRIGIDO PARA ROSA */}
        <div className="flex justify-end mt-4">
            <button className="bg-pink-400 hover:bg-pink-300 text-blue-950 font-black py-4 px-12 rounded-2xl text-xl shadow-xl hover:scale-105 transition uppercase tracking-wider flex items-center gap-2">
                <Check size={28} strokeWidth={3} />
                CONFIRMAR
            </button>
        </div>

      </div>
    </div>
  );
};

export default AdminPrices;