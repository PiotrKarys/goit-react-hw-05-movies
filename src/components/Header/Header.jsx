import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ view, setView }) => (
  <header className={styles.header}>
    <nav>
      <ul className={styles.navList}>
        <li
          className={view === "home" ? styles.active : ""}
          onClick={() => setView("home")}>
          Home
        </li>
        <li
          className={view === "movies" ? styles.active : ""}
          onClick={() => setView("movies")}>
          Movies
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
};

export default Header;
