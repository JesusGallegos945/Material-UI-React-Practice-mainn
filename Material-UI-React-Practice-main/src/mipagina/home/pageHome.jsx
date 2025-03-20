import React from "react";
import { Link } from "react-router-dom";
import '../home/style.css';  

const PageHome = () => {
  return (
    <div className="page-home">
      <div className="page-home-text">
        <h1>Bienvenido a Art Gallery</h1>
        <Link to="/recetas">
          <button>Explorar Obras</button>
        </Link>
      </div>
    </div>
  );
};

export default PageHome;