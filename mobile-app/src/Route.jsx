// RouterComponent.js
import React, { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/Nav/Left';
import axios from 'axios';
// import MobileDetails from './modules/mobiles/ShowDetail';
// import MobileList from './modules/mobiles/MobileList';
// import MobileCreate from './modules/mobiles/Create';
// import { Login } from './components/Login';
// import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { ErrorPage } from './components/Error';
import { Dashboard } from './components';
import { Login, Register } from './components/User';
// import MobileCreate from './components/mobiles/Create';

const RouterComponent = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/mobiles')
      .then(response => {
        setMobiles(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
 
    <div>
    <Router>
      <Routes>
        <Route path ="/" element={<Navigate to="dashboard" replace/>}/>
        <Route path="dashboard/*" element={<Dashboard/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path= "register" element={<Register/>}/>
        <Route path ="login" element={<Login/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
    </div>
  );
};

export default RouterComponent;
