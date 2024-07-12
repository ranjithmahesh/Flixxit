import { PlayArrow, InfoOutlined } from "@mui/icons-material";
import "./Featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/heapler";

function Featured({ type, setGenre }) {
  const genreList = [
    { id: 1, name: "Advanture", value: "advanture" },
    { id: 2, name: "Comedy", value: "comedy" },
    { id: 3, name: "Crime", value: "crime" },
    { id: 4, name: "Fantasy", value: "fantasy" },
    { id: 5, name: "Historical", value: "historical" },
    { id: 6, name: "Horror", value: "horror" },
    { id: 7, name: "Romance", value: "romance" },
    { id: 8, name: "Sci-fi", value: "sci-fi" },
    { id: 9, name: "Thriller", value: "thriller" },
    { id: 10, name: "Westren", value: "westren" },
    { id: 11, name: "Animation", value: "animation" },
    { id: 12, name: "Drama", value: "drama" },
    { id: 13, name: "Documentary", value: "documentary" },
  ];

  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "TV Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option> Genre</option>
            {genreList.map((item, i) => (
              <option key={i}> {item.name}</option>
            ))}
          </select>
        </div>
      )}
      <img src={`https://image.tmdb.org/t/p/original${content.img}`} alt="" />
      <div className="info">
        <h1>{content.title}</h1>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link to={"/watch"} className="link">
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
