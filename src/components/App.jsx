import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Header/Header";
import Loader from "./Loader/Loader";
import MovieDetails from "./MoviesDetails/MovieDetails";
import Cast from "./Cast/Cast";
import Reviews from "./Reviews/Reviews";

const Home = React.lazy(() => import("./Home/Home"));
const Movies = React.lazy(() => import("./Movies/Movies"));

const App = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/movies/:movieId/cast"
              element={
                <>
                  <MovieDetails selectedTab="cast" />
                  <Cast onTabChange={handleTabChange} />
                </>
              }
            />
            <Route
              path="/movies/:movieId/reviews"
              element={
                <>
                  <MovieDetails selectedTab="reviews" />
                  <Reviews onTabChange={handleTabChange} />
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <MovieDetails
                  selectedTab={selectedTab}
                  onTabChange={handleTabChange}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
