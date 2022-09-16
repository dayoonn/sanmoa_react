import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/styleSign.css';
import { Link } from 'react-router-dom';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Login_welcome = () => {
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
        console.log(response);
      })
      .catch(function (error) {
        console.log('땡');
        console.log(error);
      });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  /**추가**/
    const [toggleMenu, setToggleMenu] = useState(false)
    const [toggleBar, setToggleBar] = useState(true)

    const toggleChange = () => {
        setToggleMenu(!toggleMenu)
        setToggleBar(!toggleBar)
    }

    const onMenuClick = () => {

        setToggleMenu(!toggleMenu)
        setToggleBar(!toggleBar)
    }
    /**추가**/

  return (
    <div>
     <nav>
                <header id="main_header">
                    <h1>SANMOA</h1>
                </header>

                <header id="menu_header">
                    <div className="menu_inline" >

                        <button id="menu" type="primary" onClick={toggleChange}>
                            { toggleBar ? <MenuOutlined /> : <MenuFoldOutlined /> }
                        </button>

                        <div className="menu_title"> <h2>WELCOME</h2></div>

                    < /div>
                </header>
            </nav>

            <div className="nav_bar">
                { toggleMenu &&
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={toggleBar}
                        onClick={onMenuClick}
                    >
                        <Menu.Item>
                            <Link to="/">
                                등산로 검색
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/community">
                                커뮤니티
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/mypage">
                                마이페이지
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/emergency">
                                응급처치
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/Nearby">
                                맛집 검색
                            </Link>
                        </Menu.Item>
                    </Menu>
                }
            </div>

      <div id="container" className="main_container">
        <article>
          <div className="login_wrapper">
            <a className="welcome_message">산모아에 가입되셨습니다</a>
            <form className="login_form">
              <input
                id="LOGIN_ID"
                className="login_text"
                type="text"
                name="id"
                placeholder="이메일"
              />
              <input
                id="LOGIN_PW"
                className="login_text"
                type="password"
                name="id"
                placeholder="비밀번호"
              />
              <button
                id="LOGIN_BTN"
                className="login_btn"
                type="button"
                disabled
              >
                로그인
              </button>
            </form>
          </div>
        </article>
      </div>

   
    </div>
  );
};

export default Login_welcome;
