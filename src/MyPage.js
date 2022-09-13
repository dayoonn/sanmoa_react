import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from 'react-router-dom';


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;


const MyPage=() => {



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
                    <div className="title"> 내 정보</div>
                    <div id="my_name">산모아</div>
                    <div id="my_mail">sanmoa@gmail.com</div>
                    <br/>

                    <Link to="/MyPage_co">
                        <button id="my_correction" >회원정보 수정 </button>
                    </Link>


                    <button id="logout" >로그아웃 </button>

                </div>

                <br/>
                    <div className="my_div_mile">
                        <div className="title"> 마일리지</div>
                        <div id="mileage">1234P</div>
                    </div>

                    <br/>
                        <hr/>
                            <div className="my_div">
                                <div className="title"> 등산 기록</div>
                                <div id="hiking_record">함박산 10km 달성</div>

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

export default MyPage;


