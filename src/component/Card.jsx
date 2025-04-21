import React from "react";

const Card = ({ data }) => {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
      gap: "20px", 
      padding: "20px" 
    }}>
      {data.map((article, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "0.3s",
            cursor: "pointer",
            maxWidth: "350px",
          }}
          onClick={() => window.open(article.url, "_blank")}
        >
          {/* Article Image */}
          <img
            src={article.urlToImage || "https://via.placeholder.com/350"}
            alt={article.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />

          {/* Article Content */}
          <div style={{ padding: "15px" }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#2c3e50"
            }}>
              {article.title.length > 50 ? article.title.substring(0, 50) + "..." : article.title}
            </h3>

            <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
              {article.description ? (article.description.length > 80 ? article.description.substring(0, 80) + "..." : article.description) : "No description available."}
            </p>

            <p style={{ fontSize: "12px", color: "#888" }}>
              <strong>Source:</strong> {article.source.name || "Unknown"} | <strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
