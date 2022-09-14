/*global kakao*/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const MainSearch = () => {


    const [data, setData] = useState(null);
    const [Latitude, setLatitude] = useState(0);
    const [Longtitude, setLongtitude] = useState(0);
    const [inputData, setInputData] = useState(null);
    var hiking_arry = [[]];
    var linePath = [[]]; //등산로별 path
    var linePath_co=[]; //좌표 path
    var count_coordinate = 0; //좌표개수
    var count_course = 0; //등산로개수
    var polyline=[];

    useEffect(() => {

        //geolocation
        function getLocation() {
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    //   alert(position.coords.latitude + ' ' + position.coords.longitude);
                    setLatitude(position.coords.latitude);
                    setLongtitude(position.coords.longitude);


                    console.log(Longtitude + ' , ' + Latitude);

                    //x:longtitude
                    //y:latitude


                }, function (error) {
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


        axios.post('http://3.35.173.122:4000/api/sanmoa/route', {
            xLocation: 126.7039926, //바꾸기
            yLocation: 37.5278857
        })
            .then(function (response) {
                console.log(response);
                alert("post 요청 성공");

                count_course=response.data.response.result.featureCollection.features.length; //코스 개수
                console.log("코스 개수: ", count_course);



                for(let j=0; j<count_course;j++) {

                    hiking_arry[j] = response.data.response.result.featureCollection.features[j].geometry.coordinates[0];
                    //setInputData(response.data.response.result.featureCollection.features[0].geometry.coordinates[0]);

                    console.log('App :: inputData :: ', hiking_arry);
                    //console.log('App :: inputData :: ', inputData);

                    count_coordinate = response.data.response.result.featureCollection.features[j].geometry.coordinates[0].length; //좌표수
                    console.log("좌표 개수: ", count_coordinate);
                    console.log("좌표 개수: ", count_coordinate);


                    for (let i = 0; i < count_coordinate; i++) {
                        linePath_co[j] = new kakao.maps.LatLng(hiking_arry[j][i][1], hiking_arry[j][i][0]);
                        console.log(hiking_arry[j][i][1],hiking_arry[j][i][0]);
                    }

                    linePath[j]=linePath_co;
                    console.log("linePath ", linePath);
                }

                //카카오 맵
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(37.53146645459402, 126.69830854556751
                        ), // 지도의 중심좌표 //y:lat,x:long
                        level: 3 // 지도의 확대 레벨
                    };

                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


                // 지도에 표시할 선을 생성합니다
                polyline = new kakao.maps.Polyline({
                    path: linePath, // 선을 구성하는 좌표배열 입니다
                    strokeWeight: 5, // 선의 두께 입니다
                    strokeColor: '#0000FF', // 선의 색깔입니다
                    strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid' // 선의 스타일입니다
                });
                // 지도에 선을 표시합니다
                polyline.setMap(map);


            })
            .catch(function (error) {
                alert("post 요청 실패")
                console.log(error);
            });


    }, []);

    const onSubmit = (e) => {
        e.preventDefault();


        console.log({
            Longtitude,
            Latitude
        });

        /* axios.post('http://3.35.173.122:4000/api/sanmoa/route', {
             xLocation :126.7039926, //바꾸기
             yLocation : 37.5278857
         })
             .then(function (response) {
                 console.log(response);
                 alert("post 요청 성공");

                 count_coordinate=response.data.response.result.featureCollection.features[0].geometry.coordinates[0].length;
                 console.log("좌표 개수: ",count_coordinate);

                 setInputData(response.data.response.result.featureCollection.features[0].geometry.coordinates[0]);

                    console.log('App :: inputData :: ', inputData);




              /*   for(let i=0;i<count_coordinate;i++){
                     linePath[i]=  new kakao.maps.LatLng(inputData[i][0],inputData[i][1]);
                 }

                 console.log("좌표",linePath);


             })
             .catch(function (error) {
                 alert("post 요청 실패")
                 console.log(error);
             });
 */

// 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다


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

            <div className="map_wrap">
                <div id="map" className="map_style"></div>
            </div>

            <h1>위도 {Latitude}</h1>
            <h1>경도 {Longtitude}</h1>
            <form onSubmit={onSubmit}>
                <button type="primary" htmlType="submit">회원가입</button>
            </form>


            <div id="footer">
                <nav id="footer_gnb">

                    <div>
                        <Link to="/">
                            <div className="icon_div"><img src={require("./img/search.png")} className="menu_icon"/>
                            </div>
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
                            <div className="icon_div"><img src={require("./img/mypage.png")} className="menu_icon"/>
                            </div>
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



