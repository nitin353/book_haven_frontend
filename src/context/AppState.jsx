import AppContext from './AppContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppState = (props) => {
    const [token, setToken] = useState([]);
    
    const [filteredData, setFilterData] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [allbooks, setAllbooks] = useState([])
    const [allusers, setAllusers] = useState([])
    const [all_transactionusers, set_Alltransactionusers] = useState([])
    const [userData,setUserData]= useState([]);
    const [issuedBook,setIssuedBook]= useState([]);
  const data = 10;
  console.log(data);
  
  const register = async (name, email,stream, password,) => {
    console.log("name, email, password , stream", name, email, password,stream);
    try {
        console.log("enter try")
      const api = await axios.post('https://book-haven-api-ehpu.onrender.com/api/users/sign-up', 
        { name, email,stream, password },
        {
          headers: {
            'Content-Type': 'application/json', // Corrected case for 'Content-Type'
          },
          withCredentials: true, // Allow sending credentials like cookies
        }
      );
      console.log('Registration successful:', api); // If the request is successful, log the response
      console.log('Registration successful:', api.data); // If the request is successful, log the response
      return api.data
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };



  useEffect(() => {
    let lstoken = localStorage.getItem("token");
  if(lstoken){
    setToken(lstoken);
    setIsAuthenticated(true);
    
  }
  AlltransactionUsers()
  Allusers()
  showbooks()
  getUserData()
  },[]);
const login = async ( email, password) => {
    console.log("name, email, password", email, password);
    try {
      const api = await axios.post('https://book-haven-api-ehpu.onrender.com/api/users/sign-In', 
        {  email, password },
        {
          headers: {
            'Content-Type': 'application/json', // Corrected case for 'Content-Type'
          },
          withCredentials: true, // Allow sending credentials like cookies

        }
      );
      if (api.data.success){

        
          console.log("api.data login page",api.data);
          setToken(api.data.token);
          setIsAuthenticated(true);
          localStorage.setItem("token", api.data.token)
          localStorage.setItem("role", api.data.role)
      }
      
      console.log('login in :', api.data); // If the request is successful, log the response
      return api.data;

    } catch (error) {
      console.error('login error:', error.response ? error.response.data : error.message);
    }
  };

  const contact = async (name,email,phone,message)=>{
    const api = await axios.post("https://book-haven-api-ehpu.onrender.com/api/contact/conn", {name,email,phone,message},
    {
      headers:{
        'content-Type': 'Application/json'
      },
    withCredentials:true
  });
  // setReload(!reload);
  return api.data;
  }
  const AddBook = async (formData)=>{
    console.log("token", token)
    const api = await axios.post("https://book-haven-api-ehpu.onrender.com/api/books/addbook", formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: token,
      },
    withCredentials:true

  });
  
     console.log( "after working", api)
     console.log( "after working", api.data)
  
  return api.data;
  }
  const showbooks = async () => {
    const api = await axios.get("https://book-haven-api-ehpu.onrender.com/api/books/showbooks", {
      headers: {
        'Content-Type': 'Application/json',
      },
      withCredentials: true
    });
   
   // Pass only the data part of the response
   console.log("all users",api.data)
   setAllbooks(api.data)
   
  };

  const issued = async (bookId, dueDate) =>{
    console.log("bookId   = ", bookId);
    console.log("dueDate  = ", dueDate);
    // console.log("userId    = ", userId );
    const userResponse = await axios.get("https://book-haven-api-ehpu.onrender.com/api/users/getUser", {
      headers: {
        Auth:token,
      },
      withCredentials: true,
    

    });

    const userId = userResponse.data.user.userid; 
    const api = await axios.post("https://book-haven-api-ehpu.onrender.com/api/transaction/borrow", {bookId, dueDate , userId },
      {
        headers:{
          "Content-Type":"Application/json",
          Auth:token,
        },
        withCredentials:true,
      }
      
    )
    
    console.log("issued", api.data)
    setIssuedBook(api.data)
    

  }
  const Allusers = async () => {
    const api = await axios.get("https://book-haven-api-ehpu.onrender.com/api/users/allusers");
  //  
   // Pass only the data part of the response
   console.log("all users======",api.data)
   setAllusers(api.data)
  //  setFilterData(api.data.data)
  };
  const AlltransactionUsers = async () => {
    const api = await axios.get("https://book-haven-api-ehpu.onrender.com/api/transaction/transactions");
  //  
   // Pass only the data part of the response
   console.log("all Trasanctionusers======---",api.data)
   set_Alltransactionusers(api.data)
  //  setFilterData(api.data.data)
  };

  


const getUserData = async ()=> {
  console.log("gat user data call")
  const mytoken=localStorage.getItem("token");
  console.log(mytoken)
  const api = await axios.get("https://book-haven-api-ehpu.onrender.com/api/users/getUser",
    {
      headers:{
        "Content-Type":"Application/json",
        Auth: mytoken,
      },
      withCredentials:true,
    }  

  )
  console.log("get user data", api.data.user)
  setUserData(api.data.user)
}
const Logoutuser  = () => {
  setIsAuthenticated(false);
  setToken("");
  localStorage.removeItem("token");
  
    // setToken(api.data.token);
    // setIsAuthenticated(true);
    // localStorage.setItem("token", api.data.token)
    // return api.data;
}

  return (
    <AppContext.Provider value={{ data,userData,  Logoutuser,register, all_transactionusers,allusers,issuedBook,login,AddBook , issued,filteredData,contact,isAuthenticated ,allbooks,setIsAuthenticated, token}}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
