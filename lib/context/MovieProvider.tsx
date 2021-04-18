import { createContext, ReactNode, useState } from 'react';

import { Genre, Provider } from '../types';

type ContextProps = {
  page: number;
  updatePage: (page: number) => void;
  resetPage: () => void;
  updateGenres: (genres: Genre[]) => void;
  updateProviders: (providers: Provider[]) => void;
  genres: Genre[];
  providers: Provider[];
};

export const MovieContext = createContext<ContextProps>({
  page: 1,
  genres: [],
  providers: [],
  updatePage: () => null,
  resetPage: () => null,
  updateGenres: () => null,
  updateProviders: () => null,
});

type MovieProviderProps = {
  children: ReactNode | ReactNode[];
};

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);

  const updatePage = (page: number) => setPage(page);
  const resetPage = () => setPage(1);
  const updateGenres = (genres: Genre[]) => setGenres(genres);
  const updateProviders = (providers: Provider[]) => setProviders(providers);

  return (
    <MovieContext.Provider
      value={{
        page,
        updatePage,
        resetPage,
        genres,
        updateGenres,
        providers,
        updateProviders,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
