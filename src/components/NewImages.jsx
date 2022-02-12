import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { imagesValidationSchema } from "../validation";

function NewImages() {
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const formik = useFormik({
    initialValues: {
      images: "",
      project_id: 0,
    },
    validationSchema: imagesValidationSchema,
    onSubmit: async (values) => {
      if (!values.images && values.project_id === 0)
        toast("Tout les champs sont nécessaire a la création d'une image");
      const formData = new FormData();
      formData.append("images", values.images);
      formData.append("data", JSON.stringify(values));
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/images`, formData, {
          withCredentials: true,
        })
        .then(async (res) => {
          if (res.status === 201) {
            navigate("/images");
            toast.success("Votre image a bien été ajoutée");
          } else {
            toast(res.data.message);
          }
        })
        .catch((err) => {
          toast(err.response.data.message);
        });
    },
  });
  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/projects`)
        .then((res) => {
          setProject(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);
  return (
    <div className="images">
      <NavLink
        to="/images"
        className={({ isActive }) => (isActive ? "flex-center" : "")}
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
            <h1>Ajouter une nouvelle image</h1>
          </div>
          <div className="dashboard_form">
            <form action="">
              <div className="dashboard_form__group">
                <label htmlFor="images">Image:</label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept="jpeg,jpg,png"
                  className={formik.errors.images ? "input-error" : ""}
                  onChange={(e) =>
                    formik.setFieldValue("images", e.target.files[0])
                  }
                />
                {formik.values.images !== "" && (
                  <img
                    src={URL.createObjectURL(formik.values.images)}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={""}
                  />
                )}
                {formik.errors.images && (
                  <p className="error">{formik.errors.images}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="project">Projets:</label>
                <select
                  name="project_id"
                  id="project"
                  onChange={formik.handleChange}
                  value={formik.values.project_id}
                  className={formik.errors.project_id ? "input-error" : ""}
                >
                  <option selected="selected" disabled value={0}>
                    Selectionner le projet
                  </option>
                  {project.length ? (
                    project.map((project) => {
                      return (
                        <option
                          key={project.id}
                          value={project.id}
                        >{`${project.id}: ${project.title}`}</option>
                      );
                    })
                  ) : (
                    <option value="0">
                      Aucun projet actuellement en ligne
                    </option>
                  )}
                </select>
                {formik.errors.project_id && (
                  <p className="error">{formik.errors.project_id}</p>
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
}

export default NewImages;
