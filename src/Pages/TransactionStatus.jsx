import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, Smartphone } from 'lucide-react';

const TransactionStatus = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(state?.status || 'instructions');

  // EFEITO 1: Controle por Teclado (Apenas na tela de instruções)
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Só funciona se estiver na tela de "Instruções"
      if (currentStatus === 'instructions') {
        const key = event.key.toLowerCase();

        if (key === 'o') {
          console.log('Comando recebido: APROVAR');
          setCurrentStatus('success');
        }
        
        if (key === 'x') {
          console.log('Comando recebido: REPROVAR');
          setCurrentStatus('error');
        }
      }
    };

    // Adiciona o "ouvido" no teclado
    window.addEventListener('keydown', handleKeyDown);

    // Limpa o "ouvido" quando sair da tela para não dar erro
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStatus]);


  // EFEITO 2: Redirecionamento automático APÓS o sucesso (Impressão do ingresso)
  useEffect(() => {
    if (currentStatus === 'success') {
        // Espera 5 segundos simulando a impressão e volta pro início
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);
        return () => clearTimeout(timer);
    }
  }, [currentStatus, navigate]);


  // --- RENDERIZAÇÃO (Igual ao anterior) ---

  // TELA 1: INSTRUÇÕES (Agora espera o teclado)
  if (currentStatus === 'instructions') {
    return (
        <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col items-center justify-center text-center p-8 z-50">
            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-12 animate-bounce">
                    <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                        <Smartphone className="w-16 h-16 text-white animate-pulse" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase drop-shadow-2xl mb-4">
                    Siga as instruções<br/>da maquininha...
                </h1>
                
                <div className="flex flex-col items-center gap-4 mt-8">
                    <div className="flex items-center gap-3 bg-black/30 px-6 py-3 rounded-full border border-white/10">
                        <Loader2 className="animate-spin text-pink-300" size={24} />
                        <span className="text-white font-bold tracking-widest">AGUARDANDO RESPOSTA</span>
                    </div>
                    
                    {/* Dica visual discreta para você saber o que apertar */}
                    <p className="text-white/20 text-xs mt-4 font-mono">
                        [DEV MODE: Aperte 'O' para Ok ou 'X' para Erro]
                    </p>
                </div>
            </div>
        </div>
    );
  }

  // TELA 2: SUCESSO
  if (currentStatus === 'success') {
      return (
        <div className="fixed inset-0 w-full h-full bg-green-600 flex flex-col items-center justify-center text-center p-8 z-50 overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
                <CheckCircle size={120} className="text-white mb-8 drop-shadow-2xl animate-bounce" />
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-4 drop-shadow-lg tracking-tighter leading-tight">
                    Pagamento<br/>Aprovado!
                </h1>
                <h2 className="text-xl md:text-3xl font-bold text-green-100 animate-pulse mt-8 bg-black/20 px-8 py-4 rounded-full backdrop-blur-sm">
                    IMPRIMINDO INGRESSO...
                </h2>
            </div>
        </div>
      );
  }

  // TELA 3: ERRO
  return (
    <div className="fixed inset-0 w-full h-full bg-red-600 flex flex-col items-center justify-center text-center p-8 z-50">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0"></div>

        <div className="relative z-10 flex flex-col items-center">
            <XCircle size={120} className="text-white mb-8 drop-shadow-2xl" />
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-12 drop-shadow-lg tracking-tighter leading-tight">
                Erro na<br/>Transação
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6">
                <button 
                    onClick={() => setCurrentStatus('instructions')}
                    className="bg-white text-red-600 font-black py-4 px-12 rounded-full text-xl shadow-2xl hover:scale-105 transition hover:bg-gray-100"
                >
                    TENTAR NOVAMENTE
                </button>
                <button 
                    onClick={() => navigate('/pagamento', { state: state })}
                    className="bg-black/30 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl border-2 border-white/30 hover:bg-black/50 transition backdrop-blur-md"
                >
                    CANCELAR
                </button>
            </div>
        </div>
    </div>
  );
};

export default TransactionStatus;