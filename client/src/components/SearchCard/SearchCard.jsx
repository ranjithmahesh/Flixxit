import React from "react";
import "./SearchCard";
import { Link } from "react-router-dom";

function SearchCard({ result }) {
  console.log(result);
  return (
    <Link to={"/watch"}>
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
          alt=""
        />
        <div className="result">{result.title}</div>
      </div>{" "}
    </Link>
  );
}

export default SearchCard;
