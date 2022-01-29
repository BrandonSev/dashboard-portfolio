import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Remove from "./Remove";

const TechnologyList = () => {
  const [technologies, setTechnologies] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/technologies`)
        .then((res) => {
          setTechnologies(res.data);
        })
        .catch((err) => {
          toast(err.response.data.message);
        });
    })();
  }, []);

  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_card">
        <div className="dashboard_title">
          <h1>Liste des technologies</h1>
          <div className="button_action">
            <NavLink
              to={"/technologie/nouveau"}
              className="button button_small"
            >
              Ajouter
            </NavLink>
          </div>
        </div>
        <div className="dashboard__table">
          <table>
            <thead>
              <tr>
                <th scope={"col"}>Logo</th>
                <th scope={"col"}>Nom</th>
                <th scope={"col"}>Catégorie</th>
                <th scope={"col"}>Sous-catégorie</th>
                <th scope={"col"}>Gérer</th>
              </tr>
            </thead>
            <tbody>
              {technologies.length ? (
                technologies.map((tech) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/images/${tech.logo}`}
                          alt=""
                          width={60}
                        />
                      </td>
                      <td>{tech.name}</td>
                      <td>{tech.category.title}</td>
                      <td>{tech.under_category.title}</td>
                      <td className="table_icon">
                        <span>
                          <Link
                            to={`/technologie/edit/${tech.id}`}
                            state={tech}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </Link>
                        </span>
                        <Remove
                          path={`/technologies/${tech.id}`}
                          id={tech.id}
                          projects={technologies}
                          setProjects={setTechnologies}
                          flashMessage={"La technologie a bien été supprimé"}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan={5}>Vous n'avez pas encore de technologie</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TechnologyList;
