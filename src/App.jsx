import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import UserRegister from './component/UserRegister';
import Header from './component/Header';
import Footer from './component/Footer';
import Login from './component/Admin/Login';
import Addbooks from './component/Addbooks';
import Showbooks from './component/Showbooks';
import Librarianshows from './component/Librarianshows';
import Editbooks from './component/Editbooks';
import Viewbooks from './component/viewbooks';
import Contactus from './component/Contactus';
import Aboutus from './component/Aboutus';
// import ProtectedRoute from './Protect';
import UserProfile from './component/UserProfile';
import Index from './component/Index';
import Newsapp from './component/Newsapp';
import AdminDashboard from './component/AdminDashboard';
import Forget from './component/Forget';
import Changepassword from './component/Changepassword';
import Messagesuccess from './component/Messagesuccess';
import SearchProduct from './component/SearchProduct';
import Data from './component/Data';

const App = () => {
  const userRole = localStorage.getItem('role');  // Get user role from localStorage

  // Check if user is logged in and has a valid role
  // if (!userRole) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/change" element={<Changepassword />} />
        <Route path="/msg" element={<Messagesuccess />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path='/Data' element={<Data /> } /> 
        
        {/* Common Routes */}
        

        {/* Routes for Librarians */}
        {userRole === 'Librarian' && (
          <>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/addbooks" element={<Addbooks />} />
        
            <Route path="/editbooks/:id" element={<Editbooks />} />
            <Route path="/librarianshow" element={<Librarianshows />} />
          </>
        )}

        {/* Routes for Students */}
        {userRole === 'student' && (
          <>
          <Route path="/news" element={<Newsapp />} />
          <Route path="/show" element={<Showbooks />} />
        
      
        <Route path="/contact" element={<Contactus />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/index" element={<Index />} />
        
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/show/search/:term" element={<SearchProduct />} />
        <Route path="/profile" element={<UserProfile />} />
        
            <Route path="/view/:id" element={<Viewbooks />} />
          </>
        )}

        {/* Default route for when no matching path is found */}
        {/* <Route path="*" element={<Navigate to="/index" />} /> */}
      </Routes>
    </>
  );
};

export default App;
