import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
import Swal from 'sweetalert2';
import '../../css/user/mypage.css';
import profile from '../../images/profile.png';
//=============================================
import { FaUserAlt } from 'react-icons/fa';
import { SlArrowLeft } from 'react-icons/sl';
import { MdOutlineSettings } from 'react-icons/md';

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

  const [point, setPoint] = useState([0]);
  const [pluspoint, setPlusPoint] = useState([0]);
  const [minuspoint, setMinusPoint] = useState([0]);
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
      <div className="subTop">
        <h1>마이페이지</h1>
      </div>
      <div className="section">
        <div className="mypage-btn">
          <button onClick={handleDel}>회원탈퇴</button>|
          <button onClick={handleInfo}>
            회원정보 수정
            <MdOutlineSettings />
          </button>
        </div>
        <div className="sub-title my-title mypage-title">
          <h2>{name} 님 환영합니다</h2>
        </div>
        <div className="reportForm_myP">
          <FaUserAlt className="myprofile" size="150" />

          <table className="mypageTable">
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>적립 포인트</th>
                <th>사용 포인트</th>
                <th>가용 포인트</th>
                <th>신고 건수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{addComma(pluspoint)}</td>
                <td>{addComma(minuspoint)}</td>
                <td>{addComma(point)}</td>
                <td>{totalcnt}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="userBenefit">
          <div>
            <p>회원님의 혜택정보</p>
          </div>
          <div className="BenefitInfo">
            - 담당자의 확인을 거쳐 정상처리된 신고건수당
            <br />
            50p가 적립되며, 포인트는 온누리 상품권으로 교환이 가능합니다.
            <br />
            <br />
            - 온누리 상품권은 모바일로 발송되오니
            <br />
            개인정보 수집 이용에 동의하여 주시기 바랍니다.
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
