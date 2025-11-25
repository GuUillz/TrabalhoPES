import React from 'react';

const OrderSummary = ({ movie, session, seats, tickets, total }) => {
  if (!movie) return <div className="w-full h-full border-l border-white/10"></div>;

  return (
    <div className="w-full h-full flex flex-col text-white p-6">
      <h3 className="text-lg font-bold uppercase mb-6 border-b border-white/30 pb-2 tracking-wider text-yellow-100">
        Resumo do Pedido
      </h3>
      
      {/* Detalhes do Filme */}
      <div className="flex gap-4 mb-6">
        <img src={movie.poster} alt={movie.title} className="w-20 h-28 object-cover rounded-md shadow-lg" />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-base leading-tight">{movie.title}</h4>
          <div className="flex gap-2 mt-1">
             <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-bold border border-white/30">18</span> 
             <span className="text-[10px] text-gray-300 font-bold tracking-wide border border-gray-500 px-1 rounded">2D</span>
          </div>
          <div className="text-xs text-gray-300 mt-2 space-y-0.5">
            <p>SALA {session?.room || '04'}</p>
            <p>{session?.date || 'HOJE'} - {session?.time}</p>
            {session?.audio && <p className="uppercase text-yellow-200">{session.audio}</p>}
          </div>
        </div>
      </div>

      {/* Assentos */}
      {seats && seats.length > 0 && (
        <div className="mb-6 bg-black/20 p-3 rounded-lg border border-white/5">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Assentos</p>
          <p className="font-bold text-yellow-300 text-sm tracking-widest break-words">
            {seats.join(', ')}
          </p>
        </div>
      )}

      {/* Ingressos */}
      {tickets && (
        <div className="mb-4 text-xs space-y-2 border-t border-white/10 pt-4">
          {tickets.inteira > 0 && (
            <div className="flex justify-between"><span>{tickets.inteira}x INTEIRA</span> <span>R$ {tickets.inteira * 30},00</span></div>
          )}
          {tickets.meia > 0 && (
            <div className="flex justify-between"><span>{tickets.meia}x MEIA</span> <span>R$ {tickets.meia * 15},00</span></div>
          )}
        </div>
      )}

      {/* Totais */}
      <div className="mt-auto pt-4 border-t border-white/30">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold text-gray-300">ITENS</span>
          <span className="text-2xl font-bold">{seats ? seats.length : 0}</span>
        </div>
        {total > 0 && (
          <div className="flex justify-between items-end">
            <span className="text-sm font-bold text-gray-300">TOTAL</span>
            <span className="text-xl font-bold text-yellow-300">R${total},00</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;