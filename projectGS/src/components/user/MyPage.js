import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
import Swal from 'sweetalert2';
import '../../css/user/mypage.css';
import profile from '../../images/profile.png';

const MyPage = () => {
  const name = window.sessionStorage.getItem('USER_NAME');

  const handleInfo = () => {
    navigate('/myinfo');
  };

  // 회원탈퇴 팝업 ===================================================
  const handleDel = () => {
    Swal.fire({
      title: '정말 탈퇴하시겠습니까?',
      text: '다시 되돌릴 수 없습니다. 신중하세요.',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
      confirmButtonColor: '#191d73',
      backdrop: `rgba(0,0,0,0.4)`,
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          const { value: nothing } = await Swal.fire({
            title: '비밀번호를 입력하세요.',
            text: '회원 탈퇴 시 서비스에 설정된 모든 데이터가 삭제됩니다..',
            input: 'password',
            inputPlaceholder: '비밀번호 입력',
          });
          // 이후 처리되는 내용.
          if (nothing) {
            Swal.fire('회원 탈퇴에 성공했습니다.', {
              icon: 'success',
            });
            window.sessionStorage.clear();
            navigate('/');
          }
        })();
      }
    });
    return false;
  };

  // 1000단위 컴마
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  // 포인트 가져오기 위한 작업 ==========================================

  const navigate = useNavigate();
  useEffect(() => {
    havePoint();
    //PlusPoint();
    //MinusPoint();
    handleReportList();
  }, []);

  const user_id = window.sessionStorage.getItem('USER_ID');

  const [point, setPoint] = useState([]);
  const [pluspoint, setPlusPoint] = useState([]);
  const [minuspoint, setMinusPoint] = useState([]);
  const havePoint = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let temp = 0;
    let plus = 0;
    let minus = 0;
    point_list.forEach((item) => {
      //console.log('나옴', item);

      plus += parseInt(item.POINT_PLUS);
      minus += parseInt(item.POINT_MINUS);
      //temp += parseInt(item.POINT_PLUS) - parseInt(item.POINT_MINUS);
    });
    setPoint(plus - minus);
    setPlusPoint(plus);
    setMinusPoint(minus);
  };
  const PlusPoint = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let plus = 0;
    point_list.forEach((item) => {
      //console.log('플러스', item);
      plus += parseInt(item.POINT_PLUS);
    });
    setPlusPoint(plus);
  };

  const MinusPoint = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let minus = 0;
    point_list.forEach((item) => {
      //console.log('마이너스', item);
      minus += parseInt(item.POINT_MINUS);
    });
    setMinusPoint(minus);
  };

  // 신고 건수 확인 ===================================================
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  const handleReportList = async () => {
    const res = await server_bridge.axios_instace.post(
      //선택한 검색 범위에 따른 신고 결과 가져오기
      '/getreportcount',
      { user_id: user_id },
    );
    const data = res.data[0];
    console.log(data);
    setCnt(data.CNT);
  };
  return (
    <div id="MyPage">
      <div className="container section">
        <div className="sub-title my-title">
          <h2>마이페이지</h2>
        </div>

        <div className="sub-title my-title mypage-title">
          <h3>{name} 님 환영합니다</h3>
        </div>
        <div className="reportForm">
          <div className="mypage-btn">
            <button onClick={handleInfo}>회원정보 수정</button>
            <button onClick={handleDel}>회원탈퇴</button>
          </div>
          <img className="profile" scr={profile} alt="프로필" />
          <div className="subTitle">
            <label>적립 포인트 </label>
            <label>{addComma(pluspoint)}</label>
          </div>
          <div className="subTitle">
            <label>사용 포인트 </label>
            <label>{addComma(minuspoint)}</label>
          </div>
          <div className="subTitle">
            <label>가용 포인트 </label>
            <label>{addComma(point)}</label>
          </div>
          <div className="subTitle">
            <label>신고 건수</label>
            <label>{totalcnt}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
