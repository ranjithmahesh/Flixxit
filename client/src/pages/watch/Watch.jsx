import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import video from "../../utility/video/video.mp4"; // Corrected the typo in the video import
import "./Watch.scss";

export default function Watch() {
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
        url={video} 
        controls
        width="100%"
        height="100%"
        playing={true}
      />
    </div>
  );
}
