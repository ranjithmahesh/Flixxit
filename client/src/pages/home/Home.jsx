// Home.jsx
import { useEffect, useState } from "react";
import axios from "../../axios";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/NavBar";
import Featured from "../featured/Featured";
import "./Home.scss";
import { BASE_URL } from "../../services/heapler";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

 

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, i) => (
        <List list={list} key={i} />
      ))}
    </div>
  );
};

export default Home;
