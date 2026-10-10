import MovieCard from "./MovieCard";

function MovieList({
  movies,
  favorites,
  toggleFavorite,
}) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieList;