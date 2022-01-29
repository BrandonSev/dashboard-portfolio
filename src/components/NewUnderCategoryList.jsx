import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { underCategoryValidationSchema } from "../validation";
import { toast } from "react-toastify";
import axios from "axios";

const NewUnderCategory = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      category_id: 0,
    },
    validationSchema: underCategoryValidationSchema,
    onSubmit: async (values) => {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/underCategories`, values, {
          withCredentials: true,
        })
        .then(async (res) => {
          if (res.status === 201) {
            navigate("/sous-categorie");
            toast.success("Votre sous-catégorie a bien été ajoutée");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });
  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/categories`)
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);
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
            <h1>Ajouter une nouvelle sous-catégorie</h1>
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
                {formik.errors.title && (
                  <p className="error">{formik.errors.title}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <select
                  name="category_id"
                  id="category"
                  onChange={formik.handleChange}
                  className={formik.errors.category_id ? "input-error" : ""}
                  value={formik.values.category_id}
                >
                  <option selected="selected" disabled value={0}>
                    Selectionner une catégorie
                  </option>
                  {category.length ? (
                    category.map((category) => {
                      return (
                        <option
                          key={category.id}
                          value={category.id}
                        >{`${category.id}: ${category.title}`}</option>
                      );
                    })
                  ) : (
                    <option value={0} disabled>
                      Aucune catégorie actuellement en ligne
                    </option>
                  )}
                </select>
                {formik.errors.category_id && (
                  <p className="error">{formik.errors.category_id}</p>
                )}
              </div>
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

export default NewUnderCategory;
