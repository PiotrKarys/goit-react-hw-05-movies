import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMovieCredits } from "../api";
import styles from "./Cast.module.css";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then((data) => setCast(data.cast));
  }, [movieId]);

  return (
    <div className={styles.cast}>
      <h3>Cast</h3>
      <ul className={styles.castList}>
        {cast.map((member) => (
          <li key={member.cast_id} className={styles.castMember}>
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
              className={styles.castImage}
            />
            <p>
              {member.name} as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Cast;
