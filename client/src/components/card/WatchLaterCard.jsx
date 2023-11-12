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
        "http://localhost:8000/api/user/remove",
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

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

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
