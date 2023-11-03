import React, { useContext, useEffect } from "react";
import { AuthContext, FireBaseContext } from "./store/Context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Post from "./store/PostContext";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";

function App() {
  const { user,setUser } = useContext(AuthContext);
  const { auth } = useContext(FireBaseContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <Post>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/create" Component={user?Create:Login} />
          <Route exact path="/viewPost" Component={ViewPost} />
        </Routes>
      </Post>
    </Router>
  );
}

export default App;
