import React from "react";
import { NavLink } from "react-router-dom";

function ProjetsList() {
  return (
    <div className="dashboard_content__body">
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
              <th scope={"col"}>Nom du projet</th>
              <th scope={"col"}>Description</th>
              <th scope={"col"}>Date</th>
              <th scope={"col"}>Gérer</th>
              <th scope={"col"}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Titre du projet</td>
              <td>Ma description de mon projet mis en ligne</td>
              <td>4 Janvier 2021</td>
              <td>fhkhfjk</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>nom du projet</td>
              <td>ma description</td>
              <td>2021-01-01</td>
              <td>fhkhfjk</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>nom du projet</td>
              <td>ma description</td>
              <td>2021-01-01</td>
              <td>fhkhfjk</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjetsList;
