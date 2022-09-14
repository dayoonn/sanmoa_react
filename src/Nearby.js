import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";

const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Nearby=() => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(`${API_END_POINT}/store/restaurant`).then((res) => {
            setData(
                res.data.response.body.items.item
            );
        });
    }, []);

    let arr=[];
    for(let objKey in data){
        if(data.hasOwnProperty(objKey)){

            arr.push(data[objKey]);}
        }
    console.log(arr[1])
   console.log(arr[1]?.firstimage);


    //for(let k=1;k<=11;k++) {

    //}

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


            <div id="main_box">
                 <div>
                    <div className="whitebox_left">
                        <div id='imgN'></div>
                        <a id='nameN'></a><br/>
                        <a id='addN'></a>
                    </div>
                    <div className="whitebox_right">
                        <div id='imgN'></div>
                        <div id='nameN'></div><br/>
                        <div id='addN'></div>
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
    document.getElementById('imgN').innerHTML = '<img src="'+arr[1]?.firstimage+'" style="width:180px; height:120px;">';
    document.getElementById('nameN').innerText = '<a '+arr[1]?.title+'></a>';
    document.getElementById('addN').innerText = '<a '+arr[1]?.addr1+'></a>';


}

export default Nearby;


