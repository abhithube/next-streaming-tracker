import { useEffect } from 'react';
import axios from 'axios';

import CardList from '../../components/CardList';
import { Media } from '../../lib/Media';
import styles from '../../styles/movies.module.css';

type Props = {
  movies: Media[];
};

const Movies = ({ movies }: Props) => {
  useEffect(() => {
    fetchMovies().then((res) => console.log(res));
  }, []);

  return (
    <div className={styles.page}>
      <CardList cards={movies} type='movies' />
    </div>
  );
};

export const getStaticProps = async () => {
  const movies = await fetchMovies();

  return {
    props: { movies },
  };
};

const fetchMovies = async (): Promise<Media[]> => {
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
