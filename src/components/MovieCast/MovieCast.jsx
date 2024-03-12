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

  const defaultImg =
    '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

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
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                  }
                  alt={actor.name}
                  width="200"
                  height="300"
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
