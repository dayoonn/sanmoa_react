import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';

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
  /**추가**/
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleBar, setToggleBar] = useState(true);

  const toggleChange = () => {
    setToggleMenu(!toggleMenu);
    setToggleBar(!toggleBar);
  };

  const onMenuClick = () => {
    setToggleMenu(!toggleMenu);
    setToggleBar(!toggleBar);
  };
  /**추가**/

  return (
    <div>
      <nav>
        <header id="main_header">
          <h1>SANMOA</h1>
        </header>

        <header id="menu_header">
          <div className="menu_inline">
            <button id="menu" type="primary" onClick={toggleChange}>
              {toggleBar ? <MenuOutlined /> : <MenuFoldOutlined />}
            </button>

            <div className="menu_title">
              {' '}
              <h2>마이페이지</h2>
            </div>
          </div>
        </header>
      </nav>

      <div className="nav_bar">
        {toggleMenu && (
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="light"
            inlineCollapsed={toggleBar}
            onClick={onMenuClick}
          >
            <Menu.Item>
              <Link to="/">등산로 검색</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/community">커뮤니티</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/mypage">마이페이지</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/emergency">응급처치</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Nearby">맛집 검색</Link>
            </Menu.Item>
          </Menu>
        )}
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
    </div>
  );
};

export default MyPage;
