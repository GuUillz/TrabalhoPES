import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Banknote } from 'lucide-react';
import OrderSummary from '../components/OrderSummary';

const PaymentMethod = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Estado para controlar qual método foi clicado
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Função que navega para a próxima tela (chamada pelo botão da sidebar)
  const handleConfirmPayment = () => {
    if (selectedMethod) {
      navigate('/status', { state: { ...state, method: selectedMethod, status: 'instructions' } });
    }
  };

  // Estilos para facilitar a leitura
  const selectedStyle = "bg-pink-400 border-pink-400 scale-105 shadow-[0_0_30px_rgba(244,114,182,0.4)] z-10";
  const unselectedStyle = "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30 text-white hover:-translate-y-2";

  return (
    // FIX NUCLEAR: fixed inset-0 para cobrir tudo
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col lg:flex-row overflow-hidden z-0">
      
      {/* ÁREA ESQUERDA: Botões de Pagamento */}
      <div className="flex-1 flex flex-col relative">
         <div className="absolute top-6 left-6 z-50">
            <button onClick={() => navigate(-1)} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg">
                <ArrowLeft size={24} />
            </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
            <h1 className="text-3xl md:text-6xl font-black text-white uppercase mb-16 text-center drop-shadow-2xl leading-tight">
                Como você<br/>deseja pagar?
            </h1>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4">
                
                {/* Botão PIX */}
                <button 
                    onClick={() => setSelectedMethod('PIX')}
                    className={`group border p-8 md:p-12 rounded-3xl flex flex-col items-center gap-6 transition-all duration-300 backdrop-blur-md
                    ${selectedMethod === 'PIX' ? selectedStyle : unselectedStyle}`}
                >
                    <div className={`p-4 rounded-full transition ${selectedMethod === 'PIX' ? 'bg-blue-950 text-pink-400' : 'bg-white/10 text-white'}`}>
                        <Smartphone size={48} className="md:w-16 md:h-16" />
                    </div>
                    <span className={`text-2xl md:text-3xl font-black tracking-wider ${selectedMethod === 'PIX' ? 'text-blue-950' : 'text-white'}`}>
                        PIX
                    </span>
                </button>

                {/* Botão Crédito */}
                <button 
                    onClick={() => setSelectedMethod('CREDIT')}
                    className={`group border p-8 md:p-12 rounded-3xl flex flex-col items-center gap-6 transition-all duration-300 backdrop-blur-md
                    ${selectedMethod === 'CREDIT' ? selectedStyle : unselectedStyle}`}
                >
                    <div className={`p-4 rounded-full transition ${selectedMethod === 'CREDIT' ? 'bg-blue-950 text-pink-400' : 'bg-white/10 text-white'}`}>
                        <CreditCard size={48} className="md:w-16 md:h-16" />
                    </div>
                    <span className={`text-2xl md:text-3xl font-black tracking-wider ${selectedMethod === 'CREDIT' ? 'text-blue-950' : 'text-white'}`}>
                        CRÉDITO
                    </span>
                </button>

                {/* Botão Débito (Agora igual aos outros) */}
                <button 
                    onClick={() => setSelectedMethod('DEBIT')}
                    className={`group border p-8 md:p-12 rounded-3xl flex flex-col items-center gap-6 transition-all duration-300 backdrop-blur-md
                    ${selectedMethod === 'DEBIT' ? selectedStyle : unselectedStyle}`}
                >
                    <div className={`p-4 rounded-full transition ${selectedMethod === 'DEBIT' ? 'bg-blue-950 text-pink-400' : 'bg-white/10 text-white'}`}>
                        <Banknote size={48} className="md:w-16 md:h-16" />
                    </div>
                    <span className={`text-2xl md:text-3xl font-black tracking-wider ${selectedMethod === 'DEBIT' ? 'text-blue-950' : 'text-white'}`}>
                        DÉBITO
                    </span>
                </button>

            </div>
        </div>
      </div>

       {/* SIDEBAR DIREITA */}
      <div className="w-full lg:w-96 h-auto lg:h-full bg-black/30 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col z-20 shrink-0 shadow-2xl">
         <div className="flex-1 lg:overflow-auto">
            <OrderSummary movie={state?.movie} session={state?.session} seats={state?.seats} tickets={state?.tickets} total={state?.total} />
        </div>
         <div className="p-6 border-t border-white/10 bg-black/20">
             {/* Botão de Confirmar na Sidebar */}
             <button 
                onClick={handleConfirmPayment}
                disabled={!selectedMethod}
                className={`
                    w-full font-black py-4 rounded-2xl text-lg shadow-xl transition-all duration-300
                    ${selectedMethod 
                        ? 'bg-pink-400 hover:bg-pink-300 text-blue-950 cursor-pointer hover:scale-105 transform active:scale-95' 
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-white/5'
                    }
                `}
             >
                {selectedMethod ? 'CONFIRMAR PAGAMENTO' : 'SELECIONE O PAGAMENTO'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;