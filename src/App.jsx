import React from "react";
import Home from "./Home";
import MoviePreview from "./MoviePreview";
import Error from "./Error";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<MoviePreview />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
