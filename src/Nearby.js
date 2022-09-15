import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby = () => {
  const [cafe, setCafe] = useState([]);
  const [food, setFood] = useState([]);
  const [stay, setStay] = useState([]);
  const [leport, setLeport] = useState([]);

  const onClick1 = () => {
    //먼저 상품리스트를 가져와야 랜딩페이지에 나타낼 수 있다.
    axios.get(`${API_END_POINT}/store/cafe`).then((response) => {
      if (response.data) {
        setCafe(response.data.response.body.items.item); //가져온 모든 상품들을 배열에 저장한다.
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
    });
  };

  const onClick2 = () => {
    //먼저 상품리스트를 가져와야 랜딩페이지에 나타낼 수 있다.
    axios.get(`${API_END_POINT}/store/restaurant`).then((response) => {
      if (response.data) {
        setFood(response.data.response.body.items.item); //가져온 모든 상품들을 배열에 저장한다.
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
    });
  };
  const onClick3 = () => {
    //먼저 상품리스트를 가져와야 랜딩페이지에 나타낼 수 있다.
    axios.get(`${API_END_POINT}/store/stay`).then((response) => {
      if (response.data) {
        setStay(response.data.response.body.items.item); //가져온 모든 상품들을 배열에 저장한다.
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
    });
  };
  const onClick4 = () => {
    //먼저 상품리스트를 가져와야 랜딩페이지에 나타낼 수 있다.
    axios.get(`${API_END_POINT}/store/leport`).then((response) => {
      if (response.data) {
        setStay(response.data.response.body.items.item); //가져온 모든 상품들을 배열에 저장한다.
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
    });
  };

  return (
    <div>
      <div>
        <header id="main_header">
          <h1>SANMOA</h1>
        </header>
      </div>
      <div>
        <div>
          <button onClick={onClick1}>카페</button>
          <button onClick={onClick2}>식당</button>
          <button onClick={onClick3}>숙소</button>
          <button onClick={onClick4}>레저</button>
        </div>
        <ul className="img-box">
          {cafe.map((cafe) => (
            <li key={cafe.id} className="row align-items-center m-0">
              <div className="col-1 py-2">
                <img
                  src={cafe.firstimage}
                  alt={cafe.title}
                  className="img-fluid rounded-circle"
                />
              </div>
              <span className="col">{cafe.title}</span>
              <span>연락처 : {cafe.tel}</span>
              <span>위치 : {cafe.mapx}</span>
              <span>{cafe.mapy}</span>
            </li>
          ))}
        </ul>
        <ul className="img-box">
          {food.map((food) => (
            <li key={food.id} className="row align-items-center m-0">
              <div className="col-1 py-2">
                <img
                  src={food.firstimage}
                  alt={food.title}
                  className="img-fluid rounded-circle"
                />
              </div>
              <span className="col">{food.title}</span>
              <span>연락처 : {food.tel}</span>
              <span>위치 : {food.mapx}</span>
              <span>{food.mapy}</span>
            </li>
          ))}
        </ul>
        <ul className="img-box">
          {stay.map((stay) => (
            <li key={stay.id} className="row align-items-center m-0">
              <div className="col-1 py-2">
                <img
                  src={stay.firstimage}
                  alt={stay.title}
                  className="img-fluid rounded-circle"
                />
              </div>
              <span className="col">{stay.title}</span>
              <span>연락처 : {stay.tel}</span>
              <span>위치 : {stay.mapx}</span>
              <span>{stay.mapy}</span>
            </li>
          ))}
        </ul>
        <ul className="img-box">
          {leport.map((leport) => (
            <li key={leport.id} className="row align-items-center m-0">
              <div className="col-1 py-2">
                <img
                  src={leport.firstimage}
                  alt={leport.title}
                  className="img-fluid rounded-circle"
                />
              </div>
              <span className="col">{leport.title}</span>
              <span>연락처 : {leport.tel}</span>
              <span>위치 : {leport.mapx}</span>
              <span>{leport.mapy}</span>
            </li>
          ))}
        </ul>
      </div>

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
