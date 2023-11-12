import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Login1 from "./pages/LogIn/LogIn1";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";

import { useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import WatchLate from "./components/watchLater/WatchLate";
import AboutPage from "./pages/AboutUs/AboutPage";

const App = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login1 /> : <Redirect to="/" />}</Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/mylist">
              <WatchLate />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
