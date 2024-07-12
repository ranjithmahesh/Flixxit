import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import "./Watch.scss";
import viedo1 from "../../utility/viedo/viedo1.mp4";
import viedo2 from "../../utility/viedo/viedo2.mp4";
import viedo3 from "../../utility/viedo/viedo3.mp4";

const videoList = [viedo1, viedo2, viedo3];

export default function Watch() {
  const [randomVideo, setRandomVideo] = useState("");

  useEffect(() => {
    const shuffledVideos = [...videoList].sort(() => Math.random() - 0.5);
    setRandomVideo(shuffledVideos[0]);
  }, []);
  const handleVideoEnded = () => {
    const shuffledVideos = [...videoList].sort(() => Math.random() - 0.5);
    setRandomVideo(shuffledVideos[0]);
  };

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <ReactPlayer
        className="video"
        url={randomVideo}
        controls
        width="100%"
        height="100%"
        playing={true}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}
