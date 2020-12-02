import React from "react";
import styled from "styled-components";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 20px;
`;

const PostTitle = styled.div`
  font-size: 20px;
  text-decoration: none;
  color: #2d3142;
`;

const PostContent = styled.div`
  padding: 20px;
  color: #4f5d75;
  line-height: 2em;
  word-break: break-all;
  white-space: break-spaces;
`;

function App() {
  return (
    <Root>
      <PostContainer>
        <PostTitle>關於我</PostTitle>
      </PostContainer>
      <PostContent>安安你好啊～ 這是我的部落格</PostContent>
    </Root>
  );
}

export default App;
