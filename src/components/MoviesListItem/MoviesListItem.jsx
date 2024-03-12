import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import styles from './MoviesListItem.module.css';
import { Loader } from '../Loader/Loader';

export const MoviesListItem = ({ movie, backLink }) => {
  if (movie.length !== 0) {
    return (
      <>
        <button className={styles.button}>
          <Link className={styles.link} to={backLink}>
            Go Back
          </Link>
        </button>
        <div className={styles.movieCard}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            }
            alt={`${movie.title} poster`}
            width="300"
            height="450"
          />
          <div className={styles.movieInfo}>
            <h2>{`${movie.title} (${movie.release_date.slice(0, 4)})`}</h2>
            <p>User Score: {parseInt(movie.vote_average * 10)}%</p>
            <h3>Overview:</h3>
            <p>{`${movie.overview}`}</p>
            <h3>Genres:</h3>
            <p>{movie?.genres.map(({ name }) => name).join(', ')}</p>
          </div>
        </div>
        <ul className={styles.additionalInfo}>
          <li className={styles.linkItem}>
            <Link className={styles.link} to={`/movies/${movie.id}/cast`}>
              Cast
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link className={styles.link} to={`/movies/${movie.id}/reviews`}>
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </>
    );
  }
};
