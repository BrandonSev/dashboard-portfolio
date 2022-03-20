import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { technologyValidationSchema } from "../validation";
import axios from "axios";
import { toast } from "react-toastify";

const NewTechnology = () => {
  const [category, setCategory] = useState([]);
  const [underCategories, setUnderCategories] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      logo: "",
      category_id: 0,
      under_category_id: 0,
    },
    enableReinitialize: true,
    validationSchema: technologyValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: values.title,
          category_id: values.category_id,
          under_category_id: values.under_category_id,
        })
      );
      formData.append("images", values.logo);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/technologies`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        navigate("/technologie");
        toast.success("La technologie a bien été ajouté");
      } else {
        toast.error(res.data.message);
      }
    },
  });

  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/categories`)
        .then(async (res) => {
          setCategory(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (formik.values.category_id !== 0)
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/categories?under_category=${formik.values.category_id}`
          )
          .then((res) => {
            setUnderCategories(res.data);
          })
          .catch((err) => console.log(err));
    })();
  }, [formik.values.category_id]);

  return (
    <div className="technology">
      <NavLink
        to="/technologie"
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
            <h1>Ajouter une nouvelle technologie</h1>
          </div>
          <div className="dashboard_form">
            <form action="">
              <div className="dashboard_form__group">
                <label htmlFor="title">Logo:</label>
                <input
                  type="file"
                  name="logo"
                  accept="jpeg,jpg,png"
                  onChange={(e) =>
                    formik.setFieldValue("logo", e.target.files[0])
                  }
                  className={formik.errors.logo ? "input-error" : ""}
                />
                {formik.errors.logo && (
                  <p className="error">{formik.errors.logo}</p>
                )}
                {formik.values.logo && (
                  <img
                    src={URL.createObjectURL(formik.values.logo)}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={formik.values.logo.filename}
                  />
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="title">Nom:</label>
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className={formik.errors.title ? "input-error" : ""}
                />
                {formik.errors.title && (
                  <p className="error">{formik.errors.title}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="category_id">Catégorie:</label>
                <select
                  name="category_id"
                  id="category_id"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "category_id",
                      parseInt(e.target.value, 10)
                    )
                  }
                  className={formik.errors.category_id ? "input-error" : ""}
                >
                  <option selected value={0}>
                    Veuillez choisir une catégorie
                  </option>
                  {category ? (
                    category.map((category) => {
                      return (
                        <option
                          key={category.id}
                          value={category.id}
                        >{`${category.id}: ${category.title}`}</option>
                      );
                    })
                  ) : (
                    <option value="">Aucun projet actuellement en ligne</option>
                  )}
                </select>
                {formik.errors.category_id && (
                  <p className="error">{formik.errors.category_id}</p>
                )}
              </div>
              {formik.values.category_id !== 0 && (
                <div className="dashboard_form__group">
                  <label htmlFor="under_category_id">Sous-catégorie:</label>
                  <select
                    name="under_category_id"
                    id="under_category_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.under_category_id ? "input-error" : ""
                    }
                  >
                    <option selected value="">
                      Veuillez choisir une catégorie
                    </option>
                    {underCategories ? (
                      underCategories.map((underCategory) => {
                        return (
                          <option
                            value={underCategory.id}
                          >{`${underCategory.id}: ${underCategory.title}`}</option>
                        );
                      })
                    ) : (
                      <option value="">
                        Aucun projet actuellement en ligne
                      </option>
                    )}
                  </select>
                  {formik.errors.under_category_id && (
                    <p className="error">{formik.errors.under_category_id}</p>
                  )}
                </div>
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

export default NewTechnology;
