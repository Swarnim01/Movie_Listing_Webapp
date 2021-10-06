import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import "./IndiviualMovie.css";

const POSTER_PATH = "https://image.tmdb.org/t/p/original";

const addfavourite = (id, poster_path) => {
  fetch("/favourite", {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      poster_path,
    }),
  })
    .then((response) => response.json())
    .then(({ error }) => {
      if (error) toast.error(error);
      else {
        toast.success("Succesfully Added to favourites");
      }
    });
};

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
  }, [currentMovie, movieId]);
  console.log(movieId);
  return (
    <div style={{ margin: "2rem auto", width: "95%" }}>
      {currentMovie ? (
        <div
          style={{
            display: "flex",
          }}>
          <div
            style={{
              margin: "0.3rem",
              position: "relative",
              border: "solid white 2px",
              width: "10rem",
            }}>
            <img
              src={`${POSTER_PATH}${currentMovie.poster_path}`}
              alt="poster"
              style={{ width: "10rem", height: "auto" }}
              className="posters"
            />
            <div
              className="favouritetab"
              onClick={() => {
                addfavourite(currentMovie.id, currentMovie.poster_path);
              }}>
              Favourite{"  "} &nbsp;
              <FavoriteIcon style={{ color: red[500] }} />
            </div>
          </div>
          <div className="movie-info">
            <p className="movie-title">{currentMovie.original_title}</p>
            {currentMovie.tagline && (
              <p className="movie-tagline">{currentMovie.tagline}</p>
            )}
            {currentMovie.runtime && (
              <div className="movie-details-wrapper">
                <p className="movie-runtime">
                  Runtime - <span>{currentMovie.runtime}&nbsp;Minutes</span>
                </p>
                {currentMovie.genres &&
                  currentMovie.genres.map((genre) => {
                    const url = `https://www.google.com/search?q=Genres+${genre.name}`;
                    return (
                      <p className="movie-genres">
                        <a href={url} target="_blank" rel="noreferrer">
                          {genre.name}
                        </a>
                      </p>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <h1>Fetching Details</h1>
      )}
    </div>
  );
}
