import { useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardLogin from "./components/DashboardLogin";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ProjetsList from "./components/ProjetsList";
import NewProject from "./components/NewProject";

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
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
