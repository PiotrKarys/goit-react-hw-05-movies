import React from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMovies } from "../api";
import Loader from "../Loader/Loader";
import styles from "./Home.module.css";

const Home = () => {
  const [movies, setMovies] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTrendingMovies = async () => {
      const data = await getTrendingMovies();
      setMovies(data.results);
    };
    fetchTrendingMovies();
  }, []);

  if (!movies) {
    return <Loader />;
  }

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className={styles.home}>
      <h1>Trending Today</h1>
      <ul className={styles.movieList}>
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            className={styles.movieItem}
            onClick={() => handleMovieClick(movie.id)}>
            <span className={styles.rank}>{index + 1}</span>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              // className={styles.poster}
            />
            <span className={styles.movieInfo}>{movie.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
