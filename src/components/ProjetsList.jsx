import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Remove from "./Remove";

function ProjetsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/projects`)
        .then((res) => {
          setProjects(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);
  return (
    <div className="project_list dashboard_content__body">
      <div className="dashboard_content__header">
        <h1>Liste des projets</h1>
        <div className="button_action">
          <NavLink to={"/projets/nouveau"} className="button button_small">
            Ajouter
          </NavLink>
        </div>
      </div>
      <div className="dashboard__table">
        <table>
          <thead>
            <tr>
              <th scope={"col"}>Aperçu du projet</th>
              <th scope={"col"}>Nom du projet</th>
              <th scope={"col"}>Description</th>
              <th scope={"col"}>Date de début</th>
              <th scope={"col"}>Date de fin</th>
              <th scope={"col"}>Tags</th>
              <th scope={"col"}>Url</th>
              <th scope={"col"}>Gérer</th>
              <th scope={"col"}>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.length ? (
              projects.map((project) => {
                return (
                  <tr key={project.id}>
                    <td style={{ textAlign: "center" }}>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/${project.images[0].src}`}
                        alt={project.images[0].alt}
                        width={90}
                      />
                    </td>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{moment(project.start_date).format("DD/MM/Y")}</td>
                    <td>{moment(project.end_date).format("DD/MM/Y")}</td>
                    <td>{project.tags}</td>
                    <td>{project.url}</td>
                    <td className="table_icon">
                      <NavLink to={`/projets/edit/${project.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          fill="currentColor"
                          class="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </NavLink>
                      <Remove
                        path={`/projects/${project.id}`}
                        id={project.id}
                        projects={projects}
                        setProjects={setProjects}
                        flashMessage={"Le projet a bien été supprimé"}
                      />
                    </td>
                    <td>
                      {project.active === 1 ? (
                        <span className="pill_green">En ligne</span>
                      ) : (
                        <span className="pill_red">Hors ligne</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={7}>
                  Vous n'avez actuellement aucun projet en ligne
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjetsList;
