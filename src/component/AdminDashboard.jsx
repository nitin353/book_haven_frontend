import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const AdminDashboard = () => {
  const { allbooks, allusers, all_transactionusers, Logoutuser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  //useEffect(() => {
    //if (allusers) {
      //setUsers(allusers);
   // }
  //}, [allusers]);
  useEffect(() => {
    if (allusers) {
      const sortedUsers = [...allusers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(sortedUsers);
    }
  }, [allusers]);
  
  // useEffect(() => {
  //   if (all_transactionusers) {
  //     const borrowed = all_transactionusers.filter((t) => t.status === "borrowed");
  //     const returned = all_transactionusers.filter((t) => t.status === "returned");
  //     setBorrowedBooks(borrowed);
  //     setReturnedBooks(returned);
  //   }
  // }, [all_transactionusers]);

  useEffect(() => {
    if (all_transactionusers) {
      const borrowed = all_transactionusers
        .filter((t) => t.status === "borrowed")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // descending
  
      const returned = all_transactionusers
        .filter((t) => t.status === "returned")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // descending
  
      setBorrowedBooks(borrowed);
      setReturnedBooks(returned);
    }
  }, [all_transactionusers]);
  

  const totalBooks = allbooks ? allbooks.length : 0;
  const totalUsers = users.length;
  const totalBorrowed = borrowedBooks.length;
  const totalReturned = returnedBooks.length;

  const getbooktitle = (bookId) => {
    const book = allbooks.find((b) => b._id === bookId);
    return book ? book.title : "Unknown Title";
  };

  const getuserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : "Unknown User";
  };

  const handleLogout = async () => {
    try {
      await Logoutuser();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // ✅ Approve Transaction
  const handleApproveTransaction = async (transactionId) => {
    let token=localStorage.getItem("token")
    try {
      const response = await fetch(`http://localhost:1000/api/transaction/approved/${transactionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Auth: token, // optional
        },
        
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to approve transaction");
      }

      // Update UI without reload
      setBorrowedBooks((prev) =>
        prev.map((item) =>
          item._id === transactionId
            ? { ...item, Librarian_ap: "Approved ✅" }
            : item
        )
      );
    } catch (error) {
      console.error("Approval error:", error);
      alert("❌ Could not approve the transaction.");
    }
  };

  return (
    <div style={mainContainerStyle}>
      <div style={navbarStyle}>
        <h2 style={{ margin: 0, color: "#fff" }}>Admin Library</h2>
        <button style={navButtonStyle} onClick={handleLogout}>Logout</button>
      </div>

      <div style={mainContentStyle}>
        <div style={sidebarStyle}>
          <h3 style={sidebarHeadingStyle}>Admin Panel</h3>
          <Link to="/librarianshow" style={sidebarItemStyle}>📖 Books Editor</Link>
        </div>

        <div style={mainContentContainerStyle}>
          <div style={statsContainerStyle}>
            {[
              { title: "Total Books", value: totalBooks, color: "#27AE60", section: "books" },
              { title: "Total Users", value: totalUsers, color: "#2ECC71", section: "users" },
              { title: "Total Requests", value: totalBorrowed, color: "#1D8348", section: "borrowed" },
              { title: "Total Returned Books", value: totalReturned, color: "#145A32", section: "returned" }
            ].map((stat, index) => (
              <div
                key={index}
                style={{ ...statsBoxStyle, backgroundColor: stat.color }}
                onClick={() => setActiveSection(stat.section)}
              >
                <h4 style={statsBoxTitleStyle}>{stat.title}</h4>
                <h2 style={{ ...statsBoxValueStyle, color: "#fff" }}>{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* Books Section */}
          {activeSection === "books" && (
            <div style={contentBoxStyle}>
              <h4>📚 All Books</h4>
              {allbooks.length > 0 ? (
                <div style={cardsContainerStyle}>
                  {allbooks.map((book, index) => (
                    <div key={index} style={cardStyle}>
                      <h5>{book.title}</h5>
                      <p><strong>Author:</strong> {book.author}</p>
                    </div>
                  ))}
                </div>
              ) : <p>No books available.</p>}
            </div>
          )}

          {/* Users Section */}
          {activeSection === "users" && (
            <div style={contentBoxStyle}>
              <h4>👤 All Users</h4>
              {users.length > 0 ? (
                <div style={cardsContainerStyle}>
                  {users.map((user, index) => (
                    <div key={index} style={cardStyle}>
                      <h5>{user.name}</h5>
                      <p><strong>Stream:</strong> {user.stream}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  ))}
                </div>
              ) : <p>No users found.</p>}
            </div>
          )}

 {/* Borrowed Books Section */}
{activeSection === "borrowed" && (
  <div style={{ backgroundColor: "#fff", padding: "20px", marginBottom: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
    <h4>📘 Borrowed Books</h4>
    {borrowedBooks.length > 0 ? (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
        {borrowedBooks.map((transaction, index) => {
          const user = users.find((u) => u._id === transaction.user);
          const issueDate = new Date(transaction.issueDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          });

          return (
            <div key={index} style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}>
              <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#2c3e50" }}>
                {getbooktitle(transaction.book)}{" "}
                <span style={{ fontWeight: "normal" }}>
                  - Borrowed by {user ? user.name : "Unknown User"}
                  {user?.stream && ` (${user.stream})`}
                </span>
              </h5>

              <p style={{ marginBottom: "12px", fontSize: "14px", color: "#555" }}>
                <strong>Borrowed on:</strong> {issueDate}
              </p>

              {transaction.Librarian_ap === "Approved ✅" ? (
                <button
                  disabled
                  style={{
                    backgroundColor: "#aaa",
                    color: "#fff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "not-allowed"
                  }}
                >
                  Approved ✅
                </button>
              ) : (
                <button
                  onClick={() => handleApproveTransaction(transaction._id)}
                  style={{
                    backgroundColor: "#27AE60",
                    color: "#fff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background 0.3s ease"
                  }}
                >
                  {transaction.Librarian_ap}
                </button>
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <p>No books are currently borrowed.</p>
    )}
  </div>
)}

{/* Returned Books Section */}
{activeSection === "returned" && (
  <div
    style={{
      backgroundColor: "#fff",
      padding: "20px",
      marginBottom: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h4 style={{ fontSize: "20px", marginBottom: "20px" }}>📕 Returned Books</h4>
    {returnedBooks.length > 0 ? (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {returnedBooks.map((transaction, index) => {
          const user = users.find((u) => u._id === transaction.user);
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <h5 style={{ marginBottom: "10px", color: "#2c3e50" }}>
                {getbooktitle(transaction.book)} - Returned by {user ? user.name : "Unknown User"}
                {user?.stream ? ` (${user.stream})` : ""}
              </h5>
              <p style={{ marginBottom: "8px" }}>
                <strong>Return Date:</strong>{" "}
                {new Date(transaction.returnDate).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
              <p style={{ marginBottom: "0" }}>
                <strong>Fine:</strong> ₹{transaction.fine}
              </p>
            </div>
          );
        })}
      </div>
    ) : (
      <p>No books have been returned yet.</p>
    )}
  </div>
)}

        </div>
      </div>
    </div>
  );
};

// Styles (same as before)
const mainContainerStyle = { fontFamily: "Arial, sans-serif", backgroundColor: "#f7f7f7", padding: "0 20px", display: "flex", flexDirection: "column", minHeight: "100vh" };
const navbarStyle = { backgroundColor: "#27AE60", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" };
const navButtonStyle = { backgroundColor: "#145A32", border: "none", color: "white", padding: "10px 20px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" };
const sidebarStyle = { width: "240px", backgroundColor: "#145A32", color: "white", padding: "20px", borderRadius: "10px", marginRight: "20px" };
const sidebarHeadingStyle = { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" };
const sidebarItemStyle = { color: "white", textDecoration: "none", fontSize: "18px", marginBottom: "15px", fontWeight: "bold", transition: "background 0.3s", borderRadius: "5px", padding: "8px" };
const mainContentStyle = { display: "flex", justifyContent: "space-between", paddingTop: "20px" };
const mainContentContainerStyle = { flex: 1, padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", overflow: "hidden" };
const statsContainerStyle = { display: "flex", justifyContent: "space-between", marginBottom: "30px" };
const statsBoxStyle = { padding: "20px", width: "22%", textAlign: "center", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease" };
const statsBoxTitleStyle = { fontSize: "16px", fontWeight: "bold", marginBottom: "10px", color: "#fff" };
const statsBoxValueStyle = { fontSize: "28px", fontWeight: "bold" };
const contentBoxStyle = { backgroundColor: "#fff", padding: "20px", marginBottom: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" };
const cardsContainerStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "20px" };
const cardStyle = { backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s ease, box-shadow 0.3s ease" };

export default AdminDashboard;
