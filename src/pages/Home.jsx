import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Menu, ChevronLeft, ChevronRight, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const scrollContainer = useRef(null);
  
  // Estado para guardar os filmes vindos do backend
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. BUSCA FILMES DO BACKEND AO CARREGAR A PÁGINA
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cliente/filmes');
        const json = await response.json();
        if (json.status === 'sucesso') {
          setMovies(json.data);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Atalho 'H' para Admin
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'h') navigate('/admin');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleSelectMovie = (movie) => {
    navigate('/sessao', { state: { movie } });
  };

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const { current } = scrollContainer;
      const amount = window.innerWidth < 768 ? 200 : 400;
      current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  if (loading) return <div className="fixed inset-0 bg-blue-900 flex items-center justify-center text-white font-bold">CARREGANDO FILMES...</div>;

  return (
    <div className="fixed inset-0 w-full h-full bg-blue-900 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Botão Admin (Atalho H) */}
      <div className="absolute top-4 left-4 z-50">
        <button onClick={() => navigate('/admin')} className="p-3 bg-black/20 rounded-full text-white/30 hover:text-white hover:bg-pink-500 transition-all duration-300 backdrop-blur-sm">
            <Settings size={24} />
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-4 md:mb-8 tracking-tighter text-white drop-shadow-lg text-center z-10 px-4">
        Filmes em Cartaz
      </h1>

      <div className="flex flex-row items-center justify-center w-full h-auto z-10 px-2 md:px-12 gap-2 md:gap-4">
        <button onClick={() => scroll('left')} className="hidden md:block p-2 hover:scale-125 transition bg-black/20 rounded-full hover:bg-black/40 z-20">
            <ChevronLeft size={48} className="text-yellow-200" />
        </button>
        
        <div ref={scrollContainer} className="flex flex-row gap-4 md:gap-8 items-center overflow-x-auto px-8 py-12 w-full hide-scrollbar scroll-smooth snap-x snap-mandatory">
            {movies.map((movie) => (
            <div key={movie.id} onClick={() => handleSelectMovie(movie)} className="snap-center relative flex-shrink-0 cursor-pointer transition-all duration-300 ease-out rounded-xl overflow-hidden group w-40 h-60 md:w-56 md:h-80 lg:w-64 lg:h-96 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:z-20">
                <img src={movie.poster} alt={movie.titulo} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-white transition-all duration-300 rounded-xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-center text-xs md:text-lg uppercase drop-shadow-md">{movie.titulo}</p>
                    {movie.classificacao > 0 && <p className="text-yellow-400 text-center text-[10px] font-bold mt-1">{movie.classificacao} ANOS</p>}
                </div>
            </div>
            ))}
        </div>

        <button onClick={() => scroll('right')} className="hidden md:block p-2 hover:scale-125 transition bg-black/20 rounded-full hover:bg-black/40 z-20">
             <ChevronRight size={48} className="text-yellow-200" />
        </button>
      </div>
    </div>
  );
};

export default Home;