import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/style.css';
import {Link} from "react-router-dom";
import {MenuFoldOutlined, MenuOutlined} from "@ant-design/icons";
import {Menu} from "antd";


const API_END_POINT = process.env.REACT_APP_API_ENDPOINT;

const Emergency = () => {


    const items = document.querySelectorAll('.list_title');



    const doDisplay = (id, e) => {
        var list_id = "detail_" + id;
        var con = document.getElementById(list_id);

        //console.log(list_id);

        if (con.style.display === 'none') {
            con.style.display = 'block';
        } else {
            con.style.display = 'none';
        }
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

                        <div className="menu_title"> <h2>응급 처치</h2></div>

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


            <div id="main_box_emerg" className="main_scroll">

                <h2 style={{textAlign: 'left', margin: '8px'}}> • 필수 인지 사항 </h2>




                <div className="listbox">
                    <div className="list">
                        <div className="list_title"><h3> 등산 전 필수 인지 사항 </h3></div>
                        <div className="more"><h3 id="more1" className="fa-solid fa-caret-down "
                                                  onClick={(e) => doDisplay("more1")}></h3></div>
                    </div>

                    <div id="detail_more1" className="detail_more">
                        <li> 등산 시 자신의 위치를 수시로 확인해야합니다.</li>
                        <li> 산에 오르기 전 스트레칭은 필수입니다.</li>
                        <li> 등산로를 미리 파악하고 통신장비 등 기본 등산장비를 휴대하며 음주, 단독산행을 삼가야 합니다.</li>
                        <li> 산행은 아침 일찍 시작하고 해지기 한 두 시간 전에 마쳐야 합니다.</li>
                        <li> 배낭 무게는 가급적 가볍게 하고 발에 맞는 등산화를 신어야 합니다.</li>
                        <li> 사고를 대비하여 비상식량을 챙기고 산행 중 음식물은 한꺼번에 너무 많이 먹지 말고 조금씩 자주 먹습니다.</li>
                        <li> 등산로가 아닌 곳은 출입하지 않아야 하며, 길을 잘못 들었다고 판단되면 빨리 되돌아가야 합니다.</li>
                        <li> 우천 시 계곡산행은 피해야 하고 폭우로 계곡물이 불어나 급류로 바뀐 때에는 절대 건너지 말아야 합니다.</li>
                        <li> 낙석이 자주 일어나는 경사진 곳과 바위벽 아래를 지날 때에는 낙석에 유의합니다.</li>
                        <li> 산행 중 조난 또는 길을 잃었을 경우에는 계곡을 피하고 능선을 따라 이동합니다.</li>

                    </div>
                </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 국립 공원 지도 및 응급함 위치</h3></div>
                            <div className="more"><h3 id="more2" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more2")}></h3></div>
                        </div>

                        <div id="detail_more2" className="detail_more">
                            <h5> □ 다운로드 링크 </h5>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1YNNsto0F1KeGbWzEYfz6-HrfTk67lNMq/view?usp=sharing', '_blank')}>가야산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1jKE3S5ea1_x0IcV_61DzOYdQcudVj5JG/view?usp=sharing', '_blank')}>경주</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1xpqlFxeqqMjKr54_ZDQdVRNYA4o088l_/view?usp=sharing', '_blank')}>계룡산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1d3zMe9TNrY_zhyJUjCWemPu7N_qC21A2/view?usp=sharing', '_blank')}>내장산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1d3zMe9TNrY_zhyJUjCWemPu7N_qC21A2/view?usp=sharing', '_blank')}>다도해해상</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1vr51dKCZnunLI4DyLTLUEBfDsM6oL5zw/view?usp=sharing', '_blank')}>덕유산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1qFntCJxBPNh-sFBzRr2q_Lz6NXjufBla/view?usp=sharing', '_blank')}>무등산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/196uAf1tULPgT1niwqXlsOGb8TK2W5_aa/view?usp=sharing', '_blank')}>벽산반도</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/16VMfPhkRXGKmory3i89jyBvttbJJgKjp/view?usp=sharing', '_blank')}>북한산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1R0c0bmR1Hi8Ej2jmuc15KdVfmr2KNLIW/view?usp=sharing', '_blank')}>설악산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1-HjoW-vSZvJRTuJqYrRJSWscPcskznRl/view?usp=sharing', '_blank')}>소백산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1kk1X5ayL9xYIYrJ9wx0Fppn1lvlNH4Ef/view?usp=sharing', '_blank')}>속리산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1uIi5FbSGFlBUsQjTXCww-onvDX-dgE38/view?usp=sharing', '_blank')}>오대산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1jTHt_RPqlyob91Sm_XD8BTLD8Vw2Dk1U/view?usp=sharing', '_blank')}>월악산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1ayPJCH81GMP7hu8lbglVtw6Gr1qalDKV/view?usp=sharing', '_blank')}>월출산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/132LiXqOxbsZVM1OTgNuRYBKcC_X_1mHB/view?usp=sharing', '_blank')}>주왕산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1CaZ2eC9rcGPxJO3TPHTC5ZeA1HjWVZ8a/view?usp=sharing', '_blank')}>지리산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1WtYzbPsReiNlj47luY6IbMBImSXvWCWd/view?usp=sharing', '_blank')}>치악산</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1tNogwclrYjgZvYyHXtd4u9i7G1h9aSsD/view?usp=sharing', '_blank')}>태안해안</li>
                            <li onClick={() => window.open('https://drive.google.com/file/d/1q-LNiq0Ap3Nq6DhImvAUFyCof6uRA_Em/view?usp=sharing', '_blank')}>한려해상</li>
                        </div>
                    </div>

                    <br/>
                    <hr className='center-hr'/>


                    <div className="listbox">
                        <h2 style={{textAlign: 'left', margin: '8px'}}> • 구조요청 </h2>

                        <div className="list">
                            <div className="list_title"><h3> 구조요청 연락처 </h3></div>
                            <div className="more"><h3 id="more3" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more3")}></h3></div>
                        </div>

                        <div id="detail_more3" className="detail_more" >
                            <li> 119 안전신고센터 :<a href="tel:119"> 119</a></li>
                            <br/>
                            <h5> □ 전국 국립공원 사무소 연락처 </h5>
                            <li> 가야산 :<a href="tel:055-930-8000"> 055-930-8000</a></li>
                            <li> 경주 :<a href="tel:054-778-4100"> 054-778-4100</a></li>
                            <li> 계룡산 :<a href="tel:042-825-3002"> 042-825-3002</a></li>
                            <li> 내장산 :<a href="tel:063-538-7875"> 063-538-7875</a></li>
                            <li> 다도해해상 :<a href="tel:061-554-5474"> 061-554-5474 </a></li>
                            <li> 덕유산 :<a href="tel:063-322-3174"> 063-322-3174</a></li>
                            <li> 무등산 :<a href="tel:062-227-118"> 062-227-1187</a></li>
                            <li> 변산반도 :<a href="tel:063-582-7808"> 063-582-7808</a></li>
                            <li> 북한산 :<a href="tel:02-909-0497	"> 02-909-0497 </a></li>
                            <li> 설악산 :<a href="tel:033-636-7700">033-636-7700 </a></li>
                            <li> 소백산 :<a href="tel:054-638-6196"> 054-638-6196 </a></li>
                            <li> 속리산 :<a href="tel:043-542-5267"> 043-542-5267 </a></li>
                            <li> 오대산 :<a href="tel:033-332-6417"> 033-332-6417 </a></li>
                            <li> 월악산 :<a href="tel:043-653-3250"> 043-653-3250 </a></li>
                            <li> 월출산 :<a href="tel:061-473-5210"> 061-473-5210</a></li>
                            <li> 주왕산 :<a href="tel:054-870-5300"> 054-870-5300 </a></li>
                            <li> 지리산 :<a href="tel:055-970-1000"> 055-970-1000</a></li>
                            <li> 치악산 :<a href="tel:033-732-5231"> 033-732-5231 </a></li>
                            <li> 태안해안 :<a href="tel:041-672-9737"> 041-672-9737 </a></li>
                            <li> 한려해상 :<a href="tel:055-860-5800"> 055-860-5800 </a></li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 구조요청 시 꼭 알려야 할 정보 </h3></div>
                            <div className="more"><h3 id="more4" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more4")}></h3></div>
                        </div>

                        <div id="detail_more4" className="detail_more">
                            <li>응급 상황이 발생한 정확한 장소</li>
                            <li>무슨 일이 일어났는지</li>
                            <li>부상자의 상태 정도</li>
                            <li>전화 거는 사람의 이름, 연락처</li>
                            <li>얼마나 많은 사람이 다쳤는지</li>
                            <li>응급처치는 어떻게 하고 있는지</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 위치표지판을 이용한 조난신고 </h3></div>
                            <div className="more"><h3 id="more5" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more5")}></h3></div>
                        </div>

                        <div id="detail_more5" className="detail_more">
                            <img width="80%" height="80%" src={require("./img/safety_sign.png")}/>
                            <li> 등산로에 500미터 간격으로 설치된 다목적 위치표지판에는 현 위치의 국가지점 번호와 각 공원사무소의 연락처, 가까운 119 구조대 연락처 등이
                                기재되어 있습니다.
                            </li>
                            <li> 등산 시 꼭 다목적 위치표지판의 번호를 점검하면서 산행을 하여야 합니다.</li>
                        </div>
                    </div>

                    <br/>
                    <hr className='center-hr'/>


                    <div className="listbox">
                        <h2 style={{textAlign: 'left', margin: '8px'}}> • 응급조치 </h2>

                        <div className="list">
                            <div className="list_title"><h3> 가슴통증, 호흡곤란 등의 급성질환 </h3></div>
                            <div className="more"><h3 id="more6" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more6")}></h3></div>
                        </div>

                        <div id="detail_more6" className="detail_more">
                            <li> 등산을 하다가 극심한 가슴통증이 발생했다면 심장혈관, 즉 관상동맥의 이상을 의심해 볼 수 있다.</li>
                            <li> 특히, 가슴이 터질 듯 하거나 짓누르는 듯한 통증을 느낀다면 협심증이나 심근경색일 때 발생하는 현상일 수 있으므로 즉시 편안한 자세로 휴식을 취해야
                                하며 구조대에 도움을 요청하도록 한다.
                            </li>
                            <li> 심혈관계에 이상이 있는 사람은 무리한 등산을 피해야 하며 혈관확장제를 미리 준비하여 증상이 나타났을 때 복용하는 것이 좋다.</li>
                            <li> 호흡곤란 증세가 나타났을 때에는 등산을 중단하고 안정을 취해야 하며 호흡을 깊게 천천히 하도록 하고 증상이 좋아지지 않으면 즉시 도움을 요청해야
                                한다.
                            </li>
                        </div>
                    </div>
                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 고혈압 및 빈혈 환자 등산 시 주의 사항 </h3></div>
                            <div className="more"><h3 id="more7" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more7")}></h3></div>
                        </div>

                        <div id="detail_more7" className="detail_more">
                            <li> 평소 고혈압이 있는 사람이 혈압이 잘 조절되지 않은 상태에서 산에 오르면 혈압이 더욱 상승하게 된다.</li>
                            <li> 갑작스러운 혈압상승은 뇌출혈 등 위험한 상황으로 이어질 수 있으므로 각별히 주의해야 한다.</li>
                            <li> 빈혈환자 역시 등산을 하게 되면 운동량이 증가하여 몸에 더 많은 산소를 공급해야 하는데 이는 심장에 부담을 줄 수 있다.</li>
                        </div>
                    </div>
                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 골절 </h3></div>
                            <div className="more"><h3 id="more8" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more8")}></h3></div>
                        </div>

                        <div id="detail_more8" className="detail_more">
                            <li> 뼈가 부러지는 부상을 입었을 경우에는 먼저 손상 부위를 차갑에 유지하고 부목을 대고 고정시켜야 한다.</li>
                            <li> 나뭇가지나 두꺼운 종이 등을 사용하여 옷가지 등으로 묶으면 된다.</li>
                            <li> 골절 부위에 출혈이 있으면 직접 압박으로 지혈을 하고 부목을 대도록 한다.</li>
                            <li> 뼈가 외부로 노출된 개방성 골절 부상을 입었다면 뼈를 억지로 안으로 밀어 넣으려 하지 말고 만약 뼈가 안으로 들어간 경우라면 의료진에 알리도록
                                한다.
                            </li>
                            <li> 개방성 골절은 노출된 부위를 통해 감염이 생길 우려가 있으므로 환부를 깨끗한 가제나 수건으로 덮고 부목으로 고정시켜 빨리 병원으로 이송해야 한다.
                            </li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 다리에 쥐날 때 </h3></div>
                            <div className="more"><h3 id="more9" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more9")}></h3></div>
                        </div>

                        <div id="detail_more9" className="detail_more">
                            <li> 만약에 왼쪽 다리에 쥐가 나는 등 근육이 경직 혹은 경련이 일어날 경우 왼쪽 손등의 새끼 손가락 중간마디를 오른 손 검지 손톱등으로 꾹 눌러본다.
                            </li>
                            <li> 특별히 아픈 부위가 있다면 지속적으로 해당 부위를 누르게 되면 일시적으로 통증을 경감시킬 수 있다.</li>
                            <li> 오른쪽 다리의 경우 같은 방법으로 오른쪽 손등의 새끼 손가락 중간 마디 부위를 지압한다.</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 머리손상 </h3></div>
                            <div className="more"><h3 id="more10" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more10")}></h3></div>
                        </div>

                        <div id="detail_more10" className="detail_more">
                            <li> 머리를 다쳤을 때 환자가 의식을 잃거나 토하거나 두통을 계속 호소한다면 반드시 응급실에 가서 검사를 받아야 한다.</li>
                            <li> 이 때는 가능한 가장 가까운 응급실을 찾는 것이 바람직 하다.</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 뱀에 물렸을 때 </h3></div>
                            <div className="more"><h3 id="mor11" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more11")}></h3></div>
                        </div>

                        <div id="detail_mor11" className="detail_more">
                            <li> 몸을 눕혀 안정시킨 뒤 움직이지 않게 하고 물린 부위가 부풀어 오르면 5~10cm 위쪽을 묶어 독이 퍼지지 않게 한다.</li>
                            <li> 입에 상처가 없을 때 물린 부위를 약간 절개하고 입으로 독을 빨아낸다.</li>
                            <li> 뱀에게 물린 경우 뱀의 모양을 잘 살펴야 한다.</li>
                            <li> 독사는 머리가 삼각형이고 목이 가늘며 물리면 2개의 독이빨 자국이 난다.</li>
                            <li> 독사가 아니면 당황할 필요는 없다.</li>
                            <li> 소독을 주된 처치로 하면 되는데 비누와 흐르는 물로 상처 부위를 깨끗이 씻고 옥시풀 등의 소독약으로 소독한 다음 거즈같은 청결한 천으로 덮는다.
                            </li>
                            <li> 동물에게 물린 상처는 여러 가지 감염증의 원인이 되므로 처치가 끝났으면 조속히 의사의 진찰을 받는다.</li>
                            <li> 만약 독사에 물린 사람이 있을 때는 우선 환자가 안정하도록 바닥에 눕힌다.</li>
                            <li> 움직이면 혈액순환이 좋아져 독소가 빨리 퍼지므로 주의해야 한다.</li>
                            <li> 상처부위를 물로 잘 씻어 내고 소독을 한 다음, 상처보다도 심장에 가까운 곳을 가볍게(표면의 정맥을 압박할 정도로) 묶어둔다.</li>
                            <li> 구조자는 환자의 상처부위에 직접 입을 대고 독소를 빨아낸다. 강하게 빨아내고 빨아내거든 재빨리 뱉어 버린다.</li>
                            <li> 이러한 처치를 몇 번 되풀이 하고 독소를 빨아낸 사람은 깨끗이 양치질을 한다.</li>
                            <li> 상처의 처치가 끝나면 환자를 들 것 같은 것에 태워서 안정한 상태 그대로 서둘러 의사의 치료를 받게 한다.</li>
                            <li> 치료가 늦어지면 독소가 전신에 퍼져서 쇼크상태에 빠지는 수가 있으므로 주의해야 한다.</li>


                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 벌에 쏘였을 경우 </h3></div>
                            <div className="more"><h3 id="more12" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more12")}></h3></div>
                        </div>

                        <div id="detail_more12" className="detail_more">
                            <li> 산행 중 벌에게 쏘이는 경우, 억지로 독침을 빼려 하지 말고 신용카드 같은 얇은 도구를 이용하여 살살 긁어 주면 곧 벌침이 빠진다.</li>
                            <li> 이 후 환부를 절대로 문지르지 말아야 한다.</li>
                            <li> 계곡물이나 생수 등으로 차가운 물수건을 만들어 상처 부위를 덮어준다.</li>
                            <li> 이 때 얼음물에 적신 물수건으로 냉찜질을 해주면 통증이 가신다.</li>
                            <li> 한편 얼음등으로 물린 부위를 찜질하고 암모니아 수 등을 바르면 큰 문제는 없다.</li>
                            <li> 또한 보통 대용으로 우유를 바르는 것도 좋다.</li>
                            <li> 전신적인 쇼크나 알레르기 반응 시 병원에 입원, 응급치료를 받아야 한다.</li>


                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 열상 (찢어져 생긴 상처) </h3></div>
                            <div className="more"><h3 id="more14" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more14")}></h3></div>
                        </div>

                        <div id="detail_more14" className="detail_more">
                            <li> 머리부위의 열상은 출혈량이 많아서 상처부위 범위가 작더라도 심한 출혈을 발생시킨다.</li>
                            <li> 열상이 있을 때에는 열상의 정확한 부위를 확인한 후 거즈를 덮고 손으로 눌러주면 지혈이 된다.</li>
                            <li> 이 때 지혈제를 사용하면 지혈제 가루가 상처 사이에 박혀 세척으로도 완전히 제거 되지 않아 나중에 봉합해도 상처가 잘 치유되지 않을 수 있기 때문에
                                사용하지 않는 것이 좋다.
                            </li>
                            <li> 열상은 대부분 상처를 봉합해야만 하기 때문에 가능한 빠른 시간 안에 응급실을 찾아야 한다.</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 예기치 못한 눈길 상황 발생시 </h3></div>
                            <div className="more"><h3 id="more15" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more15")}></h3></div>
                        </div>

                        <div id="detail_more15" className="detail_more">
                            <li> 예상치 못한 폭설 등으로 산길이 눈으로 덮였을 시, 비상 아이젠을 착용하여야 하나 상황이 위급하다면 대용으로 신발위에 양말을 벗어 신고 산행한다.
                            </li>
                            <li> 또는 아이젠 대용으로 배낭에 항상 9mm 줄을 예비하여 눈길 발생 시 발에 줄을 감고 산행하도록 한다.</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 저체온증 </h3></div>
                            <div className="more"><h3 id="more16" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more16")}></h3></div>
                        </div>

                        <div id="detail_more16" className="detail_more">
                            <li> 저체온증은 체온이 35℃ 이하로 내려간 상태를 말하는데 추운 겨울철에만 발생하는 것이 아니라 땀 등으로 옷이 젖어 있는 상태에서 바람이 불면 발생할
                                수 있다.
                            </li>
                            <li> 체력이 저하되고 탈진한 상태라면 더욱 위험할 수 있으므로 주의해야 한다.</li>
                            <li> 체온이 떨어지기 시작하면 움직임이 둔화되기 때문에 스스로 정상체온을 회복하는 능력이 저하된다.</li>
                            <li> 따라서 날씨가 크게 춥지 않은 가을철이라도 등산을 할 때에는 체온을 유지시켜 주는 재질의 등산복과 여벌의 옷을 준비하고 탈진되지 않도록 수분과
                                탄수화물을 적절히 섭취해야 한다.
                            </li>
                            <li> 만약 체온이 저하되었다면 옷이나 담요 등을 덮어 보온을 하고 따뜻한 물을 마시며 피부를 강하게 문질러 혈액순환이 잘 되도록 하는 것도 좋다.</li>
                            <li> 무엇보다 빨리 도움을 요청해서 따뜻한 곳으로 이동해야 한다.</li>
                            <li></li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 철과상과 절상 </h3></div>
                            <div className="more"><h3 id="more17" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more17")}></h3></div>
                        </div>

                        <div id="detail_more17" className="detail_more">
                            <li> 등산 시에는 날카로운 나뭇가지나 등산장비 등에 피부를 긁히거나 베이는 경우도 자주 발생한다.</li>
                            <li> 사소한 부상이라면 소독 후 반창고를 붙이도록 하고 만약 피가 멈추지 않거나 출혈이 심각할 때는 환부를 심장보다 높은 곳으로 들어 올리고 피가 나는
                                부위는 압박을 통해 지혈하도록 한다.
                            </li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 치아 손상 </h3></div>
                            <div className="more"><h3 id="more18" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more18")}></h3></div>
                        </div>

                        <div id="detail_more18" className="detail_more">
                            <li>치아가 뿌리째 빠진 경우는 식염수나 우유에 빠진 치아를 담가서 치과 응급처치를 받을 수 있는 병원으로 빠른 시간 안에 가져 가면 적절한 이식치료를 받을
                                수 있다.
                            </li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 탈진 </h3></div>
                            <div className="more"><h3 id="more19" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more19")}></h3></div>
                        </div>

                        <div id="detail_more19" className="detail_more">
                            <li> 탈진을 방지하기 위해서는 사전에 수분을 충분히 섭취하는 것이 중요하다.</li>
                            <li> 등산을 하면서 물을 조금씩 자주 마시고 쉬는 동안에는 탄수화물을 섭취하도록 하며, 알코올이나 고단백 음식은 피하는 것이 바람직하다.</li>
                            <li> 만약 등산로에서 길을 잃고 오랜 시간 헤매다 탈진 증세가 나타날 때에는 그늘에 편한 자세로 눕도록 하고 등산화와 양말을 벗고 조이는 옷과 허리띠 등을
                                느슨하게 풀어주는 것이 좋다.
                            </li>
                            <li> 물을 충분히 공급하며 이때 소금물이나 염분제를 먹는 것은 피해야 한다.</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 발목염좌 </h3></div>
                            <div className="more"><h3 id="more20" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more20")}></h3></div>
                        </div>

                        <div id="detail_more20" className="detail_more">
                            <li> 발목을 '삐었다' 혹은 '접질렀다' 고 표현하는 발목 염좌는 울퉁불퉁한 바위나 계단을 오르내릴 때 흔히 발생하는 증상이다.</li>
                            <li> 다리가 균형을 잃으면서 발목이 돌아갔을 때 걷기 힘들어지고 부위가 부어오르는 것을 느낄 수 있는데 이는 인대의 일부 혹은 전체가 늘어나거나 파열됐기
                                때문이다. 가벼운 발목 염좌의 경우 따로 치료를 하지 않아도 저절로 낫게 되지만 2~3일이 지났는데도 지속적으로 발목 부위에 통증을 느낀다면 병원을
                                찾는 것이 좋다.
                            </li>
                            <li> 단순 염좌라 생각하여 방치했다가 뒤늦게 골절이 발견되는 경우도 있기 때문이다.</li>
                            <li> 인대가 손상된 경우라면 3~4주간 석고부목 고정을, 인대가 파열된 상황이면 4~6주간 석고 고정을 해야 한다.</li>
                            <li> 발목 염좌를 초기에 제대로 치료하지 않을 경우 다친 부위를 반복적으로 삐게되거나 만성적 통증에 시달릴 수도 있으므로 주의해야 한다.</li>
                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 주변에 응급환자 발생시 </h3></div>
                            <div className="more"><h3 id="more21" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more21")}></h3></div>
                        </div>

                        <div id="detail_more21" className="detail_more">
                            <li> 우선 당황하지 말고 침착하게 행동해야 한다.</li>
                            <li> 당황하게 되면 평소에 잘 알고 있던 응급처치조차 제대로 하지 못하고 환자를 더욱더 불안하게 할 수 있다.</li>
                            <li> 혼자서 모든 것을 해결하려는 것은 잘못이다. 환자 상태가 나쁘거나 급할 수록 주변의 도움을 청해야 한다.</li>
                            <li> 소방서에서 운영하는 119 구급대는 응급환자 신고접수 후 5분 안에 현장에 출동하여 도움을 주고 있다. 전국 어디서나 119로 전화 가능하다.
                            </li>
                            <li> 추락사고 현장에서 무리하게 환자를 옮기려고 서두르게 되면 손상을 악화 시킬 수 있으니 구급대를 기다린다.</li>
                            <li> 응급처치가 항상 필요한 것만은 아니다. 무엇인가를 해야 한다는 강박관념에 욕심을 부리다 보면 불필요한 처치를 하거나 응급실 도착시간을 지연시킬 수
                                있다.
                            </li>
                            <li> 예를 들어 부엌에서 요리를 하다가 칼에 손을 베인 경우에 출혈이 멈추도록 상처부위를 거즈로 감싸거나 손으로 누르는 것은 좋지만 약국에 달려가 지혈제나
                                항생제를 사다가 상처에 뿌리고 응급실에 오는 것은 잘못이다.
                            </li>
                            <li> 응급처치의 우선순위 중 가장 중요한 것은 생명유지를 위한 호흡과 심장운동이다. 이를 위하여 기도유지, 인공호흡, 심장압박 등이 다른 처치에 우선되어야
                                한다.
                            </li>
                            <li> 예를 들어 교통사고로 의식을 잃고 고개가 앞으로 젖혀져 있으면 기도가 막실 수 있는데 이 경우에 눈에 보이는 사지의 출혈에만 신경쓰다보면 숨을 못쉬어
                                불행한 일이 생길 수 있다.
                            </li>
                            <li> 병원응급실로 옮겨야겠다고 결정이 되면 가장 가까운 병의원의 응급실로 환자를 옮겨 1차 응급조치를 받아야 한다.</li>
                            <li> 무조건 큰 병원만 고입하여 멀리 떨어진 대학병원 등으로 옮기다 보면 치료시기를 놓쳐 상태가 악화될 수도 있다.</li>


                        </div>
                    </div>

                    <div className="listbox">
                        <div className="list">
                            <div className="list_title"><h3> 겨울철 디카, 휴대폰 랜턴 배터리 방전보호 </h3></div>
                            <div className="more"><h3 id="more22" className="fa-solid fa-caret-down "
                                                      onClick={(e) => doDisplay("more22")}></h3></div>
                        </div>

                        <div id="detail_more22" className="detail_more">

                            <li> 리튬이온 베터리는 온도가 낮으면 작동에 무리가 가거나 방전될 소지가 있다. 따라서 평상시 베터리를 따뜻한 체온으로 보호하여 방전 및 예기치 못한
                                상황에 유의한다.
                            </li>
                            <li> 추운 날씨에는 자켓 안에 넣어 다니며 손난로등으로 함께 보관하면 효과적으로 베터리 방전을 예방할 수 있다.</li>
                            <li> 랜턴 베터리의 경우 사용중인 베터리와 베터리 사이에 종이를 넣어둠으로 절전효과를 일으킬 수 있다.</li>



                        </div>
                    </div>

                </div>



            </div>
            )

            }


            export default Emergency;


