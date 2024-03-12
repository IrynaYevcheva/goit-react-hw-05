import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loader } from './components/Loader/Loader';
import { Navigation } from './components/Navigation/Navigation';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);

// import { HomePage } from './pages/HomePage/HomePage';
// import { MoviesPage } from './pages/MoviesPage/MoviesPage';
// import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
// import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';
// import { MovieCast } from './components/MovieCast/MovieCast';
// import { MovieReviews } from './components/MovieReviews/MovieReviews';

export default function App() {
  return (
    <>
      <Toaster />
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
