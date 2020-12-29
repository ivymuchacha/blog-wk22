import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { newPost } from "../../../WebAPI";
import { MEDIA_QUERY } from "../../../utils";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
  ${MEDIA_QUERY} {
    width: 95%;
  }
`;

const PostBoard = styled.form`
  background: #ef8354;
  margin: 10%;
  height: 500px;
  align-items: center;
  text-align: center;
  border: 1px solid #ef8354;
  padding-top: 40px;
  ${MEDIA_QUERY} {
    margin: 5% 0;
    height: 550px;
  }
`;
const Title = styled.h2`
  color: #ffffff;
`;
const InputContent = styled.div`
  width: 450px;
  margin: 0 auto;
  text-align: left;
  ${MEDIA_QUERY} {
    width: 95%;
    font-size: 16px;
  }
`;
const InputName = styled.div`
  font-size: 18px;
  color: #ffffff;
  margin: 5px;
`;
const Input = styled.textarea`
  padding: 5px;
  width: 450px;
  border: none;
  ${MEDIA_QUERY} {
    width: 95%;
    font-size: 16px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  background: white;
  color: #ef8354;
  cursor: pointer;
  border-radius: 5px;
  ${MEDIA_QUERY} {
    padding: 15px 20px;
    font-size: 16px;
  }
`;

const ErrorMessage = styled.h3`
  color: #2d3142;
`;
function PostInput({ inputName, inputType, value, onChange, rows }) {
  return (
    <div>
      <InputContent>
        <InputName>{inputName}</InputName>
        <Input rows={rows} type={inputType} onChange={onChange} value={value} />
      </InputContent>
    </div>
  );
}

PostInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.string.isRequired,
};

function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleSubmit = () => {
    setErrorMessage(null);
    if (!title || !body) {
      return setErrorMessage("Please Filled Out the Form.");
    }
    newPost(title, body).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
        return;
      }
      history.push("/");
    });
  };

  return (
    <Root>
      <PostBoard onSubmit={handleSubmit}>
        <Title>發布文章</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <PostInput
          inputName="Title："
          inputType="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <PostInput
          inputName="Content："
          inputType="text"
          rows="10"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <Button>Submit</Button>
      </PostBoard>
    </Root>
  );
}

export default NewPost;
