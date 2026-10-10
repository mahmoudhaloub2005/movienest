import { Heart } from "lucide-react";

function MovieCard({
  movie,
  favorites,
  toggleFavorite,
}) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  return (
    <div className="movie-card">
      <div className="movie-image-wrapper">
        <img
          src={imageUrl}
          alt={movie.title}
        />

        <button
          type="button"
          className={`favorite-btn ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={() => toggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          <Heart
            size={22}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="movie-hover-info">
          <h3>{movie.title}</h3>

          <p>
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;