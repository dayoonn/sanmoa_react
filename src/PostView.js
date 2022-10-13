import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Post.css';
import './css/style.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BugOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import CommonTable from './table/CommonTable';
import CommonTableColumn from './table/CommonTableColumn';
import CommonTableRow from './table/CommonTableRow';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const PostView = () => {
  const { id } = useParams();
  const [posteach, setPostEach] = useState([]);
  const [postuser, setPostUser] = useState([]);
  const [review, setReview] = useState('');
  const [reviewArray, setReviewArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_END_POINT}/board/${id}`).then((response) => {
      setPostEach(response.data.data);
      setPostUser(response.data.user);
      setReviewArray(response.data.comment);
    });
  }, []);

  const onDelete = (e) => {
    if (!localStorage.getItem('login-token')) {
      alert('회원정보가 없습니다.');
      window.location.href = '/login';
    }
    e.preventDefault();
    axios
      .delete(`${API_END_POINT}/board/${id}`, {
        headers: {
          authorization: localStorage.getItem('login-token'),
        },
      })
      .then(function (res) {
        if (res) {
          if (res.data.error) {
            alert(res.data.error);
          }
          if (res.data.data) {
            alert(res.data.data);
            window.location.href = '/community';
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        alert('작성 도중에 오류가 발생하였습니다.');
      });
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

  let dateObj = new Date(posteach.postdate);
  let timeString_KR = dateObj.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });

  const handleReviewInput = (event) => {
    setReview(event.target.value);
  };

  const handleTotalEnter = (event) => {
    if (!localStorage.getItem('login-token')) {
      alert('회원정보가 없습니다.');
      window.location.href = '/login';
    }
    if (event.key === 'Enter') {
      axios
        .post(
          `${API_END_POINT}/comment`,
          {
            content: review,
            postdatumId: id,
          },
          {
            headers: {
              authorization: localStorage.getItem('login-token'),
            },
          }
        )
        .then((response) => {
          // event.preventDefault();
          const repoArray = [...reviewArray];
          setReviewArray(repoArray);
          event.target.value = '';
          window.location.href = `/postView/${id}`;
        });
    }
  };
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
          {posteach ? (
            <>
              <div className="post-view-row">
                <label>제목</label>
                <label>{posteach.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{postuser}</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{timeString_KR}</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>{posteach.content}</div>
              </div>
            </>
          ) : (
            '해당 게시글을 찾을 수 없습니다.'
          )}
          <div id="crud_button" align="center">
            <button
              className="post-view-go-list-btn"
              onClick={() => navigate(-1)}
            >
              목록
            </button>
            <Link to={`/postUpdate/${id}`}>
              <button className="post-view-go-list-btn">수정</button>
            </Link>
            <button className="post-view-go-list-btn" onClick={onDelete}>
              삭제
            </button>
          </div>
        </div>
      </>
      <div style={{ margin: '10px' }}>
        <div align="center">
          <input
            className="review-input"
            type="text"
            placeholder="댓글을 입력해주세요."
            onKeyPress={(event) => {
              handleTotalEnter(event);
            }}
            onKeyUp={(event) => {
              handleReviewInput(event);
            }}
          />
        </div>
      </div>

      <CommonTable headersName={['댓글', '', '']}>
        {reviewArray &&
          reviewArray.map((data, index) => {
            let dateObj = new Date(data.comment.commendate);
            let timeString_KR = dateObj.toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            });
            const onCommentDelete = (e) => {
              if (!localStorage.getItem('login-token')) {
                alert('회원정보가 없습니다.');
                window.location.href = '/login';
              }
              e.preventDefault();
              axios
                .delete(`${API_END_POINT}/comment/${data.comment.id}`, {
                  headers: {
                    authorization: localStorage.getItem('login-token'),
                  },
                })
                .then(function (res) {
                  if (res) {
                    if (res.data.error) {
                      alert(res.data.error);
                    }
                    if (res.data.data) {
                      alert(res.data.data);
                      window.location.href = `/postView/${id}`;
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  alert('작성 도중에 오류가 발생하였습니다.');
                });
            };
            return (
              <CommonTableRow key={index}>
                <CommonTableColumn>{data.comment.id}</CommonTableColumn>
                <CommonTableColumn>{data.commentUser.name}</CommonTableColumn>
                <CommonTableColumn>{data.comment.content}</CommonTableColumn>
                <CommonTableColumn>{timeString_KR}</CommonTableColumn>
                <button
                  className="post-view-go-list-btn"
                  onClick={onCommentDelete}
                >
                  삭제
                </button>
              </CommonTableRow>
            );
          })}
      </CommonTable>
    </div>
  );
};

export default PostView;
