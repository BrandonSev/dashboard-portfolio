import axios from "axios";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { projectValidationSchema } from "../validation";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #FFFFFF33",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function NewProject() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      active: false,
      tags: "",
    },
    validationSchema: projectValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      images.forEach((image) => {
        formData.append("images", image, image.name);
      });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/projects`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        navigate("/projets");
        toast.success("Le projet a bien été ajouté");
      }
    },
  });
  const thumbs = images.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={URL.createObjectURL(file)} style={img} alt={file.name} />
      </div>
    </div>
  ));
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
            <h1>Publier un nouveau projet</h1>
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
                  type="datetime-local"
                  name="start_date"
                  className={formik.errors.start_date ? "input-error" : ""}
                  onChange={formik.handleChange}
                  value={formik.values.start_date}
                />
                {formik.errors.start_date && (
                  <p className="error">{formik.errors.start_date}</p>
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="end_date">Date de fin:</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  className={formik.errors.end_date ? "input-error" : ""}
                  onChange={formik.handleChange}
                  value={formik.values.end_date}
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
                    onChange={(e) => {
                      formik.setFieldValue("active", e.target.checked);
                    }}
                  />
                  <span className="slider round" />
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
              <div className="dashboard_form__group">
                <label htmlFor="">Images</label>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  style={{ border: "1px solid #FFFFFF33", padding: "1rem" }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Déposer içi vos fichiers</p>
                  ) : (
                    <p>Glisser / cliquer içi pour deposer vos images</p>
                  )}
                </div>
                {acceptedFiles && (
                  <aside style={thumbsContainer}>{thumbs}</aside>
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

export default NewProject;
