import { Fragment } from 'react';
import axios from 'axios';

import GridList from '../../components/layout/GridList';
import ShowCard from '../../components/ShowCard';
import { Show } from '../../lib/types/Show';
import styles from '../../styles/shows.module.css';

type Props = {
  shows: Show[];
};

const Shows = ({ shows }: Props) => {
  return (
    <div className={styles.page}>
      <GridList columns={5}>
        {shows.map((show) => (
          <Fragment key={show.id}>
            <ShowCard show={show} />
          </Fragment>
        ))}
      </GridList>
    </div>
  );
};

export const getStaticProps = async () => {
  const shows = await fetchShows();

  return {
    props: { shows },
  };
};

const fetchShows = async (): Promise<Show[]> => {
  const { data } = await axios.get('/tv/popular');

  const shows = data.results.map((result) => {
    return {
      id: result.id,
      name: result.name,
      posterPath: result.poster_path,
      firstAirDate: result.first_air_date,
      voteAverage: result.vote_average,
    };
  });

  return shows;
};

export default Shows;
