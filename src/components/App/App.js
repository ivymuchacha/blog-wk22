import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Homepage from "../Pages/Homepage";
import LoginPage from "../Pages/Loginpage";
import RegisterPage from "../Pages/RegisterPage";
import NewPost from "../Pages/NewPost";
import PostList from "../Pages/PostList";
import Page from "../Pages/Page";
import AboutPage from "../Pages/About";
import { AuthContext } from "../../context";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router basename="/">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/post-list">
              <PostList />
            </Route>
            <Route exact path="/new-post">
              <NewPost />
            </Route>
            <Route exact path="/post/:id">
              <Page />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
