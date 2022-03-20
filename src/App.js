import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardLogin from "./components/DashboardLogin";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ProjetsList from "./components/ProjetsList";
import NewProject from "./components/NewProject";
import ImagesList from "./components/ImagesList";
import NewImages from "./components/NewImages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./store";
import EditProject from "./components/EditProject";
import EditImages from "./components/EditImages";
import TechnologyList from "./components/TechnologyList";
import NewTechnology from "./components/NewTechnology";
import CategoryList from "./components/CategoryList";
import NewCategory from "./components/NewCategory";
import EditCategory from "./components/EditCategory";
import UnderCategoryList from "./components/UnderCategoryList";
import NewUnderCategoryList from "./components/NewUnderCategoryList";
import EditUnderCategoryList from "./components/EditUnderCategoryList";
import EditTechnology from "./components/EditTechnology";

function App() {
  const [user, setUser] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/jwtid`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.id);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        }))();
  }, [user]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!loading && user === 0 ? (
        <Routes>
          <Route
            path="/"
            element={<DashboardLogin user={user} setUser={setUser} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <>
          {!loading && (
            <userContext.Provider value={{ user, setuser: setUser }}>
              <Sidebar />
              <TopBar setUser={setUser} />
              <div className="dashboard_main">
                <Routes>
                  <Route path="/" exact element={<Dashboard />} />
                  <Route path="/projets" exact element={<ProjetsList />} />
                  <Route
                    path="/projets/nouveau"
                    exact
                    element={<NewProject />}
                  />
                  <Route
                    path="/projets/edit/:id"
                    exact
                    element={<EditProject />}
                  />
                  <Route path="/images" exact element={<ImagesList />} />
                  <Route path="/images/nouveau" exact element={<NewImages />} />
                  <Route
                    path="/images/edit/:id"
                    exact
                    element={<EditImages />}
                  />
                  <Route
                    path="/technologie"
                    exact
                    element={<TechnologyList />}
                  />
                  <Route
                    path="/technologie/nouveau"
                    exact
                    element={<NewTechnology />}
                  />
                  <Route
                    path="/technologie/edit/:id"
                    exact
                    element={<EditTechnology />}
                  />
                  <Route path="/categorie" exact element={<CategoryList />} />
                  <Route
                    path="/categorie/nouveau"
                    exact
                    element={<NewCategory />}
                  />
                  <Route
                    path="/categorie/edit/:id"
                    exact
                    element={<EditCategory />}
                  />
                  <Route
                    path="/sous-categorie"
                    exact
                    element={<UnderCategoryList />}
                  />
                  <Route
                    path="/sous-categorie/nouveau"
                    exact
                    element={<NewUnderCategoryList />}
                  />
                  <Route
                    path="/sous-categorie/edit/:id"
                    exact
                    element={<EditUnderCategoryList />}
                  />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </userContext.Provider>
          )}
        </>
      )}
    </>
  );
}

export default App;
