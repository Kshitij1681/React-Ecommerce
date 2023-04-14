import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "./Context";

const MoviePreview = () => {
  const { id } = useParams();
  // console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Debounce Behaviour
    // Debounce event forces a function to wait for a certain amount of time before running again. This function is used to limit the no of times a function is called.
    let timer_out = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 500);

    return () => {
      clearTimeout(timer_out);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt={movie.Title} />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating}</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default MoviePreview;
