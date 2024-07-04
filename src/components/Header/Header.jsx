import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../public/image.png";

const Header = ({ view, setView }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src={logo}
          alt="Logo"
          className={styles.logo}
          onClick={handleLogoClick}
        />
      </div>
      <nav>
        <ul className={styles.navList}>
          <li
            className={view === "home" ? styles.active : ""}
            onClick={() => setView("home")}>
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}>
              Home
            </Link>
          </li>
          <li
            className={
              view === "movies" || view === "movieDetails" ? styles.active : ""
            }
            onClick={() => setView("movies")}>
            <Link
              to="/movies"
              className={
                location.pathname.startsWith("/movies") ? styles.active : ""
              }>
              Movies
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
