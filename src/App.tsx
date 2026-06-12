import { useState } from 'react';

interface Movie {
  id: number;
  title: string;
  genre: string;
  price: number;
  image: string;
}

export default function App() {
  
  const movies: Movie[] = [
    { id: 1, title: "Inception", genre: "Sci-Fi", price: 12, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80" },
    { id: 2, title: "The Dark Knight", genre: "Action", price: 15, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80" },
    { id: 3, title: "Interstellar", genre: "Drama", price: 14, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80" }
  ];

  
  const [selectedMovies, setSelectedMovies] = useState<Array<{ movie: Movie; seats: number }>>([]);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMovies.length === 0) return;

    
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMovies([]);
    }, 4000);
  };

  return (
    <div style={{
      backgroundColor: '#111827',
      color: '#f3f4f6',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#6366f1', margin: '0 0 0.5rem 0' }}>MovieHub Booking</h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>Select a movie and reserve your tickets</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: selectedMovies.length > 0 ? '2fr 1fr' : '1fr', gap: '2rem' }}>
        
      
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Now Showing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                onClick={() => {
                  const exists = selectedMovies.find((s) => s.movie.id === movie.id);
                  if (exists) {
                    setSelectedMovies(selectedMovies.filter((s) => s.movie.id !== movie.id));
                  } else if (selectedMovies.length < 2) {
                    setSelectedMovies([...selectedMovies, { movie, seats: 1 }]);
                  }
                }}
                style={{
                  backgroundColor: '#1f2937',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: selectedMovies.find((s) => s.movie.id === movie.id) ? '2px solid #6366f1' : '2px solid transparent',
                  transition: 'transform 0.2s',
                }}
              >
                <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{movie.title}</h3>
                  <p style={{ color: '#9ca3af', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{movie.genre}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: '#34d399' }}>${movie.price}.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        {selectedMovies.length > 0 && (
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.4rem', marginTop: 0, marginBottom: '1.5rem' }}>Checkout</h2>

            {bookingSuccess ? (
              <div style={{ backgroundColor: '#065f46', color: '#34d399', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>🎉 Booking Confirmed!</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Thank you for your booking.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking}>
                {selectedMovies.map((s) => (
                  <div key={s.movie.id} style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#111827', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fff' }}>{s.movie.title}</strong>
                      <button type="button" onClick={() => setSelectedMovies(selectedMovies.filter((m) => m.movie.id !== s.movie.id))} style={{ background: 'transparent', color: '#f87171', border: 'none', cursor: 'pointer' }}>Remove</button>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <label style={{ display: 'block', color: '#9ca3af', marginBottom: '0.25rem', fontSize: '0.85rem' }}>Number of Seats</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={s.seats}
                        onChange={(e) => {
                          const v = parseInt(e.target.value) || 1;
                          setSelectedMovies(selectedMovies.map((m) => m.movie.id === s.movie.id ? { ...m, seats: v } : m));
                        }}
                        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#374151', border: 'none', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>Sub-total:</span>
                      <span style={{ color: '#34d399' }}> ${s.movie.price * s.seats}.00</span>
                    </div>
                  </div>
                ))}

                <div style={{ borderTop: '1px solid #374151', paddingTop: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    <span>Total:</span>
                    <span style={{ color: '#34d399' }}>${selectedMovies.reduce((sum, s) => sum + s.movie.price * s.seats, 0)}.00</span>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}