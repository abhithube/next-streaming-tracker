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
  voteAverage: number;
  voteCount: number;
  backdropPath: string;
  overview: string;
  tagline: string;
  ageRating: string;
  runtime: number | null;
  genres: string;
  status: string;
  releaseDate: string;
  budget: number;
  revenue: number;
  studio: string;
  creators: Creator[];
  actors: Actor[];
  reviews: Review[];
  providers: Provider[];
};

export type TVShowDetails = {
  id: number;
  name: string;
  posterPath: string | null;
  voteAverage: number;
  voteCount: number;
  backdropPath: string | null;
  overview: string;
  tagline: string;
  ageRating: string;
  runtime: number;
  genres: string;
  status: string;
  firstAirDate: string;
  creators: string[];
  actors: Actor[];
  reviews: Review[];
  providers: Provider[];
};

export type Creator = {
  id: number;
  name: string;
  job: 'Creator' | 'Director' | 'Screenplay' | 'Story' | 'Writer';
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  profilePath: string;
};

export type Review = {
  id: number;
  content: string;
  createdAt: string;
  author: string;
  avatarPath: string | null;
  rating: number | null;
};

export type Provider = {
  id: number;
  name: string;
  logoPath: string;
};
