import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //먼저 상품리스트를 가져와야 랜딩페이지에 나타낼 수 있다.
    axios.get(`${API_END_POINT}/store/cafe`).then((response) => {
      if (response.data) {
        setData(response.data.response.body.items.item); //가져온 모든 상품들을 배열에 저장한다.
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
    });
  }, []);
  console.log(data);

  return (
    <div>
      <div>
        <header id="main_header">
          <h1>SANMOA</h1>
        </header>
      </div>

      <ul className="img-box">
        {data.map((data) => (
          <li key={data.id} className="row align-items-center m-0">
            <div className="col-1 py-2">
              <img
                src={data.firstimage}
                alt={data.title}
                className="img-fluid rounded-circle"
              />
            </div>
            <span className="col">{data.title}</span>
            <span>{data.tel}</span>
            <span>{data.mapx}</span>
            <span>{data.mapy}</span>
          </li>
        ))}
      </ul>

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
