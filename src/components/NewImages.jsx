import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";

function NewImages() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [project, setProject] = useState([]);
  const [projectId, setProjectId] = useState();
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("images", file);
    formData.append("data", JSON.stringify(projectId));
    (async () => {
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
    })();
  };
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
                <input
                  type="file"
                  name="title"
                  accept="jpeg,jpg,png"
                  onChange={handleChange}
                />
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={file.name.split(".")[0]}
                  />
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="project">Projets:</label>
                <select
                  name="project"
                  id="project"
                  onChange={(e) => setProjectId({ project_id: e.target.value })}
                >
                  <option selected="selected" disabled>
                    Selectionner le projet
                  </option>
                  {project.length ? (
                    project.map((project) => {
                      return (
                        <option
                          value={project.id}
                        >{`${project.id}: ${project.title}`}</option>
                      );
                    })
                  ) : (
                    <option value="null">
                      Aucun projet actuellement en ligne
                    </option>
                  )}
                </select>
              </div>
            </form>
            <div className="dashboard_form__button">
              <button
                type="submit"
                className="button pulse"
                onClick={handleSubmit}
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
