export const CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async({ query }: { query?: string }) => {
  const queryString = query ? `/search/movie?query=${query}` : '/discover/movie?sort_by=popularity.desc';
  const endpoint = `${CONFIG.BASE_URL}${queryString}`

  const response = await fetch(endpoint, { method: 'GET', headers: CONFIG.headers});

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return data.results;
}

export const fetchMovieDetails = async(movieId: string): Promise<MovieDetails> => {
 try {
   const response = await fetch(`${CONFIG.BASE_URL}/movie/${movieId}?api_key=${CONFIG.API_KEY}`, { method: 'GET', headers: CONFIG.headers});
 
   if (!response.ok) {
     throw new Error("Failed to fetch movie details");
   }
 
   const data = await response.json();
   return data;
 } catch (error) {
    throw error
 }
}
