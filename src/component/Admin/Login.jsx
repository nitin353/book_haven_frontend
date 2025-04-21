import React, { useState, useContext } from "react";
import Footer from "../Footer";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    console.log({ email, password });

    try {
      const result = await login(email, password);
      console.log("User login successful", result);

      if (result.success) {
        // Check the role of the user after a successful login
        const userRole = localStorage.getItem('role');  // Assuming `result.user.role` contains the role

        // Navigate based on the role
        if (userRole === "student") {
          navigate("/index"); // Redirect to index page (for students)
          if (window.location.pathname === "/index" ) {
            
            window.location.reload();  // Reload the page once on index
        }
        } else if (userRole === "Librarian") {
          navigate("/dashboard"); // Redirect to dashboard (for librarians)
          if (window.location.pathname === "/dashboard" ) {
            
            window.location.reload();  // Reload the page once on index
        }
        } else {
          alert("Unauthorized role!");
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}> Login</h1>
          <form onSubmit={formHandler} style={styles.form}>
            <label style={styles.label}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              style={styles.input}
              placeholder="Enter your email"
              required
            />

            <label style={styles.label}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              style={styles.input}
              placeholder="Enter your password"
              required
            />

            <button type="submit" style={styles.button}>
              SIGN IN
            </button>

            <a href="/forget" style={styles.forgotPassword}>
              Forgot your password?
            </a>

            <button type="button" style={styles.signupButton}>
              Don’t have an account?{" "}
              <a href="/register" style={styles.signupLink}>
                Create account
              </a>
            </button>
          </form>
        </div>
      </div>
      <Footer />
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
    background: "linear-gradient(to right, #27ae60, #145A32)", // Green gradient
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    backdropFilter: "blur(10px)", // Glassmorphism effect
  },
  heading: {
    fontSize: "24px",
    color: "#fff",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "14px",
    color: "#eee",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    width: "100%",
  },
  button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    border: "none",
  },
  forgotPassword: {
    color: "#fff",
    fontSize: "14px",
    textDecoration: "none",
    marginTop: "10px",
  },
  signupButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  },
  signupLink: {
    color: "#FFC107",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

// Button Hover Effect
styles.button[":hover"] = {
  backgroundColor: "#145A32",
};

export default Login;
