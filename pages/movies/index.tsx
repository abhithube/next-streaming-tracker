import { Fragment } from 'react';
import axios from 'axios';

import GridList from '../../components/layout/GridList';
import MovieCard from '../../components/MovieCard';
import { Movie } from '../../lib/types/Movie';
import styles from '../../styles/movies.module.css';

type Props = {
  movies: Movie[];
};

const Movies = ({ movies }: Props) => {
  return (
    <div className={styles.page}>
      <GridList columns={5}>
        {movies.map((movie) => (
          <Fragment key={movie.id}>
            <MovieCard movie={movie} />
          </Fragment>
        ))}
      </GridList>
    </div>
  );
};

export const getStaticProps = async () => {
  const movies = await fetchMovies();

  return {
    props: { movies },
  };
};

const fetchMovies = async (): Promise<Movie[]> => {
  const { data } = await axios.get('/movie/popular');

  const movies = data.results.map((result) => {
    return {
      id: result.id,
      title: result.title,
      posterPath: result.poster_path,
      releaseDate: result.release_date,
      voteAverage: result.vote_average,
    };
  });

  return movies;
};

export default Movies;
