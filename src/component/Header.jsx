import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext"; // Import global context

const Header = () => {
  const { userData, setUserData ,allbooks } = useContext(AppContext); // Get user data
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove token on logout
    setUserData(null); // Clear user data
    navigate("/login");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("searchTerm", searchTerm)
    navigate(`/show/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      {/* Bootstrap Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      {/* Top Banner */}
      <nav>
        <div style={{ backgroundColor: "rgba(17, 40, 17, 0.945)", height: "50px" }} className="container-fluid pt-2 pb-3">
          <a style={{ fontSize: "14px", color: "white" }}>
            <b>Discover, Learn, Thrive: Dive into our Library</b>
          </a>

          {/* Conditionally Render Login/Register or Profile */}
          <span style={{ marginLeft: "850px" }}>
            {!userData?.userid ? (
              <>
                <a className="navbar-brand" href="/login" style={{ color: "white", textDecoration: "none", marginRight: "15px" }}>
                  <i className="bi bi-person-circle"></i> Login
                </a>
                <a className="navbar-brand" href="/register" style={{ color: "white", textDecoration: "none" }}>
                  <i className="bi bi-r-circle"></i> Register
                </a>
              </>
            ) : (
              <>
                <a className="navbar-brand" style={{ color: "white", textDecoration: "none" }} href="/profile"  >
                  <i className="bi bi-person-circle"></i> Profile
                </a>
                &nbsp;&nbsp;
                <button
                  onClick={handleLogout}
                  style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
                >
                 <a style={{ color: "white", textDecoration: "none", marginRight: "15px" }}  href="/login"> <i className="bi bi-box-arrow-right"></i> Logout</a>
                </button>
              </>
            )}
          </span>
        </div>
      </nav>

      {/* Navigation Bar */}
      <nav className="navbar border-bottom navbar-expand-lg sticky-top">
        <div style={{ height: "90px", backgroundColor: "white" }} className="container-fluid pt-2">
          

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <p style={{ fontSize: "20px" }}>
              <i className="bi bi-book-fill"></i> <b>BOOK HAVEN</b>
            </p>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/index" style={{ marginLeft: "300px" }}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/show" style={{ marginLeft: "50px" }}>Books</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact" style={{ marginLeft: "50px" }}>Contact Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about" style={{ marginLeft: "50px" }}>About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news" style={{ marginLeft: "50px" }}>News</a>
              </li>
            </ul>

            {/* Search Bar */}
            <form className="d-flex" onSubmit={submitHandler} style={{ marginRight: "100px" }}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="form-control me-2"
                placeholder="Search"
              />
              <button type="submit" style={{ background: "none", border: "none" }}>
                <i className="bi bi-search" style={{ fontSize: "30px" }}></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
