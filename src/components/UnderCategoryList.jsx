import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Remove from "./Remove";
import axios from "axios";

const UnderCategoryList = () => {
  const [underCategoryList, setUnderCategoryList] = useState([]);
  const [categorylist, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/underCategories`)
        .then((res) => {
          setUnderCategoryList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      underCategoryList.map(async (underCategory) => {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/categories/${underCategory.category_id}`
          )
          .then((res) => {
            setCategoryList((prevState) => [...prevState, res.data]);
          })
          .catch((err) => console.log(err));
      });
    })();
  }, [underCategoryList]);

  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_card">
        <div className="dashboard_title">
          <h1>Liste des Sous-catégories</h1>
          <div className="button_action">
            <NavLink
              to={"/sous-categorie/nouveau"}
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
                <th scope={"col"}>Nom</th>
                <th scope={"col"}>Catégorie</th>
                <th scope={"col"}>Gérer</th>
              </tr>
            </thead>
            <tbody>
              {underCategoryList.length ? (
                underCategoryList.map((underCategory, i) => {
                  return (
                    <tr>
                      <td>{underCategory.title}</td>
                      <td>
                        {categorylist.length > 0 && categorylist[i]?.title}
                      </td>
                      <td className="table_icon">
                        <span>
                          <Link
                            to={`/sous-categorie/edit/${underCategory.id}`}
                            state={{ underCategory }}
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
                          path={`/underCategories/${underCategory.id}`}
                          id={underCategory.id}
                          projects={underCategoryList}
                          setProjects={setUnderCategoryList}
                          flashMessage={
                            "La sous-catégorie a bien été supprimée"
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td colSpan={3}>
                    Vous n'avez aucune sous-catégorie actuellement
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnderCategoryList;
