import { Genre } from './Genre';
import { Crew } from './Crew';

export type MovieDetails = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  backdropPath: string;
  overview: string;
  ageRating: string;
  runtime: number | null;
  genres: Genre[];
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  budget: number;
  revenue: number;
  crew: Crew[];
};
