import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMovieReviews } from "../api";
import styles from "./Reviews.module.css";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this movie.</p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.review}>
              <p>
                <strong>{review.author}</strong>: {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Reviews;
