import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Movie } from '../lib/types/Movie';
import styles from '../styles/Card.module.css';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <a className={styles.card}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.posterPath}`}
          alt={movie.title}
          width={300}
          height={450}
        />
        <div className={styles.content}>
          <span className={styles.rating}>
            <FontAwesomeIcon icon={faStar} /> {movie.voteAverage}
          </span>
          <span className={styles.title}>{movie.title}</span>
          <span className={styles.date}>{movie.releaseDate}</span>
        </div>
      </a>
    </Link>
  );
};

export default MovieCard;
