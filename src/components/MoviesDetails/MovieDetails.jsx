import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import { getMovieDetails } from "../api";
import styles from "./MovieDetails.module.css";

const MovieDetails = ({ selectedTab }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <Loader />;
  }
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.movieDetails}>
      <button className={styles.backButton} onClick={handleGoBack}>
        Go back
      </button>
      <div className={styles.movieHeader}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <div className={styles.movieInfo}>
          <h1>
            {movie.title} ({movie.release_date.substring(0, 4)})
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
          <li>
            <Link
              to={`/movies/${movieId}/cast`}
              className={selectedTab === "cast" ? styles.active : " "}>
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              className={selectedTab === "reviews" ? styles.active : " "}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  selectedTab: PropTypes.string,
  onTabChange: PropTypes.func.isRequired,
};

export default MovieDetails;
