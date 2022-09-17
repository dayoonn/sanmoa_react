import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const MyPage_co = () => {
  const [data, setData] = useState('');

  const [name, setName] = useState('');
  const [password, setPW] = useState('');
  const [confPw, setconfPw] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [contry, setContry] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {}, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${API_END_POINT}/mypage`, {
        headers: {
          authorization: localStorage.getItem('login-token'),
        },
      })
      .then(function (res) {
        setData(res.data.userInfo.name);
      })
      .catch(function (error) {
        console.log(error);
        alert('회원정보가 없습니다.');
      });

    axios
      .put(
        `${API_END_POINT}/mypage`,
        {
          name: name,
          password: password,
          confPw: confPw,
          age: age,
          phone: phone,
          contry: contry,
          content: content,
        },
        {
          headers: {
            authorization: localStorage.getItem('login-token'),
          },
        }
      )
      .then(function (res) {
        console.log(res);
        if (password) {
          if (!res.data.error) {
            alert('수정되었습니다.');
            window.location.href = '/mypage';
          }
        } else {
          alert('수정되었습니다.');
          //   window.location.href = '/mypage';
        }
        // setName(res.data.userInfo.name);
        // setPW(res.data.userInfo.password);
        // setconfPw(res.data.userInfo.confPw);
        // setAge(res.data.userInfo.age);
        // setPhone(res.data.userInfo.phone);
        // setContry(res.data.userInfo.contry);
        // setContent(res.data.userInfo.content);
      })
      .catch(function (error) {
        console.log(error);
        alert('error');
      });
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPW(e.target.value);
  };
  const onChangeConfPassword = (e) => {
    setconfPw(e.target.value);
  };
  const onChangeAge = (e) => {
    setAge(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeContry = (e) => {
    setContry(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  console.log(data);

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
              <h2>마이페이지 </h2>
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
        <form onSubmit={onSubmit} className="my_div">
          <div className="title"> 이름 </div>
          <input
            id="co_name"
            defaultValue={data}
            value={name}
            onChange={onChangeName}
            className="my_div"
            type="text"
            name="id"
          />
          <div className="title"> 기존 비밀번호. 혹은 변경할 비밀번호 </div>
          <input
            id="co_pw"
            required
            value={password}
            onChange={onChangePassword}
            className="my_div"
            type="password"
            name="id"
          />
          <div className="title"> 비밀번호 확인 </div>
          <input
            id="co_pw_re"
            required
            value={confPw}
            onChange={onChangeConfPassword}
            className="my_div"
            type="password"
            name="id"
          />
          <div className="title"> 나이 </div>
          <input
            id="co_age"
            value={age}
            onChange={onChangeAge}
            className="my_div"
            type="text"
            name="id"
          />
          <div className="title"> 연락처 </div>
          <input
            id="co_phone"
            value={phone}
            onChange={onChangePhone}
            className="my_div"
            type="text"
            name="id"
          />
          <div className="title"> 지역 </div>
          <input
            id="co_contry"
            value={contry}
            onChange={onChangeContry}
            className="my_div"
            type="text"
            name="id"
          />
          <div className="title"> 소개 </div>
          <input
            id="co_content"
            value={content}
            onChange={onChangeContent}
            className="my_div"
            type="text"
            name="id"
          />

          <button
            id="co_button"
            className="login_btn"
            type="primary"
            htmlType="submit"
          >
            수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage_co;
