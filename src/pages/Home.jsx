import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

const movies = [
  { id: 1, title: 'O AGENTE SECRETO', poster: 'https://placehold.co/300x450/d97706/black?text=Agente' },
  { id: 2, title: 'O TELEFONE PRETO 2', poster: 'https://placehold.co/300x450/white/black?text=Telefone+Preto+2', rating: '18', duration: '114 min', genre: 'Suspense', synopsis: 'Pesadelos assombram Gwen...' },
  { id: 3, title: 'TERRAS SELVAGENS', poster: 'https://placehold.co/300x450/059669/black?text=Predador' },
  { id: 4, title: 'PATRULHA CANINA', poster: 'https://placehold.co/300x450/dc2626/white?text=Paw+Patrol' },
  { id: 5, title: 'TRUQUE DE MESTRE 3', poster: 'https://placehold.co/300x450/4b5563/white?text=Truque+3' },
];

const Home = () => {
  const navigate = useNavigate();
  const scrollContainer = useRef(null);

  // Lógica da Tecla "H"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'h') {
        navigate('/admin');
      }
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
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-blue-900 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30">
        <Menu size={32} color="white" className="cursor-pointer hover:opacity-80 md:w-10 md:h-10" />
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
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-white transition-all duration-300 rounded-xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-center text-xs md:text-lg uppercase drop-shadow-md">{movie.title}</p>
                </div>
            </div>
            ))}
        </div>

        <button onClick={() => scroll('right')} className="hidden md:block p-2 hover:scale-125 transition bg-black/20 rounded-full hover:bg-black/40 z-20">
             <ChevronRight size={48} className="text-yellow-200" />
        </button>
      </div>
      
      <div className="mt-4 md:mt-8">
         <div className="bg-blue-500/30 p-2 md:p-3 rounded-full border-2 border-yellow-200 cursor-pointer hover:bg-yellow-200 hover:text-blue-900 transition hover:scale-110">
            <Info className="w-6 h-6 md:w-8 md:h-8" />
         </div>
      </div>
    </div>
  );
};

export default Home;