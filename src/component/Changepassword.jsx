import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa"; // Import icons

const Changepassword = () => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/users/change", {
        email,
        otpCode,
        password: newPassword,
      });

      setMessage(response.data.msg);
      if (response.data.success) {
        navigate("/msg");
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "An error occurred.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>🔒 Reset Your Password</h2>
        <p style={subtitleStyle}>Enter your details to reset your password</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Email Input */}
          <div style={inputContainer}>
            <FaEnvelope style={iconStyle} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              style={inputStyle}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* OTP Input */}
          <div style={inputContainer}>
            <FaKey style={iconStyle} />
            <input
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              type="number"
              style={inputStyle}
              required
              placeholder="Enter OTP"
            />
          </div>

          {/* New Password Input */}
          <div style={inputContainer}>
            <FaLock style={iconStyle} />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              style={inputStyle}
              required
              placeholder="Enter new password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={buttonStyle}>Reset Password</button>

          {/* Cancel Link */}
          <Link to="/" style={cancelStyle}>Cancel</Link>

          {/* Message Display */}
          {message && <p style={messageStyle}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

// 🎨 **Stylish CSS-in-JS Styles**
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #2ECC71, #145A32)",
};

const formContainerStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "400px",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1D8348",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#555",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputContainer = {
  display: "flex",
  alignItems: "center",
  background: "#F2F3F4",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "15px",
};

const iconStyle = {
  color: "#1D8348",
  marginRight: "10px",
};

const inputStyle = {
  border: "none",
  outline: "none",
  background: "transparent",
  flex: 1,
  fontSize: "16px",
};

const buttonStyle = {
  background: "#1D8348",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s ease",
};

const cancelStyle = {
  display: "block",
  textAlign: "center",
  marginTop: "15px",
  color: "#1D8348",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold",
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "14px",
  color: "#145A32",
  fontWeight: "bold",
};

export default Changepassword;
