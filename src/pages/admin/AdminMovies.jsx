import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, MoreHorizontal, Trash2, Edit, Clock } from 'lucide-react';

const AdminMovies = () => {
    const navigate = useNavigate();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="fixed inset-0 bg-[#0f172a] flex items-center justify-center text-white font-bold">CARREGANDO...</div>;

    const handleSelect = (movie) => {
        if (selectedMovie?.id === movie.id) {
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movie);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] flex flex-col z-0 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-6 z-50">
                <button onClick={() => navigate('/admin')} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg">
                    <ArrowLeft size={28} />
                </button>

                <h1 className="text-3xl font-black text-yellow-100 uppercase tracking-wide drop-shadow-lg">
                    Filmes
                </h1>

                <button className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md shadow-lg hover:rotate-90">
                    <PlusCircle size={28} />
                </button>
            </div>

            {/* Carrossel */}
            <div className="flex-1 flex items-center justify-center relative">
                <div className="flex flex-row gap-8 items-center overflow-x-auto px-12 w-full h-full hide-scrollbar scroll-smooth snap-x snap-mandatory justify-start md:justify-center">
                    {movies.map((movie) => {
                        const isSelected = selectedMovie?.id === movie.id;

                        return (
                            <div
                                key={movie.id}
                                className={`
                            snap-center relative flex-shrink-0 transition-all duration-500 ease-out rounded-2xl
                            ${isSelected
                                        ? 'w-80 h-[28rem] z-20 scale-105 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-2 ring-white/20'
                                        : 'w-56 h-80 opacity-60 hover:opacity-100 scale-95 hover:scale-100 cursor-pointer'
                                    }
                        `}
                                onClick={() => !isSelected && handleSelect(movie)} // Clica para selecionar
                            >
                                {/* Poster */}
                                <img
                                    src={movie.poster}
                                    alt={movie.titulo}
                                    className={`w-full h-full object-cover rounded-2xl transition-all duration-500 ${isSelected ? 'blur-[2px] brightness-[0.4]' : ''}`}
                                />

                                {/* Título (Aparece quando NÃO selecionado) */}
                                {!isSelected && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                                        <p className="text-white text-center font-bold text-sm uppercase drop-shadow-md">{movie.titulo}</p>
                                    </div>
                                )}

                                {/* MENU DE OPÇÕES (Aparece SOMENTE quando selecionado) */}
                                {isSelected && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 animate-fade-in z-30">

                                        <h2 className="text-white font-black text-xl text-center uppercase mb-4 drop-shadow-lg leading-tight">
                                            {movie.titulo}
                                        </h2>

                                        {/* Botão Remover: Neutro -> Rosa no Hover */}
                                        <button className="w-full group bg-white/10 hover:bg-pink-500 border border-white/20 hover:border-pink-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md">
                                            <Trash2 size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                                            <span>REMOVER</span>
                                        </button>

                                        {/* Botão Atualizar: Neutro -> Ciano no Hover */}
                                        <button className="w-full group bg-white/10 hover:bg-pink-500 border border-white/20 hover:border-pink-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md">
                                            <Edit size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                                            <span>ATUALIZAR</span>
                                        </button>

                                        {/* Botão Sessões: Neutro -> Ciano no Hover */}
                                        <button className="w-full group bg-white/10 hover:bg-pink-500 border border-white/20 hover:border-pink-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md">
                                            <Clock size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                                            <span>SESSÕES</span>
                                        </button>

                                        {/* Botão Fechar Seleção (X) */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSelect(movie); }}
                                            className="mt-2 text-xs text-gray-400 hover:text-white underline decoration-dotted"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="pb-8 flex justify-center">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/50 flex gap-1 animate-pulse">
                    <MoreHorizontal />
                </div>
            </div>

        </div>
    );
};

export default AdminMovies;