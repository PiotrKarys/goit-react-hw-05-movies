import React, { useState } from "react";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Movies from "./Movies/Movies";
import MovieDetails from "./MoviesDetails/MovieDetails";

const App = () => {
  const [view, setView] = useState("home");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const renderView = () => {
    if (view === "home") {
      return (
        <Home
          onMovieClick={(id) => {
            setSelectedMovieId(id);
            setView("movieDetails");
          }}
        />
      );
    }
    if (view === "movies") {
      return (
        <Movies
          onMovieClick={(id) => {
            setSelectedMovieId(id);
            setView("movieDetails");
          }}
        />
      );
    }
    if (view === "movieDetails") {
      return (
        <MovieDetails
          movieId={selectedMovieId}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      );
    }
  };

  return (
    <div className="App">
      <Header view={view} setView={setView} />
      {renderView()}
    </div>
  );
};

export default App;
