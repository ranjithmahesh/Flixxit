import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListItem.scss";
import { useSelector } from "react-redux";

function ListItem({ index, item }) {
  const user = useSelector((state) => state.user.user);
  const [isHovered, setIsHovered] = useState(false);
  const [addMovie, setAddMovie] = useState(false);
  const [movie, setMovie] = useState({});
  const [likedMove, setLikedMove] = useState(false);
  const [dislikedMove, setDislikedMove] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/movies/find/${item}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );

        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, [item]);

  const addToList = async () => {
    setAddMovie(true);

    try {
      const newMovie = { ...movie, id: generateUniqueId() };

      await axios.post(
        `http://localhost:8000/api/user/add`,
        { email: user.email, data: newMovie },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );

      setAddMovie(false);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };



  const increment = () => {
    if (!likedMove) {
      setLikedMove(true);
      setDislikedMove(false);
      setMovie((prevMovie) => ({
        ...prevMovie,
        likes: prevMovie.likes + 1,
      }));
    }
  };

  const decrement = () => {
    if (!dislikedMove) {
      setLikedMove(false);
      setDislikedMove(true);
      setMovie((prevMovie) => ({
        ...prevMovie,
        likes: Math.max(0, prevMovie.likes - 1),
      }));
    }
  };

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/original${movie.img}`} alt="" />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <Link to={{ pathname: "/watch", movie: movie }}>
                <PlayArrow className="icon" />
              </Link>
              <Add
                className={addMovie ? "addmovieicon" : "icon"}
                onClick={addToList}
              />
              <ThumbUpAltOutlined
                className="icon"
                style={{ background: likedMove ? "green" : "inherit" }}
                onClick={increment}
              />
              {likedMove && <span className="like_Button">{movie.likes}</span>}
              {dislikedMove && (
                <span className="like_Button">{movie.likes}</span>
              )}
              <ThumbDownOutlined
                className="icon"
                onClick={decrement}
                style={{ background: dislikedMove ? "red" : "inherit" }}
              />
            </div>
            <div className="itemInfoTop">
              <span>{movie.title}</span>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListItem;
