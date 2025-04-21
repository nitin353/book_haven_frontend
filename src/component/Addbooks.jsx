import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";

const Addbooks = () => {
  const [title, setTitle] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  

  const { AddBook, token } = useContext(AppContext);
  const formHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }
    formData.append("isbn", isbn);
    formData.append("author", author);
    formData.append("totalCopies", totalCopies);
    formData.append("category", category);
    formData.append("description", description);
  
 
    // Debugging: Check FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Log key-value pairs
    }
  
    try {
      const result = await AddBook(formData);
      console.log(result);
      alert("book added successfully")

    } catch (error) {
      console.error("Book error", error);
    }
    setTitle("")
    setAuthor("")
    setCategory("")
    setDescription("")
    setImage("")
    setIsbn("")
    setTotalCopies("")
    
  };
  

  return (
    <div className="container">
        <div className="row justify-content-center">
        <div className='col-6'>
         
         <img style={{height:"795px", width:"660px", marginTop:"100px"}} src="https://img.freepik.com/premium-photo/nature-book-green-cover-literary-celebration-natural-world-vertical-mobile-wallpaper_795881-30122.jpg"></img>
        </div>
        
        <div className='col-6'>
    <div style={{ 
      width: "1000px", 
      marginTop: "100px", 
      marginBottom:"100px",
      backgroundColor: "#fff", 
      padding: "20px", 
      borderRadius: "10px", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
      alignContent: "center" ,
      maxWidth: "500px", 
      border: "",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "30px", textAlign: "center", color: "#4CAF50" }}>Add a Book</h1>

      <form onSubmit={formHandler} style={{ width: "100%" }}>
        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>Title</label>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          type="text" 
          required 
          placeholder="Enter book title" 
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        />

        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files[0])} 
          required
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", fontSize: "16px" }}
        />

        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>Author</label>
        <input 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          type="text" 
          required 
          placeholder="Enter author name"
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        />

        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>Description</label>
        <input 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          type="text" 
          required 
          placeholder="Enter description" 
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        />

        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>ISBN</label>
        <input 
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
          type="text" 
          required 
          placeholder="Enter ISBN number" 
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        />

        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        >
          <option value="">Select Category</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="biography">Biography</option>
        </select>

        <label style={{ fontSize: "16px", fontWeight: "bold", color: "#4CAF50", display: "block", marginTop: "5px" }}>Total Copies</label>
        <input 
          value={totalCopies} 
          onChange={(e) => setTotalCopies(e.target.value)} 
          type="number" 
          required 
          min="1" 
          placeholder="Enter total copies" 
          style={{ width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" }}
        />


        <input 
          type="submit" 
          value="Add Book" 
          style={{ 
            backgroundColor: "#4CAF50", 
            color: "white", 
            fontSize: "18px", 
            border: "none", 
            cursor: "pointer", 
            transition: "background-color 0.3s ease", 
            width: "100%", 
            padding: "10px", 
            marginTop: "5px", 
            borderRadius: "5px"
          }}
        />
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Addbooks;