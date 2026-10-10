import { Moon, Sun } from "lucide-react";

function Header({
  darkMode,
  setDarkMode,
  activePage,
  setActivePage,
  onHome,

}) {
  return (
    <header className="header">
      <div className="logo" onClick={onHome}>
        MovieNest
      </div>

      <nav className="nav">
        <button
          className={
            activePage === "home"
              ? "nav-link active"
              : "nav-link"
          }
          onClick={onHome}
        >
          Home
        </button>

        <button
          className={
            activePage === "favorites"
              ? "nav-link active"
              : "nav-link"
          }
          onClick={() => setActivePage("favorites")}
        >
          Favorites

        
        </button>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;