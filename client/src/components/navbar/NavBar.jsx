import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/user";
import SearchCard from "../SearchCard/SearchCard";
import "./NavBar.scss";

function NavBar() {
  const [isScrolled, setisScrolled] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  window.onscroll = () => {
    setisScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=2899f02f6123f09db3aecc457a24629e&query=${searchTerm}&page=1`
        )
        .then((response) => {
          const movieDetails = response.data;
          // Limit to the first 10 results
          const first10Results = movieDetails.results.slice(0, 5);
          setSearchResults(first10Results);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  const menuList = [
    { id: 1, name: "Home page", to: "/" },
    { id: 2, name: "Series", to: "/series", className: "navbarmainLinks" },
    { id: 3, name: "Movies", to: "/movies", className: "navbarmainLinks" },
    { id: 4, name: "My List", to: "/mylist" },
    { id: 5, name: "About Us", to: "/about" },
  ];

  return (
    <div className={isScrolled ? "NavBar scrolled" : "NavBar"}>
      <div className="container">
        <div className="left">
          <Link to={"/"} className="link">
           <h1>Flixxit </h1>
          </Link>
          {menuList.map((item) => (
            <Link key={item.id} to={item.to} className="link">
              <span className={item.className}>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="right">
          <Search
            className={searchBar ? "dontShowicon" : "icon icon1"}
            onClick={() => setSearchBar(!searchBar)}
          />
          {searchBar && (
            <div className="searchcontainer">
              <div className="searchBar">
                <Search
                  className="icon"
                  onClick={() => setSearchBar(!searchBar)}
                />
                <input
                  placeholder="Search for movies, TV shows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="searchResults">
                {searchResults.map((result) => (
                  <SearchCard result={result} key={result.id} />
                ))}
              </div>
            </div>
          )}
          <span>KID</span>
          <Notifications className="icon" />
          <Link to={"/profile"}>
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
