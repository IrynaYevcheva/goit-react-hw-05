import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api';
import toast from 'react-hot-toast';
import { Loader } from '../Loader/Loader';
import styles from './MovieCast.module.css';

export const MovieCast = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCastById = async () => {
      try {
        setIsLoading(true);
        const { cast } = await fetchMovieCast(movieId);
        setResponse(cast);
      } catch {
        () => {
          toast.error('Oops, something went wrong! Please try again!');
        };
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCastById();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {response.length === 0 ? (
        <div>Sorry, we don't have any cast information for this movie.</div>
      ) : (
        <ul className={styles.list}>
          {response.map(actor => {
            return (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={`${actor.name}'photo`}
                />
                <p>{actor.character}</p>
                <p>{actor.name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
