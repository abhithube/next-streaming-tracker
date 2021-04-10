import * as React from 'react';

import Card from './Card';
import { Media } from '../lib/Media';
import styles from '../styles/CardList.module.css';

type Props = {
  cards: Media[];
  type: 'movies' | 'tv';
};

const CardList = ({ cards, type }: Props) => {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <React.Fragment key={card.id}>
          <Card media={card} type={type} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardList;
