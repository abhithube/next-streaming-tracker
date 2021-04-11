import { MovieDetails } from './MovieDetails';
import { MovieSummary } from './MovieSummary';
import { Cast } from './Cast';
import { Provider } from './Provider';

export type Movie = {
  movieDetails: MovieDetails;
  cast: Cast[];
  recommendations: MovieSummary[];
  providers: Provider[];
};
