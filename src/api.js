import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTIzNzJkNzZmMjljZDFhMzBkZjkzYjhmZDBmZTBkYSIsInN1YiI6IjY1ZWNkMzk1YTliOWE0MDE3ZGQ0YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tw7Z9IvhjXXmjxTMdQdTns6tt7w8_OLITeiMPBYMCZk',
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1',
    options
  );
  return response.data;
};

export const fetchMoviesByQuery = async query => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};

export const fetchMovieDetails = async id => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );

  return response.data;
};

export const fetchMovieCast = async id => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  );
  return response.data;
};

export const fetchMovieReviews = async id => {
  const response = await axios.get(
    ` https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  console.log(response);
  return response.data;
};
