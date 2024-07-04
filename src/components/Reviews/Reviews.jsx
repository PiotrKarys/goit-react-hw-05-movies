import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import { getMovieReviews } from "../api";
import styles from "./Reviews.module.css";

const Reviews = ({ onTabChange }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    onTabChange("reviews");
    const fetchReviews = async () => {
      const data = await getMovieReviews(movieId);
      setReviews(data.results);
    };
    fetchReviews();
  }, [movieId, onTabChange]);

  if (!reviews) {
    return <Loader />;
  }

  return (
    <div className={styles.reviews}>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.review}>
              <p>
                <strong>{review.author}</strong>
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};

export default Reviews;
