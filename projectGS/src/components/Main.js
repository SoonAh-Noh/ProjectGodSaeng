import axios from 'axios';
import * as server_bridge from '../controller/server_bridge';
import { Link } from 'react-router-dom';

// Swiper-slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

import '../css/user/main.scss';

const Main = () => {
  const itemcount = 3;

  useEffect(() => {
    getList();
  }, []);

  const [board_list, setList] = useState([]); // 게시판 리스트
  const module_test = async () => {
    //모듈화된 axios 객체 사용법
    //1. 사용하고자 하는 함수에 async를 걸어준다.
    //2. axios_instance를 호출하여 서버에 데이터를 요청한다.
    //2-1. 형식은 await server_bridge.axios_instace.[get / post]("서버에서 받아주는 주소", {보낼 데이터(json형식)})
    //3. 상수형 변수에 저장한 후 res.data 로 전달받은 데이터를 사용할 수 있다.
    //4. 상수형 데이터이기 때문에 직접 수정은 당연히 안됨! 수정을 해야할 일이 있다면 가변형 변수에 재대입 후 가공해야함.
    //5. 왜 굳이 이렇게 했냐?
    // 서버 통신이 많은 웹 사이트 특성상 같은 코드가 계속해서 반복사용되는건 좋지 않은 코딩방식이므로
    // 같은 기능을 하는 코드를 묶어서 하나의 함수로 처리하는것이 재사용성이 높고 가독성이 좋은 코딩 방식이라고 할 수 있음.
    // 따라서 비슷한 내용이 중복되는 코딩은 지양할 필요가 있다.
    const res = await server_bridge.axios_instace.post('/pythonserver', {
      testdata: 'from_client',
    });
    //const res = await server_bridge.axios_instace.get("/pythonserver", { params: { testdata: "from_client" } });
    console.log(res.data);
  };

  const getList = async () => {
    //게시글 리스트를 가져온다.

    let where = {
      //게시글을 검색할 조건절의 데이터를 서버에 넘겨주기 위한 dict
      is_searching: 0,
      where_clause: '',
    };
    const res = await server_bridge.axios_instace.post('/board_list', where);

    setList(res.data);
  };

  return (
    <div id="Main">
      <div className="main-slider">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 6000 }}
          speed={1800}
          loop={true}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={true}
        >
          <SwiperSlide>
            <div className="msImg msImg1">
              <div className="msTxt">
                <h1>
                  불법 주정차 신고는 이제 <strong>안전꽹과리</strong>에서
                </h1>
                <ul>
                  <li>👍 하나. 불법 주정차 발견시 사진을 찍는다.</li>
                  <li>✌️ 둘. 안전꽹과리 접속 후 신고한다. </li>
                  <li>👌 셋. 포인트를 받는다.</li>
                </ul>
                <a href="/report" className="btn btn-navy">
                  바로 신고하기
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="msImg msImg2">
              <div className="msTxt">
                <h1>
                  공유 킥보드 신고도 이제 <strong>안전꽹과리</strong>에서
                </h1>
                <ul>
                  <li>
                    👍 하나. 불법 주정차 공유 킥보드 발견시 사진을 찍는다.
                  </li>
                  <li>✌️ 둘. 안전꽹과리 접속 후 신고한다. </li>
                  <li>👌 셋. 포인트를 받는다.</li>
                </ul>
                <a href="/quickreport" className="btn btn-navy">
                  바로 신고하기
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="msImg msImg3">
              <div className="msTxt">
                <h1>
                  쌓이는 포인트는 <strong>상품권 교환</strong>으로<i>!</i>
                </h1>
                <ul>
                  <li>
                    신고 포인트가 쌓이면
                    <br /> 오프라인에서 사용 가능한 상품권으로 교환할 수 있어요!
                  </li>
                </ul>
                <a href="/point" className="btn btn-navy">
                  포인트 사용하기
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>{' '}
      {/* mainSlider */}
      <div className="mSection">
        <div className="Notice">
          <div className="s-title">
            <h2>공지사항</h2>
          </div>

          <div className="nBoxWrap">
            {typeof board_list !== 'string' && board_list.length > 0
              ? board_list.slice(0, itemcount).map((data, idx) => (
                  <div className="nBox">
                    <Link
                      to={'/noticeview'}
                      state={{
                        board_idx: data.BOARD_IDX,
                      }}
                    >
                      <div className="nBoxTxt">
                        <h3>{data.BOARD_TIT}</h3>
                        <p>{data.BOARD_TXT}</p>
                      </div>
                      <div className="nBoxBottom">
                        <span className="nDate">{data.BOARD_DATE}</span>
                        <i className="xi-plus-thin"></i>
                      </div>
                    </Link>
                  </div>
                ))
              : (
                <div className="noContents">
                  <p>등록된 게시물이 없습니다.</p>
                </div>
              )}
            {/* nBox */}
          </div>
          {/* nBoxWrap */}
        </div>
      </div>
    </div>
  );
};
export default Main;
