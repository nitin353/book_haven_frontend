import React from "react";

const Messagesuccess = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            style={styles.image}
            src="https://i.pinimg.com/originals/ba/56/00/ba5600e2613495b885f953f41c120d11.gif"
            alt="Success Animation"
          />
          <h2 style={styles.heading}>Password Successfully Changed! ✅</h2>
          <p style={styles.subtext}>Your password has been updated successfully.</p>
          <p style={styles.subtext}>Please login to continue.</p>
          
          <a href="/login">
            <button style={styles.button}>Login Here</button>
          </a>
        </div>
      </div>
    </>
  );
};

// 🎨 **Stylish Green-Themed CSS**
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #27ae60, #145A32)", // Gradient Green
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
  },
  image: {
    width: "100%",
    maxWidth: "300px",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "22px",
    color: "#145A32",
    marginBottom: "10px",
  },
  subtext: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

// Button Hover Effect
styles.button[":hover"] = {
  backgroundColor: "#145A32",
};

export default Messagesuccess;
