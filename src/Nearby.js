import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby=() => {
    const [data, setData] = useState(null);
    var arr=[];
    useEffect(() => {
        axios.get(`${API_END_POINT}/store/restaurant`).then((res) => {
            for(var i=0; i<=100; i++){
            setData(
                res.data.response.body.items.item[i].title
            );
            arr[i]=data;
            console.log(arr[i]);}

        });
    }, []);
    console.log(data);

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

            <h1>{data}</h1>





            <div id="main_box">
                 <div>
                    <div className="whitebox_left">
                        <img className="near_img" src="http://noms.templestay.com/images//RsImage/L_329.png"/>
                            <a>경계선<p/>템플스테이</a>
                    </div>
                    <div className="whitebox_right">
                        <img className="near_img" src="http://noms.templestay.com/images//RsImage/L_329.png"/>
                            <a>경계선<p/>템플스테이</a>
                    </div>
                </div>
                <div>
                    <div className="whitebox_left">
                        <img className="near_img" src="http://noms.templestay.com/images//RsImage/L_329.png"/>
                            <a>경계선<p/>템플스테이</a>
                    </div>
                    <div className="whitebox_right">
                        <img className="near_img" src="http://noms.templestay.com/images//RsImage/L_329.png"/>
                            <a>경계선<p/>템플스테이</a>
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

export default Nearby;


