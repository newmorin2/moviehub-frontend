import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Show {
  id: number;
  theater: string;
  show_time: string;
  available_seats: number;
  total_seats: number;
  price: number;
  movie: {
    id: number;
    title: string;
    duration: number;
    genre: string;
    rating: string;
    language: string;
  };
}

interface Seat {
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
}

const Booking: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000';



  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/booking/${showId}` } });
      return;
    }
    fetchShowDetails();
  }, [showId, isAuthenticated]);

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

  const generateSeats = (): Seat[] => {
    if (!show) return [];
    const seats: Seat[] = [];
    const bookedSeats = show.total_seats - show.available_seats;
    
    for (let i = 1; i <= show.total_seats; i++) {
      seats.push({
        number: i,
        isAvailable: i > bookedSeats,
        isSelected: selectedSeats.includes(i)
      });
    }
    return seats;
  };

  const toggleSeat = (seatNumber: number) => {
    if (!show) return;
    
    const seat = generateSeats().find(s => s.number === seatNumber);
    if (!seat?.isAvailable) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else if (selectedSeats.length < 10) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    setBookingInProgress(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/bookings/`,
        {
          show_id: parseInt(showId!),
          seats_booked: selectedSeats.length
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      
      navigate('/booking-confirmation', {
        state: {
          booking: response.data,
          selectedSeats: selectedSeats,
          show: show
        }
      });
    } catch (error: any) {
      console.error('Booking failed:', error);
      setError(error.response?.data?.detail || 'Booking failed. Please try again.');
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">Loading booking details...</div>
      </div>
    );
  }

  if (error && !show) {
    return (
      <div className="bg-red-500 text-white p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  const seats = generateSeats();
  const rows = Math.ceil(seats.length / 12);
  const totalAmount = show ? show.price * selectedSeats.length : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Movie Details */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4">{show?.movie.title}</h1>
        <div className="grid md:grid-cols-3 gap-4 text-gray-300">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-red-500" />
            <span>{new Date(show!.show_time).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-red-500" />
            <span>{new Date(show!.show_time).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5 text-red-500" />
            <span>{show?.theater}</span>
          </div>
        </div>
        <div className="mt-4 text-gray-400">
          <span className="mr-4">Duration: {show?.movie.duration} min</span>
          <span className="mr-4">Language: {show?.movie.language}</span>
          <span>Price: ₹{show?.price}/seat</span>
        </div>
      </div>

      
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Select Your Seats</h2>
        
        
        <div className="mb-8">
          <div className="w-full h-3 bg-gray-600 rounded-t-lg"></div>
          <div className="text-center text-gray-400 text-sm mt-2">Screen</div>
        </div>

        
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center mb-2">
                {seats
                  .slice(rowIndex * 12, (rowIndex + 1) * 12)
                  .map((seat) => (
                    <button
                      key={seat.number}
                      onClick={() => toggleSeat(seat.number)}
                      disabled={!seat.isAvailable}
                      className={`
                        w-12 h-12 m-1 rounded-lg font-semibold transition-all
                        ${!seat.isAvailable 
                          ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                          : seat.isSelected
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }
                      `}
                    >
                      {seat.number}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex justify-center space-x-6 mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-700 rounded mr-2"></div>
            <span className="text-gray-300">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-300">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-600 rounded mr-2"></div>
            <span className="text-gray-300">Booked</span>
          </div>
        </div>
      </div>

      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>Selected Seats:</span>
            <span className="font-semibold">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Number of Tickets:</span>
            <span>{selectedSeats.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Price per Ticket:</span>
            <span>₹{show?.price}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-gray-700">
            <span>Total Amount:</span>
            <span className="text-red-500">₹{totalAmount}</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-500 text-white p-3 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0 || bookingInProgress}
          className={`
            w-full mt-6 py-3 rounded-lg font-semibold transition-all
            ${selectedSeats.length === 0 || bookingInProgress
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
