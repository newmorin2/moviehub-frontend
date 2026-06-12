import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { TicketIcon, CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: number;
  seats_booked: number;
  total_amount: number;
  booking_time: string;
  status: string;
  show: {
    id: number;
    theater: string;
    show_time: string;
    price: number;
    movie: {
      id: number;
      title: string;
      duration: number;
      genre: string;
      poster_url: string;
    };
  };
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/bookings/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: number) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      await axios.delete(`${API_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchBookings();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const isShowUpcoming = (showTime: string) => {
    return new Date(showTime) > new Date();
  };

  const getStatusColor = (status: string, showTime: string) => {
    if (status === 'cancelled') return 'text-red-500 bg-red-500/10';
    if (!isShowUpcoming(showTime)) return 'text-gray-500 bg-gray-500/10';
    return 'text-green-500 bg-green-500/10';
  };

  const getStatusText = (status: string, showTime: string) => {
    if (status === 'cancelled') return 'Cancelled';
    if (!isShowUpcoming(showTime)) return 'Completed';
    return 'Confirmed';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">Loading your bookings...</div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <TicketIcon className="h-20 w-20 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h2>
        <p className="text-gray-400 mb-6">You haven't booked any movies yet.</p>
        <button
          onClick={() => navigate('/movies')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    b => b.status !== 'cancelled' && isShowUpcoming(b.show.show_time)
  );
  const pastBookings = bookings.filter(
    b => b.status === 'cancelled' || !isShowUpcoming(b.show.show_time)
  );

  const renderBookingCard = (booking: Booking) => {
    const isUpcoming = isShowUpcoming(booking.show.show_time);
    const canCancel = isUpcoming && booking.status !== 'cancelled';

    return (
      <div key={booking.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {booking.show.movie.title}
              </h3>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status, booking.show.show_time)}`}>
                <span>{getStatusText(booking.status, booking.show.show_time)}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-500">₹{booking.total_amount}</p>
              <p className="text-gray-400 text-sm">{booking.seats_booked} ticket(s)</p>
            </div>
          </div>

          <div className="space-y-2 text-gray-300 mb-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-red-500" />
              <span>{new Date(booking.show.show_time).toLocaleDateString()}</span>
              <ClockIcon className="h-4 w-4 text-red-500 ml-2" />
              <span>{new Date(booking.show.show_time).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-red-500" />
              <span>{booking.show.theater}</span>
            </div>
            <div className="text-sm text-gray-400">
              Booking ID: #{booking.id}
            </div>
            <div className="text-sm text-gray-400">
              Booked on: {new Date(booking.booking_time).toLocaleDateString()}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/movies/${booking.show.movie.id}`)}
              className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition-colors"
            >
              View Movie
            </button>
            {canCancel && (
              <button
                onClick={() => cancelBooking(booking.id)}
                disabled={cancellingId === booking.id}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
        <p className="text-gray-400">View and manage your movie tickets</p>
      </div>

      {upcomingBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <TicketIcon className="h-6 w-6 text-green-500 mr-2" />
            Upcoming Shows
          </h2>
          <div className="grid gap-6">
            {upcomingBookings.map(renderBookingCard)}
          </div>
        </div>
      )}

      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <TicketIcon className="h-6 w-6 text-gray-500 mr-2" />
            Past & Cancelled Shows
          </h2>
          <div className="grid gap-6">
            {pastBookings.map(renderBookingCard)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
