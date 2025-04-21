import React, { useState, useContext } from "react";
import Footer from "./Footer";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [stream, setStream] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
        } else {
            console.log("regpage",name, email, password,stream);
            const result = await register(name, email, stream, password);
            console.log("User registered successfully", result);

            if (result.success) {
                navigate("/login");
            } else {
                alert("User registration failed");
            }

            setName("");
            setEmail("");
            setStream("")
            setPassword("");
            setConfirmPassword("");
            setError("");
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.heading}>User Registration</h1>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your name"
                            required
                        />

                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                        <label style={styles.label}>Stream</label>
                        <input
                            type="text"
                            value={stream}
                            onChange={(e) => setStream(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your stream"
                            required
                        />

                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                        

                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Re-enter your password"
                            required
                        />

                        {error && <div style={styles.error}>{error}</div>}

                        <button type="submit" style={styles.button}>
                            SIGN UP
                        </button>

                        <p style={styles.text}>
                            Already have an account?{" "}
                            <a href="/login" style={styles.link}>
                                Login here
                            </a>
                        </p>
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
        maxWidth: "600px",
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
        width: "500px",
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
        marginTop: "10px",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
    text: {
        color: "#fff",
        fontSize: "14px",
        marginTop: "10px",
    },
    link: {
        color: "#FFC107",
        textDecoration: "none",
        fontWeight: "bold",
    },
};

// Button Hover Effect
styles.button[":hover"] = {
    backgroundColor: "#145A32",
};

export default RegistrationForm;
