import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Media } from '../lib/Media';
import styles from '../styles/Card.module.css';

type Props = {
  media: Media;
};

const Card: React.FC<Props> = ({ media }: Props): React.ReactElement => {
  React.useEffect(() => {
    console.log(document.querySelector('img').width);
  }, []);

  return (
    <Link href={`/movies/${media.id}`}>
      <a className={styles.card}>
        <Image
          src={`https://www.themoviedb.org/t/p/original${media.posterPath}`}
          alt={`https://www.themoviedb.org/t/p/original${media.posterPath}`}
          width={300}
          height={450}
        />
        <div className={styles.content}>
          <span className={styles.rating}>
            <FontAwesomeIcon icon={faStar} /> {media.voteAverage}
          </span>
          <span className={styles.title}>{media.title}</span>
          <span className={styles.date}>{media.releaseDate}</span>
        </div>
      </a>
    </Link>
  );
};

export default Card;
