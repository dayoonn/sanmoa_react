import './App.css';
import Main from './Main';
import React, { useState, useEffect } from 'react';
import './css/style.css';
import MainSearch from './MainSearch';
import MyPage_co from './MyPage_co';
import MyPage from './MyPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Nearby from './Nearby';
import 'antd/dist/antd.css';
import PostMain from './PostMain';
import PostView from './PostView';
import PostWrite from './PostWrite';
import Emergency from './Emergency';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact={true} element={<MainSearch />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage_co" element={<MyPage_co />} />
          <Route path="/mapsearch" element={<Main />} />
          <Route path="/postView/:id" element={<PostView />} />
          <Route path="/community" element={<PostMain />} />
          <Route path="/postWrite" element={<PostWrite />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Nearby" element={<Nearby />} />
          <Route path="/Emergency" element={<Emergency />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
