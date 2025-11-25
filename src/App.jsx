import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages Cliente
import Home from './pages/Home';
import SessionSelection from './pages/SessionSelection';
import SeatSelection from './pages/SeatSelection';
import TicketTypeSelection from './pages/TicketTypeSelection';
import PaymentMethod from './pages/PaymentMethod';
import TransactionStatus from './pages/TransactionStatus';

// Pages Admin
import AdminHome from './pages/admin/AdminHome';
import AdminPrices from './pages/admin/AdminPrices';
import AdminMovies from './pages/admin/AdminMovies';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full select-none font-sans">
        <Routes>
          {/* Rotas do Cliente */}
          <Route path="/" element={<Home />} />
          <Route path="/sessao" element={<SessionSelection />} />
          <Route path="/assentos" element={<SeatSelection />} />
          <Route path="/ingressos" element={<TicketTypeSelection />} />
          <Route path="/pagamento" element={<PaymentMethod />} />
          <Route path="/status" element={<TransactionStatus />} />

          {/* Rotas do Admin */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/precos" element={<AdminPrices />} />
          <Route path="/admin/filmes" element={<AdminMovies />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;