import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/styleSign.css';
import {Link} from 'react-router-dom';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;


const Signup = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordCheck, setPasswordCheck] = useState('');
    const [PasswordError, setPasswordError] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault();


        if (Password !== PasswordCheck) {
            return setPasswordError(true);
        }

        console.log({
            Name,
            Email,
            Password,
            PasswordCheck
        });

        axios.post(`${API_END_POINT}/auth/register`, {
            email : Email,
            name : Name,
            password : Password
        })
            .then(function (response) {
                console.log(response);
                alert("회원가입이 완료되었습니다.")
                document.location.href = '/login'

            })
            .catch(function (error) {
                alert("회원가입 실패. 다시 입력해 주세요.")
                console.log("땡");
                console.log(error);
            });
    };


    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordChk = (e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== Password);
        setPasswordCheck(e.target.value);
    };
    
    /**추가**/
    const [toggleMenu, setToggleMenu] = useState(false)
    const [toggleBar, setToggleBar] = useState(true)

    const toggleChange = () => {
        setToggleMenu(!toggleMenu)
        setToggleBar(!toggleBar)
    }

    const onMenuClick = () => {

        setToggleMenu(!toggleMenu)
        setToggleBar(!toggleBar)
    }
    /**추가**/




    return (
        <div>
                  <nav>
                <header id="main_header">
                    <h1>SANMOA</h1>
                </header>

                <header id="menu_header">
                    <div className="menu_inline" >

                        <button id="menu" type="primary" onClick={toggleChange}>
                            { toggleBar ? <MenuOutlined /> : <MenuFoldOutlined /> }
                        </button>

                        <div className="menu_title"> <h2></h2></div>

                    < /div>
                </header>
            </nav>

            <div className="nav_bar">
                { toggleMenu &&
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={toggleBar}
                        onClick={onMenuClick}
                    >
                        <Menu.Item>
                            <Link to="/">
                                등산로 검색
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/community">
                                커뮤니티
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to="/mypage">
                                마이페이지
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/emergency">
                                응급처치
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/Nearby">
                                맛집 검색
                            </Link>
                        </Menu.Item>
                    </Menu>
                }
            </div>

            <div id="container" className="main_container">
                <article>
                    <div className="login_wrapper">
                        <form onSubmit={onSubmit} className="login_form">
                            <input id="LOGIN_NAME" value={Name} required onChange={onChangeName} className="login_text"
                                   type="text" name="id" placeholder="이름"/>

                            <input id="LOGIN_ID" value={Email} required onChange={onChangeEmail} className="login_text"
                                   type="text" name="id" placeholder="전화번호, 사용자 이름 또는 이메일"/>

                            <input id="LOGIN_PW" value={Password} required onChange={onChangePassword} className="login_text" type="password" name="id" placeholder="비밀번호"/>
                            <input id="LOGIN_PW_CHK" value={PasswordCheck} required onChange={onChangePasswordChk} className="login_text" type="password" name="id" placeholder="비밀번호 확인"/>
                            {PasswordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}


                                <button id="LOGIN_BTN" className="login_btn" type="primary" htmlType="submit">회원가입</button>


                        </form>
                    </div>
                </article>
            </div>

         
        </div>


    )
}

export default Signup;


