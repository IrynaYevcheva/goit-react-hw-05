import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { fetchMoviesByQuery } from '../../api';
import toast from 'react-hot-toast';
import { MovieList } from '../../components/MovieList/MovieList';

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('query') ?? '';

  const handleSubmit = event => {
    event.preventDefault();
    searchParams.set('query', event.target.elements.query.value);
    setSearchParams(searchParams);
    event.target.reset();
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMoviesByQuery(query);
        if (results.length === 0) {
          toast.error(
            `Sorry we didn't find any results matching this search...`
          );
        } else {
          setMovies(results);
        }
      } catch {
        () => {
          toast.error('Oops, something went wrong! Please try again!');
        };
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [query]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};
