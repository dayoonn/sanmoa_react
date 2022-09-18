import React, { Fragment, useState } from 'react';
import { Button, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import StoreCard from '../Component/StoreSearch';
import axios from 'axios';

const { Search } = Input;

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const StoreSearchContainer = () => {
  const [query, setQuery] = useState('');
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const [items, setItems] = useState([]);
  const handleButton = () => {
    axios
      .post(`${API_END_POINT}/store/search`, {
        word: query,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setItems(res.data.response.body.items.item);
        } else {
          alert('리스트를 가져오는데 실패했습니다.');
        }
      });
  };

  return (
    <Fragment>
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <Input
          type="text"
          placeholder="검색어를 입력해주세요"
          style={{ width: 250 }}
          onSearch={(value) => console.log(value)}
          onPressEnter={handleButton}
          onChange={handleQuery}
        />
        <Button
          icon={<SearchOutlined />}
          type="submit"
          style={{ width: 30 }}
          onSearch={(value) => console.log(value)}
          onClick={handleButton}
        />
      </div>
      <div>
        <Row>
          {items &&
            items.map((items) => {
              return (
                <Col xs={24} sm={12} md={6} lg={4} xl={4}>
                  <StoreCard item={items}></StoreCard>
                </Col>
              );
            })}
        </Row>
      </div>
    </Fragment>
  );
};

export default StoreSearchContainer;
