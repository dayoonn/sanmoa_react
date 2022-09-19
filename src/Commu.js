import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import VocHeader from './header/VocHeader';
import CommonTable from './table/CommonTable';
import CommonTableColumn from './table/CommonTableColumn';
import CommonTableRow from './table/CommonTableRow';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { BugOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const GetData = () => {
  //   const [CommunityContent, setCommunityContent] = useState({
  //     title: '',
  //     content: ''
  //   })

  const [ViewContent, setViewContent] = useState({});

  useEffect(() => {
    axios.get(`${API_END_POINT}/board`).then((response) => {
      setViewContent(response.data);
    });
  }, []);

  const item = Object.values(ViewContent).map((item) => (
    <CommonTableRow key={item.id}>
      <CommonTableColumn>{item.id}</CommonTableColumn>
      <CommonTableColumn>{item.title}</CommonTableColumn>
      <CommonTableColumn>{item.postdate}</CommonTableColumn>
    </CommonTableRow>
  ));

  //   const item = (Object.values(ViewContent)).map((board) => (
  //       <CommonTableRow key={board.id}>
  //       <CommonTableColumn>{board.id}</CommonTableColumn>
  //       <CommonTableColumn>
  //         <Link to={'/board/${board.postId}'}>
  //             {board.title}
  //         </Link>
  //         </CommonTableColumn>
  //       <CommonTableColumn>{board.date}</CommonTableColumn>
  //     </CommonTableRow>
  //   ));

  return item;
};
//   const submitReview = ()=>{
//     axios.post(`${API_END_POINT}/board/`, {
//       title: CommunityContent.title,
//       content: CommunityContent.content
//     }).then(()=>{
//       alert('등록 완료!');
//     })
//   };

//   const getValue = e => {
//     const { name, value } = e.target;
//     setCommunityContent({
//       ...CommunityContent,
//       [name]: value
//     })
//   };

const Communitymain = () => {
  const item = GetData();

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

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   console.log({
  //     title,
  //     content
  //   });

  //   axios
  //     .post(`${API_END_POINT}/board/`, {
  //       content: content,
  //       title: title
  //     })
  //     .then(function (response) {
  //       // // //글 작성 완료시
  //       let token = response.data.token;
  //       if (token) {
  //         localStorage.setItem('login-token', token);
  //         window.location.href = '/mypage';
  //       } else {
  //         alert(response.data.error);
  //       }
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert('회원정보가 없습니다.');
  //     });
  // };

  // const onChangeEmail = (e) => {
  //   settitle(e.target.value);
  // };
  // const onChangePassword = (e) => {
  //   setcontent(e.target.value);
  // };

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
              <Link to="/communitymain">커뮤니티</Link>
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
        <VocHeader></VocHeader>
        <CommonTable headersName={['글번호', '제목', '등록일']}>
          {item}
        </CommonTable>
      </>

      {/* <div className='Community-container'>
                  {viewContent.map(element =>
            <div style={{ border: '1px solid #333' }}>
              <h2>{element.title}</h2>
            <div>
              {ReactHtmlParser(element.content)}
            </div>
            </div>
                    )}
            </div> */}

      {/*             
            <div className='form-wrapper'>
            <input className="title-input"
                 type='text'
                 placeholder='제목'
                 onChange={getValue}
                 name='title'
             />
            <CKEditor
                 editor={ClassicEditor}
                 data="<p>Hello from CKEditor 5!</p>"
                 onReady={editor => {
            // You can store the "editor" and use when it is needed.
                 console.log('Editor is ready to use!', editor);
                }}
                 onChange={(event, editor) => {
                 const data = editor.getData();
                 console.log({ event, editor, data });
                 setCommunityContent({
                     ...CommunityContent,
                     content: data
                    })
                 }}
                 onBlur={(event, editor) => {
                 console.log('Blur.', editor);
                 }}
                onFocus={(event, editor) => {
                console.log('Focus.', editor);
                }}
                 />  
           </div> */}
      {/* <button
           className="submit-button"
           onClick={submitReview}
           >입력</button> */}
    </div>
  );
};

export default Communitymain;
