import './App.css';
import axios from 'axios';
import Main from './Main';
import React, { useState, useEffect } from 'react';
import './css/style.css';
import MainSearch from './MainSearch';
import Map from './Map';
import Emergency from './Emergency';
import MyPage_co from './MyPage_co';
import MyPage from './MyPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Nearby from './Nearby';
import Login_welcome from './login_welcome';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const App = () => {
  /* const [data, setData] = useState(null);

     useEffect(() => {
         axios.get(`${API_END_POINT}/store/cafe`).then((res) => {
             setData(
                 res.data.elements[0].elements[1].elements[0].elements[0].elements[0]
                     .elements[0].text
             );
         });
     }, []);
     console.log(data); */
  // axios.post(`${API_END_POINT}/sanmoa/route`, {params:{name:'dayooneee' }});

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact={true} element={<Map />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage_co" element={<MyPage_co />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/mainsearch" element={<MainSearch />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Nearby" element={<Nearby />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
