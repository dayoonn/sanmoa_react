import React, { useState } from 'react';
import axios from 'axios';
import './css/Post.css';
import './css/style.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const PostUpdate = () => {
  if (!localStorage.getItem('login-token')) {
    alert('회원정보가 없습니다.');
    window.location.href = '/login';
  }
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [updateTitle, setPUTTitle] = useState('');
  const [updateContent, setPUTContent] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${API_END_POINT}/board/${id}`,
        {
          title: updateTitle,
          content: updateContent,
        },
        {
          headers: {
            authorization: localStorage.getItem('login-token'),
          },
        }
      )
      .then(function (res) {
        if (res) {
          if (res.data.error) {
            alert(res.data.error);
            navigate(-1);
          }
          if (res.data.data) {
            alert(res.data.data);
            navigate(-1);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('작성 도중에 오류가 발생하였습니다.');
      });
  };

  const onChangetitle = (e) => {
    setPUTTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setPUTContent(e.target.value);
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
        <h2 align="center">글 수정</h2>
        <div>
          <div id="box2" align="center">
            <textarea
              type="text"
              required="required"
              className="inputbox"
              placeholder="제목을 입력하세요"
              onChange={onChangetitle}
              value={updateTitle}
            />
          </div>
          <div align="center">
            <textarea
              type="text"
              required="required"
              className="inputbox2"
              placeholder="내용을 입력하세요"
              onChange={onChangeContent}
              value={updateContent}
            />
          </div>
          <div align="center">
            <button type="button" onClick={onSubmit}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;
