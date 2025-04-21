import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaAtom, FaHistory, FaUserGraduate } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const categories = [
  { name: "Fiction", icon: <FaAtom />, color: "#FF5733" },
  { name: "Non-Fiction", icon: <FaBook />, color: "#3498DB" },
  { name: "Science", icon: <FaAtom />, color: "#2ECC71" },
  { name: "Biography", icon: <FaUserGraduate />, color: "#9B59B6" },
  { name: "History", icon: <FaHistory />, color: "#E67E22" },
];

const Index = () => {
  const navigate = useNavigate();

  // UseEffect to trigger page reload only once
  

  const handleCategoryClick = (category) => {
    navigate(`/show`);
  };

  return (
    <div style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "linear-gradient(to bottom, #f9f6f1, #ffffff)", textAlign: "center", minHeight: "100vh" }}>
      <Header />

      <div style={{ padding: "60px 10px", backgroundImage: "url('https://watermark.lovepik.com/photo/50053/8233.jpg_wh1200.jpg')", backgroundSize: "cover", backgroundPosition: "center", color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.6)", borderRadius: "10px", margin: "20px auto", height: "700px", maxWidth: "100%" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>Welcome to the Library 📖</h2>
        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          Explore, borrow, and manage books easily. Your journey to knowledge begins here.
        </p>
      </div>

      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", color: "#333", marginBottom: "30px" }}>📖 Browse by Category</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
          {categories.map((category, index) => (
            <div key={index} style={{ backgroundColor: category.color, color: "white", padding: "20px", borderRadius: "10px", width: "140px", textAlign: "center", boxShadow: "0px 4px 6px rgba(0,0,0,0.2)", cursor: "pointer", transition: "0.3s" }} onClick={() => handleCategoryClick(category.name)}>
              <span style={{ fontSize: "30px" }}>{category.icon}</span>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="row pt-5">
        <div className="col-4"></div>
        <div className="col-4">
          <h1 style={{ textAlign: "center" }}>Our Books</h1>
          <p style={{ textAlign: "center", paddingTop: "10px" }}>
            We take pride in our diverse and extensive collection of books, catering to readers of all ages and interests.
          </p>
        </div>
        <div className="col-4"></div>
      </div>

      <div className="container text-center" style={{ marginTop: "40px", paddingBottom: "40px" }}>
        <div className="row align-items-center">
          {[
            { title: "Hastinapur Crumbling", image: "https://m.media-amazon.com/images/I/81IQTUk1DDL.jpg" },
            { title: "The Art of Being ALONE", image: "https://m.media-amazon.com/images/I/61fc1aOifmL._AC_UF1000,1000_QL80_.jpg" },
            { title: "The Power of Your Subconscious Mind", image: "https://m.media-amazon.com/images/I/71sBtM3Yi5L._AC_UF1000,1000_QL80_.jpg" },
            { title: "The Mountain Is You", image: "https://m.media-amazon.com/images/I/61xivWmExiL._AC_UF1000,1000_QL80_.jpg" },
          ].map((book, index) => (
            <div className="col-md-3" key={index} style={{ marginBottom: "20px" }}>
              <img style={{ height: "220px", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.2)" }} src={book.image} alt={book.title} />
            </div>
          ))}
        </div>

        <Link style={{ textDecoration: "none" }} to="/show">
          <button
            style={{
              height: "45px",
              width: "200px",
              backgroundColor: "#f39c12",
              color: "white",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
              marginTop: "30px",
              cursor: "pointer",
              transition: "0.3s",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Browse Books
          </button>
        </Link>
      </div>

      <div style={{ backgroundColor: "#333", color: "white", padding: "15px", marginTop: "40px", borderRadius: "10px 10px 0 0" }}>
        <p>&copy; 2025 Library Management System | All Rights Reserved</p>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
