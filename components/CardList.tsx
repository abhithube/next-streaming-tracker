import * as React from 'react';

import styles from '../styles/CardList.module.css';
import Card from './Card';

const CardList = ({ cards }) => {
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
