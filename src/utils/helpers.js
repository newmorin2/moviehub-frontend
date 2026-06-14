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