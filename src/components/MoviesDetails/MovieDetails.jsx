import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "../api";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";
import styles from "./MovieDetails.module.css";

const MovieDetails = ({ movieId, selectedTab, onTabChange }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then((data) => setMovie(data));
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <button onClick={() => onTabChange("./")} className={styles.backButton}>
        ← Go back
      </button>
      <div className={styles.movieHeader}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <div className={styles.movieInfo}>
          <h1>
            {movie.title} ({movie.release_date.split("-")[0]})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h2>Additional information</h2>
        <ul>
          <li
            className={selectedTab === "cast" ? styles.active : ""}
            onClick={() => onTabChange("cast")}>
            Cast
          </li>
          <li
            className={selectedTab === "reviews" ? styles.active : ""}
            onClick={() => onTabChange("reviews")}>
            Reviews
          </li>
        </ul>
        {selectedTab === "cast" && <Cast movieId={movieId} />}
        {selectedTab === "reviews" && <Reviews movieId={movieId} />}
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.number.isRequired,
  selectedTab: PropTypes.string,
  onTabChange: PropTypes.func.isRequired,
};

export default MovieDetails;
