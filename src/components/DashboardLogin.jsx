import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";

const DashboardLogin = ({ user, setUser }) => {
  const [state, setState] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, state, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? err);
      });
  };
  return (
    <>
      <div className="admin_left">
        <div className="admin_form__wrapper">
          <h1>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-speedometer"
                viewBox="0 0 16 16"
              >
                <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                <path
                  fillRule="evenodd"
                  d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"
                />
              </svg>
            </span>
            Dashboard
          </h1>
          <form action="">
            <div className="form__group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </div>
            <div className="form__group">
              <button className="button pulse" onClick={handleClick}>
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="admin_right" />
    </>
  );
};

export default DashboardLogin;
