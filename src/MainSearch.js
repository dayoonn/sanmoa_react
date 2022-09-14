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

    var count_coordinate = 0; //좌표개수
    var count_course = 0; //등산로개수
    var polyline=[];
    var positions=[];



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
            xLocation: Longtitude, //바꾸기!!!!!!!!!!!
            yLocation: Latitude
        })
            .then(function (response) {
                console.log(response);
                console.log("post 요청 성공");

                count_course=response.data.response.result.featureCollection.features.length; //코스 개수
                console.log("코스 개수: ", count_course);



                for(let j=0; j<count_course;j++) {

                    hiking_arry[j] = response.data.response.result.featureCollection.features[j].geometry.coordinates[0];
                    //setInputData(response.data.response.result.featureCollection.features[0].geometry.coordinates[0]);

                    console.log('App :: inputData :: ', hiking_arry);
                    //console.log('App :: inputData :: ', inputData);

                    count_coordinate = response.data.response.result.featureCollection.features[j].geometry.coordinates[0].length; //좌표수
                    console.log("좌표 개수: ", count_coordinate);


                    var linePath_co=[]; //좌표 path

                    for (let i = 0; i <count_coordinate; i++) {
                        linePath_co.push(new kakao.maps.LatLng(hiking_arry[j][i][1], hiking_arry[j][i][0]));
                        //console.log(hiking_arry[j][i][1],hiking_arry[j][i][0]);
                      //  console.log( linePath_co);
                    }

                    linePath[j]=linePath_co;
                    console.log("linePath[j]",j,linePath);
                }

                //카카오 맵
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(Latitude, Longtitude
                        ), // 지도의 중심좌표 //y:lat,x:long
                        level: 3 // 지도의 확대 레벨
                    };

                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


                for(let j=0; j<count_course;j++) {

                // 지도에 표시할 선을 생성합니다
                polyline[j] = new kakao.maps.Polyline({
                    path: linePath[j], // 선을 구성하는 좌표배열 입니다
                    strokeWeight: 5, // 선의 두께 입니다
                    strokeColor: '#0000ff', // 선의 색깔입니다
                    strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid' // 선의 스타일입니다
                });
                // 지도에 선을 표시합니다
                polyline[j].setMap(map);

                var mntn_nm=response.data.response.result.featureCollection.features[0].properties.mntn_nm; //산이름
                var sec_len=response.data.response.result.featureCollection.features[0].properties.sec_len;//총 길이
                    var start_z=response.data.response.result.featureCollection.features[0].properties.start_z;//시작 높이
                    var end_z=response.data.response.result.featureCollection.features[0].properties.end_z;//종착 높이
                    var cat_nam=response.data.response.result.featureCollection.features[0].properties.cat_nam; //산 난이도

                positions.push({
                    content:'<div><li>산명칭:'+mntn_nm+'</li>' +
                        '<li>총길이(km):'+sec_len+'</li>' +
                        '<li>시작 높이(m):'+start_z+'</li>' +
                        '<li>종착점 높이(m):'+end_z+'</li>' +
                        '<li>산행 난이도:'+cat_nam+'</li></div>',
                    latlng:new kakao.maps.LatLng(hiking_arry[j][0][1], hiking_arry[j][0][0])
                })
                }


                console.log("positions[]",positions);

                for (var i = 0; i < positions.length; i ++) {
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng // 마커의 위치
                    });

                    // 마커에 표시할 인포윈도우를 생성합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: positions[i].content // 인포윈도우에 표시할 내용
                    });

                    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                    // 이벤트 리스너로는 클로저를 만들어 등록합니다
                    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
                }

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
                function makeOverListener(map, marker, infowindow) {
                    return function() {
                        infowindow.open(map, marker);
                    };
                }

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
                function makeOutListener(infowindow) {
                    return function() {
                        infowindow.close();
                    };
                }




            })
            .catch(function (error) {
                console.log("post 요청 실패");
                console.log(error);
            });


    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
       // setKeyward( document.getElementById('keyword').value);
        document.location.href = '/mapsearch'

        }


    return (

        <div>


            <div>
                <header id="main_header">
                    <h1>SANMOA</h1>
                </header>

                <header id="menu_header">
                    <h2>내 위치 중심 등산로</h2>
                </header>

            </div>


            <header id="search_box">
                <form onSubmit={onSubmit} >
                    {/*<button id="menu"><i className="fa-solid fa-bars"></i></button>*/}
                    <input type="text" defaultValue={''} id="keyword"/>
                    <button id="button" type="primary" htmlType="submit"><i className="fa-solid fa-magnifying-glass"> </i></button>
                </form>
            </header>

            <div className="map_wrap">
                <div id="map" className="map_style"></div>
            </div>





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



