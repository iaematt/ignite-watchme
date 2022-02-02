import { useMovies } from '../contexts/MoviesContext';

import { Logo } from './Logo';
import { Button } from './Button';

export function SideBar() {
  const { genres, handleChangeGenre, selectedGenreId } = useMovies();

  return (
    <nav className="sidebar">
      <Logo />

      <div className="buttons-container">
        {genres?.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleChangeGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
