export type ContentSummary = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
};

export type ContentDetails = {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  voteCount: number;
  backdropPath: string | null;
  overview: string;
  tagline: string;
  ageRating: string;
  runtime: number | null;
  genres: string;
  releaseDate: string;
  creators: Creator[];
  providers: Provider[];
};

export type SearchResult = {
  id: number;
  type: Content;
  title: string;
  posterPath: string;
};

export type Creator = {
  id: number;
  name: string;
  job: 'Creator' | 'Director' | 'Screenplay' | 'Story' | 'Writer';
};

export type Provider = {
  id: number;
  name: string;
  logoPath?: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Content = 'movie' | 'tv';
