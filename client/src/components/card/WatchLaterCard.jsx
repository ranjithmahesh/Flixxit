import {
  Delete,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/heapler";
import "./WatchLaterCard.scss";

function WatchLaterCard({ movie, setClicked }) {
  const user = useSelector((state) => state.user.user);
  const [isHovered, setIsHovered] = useState(false);
  const [deleteMove, setDeleteMove] = useState(false);

  const deleteFromList = async () => {
    setDeleteMove(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.accessToken) {
        console.log("Invalid user or token");
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/user/remove`,
        { email: user.email, movieId: movie.id },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );

      setClicked((prevState) => !prevState);
      setDeleteMove(false);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <>
      {movie.length === 0 ? (
        <div className="noMovies">
          <h1 style={{ fontSize: 100 }}>No Movies to show</h1>
        </div>
      ) : (
        <div
          className="watchLaterCard"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={`https://image.tmdb.org/t/p/original${movie.img}`} alt="" />
          {isHovered && (
            <>
              <div className="itemInfo">
                <div className="icons">
                  <Link to={{ pathname: "/watch", movie: movie }}>
                    <PlayArrow className="icon" />
                  </Link>
                  <Delete
                    className={deleteMove ? "deletmovieicon" : "deleticon"}
                    onClick={deleteFromList}
                  />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownOutlined className="icon" />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default WatchLaterCard;
