import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Media } from '../lib/Media';
import styles from '../styles/Card.module.css';

type Props = {
  media: Media;
  type: 'movies' | 'tv';
};

const Card = ({ media, type }: Props) => {
  return (
    <Link href={`/${type}/${media.id}`}>
      <a className={styles.card}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${media.posterPath}`}
          alt={media.title}
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
