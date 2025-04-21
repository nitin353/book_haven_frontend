import React, { useState, useContext,useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from 'axios';
import { Link } from "react-router-dom";
const Librarianshows = () => {
    const {allbooks} = useContext(AppContext);
     const [token, setToken] = useState([]);

useEffect(() => {
    let lstoken = localStorage.getItem("token");
  if(lstoken){
    setToken(lstoken);
    
    
  }
  
  },[]);
    const deleteitem = async(id) => {
        console.log(id);
        const api = await axios.delete(`http://localhost:1000/api/books/deletebook/${id}`,
            {
                headers: {
                  'Content-Type': 'application/json',
                  Auth:token // Corrected case for 'Content-Type'
                },
                withCredentials: true, // Allow sending credentials like cookies
      
              }
            );
        // .then((res)=>{
        //   console.log(res)
        //   window.location.reload()
        // })
        // .catch((err)=>{
        //   console.log("error:", err)
        // })
          console.log(api.data)
          window.location.reload();
      };
  return (
  <>
   <div className='container'>
        <div className='row pt-5'>
         
          <div className='col-4'>
          
           
          </div>
          
          <div className='col-4'>
            <h1 style={{ textAlign: 'center' ,color:'green'}}>Admin Panel</h1>
           
          </div>
          
          <div className='col-4'>
           
           
          </div>
        </div>
        <div className='row pt-5'>
         
         <div className='col-5'>
         
          
         </div>
         
         <div className='col-5'>
          
          
         </div>
         
         <div style={{marginBottom:"20px"}} className='col-2'>
         <a href="/Addbooks" ><button type="button" style={{height:"50px",width:"200px"}}  class="btn btn-outline-success">Add Books</button></a>
          
         </div>
       </div>
        <table className='table table-striped border border-3'>
       
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Image</th>
      <th scope="col">Author</th>
      <th scope="col">ISBN</th>
      <th scope="col">Categoery</th>
      <th scope="col">Total copies</th>
      <th scope="col">Available Copies</th>
      <th scope="col"></th>
      <th scope="col"></th>
     
    </tr>
  </thead>
  <tbody>
  {allbooks.map((i,index) => (
    <tr  key={i._id}>
      <th scope="row"> {index + 1}</th>
      <td>{i.title}</td>
      <td><img style={{height:"90px"}} src={`http://localhost:1000/${i.image}`}></img></td>
      <td>{i.author}</td>
      <td>{i.isbn}</td>
      <td>{i.category}</td>
      <td>{i.totalCopies}</td>
      <td>{i.availableCopies}</td>
      <td><Link style={{color:"green"}} to={`/editbooks/${i._id}`}><button type="button" class="btn btn-success">Edit</button></Link></td>
      <td>< button onClick={() => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        deleteitem(i._id);
      }
    }} type="button"  class="btn btn-danger">Delete</button></td>
    </tr>
   
))}
  </tbody>
      
</table>
      </div>
  </>
  )
}

export default Librarianshows