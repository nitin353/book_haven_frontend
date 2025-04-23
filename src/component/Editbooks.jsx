import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Editbooks = () => {
  const { id } = useParams();
  const [token, setToken] = useState("");

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
    }
  }, []);

  const [title, setTitle] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://book-haven-api-ehpu.onrender.com/api/books/getbookbyid/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Auth: token,
            },
            withCredentials: true,
          }
        );
        const book = response.data;
        setTitle(book.title);
        setDescription(book.description);
        setTotalCopies(book.totalCopies);
        setAuthor(book.author);
        setCategory(book.category);
        setIsbn(book.isbn);
        setPreviewImage(book.image);
      } catch (error) {
        console.error("Error fetching book details:", error);
        
      }
    };

    fetchBookDetails();
  }, [id, token]);

  const formHandler = async (e) => {
    alert("book edit successfully")
    e.preventDefault();
    if (!token) {
      console.error("Token is missing. Cannot update book.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("isbn", isbn);
      formData.append("category", category);
      formData.append("totalCopies", totalCopies);
      formData.append("description", description);

      const apii = await axios.put(
        `http://localhost:1000/api/books/updateBook/${id}`,
        { title, author, isbn, category, totalCopies, description },
        {
          headers: {
            Auth: token,
          },
        }
      );

      console.log("Update Success:", apii.data);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <img
            style={{
              height: "800px",
              width: "600px",
              paddingTop: "100px",
              marginLeft: "60px",
            }}
            src="https://media.istockphoto.com/id/157169286/photo/notes-on-orange.jpg?s=612x612&w=0&k=20&c=jdN8VT4sOwHBrcNkq0TtMoN7QvcFAB3B7zG24nKJUMM="
            alt="Placeholder"
          />
        </div>

        <div className="col-6">
          <div style={containerStyle}>
            <h1 style={headerStyle}>Edit Book</h1>

            <form onSubmit={formHandler} style={{ width: "400px" }}>
              <label style={labelStyle}>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
                placeholder="Enter book title"
                style={inputStyle}
              />

              <label style={labelStyle}>Author</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                required
                placeholder="Enter author name"
                style={inputStyle}
              />

              <label style={labelStyle}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter description"
                style={inputStyle}
              />

              <label style={labelStyle}>ISBN</label>
              <input
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                type="text"
                required
                placeholder="Enter ISBN number"
                style={inputStyle}
              />

              <label style={labelStyle}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Select Category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-fiction</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="biography">Biography</option>
              </select>

              <label style={labelStyle}>Total Copies</label>
              <input
                value={totalCopies}
                onChange={(e) => setTotalCopies(e.target.value)}
                type="number"
                required
                min="1"
                placeholder="Enter total copies"
                style={inputStyle}
              />

              <input type="submit" value="Update Book" style={buttonStyle} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎨 **Styling for Inputs and Labels**
const containerStyle = {
  height: "700px",
  marginTop: "100px",
  marginBottom: "100px",
  backgroundColor: "#FFFFFF",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(44, 62, 80, 0.3)", // Soft shadow
  alignContent: "center",
  maxWidth: "500px",
  fontFamily: "Arial, sans-serif",
  display: "grid",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const headerStyle = {
  fontSize: "30px",
  textAlign: "center",
  color: "#2C3E50", // Dark blue for a premium feel
};

const labelStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#2C3E50", // Dark blue
  display: "block",
  marginTop: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  border: "1px solid #BDC3C7", // Soft gray border
  borderRadius: "5px",
  fontSize: "16px",
  backgroundColor: "#ECF0F1", // Soft gray background
};

const buttonStyle = {
  backgroundColor: "#F39C12", // Gold color for a standout effect
  color: "white",
  fontSize: "18px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "5px",
};

export default Editbooks;
