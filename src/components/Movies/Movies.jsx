import React, { useState } from "react";
import { searchMovies } from "../api";
import PropTypes from "prop-types";
import styles from "./Movies.module.css";

const Movies = ({ onMovieClick }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(query).then((data) => setMovies(data.results));
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
            onClick={() => onMovieClick(movie.id)}>
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

Movies.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default Movies;
