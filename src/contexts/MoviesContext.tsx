import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

type GenreProps = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
};

type MovieProps = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
};

type MoviesContextData = {
  movies: MovieProps[];
  genres: GenreProps[];
  handleChangeGenre(id: number): void;
  selectedGenreId: number;
  selectedGenre: GenreProps;
};

type MoviesProviderProps = {
  children: ReactNode;
};

export const MoviesContext = createContext({} as MoviesContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genres, setGenres] = useState<GenreProps[]>([]);

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps);

  function handleChangeGenre(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<GenreProps>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        genres,
        selectedGenreId,
        selectedGenre,
        handleChangeGenre,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);
