import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../context";

const Navbar = styled.div`
  display: flex;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 64px;
  position: fixed;
  border: 1px solid #bfc0c0;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: white;
`;

const NavList = styled.div`
  display: flex;
  height: 64px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavList} {
    margin-left: 30px;
  }
`;

const Brand = styled(Link)`
  color: #2d3142;
  text-decoration: none;
  font-size: 32px;
  font-weight: bold;
`;

const Nav = styled(Link)`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  color: #4f5d75;
  text-decoration: none;
  height: 100%;
  box-sizing: border-box;

  ${(props) => props.$active && `background: rgba(0, 0, 0, 0.2)`}
`;

function App() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  return (
    <Navbar>
      <LeftContainer>
        <Brand to="/">部落格 Blog</Brand>
        <NavList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          <Nav to="/about" $active={location.pathname === "/about"}>
            關於我
          </Nav>
          <Nav to="/post-list" $active={location.pathname === "/post-list"}>
            文章列表
          </Nav>
        </NavList>
      </LeftContainer>
      <NavList>
        {!user && (
          <Nav to="/register" $active={location.pathname === "/register"}>
            註冊
          </Nav>
        )}
        {!user && (
          <Nav to="/login" $active={location.pathname === "/login"}>
            登入
          </Nav>
        )}
        {user && (
          <Nav to="/new-post" $active={location.pathname === "/new-post"}>
            發布文章
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavList>
    </Navbar>
  );
}

export default App;
