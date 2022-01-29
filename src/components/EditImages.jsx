import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react/cjs/react.development";
import { useFormik } from "formik";
import { imagesValidationSchema } from "../validation";

function EditImages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState();
  const formik = useFormik({
    initialValues: {
      images: location.state.src,
      project_id: location.state.project_id,
    },
    enableReinitialize: true,
    validationSchema: imagesValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          project_id: values.project_id,
        })
      );
      formData.append("images", values.images);
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/images/${location.state.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        navigate("/images");
        toast.success("L'image a bien été modifié");
      } else {
        toast.error(res.data.message);
      }
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
            class="bi bi-arrow-left-short"
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
            <h1>Modifier une image</h1>
          </div>
          <div className="dashboard_form">
            <form action="">
              <div className="dashboard_form__group">
                <label htmlFor="images">Image:</label>
                <input
                  type="file"
                  name="images"
                  accept="jpeg,jpg,png"
                  onChange={(e) =>
                    formik.setFieldValue("images", e.target.files[0])
                  }
                />
                {formik.errors.images && (
                  <p className="error">{formik.errors.images}</p>
                )}
                {formik.values.images === formik.initialValues.images ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${formik.values.images}`}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={formik.values.images.filename}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(formik.values.images)}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={formik.values.images.src}
                  />
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="project_id">Projets:</label>
                <select
                  name="project_id"
                  id="project_id"
                  onChange={formik.handleChange}
                  className={formik.errors.project_id ? "input-error" : ""}
                >
                  <option disabled>Veuillez choisir un projet</option>
                  {project ? (
                    project.map((project) => {
                      return (
                        <option
                          key={project.id}
                          value={project.id}
                          selected={location.state.project_id === project.id}
                        >{`${project.id}: ${project.title}`}</option>
                      );
                    })
                  ) : (
                    <option value="null">
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
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditImages;
