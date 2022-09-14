/*global kakao*/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Main = () => {


    const [data, setData] = useState(null);
    const [Latitude, setLatitude] = useState(0);
    const [Longtitude, setLongtitude] = useState(0);
    const [inputData, setInputData] = useState(null);
    var hiking_arry = [];
    var spot_array=[];
    var spot_path=[[]];

    var linePath = []; //등산로별 path

    var count_coordinate = 0; //좌표개수
    var count_spot = 0; //등산스팟개수

    var polyline=[];
    var positions=[];

    //var keyword ='북한산';

    const[keyword,setKeyward]=useState("아차산");




    useEffect(() => {


        axios.post('http://3.35.173.122:4000/api/sanmoa/totalroute', {
            keyword:keyword
        })
            .then(function (response) {
                console.log(response);
                console.log("post 요청 성공");

                count_coordinate=response.data.mntnPath.length;
                console.log("좌표 갯수 : ",count_coordinate);
                count_spot=response.data.mntnSpot.length;

                for(let i=0;i<count_spot;i++) {
                    spot_array.push({
                        PMNTN_DFFL: response.data.mntnSpot[i].PMNTN_DFFL,
                        PMNTN_NM: response.data.mntnSpot[i].PMNTN_NM,
                        PMNTN_SN: response.data.mntnSpot[i].PMNTN_SN,
                        PMNTN_LT:response.data.mntnSpot[i].PMNTN_LT
                    })
                }


                for (let j = 0; j < count_coordinate; j++) {
                    hiking_arry.push({
                        paths_x: response.data.mntnPath[j].paths_x,
                        paths_y: response.data.mntnPath[j].paths_y,
                        PMNTN_SN: response.data.mntnPath[j].PMNTN_SN
                    })

                }


                for(let i=0;i<count_spot;i++) {
                    var spot_path2=[];
                    for (let j = 0; j < count_coordinate; j++) {
                        if(hiking_arry[j].PMNTN_SN===spot_array[i].PMNTN_SN)
                            spot_path2.push(hiking_arry[j]);

                    }
                    // console.log(spot_path2);
                    spot_path[i]=spot_path2;
                }


                console.log("spot_path", spot_path);
                console.log("spot_arry", spot_array);
                console.log("hiking_arry", hiking_arry);
                console.log("linePath", linePath);

                //카카오 맵
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(hiking_arry[0].paths_x, hiking_arry[0].paths_y
                        ), // 지도의 중심좌표 //y:lat,x:long
                        level: 3 // 지도의 확대 레벨
                    };

                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다



                for(let j=0; j<count_spot;j++) {

                    // 지도에 표시할 선을 생성합니다
                    polyline[j] = new kakao.maps.Polyline({
                        path: linePath, // 선을 구성하는 좌표배열 입니다
                        strokeWeight: 5, // 선의 두께 입니다
                        strokeColor: '#0000ff', // 선의 색깔입니다
                        strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'solid' // 선의 스타일입니다
                    });
                    // 지도에 선을 표시합니다
                    polyline[j].setMap(map);

                    var PMNTN_DFFL= response.data.mntnSpot[j].PMNTN_DFFL;
                    var PMNTN_NM= response.data.mntnSpot[j].PMNTN_NM;
                    //  var PMNTN_SN= response.data.mntnSpot[j].PMNTN_SN;
                    var PMNTN_LT=response.data.mntnSpot[j].PMNTN_LT;

                    positions.push({
                        content:'<div><li>산명칭:'+keyword+'</li>' +
                            '<li>구간 이름 :'+PMNTN_NM+'</li>' +
                            '<li>총길이(km):'+PMNTN_LT+'</li>' +
                            '<li>산행 난이도:'+PMNTN_DFFL+'</li></div>',
                        latlng:new kakao.maps.LatLng(spot_path[j][0].paths_x, spot_path[j][0].paths_y),
                        path_ID:spot_path[j][0].PMNTN_SN
                    })
                }


                console.log("positions[]",positions);

                for (var i = 0; i < positions.length; i ++) {
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng,
                        zIndex: positions[i].path_ID// 마커의 위치
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
                        var markerindex=marker.getZIndex();
                        console.log(marker.getZIndex());

                        for(let i=0;i<count_coordinate;i++) {
                            if (hiking_arry[i].PMNTN_SN === markerindex)
                                linePath.push(new kakao.maps.LatLng(hiking_arry[i].paths_x, hiking_arry[i].paths_y));
                        }
                        console.log("linePath",linePath);

                        polyline = new kakao.maps.Polyline({
                            path: linePath, // 선을 구성하는 좌표배열 입니다
                            strokeWeight: 5, // 선의 두께 입니다
                            strokeColor: '#0000ff', // 선의 색깔입니다
                            strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                            strokeStyle: 'solid' // 선의 스타일입니다
                        });
                        // 지도에 선을 표시합니다
                        polyline.setMap(map);

                    }




                };


// 인포윈도우를 닫는 클로저를 만드는 함수입니다
                function makeOutListener(infowindow) {
                    return function() {
                        infowindow.close();
                        polyline.setMap(null);
                    };
                }




            })
            .catch(function (error) {
                console.log("post 요청 실패")
                console.log(error);
            });




    }, [keyword]);

    const onSubmit = (e) => {
        e.preventDefault();
       setKeyward( document.getElementById('keyword').value);

        console.log("keyword",keyword);

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        axios.post('http://3.35.173.122:4000/api/sanmoa/totalroute', {
            keyword:keyword
        })
            .then(function (response) {
                console.log(response);
                console.log("post 요청 성공");



            })
            .catch(function (error) {
                console.log("post 요청 실패");
                console.log(error);
            });


    }





    return (
        <div>

            <div>
                <header id="main_header">
                    <h1>SANMOA</h1>
                </header>

                <header id="menu_header">
                    <h2>서울 등산로 검색</h2>
                </header>

            </div>

            <header id="search_box">
                <form onSubmit={onSubmit} >
                    <input type="text" defaultValue={' '} id="keyword"/>
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

export default Main;




