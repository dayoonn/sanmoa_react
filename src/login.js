import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/styleSign.css';
import { Link } from 'react-router-dom';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();

    console.log({
      Email,
      Password,
    });

    axios
      .post(`${API_END_POINT}/auth/login`, {
        email: Email,
        password: Password,
      })
      .then(function (response) {
        // // //로그인 성공시
        console.log(response.data.token);
        let token = response.data.token;
        // localStorage.setItem(('refresh-token',response.data['refresh-token']));
        //document.location.href = '/mypage';
        if (response.status === 200) {
          if (token) {
            localStorage.setItem('login-token', token);
          }
          alert('로그인 되었습니다.');
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('회원정보가 없습니다.');
      });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
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

      <div id="container" className="main_container">
        <article>
          <div className="login_wrapper">
            <form onSubmit={onSubmit} className="login_form">
              <input
                id="LOGIN_ID"
                value={Email}
                required
                onChange={onChangeEmail}
                className="login_text"
                type="text"
                name="id"
                placeholder="전화번호, 사용자 이름 또는 이메일"
              />
              <input
                id="LOGIN_PW"
                value={Password}
                required
                onChange={onChangePassword}
                className="login_text"
                type="password"
                name="id"
                placeholder="비밀번호"
              />
              <button
                id="LOGIN_BTN"
                className="login_btn"
                type="primary"
                htmlType="submit"
              >
                로그인
              </button>
            </form>
            <Link to="/signup">
              <a className="login_bottom" href="signup.html">
                회원이 아니신가요?
              </a>
            </Link>
          </div>
        </article>
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
            <Link to="/login">
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

export default Login;
