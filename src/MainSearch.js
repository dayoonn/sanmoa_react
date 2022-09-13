import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const MainSearch=() => {


    const [data, setData] = useState(null);
    const [latitude,setLatitude]=useState(0);
    const [longtitude,setLongtitude]=useState(0);

/*
    axios.get(`${API_END_POINT}/store/cafe`).then((Response)=>{
        console.log(Response.data);

       console.log (Response.data.elements);
    }).catch((Error)=>{
        console.log(Error);
    })*/

    useEffect(() => {
        axios.get(`${API_END_POINT}/store/cafe`).then((res) => {
            setData(res.data.response.body.items.item[0].addr1);
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

            { <h1>{data}</h1> }
            {data && (
                <textarea rows={10} value={JSON.stringify(data)} readOnly={true} />
            )}





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


