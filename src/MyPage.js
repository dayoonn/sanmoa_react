import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const MyPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contry, setContry] = useState('');
  const [content, setContent] = useState('');
  const [mileage, setMileage] = useState('');

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/mypage`, {
        headers: {
          authorization: localStorage.getItem('login-token'),
        },
      })
      .then(function (res) {
        setName(res.data.userInfo.name);
        setAge(res.data.userInfo.age);
        setEmail(res.data.userInfo.email);
        setPhone(res.data.userInfo.phone);
        setContry(res.data.userInfo.contry);
        setContent(res.data.userInfo.content);
        setMileage(res.data.userInfo.mileage);
      })
      .catch(function (error) {
        console.log(error);
        alert('회원정보가 없습니다.');
        window.location.href = '/login';
      });
  }, []);
  const onClickHandler = () => {
    localStorage.removeItem('login-token');
    document.location.href('/login');
  };

  return (
    <div>
      <div>
        <header id="main_header">
          <h1>SANMOA</h1>
        </header>

        <header id="menu_header">
          <h2>메뉴 타이틀</h2>
        </header>
      </div>

      <div id="main_box_mypage">
        <div className="my_div">
          <div className="title"> 내 정보</div>
          <div id="my_name">이름 : {name}</div>
          <div id="my_mail">email : {email}</div>
          <div id="my_age">나이 : {age}</div>
          <div id="my_phone">연락처 : {phone}</div>
          <div id="my_contry">지역 : {contry}</div>
          <div id="my_content">소개: {content}</div>

          <br />

          <Link to="/MyPage_co">
            <button id="my_correction">회원정보 수정 </button>
          </Link>

          <Link to="/login">
            <button id="my_correction" onClick={onClickHandler}>
              로그아웃
            </button>
          </Link>
        </div>

        <br />
        <div className="my_div_mile">
          <div className="title"> 마일리지</div>
          <div id="mileage">{mileage}P</div>
        </div>

        <br />
        <hr />
        <div className="my_div">
          <div className="title"> 등산 기록</div>
          <div id="hiking_record">함박산 10km 달성</div>
        </div>
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
            <div className="icon_div">
              <img src={require('./img/community.png')} className="menu_icon" />
            </div>
            <a href="#">커뮤니티</a>
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
            <div>
              <Link to="/Nearby">
                <div className="icon_div">
                  <img
                    src={require('./img/matzip.png')}
                    className="menu_icon"
                  />
                </div>
                맛집
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MyPage;
