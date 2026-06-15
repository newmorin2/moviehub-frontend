const API_URL = import.meta.env.VITE_API_URL;

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movies/`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const addMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Failed to add movie");
  }

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

  if (!response.ok) {
    throw new Error("Failed to update movie");
  }

  return response.json();
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }

  return response;
};