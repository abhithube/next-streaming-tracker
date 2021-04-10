import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Show } from '../lib/types/Show';
import styles from '../styles/Card.module.css';

type Props = {
  show: Show;
};

const ShowCard = ({ show }: Props) => {
  return (
    <Link href={`/tv/${show.id}`}>
      <a className={styles.card}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${show.posterPath}`}
          alt={show.name}
          width={300}
          height={450}
        />
        <div className={styles.content}>
          <span className={styles.rating}>
            <FontAwesomeIcon icon={faStar} /> {show.voteAverage}
          </span>
          <span className={styles.title}>{show.name}</span>
          <span className={styles.date}>{show.firstAirDate}</span>
        </div>
      </a>
    </Link>
  );
};

export default ShowCard;
