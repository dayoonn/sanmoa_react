import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Menu } from 'antd';
import { MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import StoreCard from './Component/StoreSearch';
import StoreSearchContainer from './Container/StoreSearchContainer';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby = () => {
  const [store, setStore] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_END_POINT}/store/restaurant`).then((response) => {
      if (response.data) {
        setStore(response.data.response.body.items.item);
        setData(response.data.response.body.items.item);
      } else {
        alert('리스트를 가져오는데 실패했습니다.');
      }
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
              {' '}
              <h2>맛집 검색</h2>
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
      <div>
        <StoreSearchContainer item={store} />
      </div>
      <Row>
        {data.map((data) => (
          <Col xs={24} sm={12} md={6} lg={4} xl={4}>
            <StoreCard item={data}></StoreCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Nearby;
