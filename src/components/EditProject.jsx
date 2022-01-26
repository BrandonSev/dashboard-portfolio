import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import { projectValidationSchema } from "../validation";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const formik = useFormik({
    initialValues: {
      title: project.title,
      description: project.description,
      start_date: moment(project.start_date).format("Y-M-D"),
      end_date: moment(project.end_date).format("Y-MM-DD"),
      active: project.active,
      tags: project.tags,
    },
    enableReinitialize: true,
    projectValidationSchema,
    onSubmit: async (values) => {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/projects/${project.id}`, {
          ...values,
          active: values.active[0] === "on" ? 1 : 0,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/projets");
            toast.success("Le projet a bien été modifié");
          } else {
            toast(res.data.message);
          }
        });
    },
  });

  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/projects/${id}`)
        .then((res) => {
          setProject(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [id]);

  return (
    <div>
      <NavLink
        to="/projets"
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
            <h1>Editer le projet: {project.title}</h1>
          </div>
          <div className="dashboard_form">
            <form>
              <div className="dashboard_form__group">
                <label htmlFor="title">Titre du projet:</label>
                <input
                  type="text"
                  name="title"
                  className={formik.errors.title ? "input-error" : ""}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {formik.errors.title && (
                  <p className="error">{formik.errors.title}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="description">Description:</label>
                <textarea
                  name="description"
                  rows={10}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  className={formik.errors.description ? "input-error" : ""}
                />
                {formik.errors.description && (
                  <p className="error">{formik.errors.description}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="start_date">Date de début:</label>
                <input
                  type="date"
                  name="start_date"
                  className={formik.errors.start_date ? "input-error" : ""}
                  onChange={formik.handleChange}
                  value={moment(formik.values.start_date).format("Y-MM-DD")}
                />
                {formik.errors.start_date && (
                  <p className="error">{formik.errors.start_date}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="end_date">Date de fin:</label>
                <input
                  type="date"
                  name="end_date"
                  className={formik.errors.end_date ? "input-error" : ""}
                  onChange={formik.handleChange}
                  value={moment(formik.values.end_date).format("Y-MM-DD")}
                />
                {formik.errors.end_date && (
                  <p className="error">{formik.errors.end_date}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <p>En ligne ?</p>
                <label htmlFor="active" className="toggle">
                  <input
                    type="checkbox"
                    name="active"
                    id="active"
                    defaultChecked={formik.values.active}
                    onChange={formik.handleChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="tags">Tags:</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="ReactJs, Javascript, ..."
                  className={formik.errors.tags ? "input-error" : ""}
                  onChange={formik.handleChange}
                  value={formik.values.tags}
                />
                {formik.errors.tags && (
                  <p className="error">{formik.errors.tags}</p>
                )}
              </div>
            </form>
            <div className="dashboard_form__button">
              <button
                onClick={formik.handleSubmit}
                className="button pulse"
                type="submit"
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

export default EditProject;
