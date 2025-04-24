import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Showbooks = () => {
  const navigate = useNavigate();
  const { allbooks, issued, userData } = useContext(AppContext);
  const token = localStorage.getItem("token");

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Show All");
  const [message, setMessage] = useState(""); // ✅ State to hold success message

  useEffect(() => {
    if (allbooks && allbooks.length > 0) {
      setFilteredBooks(allbooks);
    }
  }, [allbooks]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    if (!allbooks || allbooks.length === 0) {
      return;
    }

    if (category === "Show All") {
      setFilteredBooks(allbooks);
    } else {
      const filtered = allbooks.filter(
        (book) => book.category && book.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredBooks(filtered);
    }
  };

  const getDueDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 15);
    return currentDate.toISOString().split("T")[0];
  };

  // ✅ Function to handle book issuance
  const handleIssueBook = async (bookId) => {
    try {
      await issued(bookId, getDueDate());
  
      // Update the availableCopies in local state
      // setFilteredBooks((prevBooks) =>
      //   prevBooks.map((book) =>
      //     book._id === bookId
      //       ? { ...book, availableCopies: book.availableCopies - 1 }
      //       : book
      //   )
      // );
  
      setMessage("📚 Book issued Request send to the Librarian! ✅");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error issuing book:", error);
      setMessage("❌ Failed to issue the book. Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  

  return (
    <>
      <Header />

      {/* Success message */}
      {message && (
        <div
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontSize: "18px",
            margin: "10px 0",
          }}
        >
          {message}
        </div>
      )}

      <div className="container" style={{ display: "flex", marginTop: "20px", height: "90vh" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            backgroundColor: "rgba(17, 40, 17, 0.945)",
            padding: "20px",
            borderRadius: "10px",
            color: "white",
            height: "100%",
            position: "sticky",
            top: "0",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Categories</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {["Show All", "Fiction", "Non-Fiction", "Science", "Biography", "History"].map((category) => (
              <li
                key={category}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid white",
                  textAlign: "center",
                  backgroundColor: activeCategory === category ? "green" : "transparent",
                }}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Books Section with Scrollable Area */}
        <div
          className="row"
          style={{
            marginLeft: "30px",
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            overflowY: "auto",
            height: "100%",
            paddingRight: "10px",
          }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} style={{ width: "30%", minWidth: "300px", display: "flex", justifyContent: "center" }}>
                <div className="card text-center" style={{ width: "100%", padding: "15px", height: "500px", borderRadius: "10px" }}>
                  <div className="card-body">
                    <img
                      style={{ height: "200px", objectFit: "cover", borderRadius: "8px" }}
                      src={`https://book-haven-api-ehpu.onrender.com/${book.image}`}
                      alt={book.title}
                    />
                    <p style={{ paddingTop: "20px", color: "gray", fontSize: "18px", fontWeight: "bold" }}>
                      {book.title}
                    </p>
                    <p>BY {book.author}</p>
                    <p>IN Stock {book.availableCopies}</p>
                    <Link to={`/view/${book._id}`}>
                      <button
                        type="button"
                        style={{
                          height: "45px",
                          width: "100%",
                          backgroundColor: "#198754",
                          color: "white",
                          borderRadius: "5px",
                          border: "none",
                          fontSize: "16px",
                          marginBottom: "10px",
                        }}
                      >
                        View Details
                      </button>
                    </Link>
                    <button
                      className="btn btn-mycolor"
                      onClick={() => handleIssueBook(book._id)} // ✅ Call function
                      style={{
                        height: "40px",
                        width: "100%",
                        backgroundColor: "#ff5733",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        fontSize: "16px",
                      }}
                    >
                      Issue Book
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 style={{ textAlign: "center", width: "100%", color: "gray" }}>No books found in this category.</h3>
          )}
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Showbooks;
