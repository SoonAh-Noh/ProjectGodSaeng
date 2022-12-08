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

import '../../css/user/sub.scss';

// 이미지 url
import sidewalk1_1 from '../../images/sidewalk.jpg';
import sidewalk1_2 from '../../images/guide1-1.jpg';
import braille_block_1 from '../../images/guide9-1.png';
import braille_block_2 from '../../images/guide9-2.png';
import cross1_1 from '../../images/guide2-1.jpg';
import cross1_2 from '../../images/guide2-2.jpg';
import subway1_1 from '../../images/guide10-1.png';
import bus1_1 from '../../images/guide3-1.jpg';
import taxi1_1 from '../../images/guide11-1.png';
import crosswalk1_1 from '../../images/guide4-1.jpg';
import disabled1_1 from '../../images/guide6-1.jpg';
import fire1_1 from '../../images/guide7-1.jpg';
import fire1_2 from '../../images/guide7-2.jpg';
import noparking_1 from '../../images/guide11-2.png';

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

const QuickGuide = () => {
  let hydrant1 = { backgroundImage: `url(${sidewalk1_1})` };
  let hydrant2 = { backgroundImage: `url(${sidewalk1_2})` };
  let braille_block1 = { backgroundImage: `url(${braille_block_1})` };
  let braille_block2 = { backgroundImage: `url(${braille_block_2})` };
  let cross1 = { backgroundImage: `url(${cross1_1})` };
  let cross2 = { backgroundImage: `url(${cross1_2})` };
  let subway1 = { backgroundImage: `url(${subway1_1})` };
  let bus1 = { backgroundImage: `url(${bus1_1})` };
  let taxi1 = { backgroundImage: `url(${taxi1_1})` };
  let crosswalk1 = { backgroundImage: `url(${crosswalk1_1})` };
  let disabled1 = { backgroundImage: `url(${disabled1_1})` };
  let fire1 = { backgroundImage: `url(${fire1_1})` };
  let fire2 = { backgroundImage: `url(${fire1_2})` };
  let noparking1 = { backgroundImage: `url(${noparking_1})` };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="Guide" className="subPage">
      <div className="subTop">
        <h1>불법주정차 안내</h1>
        <ul>
          <li>
            <a href="/illegalareaguide">불법주정차 금지 구역</a>
          </li>
          <li className="on">
            <a href="/guickguide">공유킥보드 주차 금지 구역</a>
          </li>
        </ul>
      </div>

      <div className="section">
        <div className="sub-title">
          <h2>공유킥보드 주차 금지 구역</h2>
        </div>

        <div className="tabMenu">
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="보도" {...a11yProps(0)} />
              <Tab label="점자 블럭 위" {...a11yProps(1)} />
              <Tab label="교차로 모퉁이" {...a11yProps(2)} />
              <Tab label="지하철역 출구" {...a11yProps(3)} />
              <Tab label="횡단보도" {...a11yProps(4)} />
              <Tab label="버스·택시 정류소" {...a11yProps(5)} />
              <Tab label="소방차 전용구역" {...a11yProps(6)} />
              <Tab label="장애인 전용구역" {...a11yProps(7)} />
              <Tab label="기타" {...a11yProps(8)} />
            </Tabs>
          </Box>
        </div>

        <div className="tabContents">
          {/****************************************************** 보도 ******************************************************/}
          <TabPanel value={value} index={0}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
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
                    <h3>보도 불법주정차</h3>
                    <p>어린이, 장애인 등 교통약자들이 통행하는 곳</p>
                  </div>

                  <ul className="checkTxt">
                    <li>
                      <strong>「주차장법」</strong>
                      <br></br> - 차도와 보도에 걸쳐서 설치된 노상주차장은
                      제외함
                    </li>
                    <li>
                      <strong>「도로교통법 시행령」 별표 8 제29호</strong>
                      <br></br> - 주차, 정차 금지에 관한 사항을 위반한
                      운전자에게는 2만원의 범칙금이 부과
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 점자 블럭 위 ******************************************************/}
          <TabPanel value={value} index={1}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={braille_block1} className="slideImg"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div style={braille_block2} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>점자 블럭 위 불법주정차</h3>
                    <p>점자 블럭 및 교통섬 위 즉시 견인 구역</p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      <strong>「도로교통법 시행령」별표 8 제 29호</strong>
                      <br />- 전동 킥보드 주차 방법을 위반한 운전자에게는 2만 원의 법칙금이 부과됨.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 교차로 모퉁이 ******************************************************/}
          <TabPanel value={value} index={2}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
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
                    <p>
                      주정차 금지 규제표시 또는 노면표시가 설치된 교차로의
                      가장자리나 도로의 모퉁이 5M 이내 정지 상태 차량
                    </p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      <strong>「주차장법」</strong>
                      <br></br> - 차도와 보도에 걸쳐서 설치된 노상주차장은
                      제외함
                    </li>
                    <li>
                      <strong>교통안전표지</strong>
                      <br></br> - 주정차 금지 규제 표시 또는 노면 표시 (황색
                      실선 또는 복선)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 지하철역 출구 ******************************************************/}
          <TabPanel value={value} index={3}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={subway1} className="slideImg"></div>
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
                    <h3>지하철역 출구 불법주정차</h3>
                    <p>지하철 역 출입구 앞 주변 5m 이내 진출입을 방해하는 곳</p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      <strong>「도로교통법 시행령」별표 8 제 29호</strong>
                      <br />- 전동 킥보드 주차 방법을 위반한 운전자에게는 2만 원의 법칙금이 부과됨.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 횡단보도 ******************************************************/}
          <TabPanel value={value} index={4}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
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
                    <p>횡단보도 위나 정지선을 침범한 정지상태</p>
                    <p>(횡단보도 보행자 대기선 주변 3m)</p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      <strong>「도로교통법 시행령」별표 8 제 29호</strong>
                      <br />- 전동 킥보드 주차 방법을 위반한 운전자에게는 2만 원의 법칙금이 부과됨.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 버스·택시 정류소 ******************************************************/}
          <TabPanel value={value} index={5}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={bus1} className="slideImg"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div style={taxi1} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>버스·택시 정류소 불법주차</h3>
                    <p>
                      정류지임을 표시하는 기둥이나 표지판 또는 선이 설치된
                      곳으로부터 10m 이내인 곳
                    </p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      <strong>「도로교통법 시행령」별표 8 제 29호</strong>
                      <br />- 전동 킥보드 주차 방법을 위반한 운전자에게는 2만 원의 법칙금이 부과됨.
                    </li>
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
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
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
                    <p>
                      공동주택 소방차 전용구역에 주차한 차량, 전용구역 진입로에
                      물건 등을 쌓는 행위 <strong>(상시 신고 가능)</strong>
                    </p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      <strong>법률 적용 대상</strong>
                      <br />- 2019.08.10 이후 주택건설 사업계획 승인 또는
                      건축허가를 신청한 공동주택 대상에만 적용
                    </li>
                    <li>
                      신고요건, 행정처분(과태료 부과), 소방차 전용구역 관련 민원
                      등의 업무는 각 소방서 소관
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>

          {/****************************************************** 장애인 전용구역 ******************************************************/}
          <TabPanel value={value} index={7}>
            <div className="guideBox">
              <div className="col-6 col-sm-12">
                <div className="guideImg">
                  <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={disabled1} className="slideImg"></div>
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
                    <h3>장애인 전용구역 불법주차</h3>
                    <p>
                      장애인·노인·임산부 등의 편의증진 보장에 관한 법률 제17조
                      (장애인전용주차구역 등) 제4항을 위반하여 장애인전용
                      주차구역에 주차한 경우
                    </p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      신고요건, 과태료 부과 여부 결정, 민원처리 업무 등은 각
                      지자체 소관으로 지자체별로 다르게 운영될 수 있습니다.
                    </li>
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
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 4000 }}
                    speed={1400}
                  >
                    <SwiperSlide>
                      <div style={noparking1} className="slideImg"></div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-6 col-sm-12">
                <div className="guideTxt">
                  <div className="gtTop">
                    <h3>기타</h3>
                    <p>
                      5대 불법주정차 금지구역 이외의 장소 중에서 도로교통법
                      제32조(정차 및 주차의 금지), 제33조(주차금지의 장소)에
                      의한 주정차 금지구역에 주차를 한 차량
                    </p>
                  </div>
                  <ul className="checkTxt">
                    <li>
                      '기타 불법주정차' 신고와 관련된 행정예고, 신고요건(사진
                      촬영간격, 단속구역 지정 및 운영), 과태료 부과 등 민원처리
                      업무는 각 지자체 소관이며 지자체 별로 다르게 운영될 수
                      있음
                    </li>
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
export default QuickGuide;
