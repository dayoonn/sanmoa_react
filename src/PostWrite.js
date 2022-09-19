import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BugOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './css/style.css';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const PostWrite = () => {
  if (!localStorage.getItem('login-token')) {
    alert('회원정보가 없습니다.');
    window.location.href = '/login';
  }
  const [postTitle, setPostTitle] = useState('');
  const [postContents, setPostContents] = useState('');

  const onChangeTitle = (e) => {
    setPostTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setPostContents(e.target.value);
  };
  useEffect(() => {
    axios
      .post(
        `${API_END_POINT}/board`,
        {
          title: postTitle,
          content: postContents,
        },
        {
          headers: {
            authorization: localStorage.getItem('login-token'),
          },
        }
      )
      .then((response) => {
        setPostTitle(response.data.data);
        setPostContents(response.data.user);
      });
  }, []);

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
              <h2>커뮤니티 </h2>
            </div>
          </div>
        </header>
      </nav>

      {/* 메뉴바 */}
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
      <>
        <h2 align="center">게시글 상세정보</h2>

        <div className="post-view-wrapper">
          <>
            <div className="post-view-row">
              <label>제목</label>
              <label>{postTitle}</label>
            </div>
            <div className="post-view-row">
              <label>작성자</label>
              <label>{}</label>
            </div>
            <div className="post-view-row">
              <label>작성일</label>
              <label>{}</label>
            </div>
            <div className="post-view-row">
              <label>내용</label>
              <div>{postContents}</div>
            </div>
          </>
          : ( '해당 게시글을 찾을 수 없습니다.' )
          <button className="post-view-go-list-btn">제출하기</button>
        </div>
      </>
    </div>
  );
};

export default PostWrite;
