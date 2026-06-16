import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Booking = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';



  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/booking/${showId}` } });
      return;
    }

    user.getIdToken()
      .then((idToken) => setToken(idToken))
      .catch((error) => {
        console.error('Failed to fetch auth token:', error);
      });

    fetchShowDetails();
  }, [showId, user, navigate]);

  const fetchShowDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/shows/${showId}`);
      setShow(response.data);
    } catch (error) {
      console.error('Failed to fetch show details:', error);
      setError('Failed to load show details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ticketPrice = show?.price ?? show?.movie?.price ?? 0;

  const handleBooking = async () => {
    setBookingInProgress(true);
    setError(null);

    try {
      let authToken = token;
      if (user && !authToken) {
        try {
          authToken = await user.getIdToken();
          setToken(authToken);
        } catch (err) {
          console.error('Failed to refresh auth token:', err);
        }
      }

      if (!authToken) {
        setError('Unable to authenticate booking. Please log in again.');
        setBookingInProgress(false);
        return;
      }

      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.post(
        `${API_URL}/api/bookings/`,
        {
          show_id: parseInt(showId || '0', 10),
          seats_booked: 1,
          total_amount: ticketPrice,
        },
        {
          headers,
        }
      );

      navigate('/booking-confirmation', {
        state: {
          booking: response.data,
          show,
        },
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setError(error.response?.data?.detail || 'Booking failed. Please try again.');
    } finally {
      setBookingInProgress(false);
    }
  };

  const totalAmount = ticketPrice;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300 transition"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-white">Book your seat</h2>
      </div>

      {/* Movie Details */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4">{show?.movie.title}</h1>
        <div className="grid md:grid-cols-3 gap-4 text-gray-300">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-red-500" />
            <span>{show?.show_time ? new Date(show.show_time).toLocaleDateString() : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-red-500" />
            <span>{show?.show_time ? new Date(show.show_time).toLocaleTimeString() : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5 text-red-500" />
            <span>{show?.theater}</span>
          </div>
        </div>
        <div className="mt-4 text-gray-400">
          <span className="mr-4">Duration: {show?.movie.duration} min</span>
          <span className="mr-4">Language: {show?.movie.language}</span>
          <span>Price: Ksh {show?.price}/seat</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>Number of Tickets:</span>
            <span>1</span>
          </div>
          <div className="flex justify-between">
            <span>Price per Ticket:</span>
            <span>Ksh {ticketPrice}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-gray-700">
            <span>Total Amount:</span>
            <span className="text-red-500">Ksh {totalAmount}</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-500 text-white p-3 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleBooking}
          disabled={bookingInProgress}
          className={`
            w-full mt-6 py-3 rounded-lg font-semibold transition-all
            ${bookingInProgress
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
            }
            text-white
          `}
        >
          {bookingInProgress ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default Booking;
