import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      let dt = jsonData.articles.slice(0, 10);
      setNewsData(dt);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
    getData();
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", padding: "20px" }}>
      {/* Navigation Bar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(17, 40, 17, 0.945)",
        padding: "15px 30px",
        color: "white",
        borderRadius: "8px",
        marginBottom: "20px",
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>📰 Trendy News</h1>
        <ul style={{ display: "flex", gap: "15px", listStyle: "none", padding: 0 }}>
          <li><a href="#" style={{ color: "white", textDecoration: "none", fontWeight: "600", padding: "10px" ,fontSize:"30px"}}>All News</a></li>
         
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search News..."
            value={search}
            onChange={handleInput}
            style={{
              padding: "10px",
              width: "200px",
              border: "none",
              borderRadius: "5px",
              outline: "none",
            }}
          />
          <button
            onClick={getData}
            style={{
              padding: "10px 15px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </div>
      </nav>

      {/* Category Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "20px",
      }}>
        {["sports", "politics", "entertainment", "health", "fitness"].map((category) => (
          <button
            key={category}
            onClick={userInput}
            value={category}
            style={{
              padding: "10px 15px",
              backgroundColor: "rgba(17, 40, 17, 0.945)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* News Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
      }}>
        {newsData ? <Card data={newsData} /> : <p style={{ textAlign: "center" }}>Loading news...</p>}
      </div>
    </div>
  );
};

export default Newsapp;
