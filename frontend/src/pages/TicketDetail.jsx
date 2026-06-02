import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, User, Clock, AlertCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await api.get(`/tickets/${id}`);
      setTicket(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load ticket details.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (ticket.status === newStatus) return;
    setStatusUpdating(true);
    try {
      await api.put(`/tickets/${id}`, { status: newStatus });
      setTicket({ ...ticket, status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsSubmitting(true);
    try {
      await api.put(`/tickets/${id}`, { noteText });
      toast.success('Note added successfully');
      setNoteText('');
      fetchTicket(); // Refresh to get the new note with timestamp
    } catch (error) {
      console.error(error);
      toast.error('Failed to add note.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-gray-500 font-medium animate-pulse">Loading ticket data...</div>;
  }

  if (!ticket) {
    return <div className="p-12 text-center text-red-500 font-medium">Ticket not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Update Status:</span>
          <select
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={statusUpdating}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer disabled:opacity-70"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Ticket Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{ticket.subject}</h1>
                <p className="font-mono text-indigo-600 font-semibold">{ticket.ticketId}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                ticket.priority === 'Medium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {ticket.priority} Priority
              </span>
            </div>
            <div className="p-6 bg-gray-50/50">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
              <MessageSquare className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Internal Notes</h2>
            </div>
            <div className="p-6 space-y-6">
              {ticket.notes && ticket.notes.length > 0 ? (
                ticket.notes.map((note, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex-1 border border-gray-100">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{note.noteText}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(note.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center italic py-4">No notes added yet.</p>
              )}
            </div>
            
            <form onSubmit={handleAddNote} className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="relative">
                <textarea
                  rows="3"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a progress update or internal note..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !noteText.trim()}
                  className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Meta Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Customer Details</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{ticket.customerName}</p>
                  <p className="text-sm text-gray-500">{ticket.customerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Ticket Metadata</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Created At</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Current Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                    {ticket.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}