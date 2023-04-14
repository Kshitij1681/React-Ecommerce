import React, { useContext, useEffect, useState } from "react";

const API_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("Titanic");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({ show: false, msg: "" });
        setMovie(data.Search);
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Debounce Behaviour
    // Debounce event forces a function to wait for a certain amount of time before running again. This function is used to limit the no of times a function is called.
    let timer_out = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);

    return () => {
      clearTimeout(timer_out);
    };
  }, [API_URL, query]);

  return <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>{children}</AppContext.Provider>;
};

//custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
export { AppContext, useGlobalContext, API_URL };
