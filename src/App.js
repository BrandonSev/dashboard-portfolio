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
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./store";
import EditProject from "./components/EditProject";
import EditImages from "./components/EditImages";

function App() {
  const [user, setUser] = useState(0);
  useEffect(() => {
    if (Cookies.get("jwt")) {
      (async () =>
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/jwtid`, {
            withCredentials: true,
          })
          .then((res) => {
            setUser(res.data.id);
          })
          .catch((err) => {
            console.log(err);
          }))();
    }
  }, []);
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
      {user === 0 ? (
        <Routes>
          <Route
            path="/"
            element={<DashboardLogin user={user} setUser={setUser} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <userContext.Provider value={{ user, setuser: setUser }}>
          <Sidebar />
          <TopBar />
          <div className="dashboard_main">
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/projets" exact element={<ProjetsList />} />
              <Route path="/projets/nouveau" exact element={<NewProject />} />
              <Route path="/projets/edit/:id" exact element={<EditProject />} />
              <Route path="/images" exact element={<ImagesList />} />
              <Route path="/images/nouveau" exact element={<NewImages />} />
              <Route path="/images/edit/:id" exact element={<EditImages />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </userContext.Provider>
      )}
    </>
  );
}

export default App;
