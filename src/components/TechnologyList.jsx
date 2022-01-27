import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const TechnologyList = () => {
  const [technologies, setTechnologies] = useState([]);
  useEffect(() => {
    (async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/technologies`)
        .then(res => {
          setTechnologies(res.data)
        })
        .catch(err => {
          toast(err.response.data.message)
        })
    })()
  }, [])

  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_card">
        <div className="dashboard_title">
          <h1>Liste des technologies</h1>
          <div className="button_action">
            <NavLink to={"/technologie/nouveau"} className="button button_small">
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
              <th scope={"col"}>Date</th>
              <th scope={"col"}>Gérer</th>
            </tr>
            </thead>
            <tbody>
            {technologies.length ? (
              technologies.map((image, i) => {
                return (
                  <tr>
                    {/*afficher ici les information des technologies*/}
                  </tr>
                );
              })
            ) : (
              <tr style={{textAlign: "center"}}>
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
