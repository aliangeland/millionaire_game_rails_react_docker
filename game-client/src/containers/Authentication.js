import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Tab } from "semantic-ui-react";

import Login from "../components/Login";
import Register from "../components/Register";

import { GlobalContext } from "../context/GlobalState";

function Authentication() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(GlobalContext);

  const handleLogin = async () => {
    await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => res.json())
      .then((data) => setAuthDataAndNavigate(data))
      .catch((e) => {
        alert(e);
      });
  };

  const handleRegister = async () => {
    await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, password }),
    })
      .then((res) => res.json())
      .then((data) => setAuthDataAndNavigate(data))
      .catch((e) => {
        alert(e);
      });
  };

  const setAuthDataAndNavigate = (data) => {
    if (!data.failure) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      history.push("/play");
    } else {
      alert(data.failure);
    }
  };

  const panes = [
    {
      menuItem: "Login",
      render: () => (
        <Tab.Pane>
          <Login
            name={name}
            password={password}
            setName={setName}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Register",
      render: () => (
        <Tab.Pane>
          <Register
            name={name}
            surname={surname}
            password={password}
            setName={setName}
            setSurname={setSurname}
            setPassword={setPassword}
            handleRegister={handleRegister}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Fragment>
      <Grid centered style={{ marginTop: "6em" }}>
        <Grid.Row>
          <Grid.Column width={8}>
            <Tab panes={panes} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
}

export default Authentication;
