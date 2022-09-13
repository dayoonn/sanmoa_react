import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/styleSign.css';
import {Link} from 'react-router-dom';


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;


const Login_welcome=() => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();


        console.log({
            Email,
            Password,
        });

        axios.post('http://3.35.173.122:4000/api/auth/login', {
            email : Email,
            password : Password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log("땡");
                console.log(error);
            });
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };


    return (
        <div>
            <div>
                <header id="main_header">
                    <h1>SANMOA</h1>
                </header>

                <header id="menu_header">
                    <h2>메뉴 타이틀</h2>
                </header>
            </div>

            <div id="container" className="main_container">
                <article>
                    <div className="login_wrapper">
                        <a className="welcome_message">산모아에 가입되셨습니다</a>
                        <form className="login_form">
                            <input id="LOGIN_ID" className="login_text" type="text" name="id"
                                   placeholder="전화번호, 사용자 이름 또는 이메일"/>
                                <input id="LOGIN_PW" className="login_text" type="password" name="id"
                                       placeholder="비밀번호"/>
                                    <button id="LOGIN_BTN" className="login_btn" type="button" disabled>로그인</button>
                        </form>
                    </div>
                </article>
            </div>

            <div id="footer">
                <nav id="footer_gnb">

                    <div>
                        <Link to="/">
                            <div className="icon_div"><img src={require("./img/search.png")} className="menu_icon"/></div>
                            검색
                        </Link>
                    </div>


                    <div>
                        <Link to="/">
                            <div className="icon_div"><img src={require("./img/community.png")} className="menu_icon"/></div>
                            커뮤니티</Link>
                    </div>


                    <div>
                        <Link to="/login">
                            <div className="icon_div"><img src={require("./img/mypage.png")} className="menu_icon"/></div>
                            마이페이지</Link>
                    </div>


                    <div>
                        <Link to="/emergency">
                            <div className="icon_div"><img src={require("./img/aid.png")} className="menu_icon"/></div>
                            응급처치</Link>
                    </div>

                    <div>
                        <Link to="/Nearby">
                            <div className="icon_div"><img src={require("./img/matzip.png")} className="menu_icon"/></div>
                            맛집</Link>
                    </div>
                </nav>
            </div>
        </div>



    )
}

export default Login_welcome;


