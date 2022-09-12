import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const MyPage_co=() => {



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


            <div id="main_box_mypage">
                <div className="my_div">
                    <div className="title"> 이름</div>
                    <input id="co_name" type="text" width="90" defaultValue={"산모아"} />

                    <div className="title"> 비밀번호</div>
                    <input id="co_pw" size="20" type="password"/>

                    <div className="title"> 비밀번호 확인</div>
                    <input id="co_pw_re" type="password"/>

                    <div className="title"> 이메일</div>
                    <input id="co_email" type="text" defaultValue={"sanmoa@gmail.com"}/>

                    <br/><br/>
                        <div className="co_button">
                            <input type="submit" defaultValue={"회원정보 수정"}/>
                        </div>


                </div>


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

                        <div className="icon_div"><img src={require("./img/community.png")} className="menu_icon"/>
                        </div>
                        <a href="#">커뮤니티</a>
                    </div>


                    <div>
                        <Link to="/mypage">
                            <div className="icon_div"><img src={require("./img/mypage.png")} className="menu_icon"/></div>
                            마이페이지</Link>
                    </div>


                    <div>
                        <Link to="/emergency">
                            <div className="icon_div"><img src={require("./img/aid.png")} className="menu_icon"/></div>
                            응급처치</Link>
                    </div>

                    <div>
                        <div className="icon_div"><img src={require("./img/matzip.png")} className="menu_icon"/></div>
                        <a href="">맛집</a>
                    </div>
                </nav>
            </div>
        </div>



    )
}

export default MyPage_co;


