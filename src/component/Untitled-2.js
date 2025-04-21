import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import React, { useState, useContext, useEffect } from "react";

const Viewbooks = () => {
    const{id}= useParams
    const [book, setBook] = useState()
 // Use the context directly
   
    useEffect(()=>{
        const fetchbook = async () =>{
            const api = await axios.get(`http://localhost:1000/api/books/getbookbyid/${id}`,

                {
                    headers: {
                      'Content-Type': 'application/json',
                      // Corrected case for 'Content-Type'
                    },
                    withCredentials: true, // Allow sending credentials like cookies
          
                  }
                );
                setBook(api.data)
                console.log("--api",api)

        }
        fetchbook();
    },[]);
    // console.log(book)
  return (
    <>
      
    <div  className='row border shadow p-5'>
    
        <div className='col-md-5 text-center'>
        
        <img style={{height:"338px",width:"320"}} src={`http://localhost:1000/${book.image}`}></img>
        </div>
        <div className='col-md-7'>
          <h3>{book.title}</h3><br />
          <p> ISBN is {book.isbn}</p>
          <p> BY {book.author}</p>
          <p>Categoery : {book.category}</p>
          <p>Description : {book.description}</p>
          
          <a href="/show" ><button type="button" style={{height:"50px",width:"200px"}}  class="btn btn-outline-success">Back</button></a>
        </div>
        
      </div>
       
      
    </>
  )
}

export default Viewbooks