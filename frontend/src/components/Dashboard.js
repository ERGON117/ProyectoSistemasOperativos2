import { useLocation } from "react-router-dom";
import { useState } from "react";
import Welcome from "./Welcome";
import ProductsList from "./ProductsList";
import "../styles/Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const user = location.state?.user;
  const [activeTab, setActiveTab] = useState("usuarios");

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sistema de Gestión</h1>
        <span className="user-info">👤 {user?.username}</span>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "usuarios" ? "tab active" : "tab"}
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios
        </button>
        <button
          className={activeTab === "productos" ? "tab active" : "tab"}
          onClick={() => setActiveTab("productos")}
        >
          Productos
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "usuarios" && <Welcome user={user} />}
        {activeTab === "productos" && <ProductsList />}
      </div>
    </div>
  );
}

export default Dashboard;
