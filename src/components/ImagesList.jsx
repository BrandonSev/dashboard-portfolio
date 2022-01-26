import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Remove from "./Remove";

function ImagesList() {
  const [images, setImages] = useState([]);
  const [projectName, setProjectName] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/images`)
        .then(async (res) => {
          setImages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      images.map(async (image) => {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/projects/${image.project_id}`
          )
          .then((res) => {
            setProjectName((prevState) => [...prevState, res.data]);
          });
      });
    })();
  }, [images]);

  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_card">
        <div className="dashboard_title">
          <h1>Liste des images</h1>
          <div className="button_action">
            <NavLink to={"/images/nouveau"} className="button button_small">
              Ajouter
            </NavLink>
          </div>
        </div>
        <div className="dashboard__table">
          <table>
            <thead>
              <tr>
                <th scope={"col"}>Aperçu de l'image</th>
                <th scope={"col"}>Nom de l'image</th>
                <th scope={"col"}>Date</th>
                <th scope={"col"}>Projet</th>
                <th scope={"col"}>Gérer</th>
              </tr>
            </thead>
            <tbody>
              {images.length ? (
                images.map((image, i) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/images/${image.src}`}
                          alt={image.alt}
                          width={90}
                          height={90}
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                      <td>{image.src.split("-")[1].split(".")[0]}</td>
                      <td>{moment(image.created_at).format("DD/MM/Y")}</td>
                      <td>{projectName.length > 0 && projectName[i]?.title}</td>
                      <td className="table_icon">
                        <span>
                          <Link to={`/images/edit/${image.id}`} state={image}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              fill="currentColor"
                              class="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </Link>
                        </span>
                        <Remove
                          path={`/images/${image.id}`}
                          id={image.id}
                          projects={images}
                          setProjects={setImages}
                          flashMessage={"L'image a bien été supprimée"}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan={5}>Vous n'avez pas encore d'image</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ImagesList;
