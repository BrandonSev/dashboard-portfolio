import React from 'react';
import {NavLink} from "react-router-dom";

const NewTechnology = () => {
  return (
    <div className="technology">
      <NavLink
        to="/technologie"
        className={( isActive ) => isActive ? "flex-center" : ""}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </span>{" "}
        Revenir en arriere
      </NavLink>
      <div className="dashboard_wrapper">
        <div className="dashboard_card">
          <div className="dashboard_title">
            <h1>Ajouter une nouvelle technologie</h1>
          </div>
          <div className="dashboard_form">
            <form action="">
              <div className="dashboard_form__group">
                <label htmlFor="title">Logo:</label>
                <input
                  type="file"
                  name="images"
                  accept="jpeg,jpg,png"
                />

              </div>
              <div className="dashboard_form__group">
                <label htmlFor="name">Nom:</label>
                <input type="text"/>
              </div>
            </form>
            <div className="dashboard_form__button">
              <button
                type="submit"
                className="button pulse"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTechnology;
