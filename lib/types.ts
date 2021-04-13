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

export type MovieDetails = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  backdropPath: string;
  overview: string;
  tagline: string;
  ageRating: string;
  runtime: number | null;
  genres: string;
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  budget: number;
  revenue: number;
  crew: CrewMember[];
  cast: CastMember[];
  recommendations: MovieSummary[];
  providers: Provider[];
};

export type CrewMember = {
  id: number;
  name: string;
  job: 'Director' | 'Screenplay' | 'Story' | 'Writer';
};

export type CastMember = {
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
