import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useParams } from "react-router";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { red } from "@material-ui/core/colors";
import toast from "react-hot-toast";
import { UserContext } from "../../App";
import "./Movies.css";
import {ReactComponent as Loader} from "../../assets/loader.svg"

const POSTER_PATH = "https://image.tmdb.org/t/p/original";

const MovieSection = ({ searchmovies }) => {
  let { pageNumber } = useParams();
  let history = useHistory();
  console.log("serachmoveis", searchmovies);
  const [movies, setmovies] = useState(null);
  const [loading,setLoading] = useState(true)
  // const [page, setpage] = useState(1);
  useEffect(async() => {
    setLoading(true)
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=f569e379d2c0bc46e541ef9379a90215&language=en-US&page=${pageNumber}`;
    console.log("PageNumber", pageNumber, url);
    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setmovies(data);
      setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
    }, [pageNumber]);
  // const alterpage = (e) => {
    //   if (e === 0) return;
  //   setpage(e);
  //   const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=f569e379d2c0bc46e541ef9379a90215&language=en-US&page=${e}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
    //       setmovies(data);
    //     });
    // };
    useEffect(async() => {
    setLoading(true)
    if (searchmovies && searchmovies.results)
    setTimeout(setmovies(searchmovies), 2000);
    else {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=f569e379d2c0bc46e541ef9379a90215&language=en-US&page=${pageNumber}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setmovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // setLoading(false)
  }, [pageNumber, searchmovies]);
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
  return (
    <div style={{ margin: "2rem auto", width: "95%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* {movies && ( <div onClick={() => alterpage(page + 1)}>
            <ArrowBackIosIcon
              style={{
                cursor: 'pointer',
                color: 'white',
                height: '100%',
                marginLeft: '-3rem',
                position: 'absolute',
              }}
            />
          </div>)} */}
        {/* {movies && (<div onClick={() => alterpage(page + 1)}>
            <ArrowForwardIosIcon
              style={{
                cursor: 'pointer',
                color: 'white',
                height: '100%',
                right: '1rem',
                position: 'absolute',
              }}
            />
          </div>)} */}
        {loading?
        <Loader style={{marginTop:"200px"}}/>:
        movies &&
          movies.results.map((element) => {
            const { poster_path, id } = element;
            return (
              <div style={{ margin: "0.3rem", position: "relative" }}>
                <img
                  src={`${POSTER_PATH}${poster_path}`}
                  alt="poster"
                  style={{ width: "10rem", height: "auto" }}
                  className="posters"
                  onClick={() => {
                    history.push(`/movie/${id}`);
                  }}
                />
                <div
                  className="favouritetab"
                  onClick={() => {
                    addfavourite(id, poster_path);
                  }}
                >
                  Favourite{"  "} &nbsp;
                  <FavoriteIcon style={{ color: red[500] }} />
                </div>
              </div>
            );
          })}
      </div>

      {movies && (
        <div className="pagination">
          {+pageNumber > 1 ? (
            <Link to={`/home/${parseInt(pageNumber) - 1}`}>
              <ArrowBackIosIcon
                style={{
                  cursor: "pointer",
                  color: "white",
                }}
              />
            </Link>
          ) : (
            <ArrowBackIosIcon
              style={{
                cursor: "pointer",
                color: "white",
              }}
            />
          )}
          <div className="page-number">{pageNumber}</div>

          <Link to={`/home/${parseInt(pageNumber) + 1}`}>
            <ArrowForwardIosIcon
              style={{
                cursor: "pointer",
                color: "white",
              }}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieSection;
