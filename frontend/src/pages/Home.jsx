import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Search, AlertCircle, Clock, CheckCircle, Database } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch tickets and dashboard metrics simultaneously
  const fetchData = async () => {
    try {
      setLoading(true);
      const statusParam = activeTab === 'All' ? '' : activeTab;
      
      const [ticketsRes, statsRes] = await Promise.all([
        api.get(`/tickets?status=${statusParam}&search=${search}`),
        api.get('/tickets/stats')
      ]);

      setTickets(ticketsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error communicating with backend APIs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search inputs to match specifications (300ms delay)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, activeTab]);

  // Utility styling rules for priority values
  const getPriorityBadge = (priority) => {
    const styles = {
      High: 'bg-red-100 text-red-800 border border-red-200',
      Medium: 'bg-blue-100 text-blue-800 border border-blue-200',
      Low: 'bg-gray-100 text-gray-700 border border-gray-200'
    };
    return styles[priority] || styles.Medium;
  };

  // Utility styling rules for operational status
  const getStatusBadge = (status) => {
    const styles = {
      'Open': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-amber-100 text-amber-800',
      'Closed': 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Metrics Row Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tickets</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Database className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Open</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.open}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><AlertCircle className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.inProgress}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Closed</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.closed}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Control Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Horizontal Status Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto">
          {['All', 'Open', 'In Progress', 'Closed'].map((tab) => {
            const labelCount = tab === 'All' ? stats.total : stats[tab.toLowerCase().replace(' ', '')] || stats[tab.toLowerCase()] || 0;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Live Search Input Component */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search matching criteria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Records Table Layout Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Refreshing telemetry pipeline records...</div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-medium">No system tickets found matching query constraints.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/tickets/${ticket.ticketId}`)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{ticket.ticketId}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{ticket.customerName}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{ticket.subject}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(ticket.priority)}`}>{ticket.priority}</span></td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${getStatusBadge(ticket.status)}`}>{ticket.status}</span></td>
                    <td className="px-6 py-4 text-gray-500">{new Date(ticket.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}