import { useState, useEffect } from 'react';
import { MovieList } from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../api';
import { Loader } from '../../components/Loader/Loader';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchTrendingMovies();
        setTrendingMovies(results);
      } catch {
        () => {
          toast.error('Oops, something went wrong! Please try again!');
        };
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      <MovieList movies={trendingMovies} />
    </>
  );
}
