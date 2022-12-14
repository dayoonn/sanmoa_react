import React, { useState } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const PostWrite = () => {
  if (!localStorage.getItem('login-token')) {
    alert('회원정보가 없습니다.');
    window.location.href = '/login';
  }

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API_END_POINT}/board`,
        {
          title: postTitle,
          content: postContent,
        },
        {
          headers: {
            authorization: localStorage.getItem('login-token'),
          },
        }
      )
      .then(function (res) {
        if (res) {
          alert(res.data.data);
          window.location.href = '/community';
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('작성 도중에 오류가 발생하였습니다.');
      });
  };

  const onChangetitle = (e) => {
    setPostTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setPostContent(e.target.value);
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
              <h2>커뮤니티</h2>
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
              <Link to="/Nearby">관광 정보 검색</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>

      <div id="post_title">
        <h2 align="center">글 작성</h2>
        <div>
          <div id="box2" align="center">
            <textarea
              type="text"
              className="inputbox"
              placeholder="제목을 입력하세요"
              onChange={onChangetitle}
              value={postTitle}
            />
          </div>
          <div align="center">
            <textarea
              className="inputbox2"
              placeholder="내용을 입력하세요"
              onChange={onChangeContent}
              value={postContent}
            />
          </div>
          <div align="center">
            <Link to="/community">
              <button type="button" onClick={onSubmit}>
                submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
