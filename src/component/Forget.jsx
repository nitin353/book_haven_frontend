import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Forget = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const url = "https://book-haven-api-ehpu.onrender.com/api/users/otp"; // API endpoint

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { email });
      setMessage(response.data.msg);
      navigate("/change");
    } catch (error) {
      setMessage(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #2e8b57, #006400)", // Green Gradient
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#006400", fontWeight: "bold", marginBottom: "10px" }}>
          Forgot Password? 🔒
        </h2>
        <p style={{ color: "#555", fontSize: "14px", marginBottom: "20px" }}>
          Enter your email to receive a password reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={{ color: "#006400", fontWeight: "bold" }} htmlFor="email">
              Email Address
            </label>
            <input
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #2e8b57",
                outline: "none",
                transition: "0.3s",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#2e8b57",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#228B22")}
            onMouseOut={(e) => (e.target.style.background = "#2e8b57")}
          >
            Send Reset Link
          </button>
        </form>

        {/* Message Display */}
        {message && <p style={{ color: "#006400", marginTop: "10px" }}>{message}</p>}

        {/* Cancel Link */}
        <Link
          to="/"
          style={{
            display: "block",
            marginTop: "15px",
            color: "#2e8b57",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forget;
