import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setAuthToken, MEDIA_QUERY } from "../../utils";
import { AuthContext } from "../../context";

const NavbarArea = styled.div`
  display: flex;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 64px;
  position: fixed;
  border: 1px solid #bfc0c0;
  align-items: center;
  padding: 0 30px;
  background: white;

  ${MEDIA_QUERY} {
    display: block;
    height: 130px;
    justify-content: center;
    padding: 0;
  }
`;

const NavList = styled.div`
  display: flex;
  height: 64px;

  ${MEDIA_QUERY} {
    height: 64px;
    justify-content: center;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${NavList} {
    margin-left: 30px;
    ${MEDIA_QUERY} {
      margin-left: 0px;
    }
  }
`;

const Brand = styled(Link)`
  color: #2d3142;
  text-decoration: none;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  min-width: 200px;
  ${MEDIA_QUERY} {
    div {
      padding: 10px;
    }
    justify-content: center;
  }
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
  ${MEDIA_QUERY} {
    width: 75px;
  }

  ${(props) => props.$active && "background: rgba(0, 0, 0, 0.2)"}
`;

function Navbar() {
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
    <NavbarArea>
      <Brand to="/">
        <div>部落格 Blog</div>
      </Brand>
      <Container>
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
      </Container>
    </NavbarArea>
  );
}

export default Navbar;
