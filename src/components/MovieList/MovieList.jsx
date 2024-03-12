import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link
            className={styles.link}
            to={`/movies/${movie.id}`}
            state={location}
          >
            <span>{movie.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
