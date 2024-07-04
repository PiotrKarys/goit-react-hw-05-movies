import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getMovieCredits } from "../api";
import styles from "./Cast.module.css";

const noImage = "https://placehold.co/150x225";

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then((data) => setCast(data.cast));
  }, [movieId]);

  return (
    <div className={styles.cast}>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map((member) => (
            <li key={member.cast_id} className={styles.castMember}>
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  className={styles.castImage}
                />
              ) : (
                <img
                  src={noImage}
                  alt="No Image Available"
                  className={styles.castImage}
                />
              )}
              <p>
                {member.name} as {member.character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We can't provide cast information for this movie.</p>
      )}
    </div>
  );
};

Cast.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};

export default Cast;
