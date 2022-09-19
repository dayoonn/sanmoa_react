import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import CommonTable from './table/CommonTable';
import CommonTableColumn from './table/CommonTableColumn';
import CommonTableRow from './table/CommonTableRow';
import { BugOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const PostList = (props) => {
  const [postlist, setPostList] = useState([]);

  useEffect(() => {
    axios.get(`${API_END_POINT}/board`).then((response) => {
      console.log(response.data);
      setPostList(response.data.data);
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
      <Link to="/postWrite">
        <button align="right" className="voc-view-go-list-btn">
          게시글 작성
        </button>
      </Link>
      <CommonTable headersName={['번호', '제목', '등록일']}>
        {postlist &&
          postlist.map((item, index) => {
            let dateObj = new Date(item.postdate);
            let timeString_KR = dateObj.toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            });
            return (
              <CommonTableRow key={index}>
                <CommonTableColumn>{index + 1}</CommonTableColumn>
                <Link to={`/postView/${item.id}`}>{item.title}</Link>
                <CommonTableColumn>{timeString_KR}</CommonTableColumn>
              </CommonTableRow>
            );
          })}
      </CommonTable>
    </div>
  );
};

export default PostList;
