import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tv, Tag, Film } from 'lucide-react'; // Adicionei ícones para ficar mais bonito

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col items-center justify-center z-0">
      
      {/* Botão Voltar */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate('/')} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg" title="Voltar para Home">
            <ArrowLeft size={28} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-4">
          
          <h1 className="text-3xl md:text-5xl font-black text-yellow-100 uppercase mb-12 tracking-wide drop-shadow-lg text-center leading-tight">
            Portal do<br/>Administrador
          </h1>

          <div className="flex flex-col gap-6 w-full">
            
            {/* Botão Preços - AGORA NEUTRO -> ROSA NO HOVER */}
            <button 
                onClick={() => navigate('/admin/precos')}
                className="group bg-white/5 hover:bg-pink-400 border border-white/10 hover:border-pink-300 text-white hover:text-blue-950 font-black py-6 rounded-3xl text-xl shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-md flex items-center justify-center gap-4"
            >
                <div className="p-2 bg-white/10 rounded-full group-hover:bg-blue-950/20 transition">
                    <Tag size={24} />
                </div>
                <span className="uppercase tracking-wider">Atualizar Preços</span>
            </button>

            {/* Botão Filmes - AGORA NEUTRO -> CIANO NO HOVER */}
            <button 
                onClick={() => navigate('/admin/filmes')}
                className="group bg-white/5 hover:bg-pink-400 border border-white/10 hover:border-pink-300 text-white hover:text-blue-950 font-black py-6 rounded-3xl text-xl shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-md flex items-center justify-center gap-4"
            >
                <div className="p-2 bg-white/10 rounded-full group-hover:bg-blue-950/20 transition">
                    <Film size={24} />
                </div>
                <span className="uppercase tracking-wider">Gerenciar Filmes</span>
            </button>

            <div className="w-full h-px bg-white/10 my-2"></div>

            {/* Botão Voltar ao Modo Cliente */}
            <button 
                onClick={() => navigate('/')}
                className="group bg-transparent hover:bg-white/10 text-white/70 hover:text-white font-bold py-4 rounded-2xl text-lg border-2 border-white/10 hover:border-white/50 transition flex items-center justify-center gap-3"
            >
                <Tv size={24} className="group-hover:text-yellow-300 transition" />
                IR PARA MODO CLIENTE
            </button>
          </div>
      </div>
    </div>
  );
};

export default AdminHome;