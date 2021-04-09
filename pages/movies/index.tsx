import * as React from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import CardList from '../../components/CardList';
import { Media } from '../../lib/Media';
import styles from '../../styles/movies.module.css';

type Props = {
  movies: Media[];
};

const Movies: React.FC<Props> = ({ movies }: Props) => {
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
