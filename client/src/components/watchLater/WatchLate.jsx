import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WatchLaterCard from "../card/WatchLaterCard";
import NavBar from "../navbar/NavBar";
import "./WatchLate.scss";
import { BASE_URL } from "../../services/heapler";

function WatchLate() {
  const [clicked, setClicked] = useState(false);
  const [mylist, setMylist] = useState([]);
  const user = useSelector((state) => state.user.user);
  const email = user.email;

  useEffect(() => {
    const getLiledMovieLists = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/user/liked/${email}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setMylist(res.data.movies);
      } catch (err) {
        console.log(err);
      }
    };
    getLiledMovieLists();
  }, [email, clicked]);
  return (
    <>
      <NavBar />
      <div className="watchLate">
        <div className="container">
          <span className="listTitle">My List</span>
          <div className="wrapper">
            {mylist.map((item, i) => (
              <WatchLaterCard
                index={i}
                key={i}
                movie={item}
                setClicked={setClicked}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WatchLate;
