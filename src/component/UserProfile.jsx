import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import Header from "./Header";


const UserProfile = () => {
  const { userData,allbooks , AlltransactionUsers} = useContext(AppContext);
  console.log("userData", userData)
   // Get user data & issued books from context
  const [issuedBook, setIssuedBook ]=useState([])
  console.log("issuedBook",issuedBook)

  useEffect(() => {
    if (!issuedBook?.length && userData?.userid) {
      const fetchBorrowedBooks = async () => {
        try {
          const response = await axios.get(`https://book-haven-api-ehpu.onrender.com/api/transaction/borrowed/${userData.userid}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          console.log("response.data", response.data)
          setIssuedBook(response.data); // ✅ Update context with fetched books
        } catch (error) {
          console.error("Error fetching borrowed books:", error);
        }
      };
      fetchBorrowedBooks();
    }
  }, [userData?.userid,]);

  // Function to return a book
// Function to return a book
const returnBook = async (bookId) => {
    console.log(bookId)
    const mytoken=localStorage.getItem("token");
    console.log("token",mytoken)
    try {
      const response = await axios.put(
        `https://book-haven-api-ehpu.onrender.comapi/transaction/return/${bookId}`,{},
         // ✅ Send book ID to return
        {
          headers: {
             "Content-Type": "application/json" ,
             Auth: mytoken,

          },
          withCredentials: true,
          
        }
      );
  
      if (response.status === 200) {
        alert("Book returned successfully!");
        window.location.reload()
        // ✅ Remove the book from the UI after returning
        setIssuedBook((prevBooks) => prevBooks.filter((book) => book.book !== bookId));
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return the book. Please try again.");
    }
  };
  
  

  return (
    
<>
<Header/>
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "800px", height: "500px", backgroundColor: "white", padding: "15px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", textAlign: "center" }}>
        
        {/* User Profile Image */}
        {/* <img src={userData?.profilePic || "https://via.placeholder.com/120"} alt="User Profile" style={{ borderRadius: "50%", width: "120px", height: "120px", border: "3px solid #4CAF50", marginTop: "15px" }} /> */}

        {/* User Details */}
        <h2 style={{ color: "#333" }}>{userData?.name  }</h2>
        <p style={{ color: "#777" }}>Role: {userData?.role  }</p>
        <p style={{ color: "#777" }}>Stream: {userData?.stream }</p>

        {/* Issued Books List */}
        <h3 style={{ color: "#333", marginTop: "20px" }}>📚 Issued Books</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {issuedBook?.length > 0 ? (
            issuedBook
            .filter((book) => book.Librarian_ap === "approved") // Filter books with 'approved' status
            .map((book) => (
             
              <li key={book._id} style={{ backgroundColor: "#e3f2fd",width:"760px" , paddingTop:"15px",margin: "2px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p>📖 </p>
                
                {
        allbooks
          .filter((b) => b._id === book.book) // 🔥 Filter the book with matching ID
          .map((b) => (
            <p key={b._id}>{b.title}</p> // 🔥 Display the title
          ))
      }
                
                {book.book?.title} 
                {book.fine} 
                
                
                <p>- Due: {new Date(book.dueDate).toLocaleDateString()}</p>
               <p> <button
                  style={{ backgroundColor: "#ff5733", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                  onClick={() => returnBook(book._id)}
                >
                  Return
                </button></p>
              </li>
 
            ))

          ) : (
            <p>No borrowed books found.</p>
          )}
        </ul>

        
        <a href="/show">
                        <button type="button" style={{ height: "50px", width: "200px" }} className="btn btn-outline-success">
                            Back
                        </button>
                    </a>
      </div>
    </div>
    </>

    
  );
};

export default UserProfile;
