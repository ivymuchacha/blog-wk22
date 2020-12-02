import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPosts } from "../../../WebAPI";

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

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Root>
  );
}

export default App;
