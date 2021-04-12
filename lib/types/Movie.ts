import { MovieDetails } from './MovieDetails';
import { Cast } from './Cast';
import { MovieSummary } from './MovieSummary';
import { Provider } from './Provider';

export type Movie = {
  movieDetails: MovieDetails;
  cast: Cast[];
  recommendations: MovieSummary[];
  providers: Provider[];
};
