import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "./Header";

const Viewbooks = () => {
    const { issued } = useContext(AppContext);
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [message, setMessage] = useState(""); // ✅ Success message state

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const api = await axios.get(`https://book-haven-api-ehpu.onrender.com/api/books/getbookbyid/${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                setBook(api.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [id]);

    const getDueDate = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 15);
        return currentDate.toISOString().split("T")[0];
    };

    // ✅ Function to handle book issuance
    const handleIssueBook = async () => {
        try {
            await issued(book._id, getDueDate());
            setMessage("📚 Book issued  Request Send successfully! ✅"); // ✅ Show success message
            setTimeout(() => setMessage(""), 3000); // ✅ Hide message after 3 seconds
        } catch (error) {
            console.error("Error issuing book:", error);
            setMessage("❌ Failed to issue the book. Try again.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <>
        <Header/>
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

            <div className="row border shadow p-5">
                <div className="col-md-5 text-center">
                    <img style={{ height: "438px", width: "320px" }} src={`http://localhost:1000/${book.image}`} alt={book.title} />
                </div>
                <div className="col-md-7">
                    <h3>{book.title}</h3><br />
                    <p style={{ fontSize: "20px" }}>ISBN: {book.isbn}</p>
                    <p style={{ fontSize: "20px" }}>BY {book.author}</p>
                    <p style={{ fontSize: "20px" }}>IN Stock: {book.availableCopies}</p>
                    <p style={{ fontSize: "20px" }}>Category: {book.category}</p>
                    <p style={{ fontSize: "20px", fontFamily: "Times New Roman" }}>Description: {book.description}</p>

                    <button
                        className="btn btn-mycolor"
                        onClick={handleIssueBook} // ✅ Call function
                        style={{
                            height: "40px",
                            width: "100px",
                            backgroundColor: "#ff5733",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                            fontSize: "16px",
                        }}
                    >
                        Issue Book
                    </button>
                    <br /><br />
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

export default Viewbooks;
