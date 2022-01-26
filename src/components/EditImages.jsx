import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react/cjs/react.development";

function EditImages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(location.state[0]);
  const [projectId, setProjectId] = useState();
  const [project, setProject] = useState();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    setProjectId(e.target.value);
  };

  const handleClick = (e) => {
    (async () => {
      const formData = new FormData();
      if (file) formData.append("images", file);
      if (projectId)
        formData.append("data", JSON.stringify({ project_id: projectId }));
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/images/${location.state.id}`,
          formData
        )
        .then((res) => {
          navigate("/images");
          toast.success("L'image a bien été modifiée");
        })
        .catch((err) => {
          toast(err.response.message);
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
            <h1>Modifier une image</h1>
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
                {location.state && !file ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${location.state.src}`}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={location.state.src}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(file)}
                    width={220}
                    style={{ marginTop: "1rem" }}
                    alt={location.state.src}
                  />
                )}
              </div>
              <div className="dashboard_form__group">
                <label htmlFor="project">Projets:</label>
                <select
                  name="project"
                  id="project"
                  onChange={handleSelectChange}
                >
                  {project ? (
                    project.map((project) => {
                      return (
                        <option
                          value={project.id}
                          selected={
                            location.state.project_id === project.id
                              ? true
                              : false
                          }
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
                onClick={handleClick}
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
