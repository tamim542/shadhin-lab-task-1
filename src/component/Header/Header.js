// import React from 'react';
import React from 'react';
import {  Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
              {/* --------------- nav bar ------------------- */}
              <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Project</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        
      </div>
    </div>
  </div>
</nav>
        </div>
    );
};

export default Header;