import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../api";
import styles from "./Movies.module.css";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(query).then((data) => setMovies(data.results));
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className={styles.movies}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            className={styles.movieItem}
            onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={styles.movieInfo}>
              <h2>{movie.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
