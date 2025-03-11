import React from "react";
import { Link } from "react-router-dom";
import '../home/style.css';  

const PageHome = () => {
  return (
    <div className="page-home">
      <div className="page-home-content">
        <h1>Welcome a Recetas Mundiales</h1>
        <p>Aqui puedes buscar y encontrar lo mejor</p>
        <p>Lo mejor de cada País</p>
        <Link to="/recetas">
          <button>Conoce más</button>
        </Link>
      </div>
    </div>
  );
};

export default PageHome;
