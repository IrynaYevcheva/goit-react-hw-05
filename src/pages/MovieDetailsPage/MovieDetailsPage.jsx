import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { fetchMovieDetails } from '../../api';
import toast from 'react-hot-toast';
import { MoviesListItem } from '../../components/MoviesListItem/MoviesListItem';
import { Loader } from '../../components/Loader/Loader';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        () => {
          toast.error('Oops, something went wrong! Please try again!');
        };
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      <MoviesListItem movie={movie} backLink={backLinkRef.current} />
    </>
  );
}
