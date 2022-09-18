/*global kakao*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import './css/map.css';
import { useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Main = () => {
  const location = useLocation();
  const first_keyword = location.state.keyword;

  const [Latitude, setLatitude] = useState(0);
  const [Longtitude, setLongtitude] = useState(0);

  var count_coordinate = 0; //좌표개수
  var count_spot = 0; //등산스팟개수

  var linePath = [[]]; //등산로별 path

  var polyline = []; //카카오 그리기(선) 배열
  var positions = []; //카카오 마커 및 인포윈도우

  var hiking_arry = []; //좌표 데이터 배열
  var spot_array = []; //코스 데이터 배열
  var spot_path = [[]]; //코스별 좌표 이중 배열

  const [keyword, setKeyward] = useState(first_keyword); //검색 항목

  function drawmap(response) {
    count_coordinate = response.data.mntnPath.length; //좌표 개수
    console.log('좌표 갯수 : ', count_coordinate);
    count_spot = response.data.mntnSpot.length; //등산코스 개수

    for (let i = 0; i < count_spot; i++) {
      spot_array.push({
        PMNTN_DFFL: response.data.mntnSpot[i].PMNTN_DFFL, //난이도
        PMNTN_NM: response.data.mntnSpot[i].PMNTN_NM, //코스명칭
        PMNTN_SN: response.data.mntnSpot[i].PMNTN_SN, //코스 코드
        PMNTN_LT: response.data.mntnSpot[i].PMNTN_LT, //코스 길이
      });
    }

    for (let j = 0; j < count_coordinate; j++) {
      hiking_arry.push({
        paths_x: response.data.mntnPath[j].paths_x, //x좌표
        paths_y: response.data.mntnPath[j].paths_y, //y좌표
        PMNTN_SN: response.data.mntnPath[j].PMNTN_SN, //코스 코드
        MNTN_NM: response.data.mntnPath[j].MNTN_NM, //산 명칭
      });
    }

    for (let i = 0; i < count_spot; i++) {
      var spot_path2 = []; //1코스당 좌표 저장 배열
      var linePath_co = []; //코스별 선으로 표시할 좌표를 넣을 배열

      for (let j = 0; j < count_coordinate; j++) {
        if (hiking_arry[j].PMNTN_SN === spot_array[i].PMNTN_SN) {
          //코스 코드가 같다면 좌표 저장
          spot_path2.push(hiking_arry[j]);
          linePath_co.push(
            new kakao.maps.LatLng(
              hiking_arry[j].paths_x,
              hiking_arry[j].paths_y
            )
          );
        }
      }

      spot_path[i] = spot_path2; //코스별 모든 좌표 이중 배열에 저장
      //코스별로 이중배열에 저장
      linePath[i] = linePath_co;
    }

    console.log('spot_path', spot_path);
    console.log('spot_arry', spot_array);
    console.log('hiking_arry', hiking_arry);
    console.log('linePath', linePath);

    /**카카오맵**/

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          hiking_arry[0].paths_x,
          hiking_arry[0].paths_y
        ), // 지도 중심좌표: 첫번째 코스 첫번째 좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    for (let j = 0; j < count_spot; j++) {
      //linePath=[];
      var colorCode = '#' + Math.round(Math.random() * 0xffffff).toString(16);
      // 지도에 표시할 선을 생성합니다
      polyline[j] = new kakao.maps.Polyline({
        path: linePath[j], // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: colorCode, // 선의 색깔입니다
        strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
      });
      polyline[j].setMap(map); // 지도에 선을 표시합니다

      var PMNTN_DFFL = response.data.mntnSpot[j].PMNTN_DFFL; //등산로 난이도
      var PMNTN_NM = response.data.mntnSpot[j].PMNTN_NM; //등산로 이름
      var PMNTN_LT = response.data.mntnSpot[j].PMNTN_LT; //등산로 길이
      var MNTN_NM = spot_path[j][0].MNTN_NM; //산 명칭

      positions.push({
        content:
          '<div style="width:100%; padding:5px;"><li>산명칭:' +
          MNTN_NM +
          '</li>' +
          '<li>구간 이름 :' +
          PMNTN_NM +
          '</li>' +
          '<li>총길이(km):' +
          PMNTN_LT +
          '</li>' +
          '<li>산행 난이도:' +
          PMNTN_DFFL +
          '</li></div>',
        latlng: new kakao.maps.LatLng(
          spot_path[j][0].paths_x,
          spot_path[j][0].paths_y
        ),
        path_ID: spot_path[j][0].PMNTN_SN, //코스 코드
      });
    }
    console.log('positions[]', positions);

    for (var i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, //마커 위치
        zIndex: positions[i].path_ID, // 코스 코드
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow)
      );
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker); //인포윈도우 보이기
        var markerindex = marker.getZIndex(); //마커의 코스 코드 저장
        console.log('코스 코드' + marker.getZIndex());

        for (let i = 0; i < count_spot; i++) {
          if (spot_path[i][0].PMNTN_SN === markerindex) {
            //마커의 코스코드와 좌표의 코스코드가 같다면 저장
            linePath = [];
            for (let j = 0; j < spot_path[i].length; j++)
              linePath.push(
                new kakao.maps.LatLng(
                  spot_path[i][j].paths_x,
                  spot_path[i][j].paths_y
                )
              );
          }
        }
        console.log('linePath', linePath);

        polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: '#ff0000', // 선의 색깔입니다
          strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
        });
        polyline.setMap(map); // 지도에 선을 표시합니다
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
        polyline.setMap(null);
      };
    }
  }

  useEffect(() => {
    console.log('fff', first_keyword);

    /**POST**/
    axios
      .post(`${API_END_POINT}/sanmoa/totalroute`, {
        keyword: keyword,
      })
      .then(function (response) {
        /**요청 성공시**/

        console.log(response);
        console.log('post 요청 성공');
        drawmap(response);

        /**카카오맵**/

        /**요청 성공시**/
      })
      .catch(function (error) {
        console.log('post 요청 실패');
        console.log(error);
      });
    /**POST**/
  }, []); //useEffect닫힘*/

  /**검색 클릭시 발생**/
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('fff', first_keyword);
    setKeyward(document.querySelector('keyword').value);

    console.log('keyword', keyword);

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    axios
      .post('http://3.35.173.122:4000/api/sanmoa/totalroute', {
        keyword: keyword,
      })
      .then(function (response) {
        console.log(response);
        console.log('post 요청 성공!!!!');
        drawmap(response);
      })
      .catch(function (error) {
        console.log('post 요청 실패');
        console.log(error);
      });
  };

  /**추가**/
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleBar, setToggleBar] = useState(true);

  const toggleChange = () => {
    setToggleMenu(!toggleMenu);
    setToggleBar(!toggleBar);
  };

  const onMenuClick = () => {
    setToggleMenu(!toggleMenu);
    setToggleBar(!toggleBar);
  };
  /**추가**/

  /**검색 클릭시 발생**/

  return (
    <div>
      <nav>
        <header id="main_header">
          <h1>SANMOA</h1>
        </header>

        <header id="menu_header">
          <div className="menu_inline">
            <button id="menu" type="primary" onClick={toggleChange}>
              {toggleBar ? <MenuOutlined /> : <MenuFoldOutlined />}
            </button>

            <div className="menu_title">
              {' '}
              <h2>등산로 검색</h2>
            </div>
          </div>
        </header>
      </nav>

      <div className="nav_bar">
        {toggleMenu && (
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="light"
            inlineCollapsed={toggleBar}
            onClick={onMenuClick}
          >
            <Menu.Item>
              <Link to="/">등산로 검색</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/community">커뮤니티</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/mypage">마이페이지</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/emergency">응급처치</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Nearby">맛집 검색</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>

      <header id="search_box">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={'산을 입력해주세요.'}
            id="keyword"
            onChange={(e) => {
              setKeyward(e.target.value);
            }}
          />
          <button id="button" type="primary" htmlType="submit">
            <i className="fa-solid fa-magnifying-glass"> </i>
          </button>
        </form>
      </header>

      <div className="map_wrap">
        <div id="map" className="map_style"></div>
      </div>
    </div>
  );
};

export default Main;
