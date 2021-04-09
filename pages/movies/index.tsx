import * as React from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import CardList from '../../components/CardList';
import { Media } from '../../lib/Media';
import styles from '../../styles/movies.module.css';

type MoviesProps = {
  movies: Media[];
};

const Movies = ({ movies }: MoviesProps) => {
  return (
    <div className={styles.page}>
      <CardList cards={movies} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      movies,
    },
  };
};

export default Movies;
