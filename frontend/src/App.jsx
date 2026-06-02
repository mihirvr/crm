import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LayoutDashboard, PlusCircle } from 'lucide-react';
import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import TicketDetail from './pages/TicketDetail';

// Temporary placeholder components until we build their full files next
const HomePlaceholder = () => <div className="p-6">Dashboard Page Content Loading...</div>;
const CreatePlaceholder = () => <div className="p-6">Create Ticket Form Loading...</div>;
const DetailPlaceholder = () => <div className="p-6">Ticket Detail View Loading...</div>;

export default function App() {
  return (
    <Router>
      {/* Global Toast Configuration */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center text-xl font-bold text-indigo-600 tracking-tight">
                  Datastraw CRM
                </Link>
                <div className="hidden md:flex space-x-4">
                  <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  to="/tickets/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Ticket
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Core Layout Window */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets/new" element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}