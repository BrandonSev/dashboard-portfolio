import { useState } from "react";
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

function App() {
  const [user, setUser] = useState(true);
  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/" element={<DashboardLogin />} />
        </Routes>
      ) : (
        <>
          <Sidebar />
          <TopBar />
          <div className="dashboard_main">
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/projets" exact element={<ProjetsList />} />
              <Route path="/projets/nouveau" exact element={<NewProject />} />
              <Route path="/images" exact element={<ImagesList />} />
              <Route path="/images/nouveau" exact element={<NewImages />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
