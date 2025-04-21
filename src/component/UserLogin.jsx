import React, { useState, useContext } from "react";


import AppContext from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
     const [password, setPassword] = useState("");
 const{UserLogin} = useContext(AppContext);
 const formHandler = async(e)=> {
   e.preventDefault();
   console.log({ email, password})

   
 try {

   const result = await UserLogin( email, password)
     console.log("user login successfully", result)
     console.log(result.success)
     if (result.success){
         navigate('/librarianshow')
         
       }
       else{
         alert("login failed")
       }
     
     
     setEmail("")
     setPassword("")
   }
   catch(error){
     console.error("login error", error)
   }
 };
  return (
       <>
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-4"></div>
        <div style={{paddingTop:"80px"}} class="col-md-4">
        <h1 style={{fontSize:"30px"}} class="text-center mt-5">  Admin Login  </h1>
        <form onSubmit={formHandler} style={{justifyContent:"center", alignItems:"center", display:"grid"}}>
        <div class="mb-3  mt-4 ">
    <label style={{color:"grey"}} for="exampleInputEmail1" class="form-label">Email</label>
    <input  value={email} onChange={(e)=> setEmail(e.target.value)}  type="email" style={{width:"600px"}} class="form-control" id="exampleInputEmail1" placeholder='Email' required aria-describedby="emailHelp"></input>
    <div class="mb-3" >
    <label style={{color:"grey"}} for="exampleInputPassword1" class="form-label">Password</label>
   <center> <input  value={password} onChange={(e)=> setPassword(e.target.value)}  type="password" style={{width:"600px"}} class="form-control " placeholder='Password'  required id="exampleInputPassword1"></input></center>
  </div>
  <div class="mb-3 mt-3">
  
  <button  style={{width:"130px" , color:"white", backgroundColor:"rgba(36, 91, 36, 0.93)"}}class="btn " type="submit">SIGN  IN </button>
  <a href="/Forget" style={{marginLeft:"300px"}} class="link-secondary hov ">Forgot your password?</a>

    
  </div>
  <div class="mb-3 mt-3">
  <button type="submit" style={{width:"600px", height:"", color:"green"}} class="btn ">Don't have account? 
  <a href="/register
  " class="link-secondary hov"> Create account</a></button>
  </div>
  </div>
</form>
  </div>
        
        <div class="col-md-4"></div></div>
            </div>
            <br></br>   <br></br>  <br></br>
            
    </>
  )
}

export default UserLogin