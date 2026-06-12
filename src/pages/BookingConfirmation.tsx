import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, TicketIcon } from '@heroicons/react/24/outline';

interface BookingConfirmationState {
  booking: {
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
        title: string;
        duration: number;
        genre: string;
        language: string;
      };
    };
  };
  selectedSeats: number[];
  show: any;
}

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingConfirmationState;

  useEffect(() => {
    if (!state) {
      navigate('/movies');
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { booking, selectedSeats } = state;

  const downloadTicket = () => {
    const ticketHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .ticket { border: 2px solid #333; padding: 20px; max-width: 500px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px dashed #333; padding-bottom: 10px; }
          .content { padding: 20px 0; }
          .row { margin: 10px 0; display: flex; justify-content: space-between; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="header">
            <h2>Movie Ticket</h2>
            <p>Booking ID: ${booking.id}</p>
          </div>
          <div class="content">
            <div class="row"><strong>Movie:</strong> ${booking.show.movie.title}</div>
            <div class="row"><strong>Theater:</strong> ${booking.show.theater}</div>
            <div class="row"><strong>Date:</strong> ${new Date(booking.show.show_time).toLocaleDateString()}</div>
            <div class="row"><strong>Time:</strong> ${new Date(booking.show.show_time).toLocaleTimeString()}</div>
            <div class="row"><strong>Seats:</strong> ${selectedSeats.join(', ')}</div>
            <div class="row"><strong>Total Amount:</strong> ₹${booking.total_amount}</div>
          </div>
          <div class="footer">
            <p>Thank you for booking with us!</p>
            <p>Please show this ticket at the counter</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([ticketHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${booking.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-500 text-white p-4 rounded-lg mb-6 text-center">
        <CheckCircleIcon className="h-16 w-16 mx-auto mb-2" />
        <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
        <p>Your booking has been successfully confirmed</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <TicketIcon className="h-8 w-8 text-red-500 mr-3" />
          <h3 className="text-2xl font-bold text-white">Booking Details</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Booking ID:</span>
            <span className="text-white font-semibold">#{booking.id}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Movie:</span>
            <span className="text-white font-semibold">{booking.show.movie.title}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Theater:</span>
            <span className="text-white">{booking.show.theater}</span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Date & Time:</span>
            <span className="text-white">
              {new Date(booking.show.show_time).toLocaleDateString()} at{' '}
              {new Date(booking.show.show_time).toLocaleTimeString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Seats:</span>
            <span className="text-white font-bold text-lg">
              {selectedSeats.join(', ')}
            </span>
          </div>
          
          <div className="flex justify-between items-center pb-3 border-b border-gray-700">
            <span className="text-gray-400">Number of Tickets:</span>
            <span className="text-white">{booking.seats_booked}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3">
            <span className="text-gray-400 text-lg">Total Amount Paid:</span>
            <span className="text-red-500 text-2xl font-bold">₹{booking.total_amount}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={downloadTicket}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Download Ticket
        </button>
        <button
          onClick={() => navigate('/bookings')}
          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          View My Bookings
        </button>
        <button
          onClick={() => navigate('/movies')}
          className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Book More Movies
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
