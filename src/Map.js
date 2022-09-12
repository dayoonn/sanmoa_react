/*global kakao*/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import './css/map.css';
import {Link} from "react-router-dom";
import {NavLink} from "reactstrap";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;


const Map=() => {
    const [map, setMap] = useState();



    useEffect(()=>{

        /*function getLocation() {
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


*/

        var markers = [];

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 2 // 지도의 확대 레벨
            };

// 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
        ps.keywordSearch('서울 산', placesSearchCB);
        document.getElementById("button").onclick = function() {searchPlaces()};

// 키워드 검색을 요청하는 함수입니다
        function searchPlaces() {


            var keyword = document.getElementById('keyword').value;


                if (!keyword.replace(/^\s+|\s+$/g, '')) {
                    alert('키워드를 입력해주세요!');
                    return false;
                }

                // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
                ps.keywordSearch(keyword, placesSearchCB);
            }

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);

                // 페이지 번호를 표출합니다
                displayPagination(pagination);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                alert('검색 결과가 존재하지 않습니다.');
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }

// 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {

            var listEl = document.getElementById('placesList'),
                menuEl = document.getElementById('menu_wrap'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';

            // 검색 결과 목록에 추가된 항목들을 제거합니다
            removeAllChildNods(listEl);

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for ( var i=0; i<places.length; i++ ) {

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function(marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        infowindow.close();
                    });

                    itemEl.onmouseover =  function () {
                        displayInfowindow(marker, title);
                    };

                    itemEl.onmouseout =  function () {
                        infowindow.close();
                    };


                    // 커스텀 오버레이에 표시할 컨텐츠 입니다
                    var content = '<div id="wrap">' +
                        '    <div class="info">' +
                        '        <div class="title">' +
                        places[i].place_name +
                        '        </div>' +
                        '        <div class="body">' +

                        '            <div class="body">' +
                        '                <div class="ellipsis">'+
                        places[i].address_name +
                        '</div>' +
                        '                <div class="jibun ellipsis">상행하행어쩌고</div>' +
                        '                <div class="jibun ellipsis">난이도어쩌고</div>' +

                        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>' +
                        '</div>';


                    // 마커 위에 커스텀오버레이를 표시합니다

                    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                    kakao.maps.event.addListener(marker, 'click', function() {
                        var overlay = new kakao.maps.CustomOverlay({
                            content: content,
                            map: map,
                            position: marker.getPosition()

                        });

                        //지도 클릭시 오버레이 사라짐
                        overlay.setMap(map);
                        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                            overlay.setMap(null);


                        });
                    });



                })(marker, places[i].place_name);


                fragment.appendChild(itemEl);
            }

            // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
            listEl.appendChild(fragment);
            menuEl.scrollTop = 0;

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }

// 검색결과 항목을 Element로 반환하는 함수입니다 인포윈도우
        function getListItem(index, places) {

            var el = document.createElement('li'),
                itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                    '<div class="info">' +
                    '   <h5>' + places.place_name + '</h5>';

            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
            } else {
                itemStr += '    <span>' +  places.address_name  + '</span>';
            }

            itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';

            el.innerHTML = itemStr;
            el.className = 'item';

            return el;
        }

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }
            markers = [];
        }

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild (paginationEl.lastChild);
            }

            for (i=1; i<=pagination.last; i++) {
                var el = document.createElement('a');
                el.href = "#";
                el.innerHTML = i;

                if (i===pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function(i) {
                        return function() {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }
            paginationEl.appendChild(fragment);
        }

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild (el.lastChild);
            }
        }


        document.getElementById("menu").onclick = function() {toggleMenu()};
        function toggleMenu(){
            var con = document.getElementById("menu_wrap");
            if (con.style.display === 'none') {
                con.style.display = 'block';
            } else {
                con.style.display = 'none';
            }

        }

    }, [])


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

            <header id="search_box">
                <form >
                    <button id="menu"><i className="fa-solid fa-bars"></i></button>
                    <input type="text" defaultValue={"서울 산"} id="keyword"/>
                        <button id="button" type="submit"><i className="fa-solid fa-magnifying-glass"> </i></button>
                </form>
            </header>



            <div className="map_wrap">
                <div id="map" className="map_style" ></div>

                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>

                        </div>
                    </div>
                    <hr/>
                        <ul id="placesList"></ul>
                        <div id="pagination"></div>
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

export default Map;


