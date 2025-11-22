import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SessionSelection from './Pages/SessionSelection';
import SeatSelection from './Pages/SeatSelection';
import TicketTypeSelection from './Pages/TicketTypeSelection';
import PaymentMethod from './Pages/PaymentMethod';
import TransactionStatus from './Pages/TransactionStatus';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full select-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sessao" element={<SessionSelection />} />
          <Route path="/assentos" element={<SeatSelection />} />
          <Route path="/ingressos" element={<TicketTypeSelection />} />
          <Route path="/pagamento" element={<PaymentMethod />} />
          <Route path="/status" element={<TransactionStatus />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;