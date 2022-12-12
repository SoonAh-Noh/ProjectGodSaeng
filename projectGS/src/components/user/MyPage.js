import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
import Swal from 'sweetalert2';

const MyPage = () => {
  const name = window.sessionStorage.getItem('USER_NAME');

  const handleInfo = () => {
    navigate('/myinfo');
  };
  const navigate = useNavigate();
  useEffect(() => {
    havePoint();
    havePointPlus();
    havePointMInus();
  }, []);

  const handleDel = () => {
    Swal.fire({
      title: '정말 탈퇴하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '승인',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
      confirmButtonColor: '#191d73',
      backdrop: `rgba(0,0,0,0.4)`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('탈퇴가 완료되었습니다.', 'success');
      }
      navigate('/');
    });
  };

  // 포인트 가져오기 위한 작업 ===============================

  const user_id = window.sessionStorage.getItem('USER_ID');

  const [point, setPoint] = useState([]);
  const havePoint = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let temp = 0;
    point_list.forEach((item) => {
      // console.log('나옴', item);
      temp += parseInt(item.POINT_PLUS) - parseInt(item.POINT_MINUS);
    });
    setPoint(temp);
  };

  const [pointplus, setPointPlus] = useState([]);
  const havePointPlus = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let temp = 0;
    point_list.forEach((item) => {
      // console.log('나옴', item);
      temp += parseInt(item.POINT_PLUS);
    });
    setPointPlus(temp);
  };

  const [pointminus, setPointMinus] = useState([]);
  const havePointMInus = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let temp = 0;
    point_list.forEach((item) => {
      // console.log('나옴', item);
      temp += parseInt(item.POINT_MINUS);
    });
    setPointMinus(temp);
  };
  // 1000단위 컴마
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  return (
    <div id="MyPage">
      <div className="memberSection">
        <div className="sub-title">
          <h2>마이페이지</h2>
          <div className="input-box">
            <button onClick={handleInfo}>회원정보 수정</button>
            <button onClick={handleDel}>회원탈퇴</button>
            <label>이름</label>
            <input
              className="mypage_name"
              type="text"
              size="20"
              defaultValue={name}
              placeholder=" "
            />
          </div>
          <div className="input-box">
            <label>적립 포인트</label>
            <input
              className="mypage_point"
              type="text"
              size="20"
              defaultValue={addComma(pointplus)}
              placeholder=" "
            />
          </div>
          <div className="input-box">
            <label>사용 포인트</label>
            <input
              className="mypage_point"
              type="text"
              size="20"
              defaultValue={addComma(pointminus)}
              placeholder=" "
            />
          </div>
          <div className="input-box">
            <label>가용 포인트</label>
            <input
              className="mypage_point"
              type="text"
              size="20"
              defaultValue={addComma(point)}
              placeholder=" "
            />
          </div>
          <div className="input-box">
            <label>신고 건수</label>
            <input
              className="mypage_report"
              type="text"
              size="20"
              defaultValue={'건'}
              placeholder=" "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
