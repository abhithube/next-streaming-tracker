import * as React from 'react';

import Card from './Card';
import { Media } from '../lib/Media';
import styles from '../styles/CardList.module.css';

type CardListProps = {
  cards: Media[];
};

const CardList = ({ cards }: CardListProps) => {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <React.Fragment key={card.id}>
          <Card media={card} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardList;
