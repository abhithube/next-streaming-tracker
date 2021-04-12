export type MovieSummary = {
  id: number;
  title: string;
  slug: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: string;
};

export type TVShowSummary = {
  id: number;
  name: string;
  slug: string;
  posterPath: string;
  firstAirDate: string;
  voteAverage: string;
};

export type Movie = {
  movieDetails: MovieDetails;
  cast: Cast[];
  recommendations: MovieSummary[];
  providers: Provider[];
};

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

export type Genre = {
  id: number;
  name: string;
};

export type Crew = {
  id: number;
  name: string;
  job: 'Director' | 'Screenplay' | 'Story' | 'Writer';
};

export type Cast = {
  id: number;
  name: string;
  character: string;
  profilePath: string;
};

export type Provider = {
  id: number;
  name: string;
  logoPath: string;
};
