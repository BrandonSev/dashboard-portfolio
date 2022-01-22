import React from "react";
import { NavLink } from "react-router-dom";

function NewImages() {
  return (
    <>
      <NavLink
        to="/images"
        className={({ isActive }) => (isActive ? "flex-center" : "")}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="currentColor"
            class="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </span>{" "}
        Revenir en arriere
      </NavLink>
      <div className="dashboard_wrapper">
        <div className="dashboard_card">
          <div className="dashboard_title">
            <h1>Ajouter une nouvelle image</h1>
          </div>
          <div className="dashboard_form">
            <form action="">
              <div className="dashboard_form__group">
                <label htmlFor="title">Image:</label>
                <input type="file" accept="jpeg,jpg,png" />
              </div>
            </form>
            <div className="dashboard_form__button">
              <button type="submit" className="button pulse">
                Valider
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewImages;
