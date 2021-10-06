import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function IndividualMovie() {
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    if (currentMovie) return;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=f569e379d2c0bc46e541ef9379a90215&language=en-US&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentMovie(data);
      });
  }, []);
  console.log(movieId);
  return <div>Movie Id is {movieId}</div>;
}
