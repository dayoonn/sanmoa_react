/*global kakao*/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './css/map.css';
import {MenuFoldOutlined, MenuOutlined} from "@ant-design/icons";
import {Menu} from "antd";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;



const MainSearch = () => {

    const navigate = useNavigate();



    const [Latitude, setLatitude] = useState(0);
    const [Longtitude, setLongtitude] = useState(0);

    var count_coordinate = 0; //좌표개수
    var count_course = 0; //등산로개수
    var hiking_arry = [[]]; //
    var id_arry=[];
    var linePath = [[]]; //등산로별 path

    var polyline=[]; //카카오 그리기(선) 배열
    var positions=[]; //카카오 마커 및 인포윈도우

    var linepath_bold=[];



    useEffect(()=>{

        /**GPS**/
        function getLocation() {
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    //alert("좌표"+ position.coords.latitude + ' ' + position.coords.longitude);

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
        /**GPS**/

        /**POST**/
        axios.post(`${API_END_POINT}/sanmoa/route`, {
            xLocation: 126.7039926, //바꾸기!!!!!!!!!!!
            yLocation: 37.5278857
        })
            .then(function (response) {
                console.log(response);
                console.log("post 요청 성공");


                /**요청 성공시**/

                //등산로 코스 개수
                count_course=response.data.response.result.featureCollection.features.length; //코스 개수
                console.log("코스 개수: ", count_course);

                for(let j=0; j<count_course;j++) {

                    id_arry[j]=response.data.response.result.featureCollection.features[j].id;
                    console.log('ID_ARRY: ',id_arry);
                    //코스별 좌표 lat,lon 배열에 저장
                    hiking_arry[j] = response.data.response.result.featureCollection.features[j].geometry.coordinates[0];
                      console.log(' 코스별 좌표 :: ', hiking_arry);

                    //좌표수
                    count_coordinate = response.data.response.result.featureCollection.features[j].geometry.coordinates[0].length;
                    //  console.log("좌표 개수: ", count_coordinate);


                    var linePath_co=[]; //코스별 선으로 표시할 좌표를 넣을 배열

                    for (let i = 0; i <count_coordinate; i++) {
                        linePath_co.push(new kakao.maps.LatLng(hiking_arry[j][i][1], hiking_arry[j][i][0]));
                    }

                    //코스별로 이중배열에 저장
                    linePath[j]=linePath_co;
                    console.log("linePath[j]",j,linePath);
                }//for문 닫힘

                /**카카오맵 띄우기**/
                var mapcontainer = document.getElementById('map');
                var mapoptions = {
                    center: new kakao.maps.LatLng(37.5278857, 126.7039926), //철마 좌표 (GPS좌표로 변경하기!)
                    level: 3
                };

                var map = new kakao.maps.Map(mapcontainer, mapoptions); //지도 생성


                for(let j=0; j<count_course;j++) {
                    var colorCode="#"+Math.round(Math.random()*0xffffff).toString(16);

                    // 지도에 표시할 선을 생성합니다
                    polyline[j] = new kakao.maps.Polyline({
                        path: linePath[j], // 선을 구성하는 좌표배열 입니다
                        strokeWeight: 5, // 선의 두께 입니다
                        strokeColor: colorCode, // 선의 색깔입니다 (블루)
                        strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'solid' // 선의 스타일입니다
                    });
                    polyline[j].setMap(map); // 지도에 선을 표시합니다


                    //인포윈도우 변수
                    var mntn_nm=response.data.response.result.featureCollection.features[0].properties.mntn_nm; //산이름
                    var sec_len=response.data.response.result.featureCollection.features[0].properties.sec_len;//총 길이
                    var start_z=response.data.response.result.featureCollection.features[0].properties.start_z;//시작 높이
                    var end_z=response.data.response.result.featureCollection.features[0].properties.end_z;//종착 높이
                    var cat_nam=response.data.response.result.featureCollection.features[0].properties.cat_nam; //산 난이도

                    positions.push({
                        content:'<div style="width:100%; padding:5px;"><li>산명칭:'+mntn_nm+'</li>' +
                            '<li>총길이(km):'+sec_len+'</li>' +
                            '<li>시작 높이(m):'+start_z+'</li>' +
                            '<li>종착점 높이(m):'+end_z+'</li>' +
                            '<li>산행 난이도:'+cat_nam+'</li></div>',
                        latlng:new kakao.maps.LatLng(hiking_arry[j][0][1], hiking_arry[j][0][0]), //마커 위치 : 등산로 시작 좌표
                        path_ID:response.data.response.result.featureCollection.features[j].id
                    })
                }
                console.log("positions[]",positions);


                for (var i = 0; i < positions.length; i ++) {
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng, // 마커의 위치
                        zIndex: (positions[i].path_ID)// 코스 코드
                    });


                    console.log("마커",marker);
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

                        var markerindex=marker.getZIndex(); //마커의 코스 코드 저장
                        console.log("코스 코드",marker.getZIndex());

                        for(let i=0;i<count_course;i++) {

                            if (id_arry[i] === markerindex) //마커의 코스코드와 좌표의 코스코드가 같다면 저장
                            { linepath_bold=[];
                                console.log("idid",id_arry[i]);
                                for(let j=0;j<hiking_arry[i].length;j++)
                                    linepath_bold.push(new kakao.maps.LatLng(hiking_arry[i][j][1],hiking_arry[i][j][0]));}
                        }
                        console.log("linePathbold",linepath_bold);

                        polyline = new kakao.maps.Polyline({
                            path: linepath_bold, // 선을 구성하는 좌표배열 입니다
                            strokeWeight: 5, // 선의 두께 입니다
                            strokeColor: '#ff0000', // 선의 색깔입니다
                            strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                            strokeStyle: 'solid' // 선의 스타일입니다
                        });
                        polyline.setMap(map); // 지도에 선을 표시합니다
                    };
                }

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
                function makeOutListener(infowindow) {
                    return function() {
                        infowindow.close();
                        polyline.setMap(null);


                    };
                }

                /**카카오맵 띄우기**/



                /**요청 성공시**/
            })
            .catch(function (error) {
                console.log("post 요청 실패");
                console.log(error);
            });
        /**POST**/






    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        //document.location.href = '/test2';
        navigate('/mapsearch', {
            state: {
                keyword:document.getElementById('keyword').value
            }
        });



    }

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

                        <div className="menu_title"> <h2>내 주위 등산로 좌표안바꿈제발바꿔</h2></div>

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

            <header id="search_box">
                <form onSubmit={onSubmit} >
                    <input type="text"  placeholder={"산을 입력해주세요."} id="keyword"/>
                    <button id="button" type="primary" htmlType="submit"><i className="fa-solid fa-magnifying-glass"> </i></button>
                </form>
            </header>


            <div className="map_wrap">
                <div id="map" className="map_style"></div>

            </div>



        </div>

    )
}
export default MainSearch;



