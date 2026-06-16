const API_URL = import.meta.env.VITE_API_URL;

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  return response.json();
};

export const addMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  return response.json();
};

export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  return response.json();
};

export const deleteMovie = async (id) => {
  return fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
  });
};
export const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Action",
    duration: "181 mins",
    poster: "https://picsum.photos/300/450",
    description: "The Avengers assemble for one final battle.",
    price: 280
  },
  {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    duration: "148 mins",
    poster: "https://unsplash.com/photos/gold-pyramid-on-brown-wooden-table-LiLPRqxWI9I",
    description: "A thief enters dreams to steal secrets.",
    price: 240
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: "169 mins",
    poster: "https://picsum.photos/300/450",
    description: "Explorers travel through a wormhole in space.",
    price: 260
  }
];
