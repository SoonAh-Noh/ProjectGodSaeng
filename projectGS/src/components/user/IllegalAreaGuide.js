import * as React from 'react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// Tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// Swiper-slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import "../../css/user/sub.scss";

// 이미지 url
import hydrant1_1 from "../../images/guide1-1.jpg";
import hydrant1_2 from "../../images/guide1-2.jpg";
import cross1_1 from "../../images/guide2-1.jpg";
import cross1_2 from "../../images/guide2-2.jpg";
import bus1_1 from "../../images/guide3-1.jpg";
import crosswalk1_1 from "../../images/guide4-1.jpg";
import school1_1 from "../../images/guide5-1.jpg";
import disabled1_1 from "../../images/guide6-1.jpg";
import disabled1_2 from "../../images/guide6-2.jpg";
import fire1_1 from "../../images/guide7-1.jpg";
import fire1_2 from "../../images/guide7-2.jpg";
import elect_1 from "../../images/guide8-1.png";
// import elect2 from "../../images/guide8-2.jpg";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const IllegalAreaGuide = () => {
  let hydrant1 = {backgroundImage: `url(${hydrant1_1})`};
  let hydrant2 = {backgroundImage: `url(${hydrant1_2})`};
  let cross1 = {backgroundImage: `url(${cross1_1})`};
  let cross2 = {backgroundImage: `url(${cross1_2})`};
  let bus1 = {backgroundImage: `url(${bus1_1})`};
  let crosswalk1 = {backgroundImage: `url(${crosswalk1_1})`};
  let school1 = {backgroundImage: `url(${school1_1})`};
  let disabled1 = {backgroundImage: `url(${disabled1_1})`};
  let disabled2 = {backgroundImage: `url(${disabled1_2})`};  
  let fire1 = {backgroundImage: `url(${fire1_1})`};
  let fire2 = {backgroundImage: `url(${fire1_2})`};
  let elect1 = {backgroundImage: `url(${elect_1})`};

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="Guide" className="subPage">
      <div className="subTop">
        <h1>불법주정차 안내</h1>
        <ul>
          <li className="on"><a href="/illegalareaguide">불법주정차 금지 구역</a></li>
          <li><a href="/quickguide">공유킥보드 주차 금지 구역</a></li>
        </ul>
      </div>

      <div className="section">
        <div className="sub-title"><h2>불법주정차 금지 구역</h2></div>

        <div className="tabMenu">
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="소화전" {...a11yProps(0)} />
              <Tab label="교차로 모퉁이" {...a11yProps(1)} />
              <Tab label="버스 정류소" {...a11yProps(2)} />
              <Tab label="횡단보도" {...a11yProps(3)} />
              <Tab label="어린이 보호구역" {...a11yProps(4)} />
              <Tab label="장애인 전용구역" {...a11yProps(5)} />
              <Tab label="소방차 전용구역" {...a11yProps(6)} />
              <Tab label="친환경차 충전구역" {...a11yProps(7)} />
              <Tab label="기타" {...a11yProps(8)} />
            </Tabs>
          </Box>
        </div>

        <div className="tabContents">
          {/****************************************************** 소화전 ******************************************************/}
          <TabPanel value={value} index={0}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={hydrant1} className="slideImg"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div style={hydrant2} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>소화전 불법주정차</h3>
                    <p>주정차 금지 교통안전표지가 설치된 5M 이내 정지 상태 차량</p>
                  </div>

                  <ul className="checkTxt">
                    <li><strong>교통안전표지</strong><br></br> - 주정차 금지 규제 표시 또는 노면 표시 (황색 실선 또는 복선)</li>
                    <li>경계석 또는 도로바닥에 적색으로 표시된 경우는 소화전이 보이지 않아도 신고 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 교차로 모퉁이 ******************************************************/}
          <TabPanel value={value} index={1}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={cross1} className="slideImg"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div style={cross2} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>교차로 모퉁이 불법주정차</h3>
                    <p>주정차 금지 규제표시 또는 노면표시가 설치된 교차로의 가장자리나 도로의 모퉁이 5M 이내 정지 상태 차량</p>
                  </div>

                  <ul className="checkTxt">
                    <li><strong>교통안전표지</strong><br></br> - 주정차 금지 규제 표시 또는 노면 표시 (황색 실선 또는 복선)</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 버스정류소 ******************************************************/}
          <TabPanel value={value} index={2}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={bus1} className="slideImg"></div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                      <div style={bus2} className="slideImg"></div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>버스정류소 불법주정차</h3>
                    <p>정류소 표지판 좌우 및 노면표시선 기준 10M 이내 정지 상태 차량</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 횡단보도 ******************************************************/}
          <TabPanel value={value} index={3}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={crosswalk1} className="slideImg"></div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                      <div style={bus2} className="slideImg"></div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>횡단보도 불법주정차</h3>
                    <p>횡단보도 위나 정지선을 침범한 정지상태 차량</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 어린이 보호구역 ******************************************************/}
          <TabPanel value={value} index={4}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={school1} className="slideImg"></div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                      <div style={bus2} className="slideImg"></div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>어린이 보호구역 불법주정차</h3>
                    <p>초등학교 어린이 보호구역 주 출입문 앞 도로의 정지 상태 차량 <br /><strong className="ft_og">(평일 08시~20시)</strong></p>
                  </div>
                  <ul className="checkTxt">
                    <li>어린이 보호구역 불법주정차 단속 요건 (구역, 시간 등)은 각 지자체의 행정예고에 따라 일부 다르게 운영될 수 있음</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 장애인 전용구역 ******************************************************/}
          <TabPanel value={value} index={5}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={disabled1} className="slideImg"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div style={disabled2} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>장애인전용 주차구역 불법주차</h3>
                    <p>장애인·노인·임산부 등의 편의증진 보장에 관한 법률 제17조 (장애인전용주차구역 등) 제4항을 위반하여 장애인전용 주차구역에 주차한 경우</p>
                  </div>
                  <ul className="checkTxt">
                    <li>신고요건, 과태료 부과 여부 결정, 민원처리 업무 등은 각 지자체 소관으로 지자체별로 다르게 운영될 수 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 소방차 전용구역 ******************************************************/}
          <TabPanel value={value} index={6}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={fire1} className="slideImg"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div style={fire2} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>소방차 전용구역 불법주차</h3>
                    <p>공동주택 소방차 전용구역에 주차한 차량, 전용구역 진입로에 물건 등을 쌓는 행위 <strong>(상시 신고 가능)</strong></p>
                  </div>
                  <ul className="checkTxt">
                    <li><strong>법률 적용 대상</strong><br />- 2019.08.10 이후 주택건설 사업계획 승인 또는 건축허가를 신청한 공동주택 대상에만 적용</li>
                    <li>신고요건, 행정처분(과태료 부과), 소방차 전용구역 관련 민원 등의 업무는 각 소방서 소관</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>
          
          {/****************************************************** 친환경차 충전구역 ******************************************************/}
          <TabPanel value={value} index={7}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={elect1} className="slideImg"></div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                      <div style={bus2} className="slideImg"></div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>친환경차 충전구역 불법주차</h3>
                    <p>환경친화적 자동차의 개발 및 보급 촉진에 관한 법률 제11조의 2 제7항 및 제8항을 위반하여 충전구역 및 전용주차구역에 주차한 경우와 같은법 시행령 제18조의 8에 해당하는 충전 방해 행위 기준에 해당하는 경우</p>
                  </div>
                  <ul className="checkTxt">
                    <li>전용주차구역(충전구역 포함) 표시가 있어야 과태료 부과처분 가능</li>
                    <li>단속 시점을 기준으로 다음날까지 신고 가능하고, 과태료 부과 여부 결정 및 민원처리 업무 등은 각 지자체 소관으로 지자체별로 다르게 운영될 수 있음</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 기타 ******************************************************/}
          <TabPanel value={value} index={8}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper 
                    pagination={{clickable: true}} 
                    loop={true} 
                    modules={[Autoplay, EffectFade, Pagination]} 
                    effect={"fade"}
                    autoplay={{delay: 4000}}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={fire2} className="slideImg"></div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                      <div style={bus2} className="slideImg"></div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>기타</h3>
                    <p>5대 불법주정차 금지구역 이외의 장소 중에서 도로교통법 제32조(정차 및 주차의 금지), 제33조(주차금지의 장소)에 의한 주정차 금지구역에 주차를 한 차량</p>
                  </div>
                  <ul className="checkTxt">
                    <li>'기타 불법주정차' 신고와 관련된 행정예고, 신고요건(사진 촬영간격, 단속구역 지정 및 운영), 과태료 부과 등 민원처리 업무는 각 지자체 소관이며 지자체 별로 다르게 운영될 수 있음</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};
export default IllegalAreaGuide;
