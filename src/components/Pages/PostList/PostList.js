import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSomePosts, getPosts } from "../../../WebAPI";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bfc0c0;
  padding: 20px;
  :hover {
    background: #bfc0c0;
  }
`;

const PostTitle = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: #2d3142;
`;

const PostTime = styled.div`
  color: #4f5d75;
`;

const Paginator = styled.div`
  display: flex;
  justify-content: center;
`;
const Page = styled.div`
  width: 10px;
  margin-top: 20px;
  padding: 5px 10px;
  background: #ef8354;
  color: #ffffff;
  cursor: pointer;
  & + & {
    margin-left: 5px;
  }
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
    </PostContainer>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([1]);
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    getPosts().then((item) => {
      const listOfPage = [];
      for (let i = 1; i <= Math.ceil(item.length / 5); i++) {
        listOfPage.push(i);
      }
      setAllPages(listOfPage);
    });
  }, []);

  useEffect(() => {
    getSomePosts(pages).then((data) => setPosts(data));
  }, [pages]);

  const handleClick = (page) => {
    setPages(page);
  };

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Paginator>
        {allPages.map((page) => (
          <Page key={page} onClick={() => handleClick(page)}>
            {page}
          </Page>
        ))}
      </Paginator>
    </Root>
  );
}

export default App;
