// List.jsx
import "./List.scss";

import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";

function List({ list }) {
  const listRef = useRef();

  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      distance = listRef.current.getBoundingClientRect().x - 50;
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => {
            handleClick("left");
          }}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} key={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => {
            handleClick("right");
          }}
        />
      </div>
    </div>
  );
}

export default List;
