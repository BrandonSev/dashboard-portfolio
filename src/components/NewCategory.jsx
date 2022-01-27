import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { categoryValidationSchema } from "../validation";
import { toast } from "react-toastify";
import axios from "axios";

const NewCategory = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: categoryValidationSchema,
    onSubmit: async (values) => {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/categories`, values, {
          withCredentials: true,
        })
        .then(async (res) => {
          if (res.status === 201) {
            navigate("/categorie");
            toast.success("Votre catégorie a bien été ajoutée");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });
  return (
    <div>
      <NavLink
        to="/categorie"
        className={(isActive) => (isActive ? "flex-center" : "")}
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
            <h1>Ajouter une nouvelle catégorie</h1>
          </div>
          <div className="dashboard_form">
            <form action="">
              <div className="dashboard_form__group">
                <label htmlFor="title">Nom:</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className={formik.errors.title ? "input-error" : ""}
                />
              </div>
              {formik.errors.title && (
                <p className="error">{formik.errors.title}</p>
              )}
            </form>
            <div className="dashboard_form__button">
              <button
                type="submit"
                className="button pulse"
                onClick={formik.handleSubmit}
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

export default NewCategory;
