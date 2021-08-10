import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { Menu } from "semantic-ui-react";

import { GlobalContext } from "../context/GlobalState";

function MenuBasic() {
  let history = useHistory();
  const [activeItem, setActiveItem] = useState("Home");

  const { user, setUser } = useContext(GlobalContext);

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("token")) {
        await fetch("http://localhost:3000/api/users/login", {
          headers: {
            Authorization: localStorage.token,
          },
        })
          .then((res) => res.json())
          .then((user) => setUser(user));
      }
    };
    checkToken();
  }, user);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
    history.push("/");
  };

  return (
    <Menu>
      <Menu.Item
        as={NavLink}
        to="/"
        exact
        name="Home"
        active={activeItem === "Home"}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>

      {Object.keys(user).length === 0 ? (
        <Menu.Item
          as={NavLink}
          to="/login"
          exact
          name="Login"
          active={activeItem === "Login"}
          onClick={handleItemClick}
        >
          Login and Register
        </Menu.Item>
      ) : (
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      )}

      <Menu.Item
        as={NavLink}
        to="/play"
        exact
        name="Play"
        active={activeItem === "Play"}
        onClick={handleItemClick}
      >
        Play A Game
      </Menu.Item>

      {user.scope === 999 && (
        <Menu.Item
          as={NavLink}
          to="/panel"
          exact
          name="Panel"
          active={activeItem === "Panel"}
          onClick={handleItemClick}
        >
          Admin Panel
        </Menu.Item>
      )}
    </Menu>
  );
}

export default MenuBasic;
