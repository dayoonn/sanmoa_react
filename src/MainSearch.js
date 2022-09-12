import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const MainSearch=() => {
    const [data, setData] = useState(null);
    const [latitude,setLatitude]=useState(0);
    const [longtitude,setLongtitude]=useState(0);




    useEffect(() => {
        function getLocation() {
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function(position) {
                   // alert(position.coords.latitude + ' ' + position.coords.longitude);
                    setLatitude(position.coords.latitude);
                    setLongtitude(position.coords.longitude);
                }, function(error) {
                    console.error(error);
                }, {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: Infinity
                });
            } else {
                alert('GPS를 지원하지 않습니다');
            }
        }
        getLocation();


        axios.get(`${API_END_POINT}/store/cafe`).then((res) => {
            setData(
                res.data.elements[0].elements[1].elements[0].elements[0].elements[0]
                    .elements[0].text
            );
        });
    }, []);
    console.log(data);

   // axios.post(`${API_END_POINT}/sanmoa/route`, {params:{name:'dayooneee' }});
    //gps


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

            <h1>{data} mainsearch </h1>
            {data && <textarea rows={10} value={data} readOnly={true} />}
            <h1>위도 {longtitude}</h1>
            <h1>경도 {latitude}</h1>


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

export default MainSearch;


