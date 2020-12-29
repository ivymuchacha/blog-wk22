import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { login, getMe } from "../../../WebAPI";
import { setAuthToken, MEDIA_QUERY } from "../../../utils";
import { AuthContext } from "../../../context";

const Root = styled.div`
  margin: 0 auto;
  width: 80%;
  ${MEDIA_QUERY} {
    width: 95%;
  }
`;

const LoginForm = styled.form`
  background: #ef8354;
  margin: 10%;
  height: 300px;
  border: 1px solid #ef8354;
  align-items: center;
  text-align: center;

  ${MEDIA_QUERY} {
    margin: 5% 0;
    height: 400px;
  }
`;
const Title = styled.h2`
  color: #ffffff;
  margin: 35px;
  ${MEDIA_QUERY} {
    font-size: 24px;
    margin: 20px;
  }
`;
const InputContent = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY} {
    display: block;
  }
`;
const InputName = styled.div`
  font-size: 16px;
  color: #ffffff;
  ${MEDIA_QUERY} {
    font-size: 20px;
    margin: 10px;
  }
`;

const Input = styled.input`
  padding: 5px;
  width: 200px;
  border: none;
  ${MEDIA_QUERY} {
    padding: 10px;
    width: 80%;
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
  ${MEDIA_QUERY} {
    margin: 5px;
  }
`;

function LoginInput({ inputName, inputType, value, onChange }) {
  return (
    <div>
      <InputContent>
        <InputName>{inputName}</InputName>
        <Input type={inputType} onChange={onChange} value={value} />
      </InputContent>
    </div>
  );
}

LoginInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
        return;
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setErrorMessage(response.toString());
          setAuthToken(null);
          return;
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };

  return (
    <Root>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <LoginInput
          inputName="Username："
          inputType="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <LoginInput
          inputName="Passwrod："
          inputType="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button>Submit</Button>
      </LoginForm>
    </Root>
  );
}

export default Loginpage;
