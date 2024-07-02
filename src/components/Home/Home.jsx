import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "../api";
import PropTypes from "prop-types";
import styles from "./Home.module.css";

const Home = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then((data) => setMovies(data.results));
  }, []);

  return (
    <div className={styles.home}>
      <h1>Trending Movies</h1>
      <ul className={styles.movieList}>
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            className={styles.movieItem}
            onClick={() => onMovieClick(movie.id)}>
            <span className={styles.rank}>{index + 1}</span>
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

Home.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default Home;
