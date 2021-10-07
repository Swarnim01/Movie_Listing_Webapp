import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./IndiviualMovie.css";

const POSTER_PATH = "https://image.tmdb.org/t/p/original";
const CAST_PER_PAGE = 5;

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
  const [cast, setCast] = useState(null);
  const [reducedCast, setReducedCast] = useState(null);
  const [castIndex, setCastIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(null);
  useEffect(() => {
    if (currentMovie) return;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=f569e379d2c0bc46e541ef9379a90215&language=en-US&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentMovie(data);
      })
      .catch((err) => {console.log(err);});
  }, [currentMovie, movieId]);
  useEffect(() => {
    if (cast) return;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f569e379d2c0bc46e541ef9379a90215&language=en-US&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);
        setLastIndex(data.cast.length / CAST_PER_PAGE);
        if (lastIndex % CAST_PER_PAGE > 0) {
          setLastIndex((prevVal) => {
            return prevVal++;
          });
        }
      })
      .catch((err) => {console.log(err);});
  }, [cast, lastIndex, movieId]);
  useEffect(() => {
    if (!cast) return;
    const index = castIndex * CAST_PER_PAGE - 5;
    let temp = [];
    for (let i = index; i < index + CAST_PER_PAGE; i++) {
      temp.push(cast[i]);
    }
    setReducedCast(temp);
  }, [cast, castIndex]);
  return (
    <div style={{ margin: "2rem auto", width: "95%" }}>
      {currentMovie && cast ? (
        <div className="movie-info-wrapper">
          <div
            style={{
              margin: "0.3rem",
            }}>
            <div
              style={{
                border: "solid white 2px",
                width: "10rem",
                position: "relative",
              }}>
              <img
                src={`${POSTER_PATH}${currentMovie.poster_path}`}
                alt="poster"
                style={{
                  width: "10rem",
                  height: "auto",
                }}
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
          </div>
          <div className="movie-info">
            <p className="movie-title">{currentMovie.original_title}</p>
            {currentMovie.tagline && (
              <p className="movie-tagline">{currentMovie.tagline}</p>
            )}
            <div className="movie-details-wrapper">
              {currentMovie.runtime && (
                <div className="movie-runtime">
                  <p>Runtime</p>
                  <span>{currentMovie.runtime}&nbsp;Minutes</span>
                </div>
              )}
              {currentMovie.release_date && (
                <div className="movie-releaseDate">
                  <p>Release Date</p>
                 <span>{currentMovie.release_date}</span>
                </div>
              )}
              {currentMovie.vote_average && (
                <div className="movie-vote">
                  <p>Votes</p>
                  <span>{currentMovie.vote_average}/10</span>
                </div>
              )}
              {currentMovie.genres &&
                currentMovie.genres.map((genre) => {
                  const url = `https://www.google.com/search?q=Genres+${genre.name}`;
                  return (
                    <div className="movie-genres">
                      <a href={url} target="_blank" rel="noreferrer">
                        {genre.name}
                      </a>
                    </div>
                  );
                })}
            </div>
            {currentMovie.overview && <p>{currentMovie.overview}</p>}
            <div>
              {reducedCast && (
                <>
                  <h1>Cast</h1>
                  <div className="cast-wrapper">
                    {castIndex > 1 && (
                      <ArrowBackIosIcon
                        onClick={() =>
                          setCastIndex((prevState) => prevState - 1)
                        }
                      />
                    )}

                    {reducedCast.map((cast) => {
                      return (
                        <div>
                          {cast.profile_path && (<img
                            src={`${POSTER_PATH}${cast.profile_path}`}
                            alt="cast"
                            style={{
                              width: "6rem",
                              height: "auto",                              
                              border: "solid 2px #cccccc",
                              borderRadius: "1rem"                              
                            }}
                          />)}
                          <p className="cast-name">{cast.name}</p>
                          <p className="cast-character">{cast.character}</p>
                        </div>
                      );
                    })}
                    {castIndex !== lastIndex && (
                      <ArrowForwardIosIcon
                        onClick={() =>
                          setCastIndex((prevState) => prevState + 1)
                        }
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="movie-language-wrapper">
            {currentMovie.spoken_languages && ( 
              <>
              <span>Languages Used:</span>
              {
                currentMovie.spoken_languages.map(language =>{
                  return <p>{language.english_name}</p>;
                })
              }
              </>  
            )}
            </div>
            <div className="movie-production-wrapper">
            {currentMovie.production_companies && ( 
              <>
              <span>Production Companies:</span>
              {
                currentMovie.production_companies.map(company =>{
                  return <p>{company.name}</p>;
                })
              }
              </>  
            )}
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{color: 'white'}}>Fetching Details</h1>
      )}
    </div>
  );
}
