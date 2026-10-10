import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

import {
  searchMovies,
  getPopularMovies,
} from "./services/movieApi";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
const [favorites, setFavorites] = useState(() => {
  try {
    const savedFavorites = localStorage.getItem("favorites");

    const parsed = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
});

  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);

        const results = await getPopularMovies();

        setMovies(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setActivePage("home");

      const results = await searchMovies(query);

      setMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (favorite) => favorite.id !== movie.id
        )
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const handleHome = async () => {
    setActivePage("home");
    setQuery("");

    try {
      setLoading(true);

      const results = await getPopularMovies();

      setMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const displayedMovies =
    activePage === "favorites"
      ? favorites
      : movies;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activePage={activePage}
        setActivePage={setActivePage}
        onHome={handleHome}
      />

      <main className="main-content">
        {activePage === "home" && (
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />
        )}

        {loading && (
          <p className="loading">
            Loading...
          </p>
        )}

        {!loading &&
          activePage === "favorites" &&
          favorites.length === 0 && (
            <p className="empty-message">
              No favorite movies yet.
            </p>
          )}

        {!loading && (
          <MovieList
            movies={displayedMovies}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;