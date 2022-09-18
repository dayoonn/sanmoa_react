import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import StoreSearchContainer from './Container/StoreSearchContainer';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby = () => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    axios.get(`${API_END_POINT}/store/cafe`).then((response) => {
      if (response.data) {
        setStore(response.data.response.body.items.item);
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  console.log(store);

  return (
    <div>
      <div>
        <header id="main_header">
          <h1>SANMOA</h1>
        </header>
        <header id="menu_header">
          <h2>맛집</h2>
        </header>
      </div>
      <div>
        <StoreSearchContainer item={store} />
      </div>

      {/* <ul className="img-box">
        {data.map((data) => (
          <li
            key={data.id}
            className="row align-items-center m-0"
            style={{ float: 'left', margin: '15px' }}
          >
            <div className="col-1 py-2">
              <img
                src={data.firstimage}
                alt={data.title}
                style={{ width: '180px', height: '120px' }}
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="content">
              <span className="col" style={{ fontSize: '15px' }}>
                {data.title}
              </span>
              <br />
              <span id="other" style={{ fontSize: '10px' }}>
                {data.tel}
              </span>
              <br />
              <span id="other" style={{ fontSize: '10px' }}>
                {data.addr1}
              </span>
            </div>
          </li>
        ))}
      </ul> */}

      <div id="footer">
        <nav id="footer_gnb">
          <div>
            <Link to="/">
              <div className="icon_div">
                <img src={require('./img/search.png')} className="menu_icon" />
              </div>
              검색
            </Link>
          </div>

          <div>
            <Link to="/">
              <div className="icon_div">
                <img
                  src={require('./img/community.png')}
                  className="menu_icon"
                />
              </div>
              커뮤니티
            </Link>
          </div>

          <div>
            <Link to="/mypage">
              <div className="icon_div">
                <img src={require('./img/mypage.png')} className="menu_icon" />
              </div>
              마이페이지
            </Link>
          </div>

          <div>
            <Link to="/emergency">
              <div className="icon_div">
                <img src={require('./img/aid.png')} className="menu_icon" />
              </div>
              응급처치
            </Link>
          </div>

          <div>
            <Link to="/Nearby">
              <div className="icon_div">
                <img src={require('./img/matzip.png')} className="menu_icon" />
              </div>
              맛집
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Nearby;
