import * as React from 'react';
import axios from 'axios';

import CardList from '../../components/CardList';
import { Media } from '../../lib/Media';
import styles from '../../styles/shows.module.css';

type Props = {
  shows: Media[];
};

const Shows = ({ shows }: Props) => {
  return (
    <div className={styles.page}>
      <CardList cards={shows} type='tv' />
    </div>
  );
};

export const getStaticProps = async () => {
  const shows = await fetchShows();

  return {
    props: { shows },
  };
};

const fetchShows = async (): Promise<Media[]> => {
  const { data } = await axios.get('/tv/popular');

  const shows = data.results.map((result) => {
    return {
      id: result.id,
      title: result.name,
      posterPath: result.poster_path,
      releaseDate: result.first_air_date,
      voteAverage: result.vote_average,
    };
  });

  return shows;
};

export default Shows;
