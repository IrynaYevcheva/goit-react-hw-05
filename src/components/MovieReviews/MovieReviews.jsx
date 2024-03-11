import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api';
import toast from 'react-hot-toast';
import { Loader } from '../Loader/Loader';
import styles from './MovieReviews.module.css';

export const MovieReviews = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviewsById = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMovieReviews(movieId);
        setResponse(results);
      } catch {
        () => {
          toast.error('Oops, something went wrong! Please try again!');
        };
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviewsById();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {response.length === 0 ? (
        <div>Sorry, we don't have any reviews for this movie.</div>
      ) : (
        <ul className={styles.list}>
          {response.map(review => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
                <p>{`${review.created_at.slice(0, 10)}`}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
