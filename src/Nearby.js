import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/style.css';
import { Link } from 'react-router-dom';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        //먼저 상품리스트를 가져와야 랜딩페이지에 나타낼 수 있다.
        axios.get(`${API_END_POINT}/store/cafe`).then((response) => {
            if (response.data) {
                setData(response.data.response.body.items.item); //가져온 모든 상품들을 배열에 저장한다.
            } else {
                alert('리스트를 가져오는데 실패했습니다.');
            }
        });
    }, []);
    console.log(data);
    
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

                    <div className="menu_title"> <h2>맛집 </h2></div>

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

            <ul className="img-box">
                {data.map((data) => (
                    <li key={data.id} className="row align-items-center m-0" style={{float:"left", margin:"15px"}}>
                        <div className="col-1 py-2">
                            <img
                                src={data.firstimage}
                                alt={data.title}
                                style={{width:"180px", height:"120px"}}
                                className="img-fluid rounded-circle"
                            />
                        </div>
                        <div className='content'>
                            <span className="col" style={{fontSize:"15px"}}>{data.title}</span><br/>
                            <span id='other' style={{fontSize:"10px"}}>{data.tel}</span><br/>
                            <span id='other' style={{fontSize:"10px"}}>{data.addr1}</span>
                        </div>
                    </li>
                ))}
            </ul>

           
        </div>
    );
};
export default Nearby;
