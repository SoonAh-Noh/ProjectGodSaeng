import React from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
import '../../css/admin/AdminLogin.scss';

const AdminLogin = () => {
  // 아이디 패스워드 인풋태그 Ref
  const idRef = useRef();
  const pwRef = useRef();

  // 페이지 이동 navigate
  const navigate = useNavigate();

  // 로컬 로그인 엔터키 입력시 자동 로그인 버튼 클릭
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // 로그인 버튼 클릭시 실행 함수
  const handleLogin = () => {
    // 아이디 입력 확인
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      //alert('아이디를 입력하세요!!!');
      server_bridge.normalAlert('아이디를 입력하세요!!');
      idRef.current.focus();
      return false;
    }

    // 패스워드 입력 확인
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      //alert('패스워드를 입력하세요!!!');
      server_bridge.normalAlert('패스워드를 입력하세요!!');
      pwRef.current.focus();
      return false;
    }

    // 로그인 요청시 서버로 요청
    axios
      .post('http://localhost:5000/home/adminlogin', {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        console.log('로그인 정보 일치 확인', res);

        // 일치하는 사용자가 있을경우
        if (res.data.length === 1) {
          console.log('idx', res.data[0].USER_IDX);
          console.log('id', res.data[0].USER_ID);
          console.log('name', res.data[0].USER_NAME);

          if (res.data[0].ADMIN_OX === 'O') {
            // 로그인에 성공하고 세션에 값 저장
            window.sessionStorage.setItem('USER_IDX', res.data[0].USER_IDX);
            window.sessionStorage.setItem('USER_ID', res.data[0].USER_ID);
            window.sessionStorage.setItem('USER_MAIL', res.data[0].USER_MAIL);
            //window.sessionStorage.setItem('USER_NICK', res.data[0].USER_NICK);
            window.sessionStorage.setItem('USER_NAME', res.data[0].USER_NAME);
            window.sessionStorage.setItem('USER_TEL', res.data[0].USER_TEL);
            window.sessionStorage.setItem('ADMIN_OX', res.data[0].ADMIN_OX);

            //alert(res.data[0].USER_NAME + '님 환영합니다!');

            server_bridge.normalInfoAlert(
              res.data[0].USER_NAME + '님 환영합니다!',
            );
            //window.location.href = '/admin';
            navigate('/admin');
          } else {
            //alert('관리자 권한이 없는 아이디입니다!');
            server_bridge.normalAlert('관리자 권한이 없는 아이디입니다!');
            idRef.current.value = '';
            pwRef.current.value = '';
          }

          // 세션에 값 저장후 메인페이지로 이동
          // navigate("/home");
        } else {
          //아이디 비밀번호 잘못 입력할 경우 input value 초기화
          //alert('잘못된 아이디와 비밀번호입니다!');
          server_bridge.normalAlert('잘못된 아이디와 비밀번호입니다!');
          idRef.current.value = '';
          pwRef.current.value = '';

          // 로그인 실패시 다시 로그인 페이지로
          //navigate('/home/adminlogin');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="admin">
      <div className="ad">
        <div className="sub-title">
          <h3>관리자 로그인</h3>
        </div>

        <form className="form_login">
          <div className="input-box">
            <input
              className="id_ad"
              type="text"
              defaultValue=""
              placeholder=" "
              ref={idRef}
            />
            <label>아이디</label>
          </div>

          <div className="input-box">
            <input
              className="pw_ad"
              type="password"
              defaultValue=""
              placeholder="비밀번호를 입력하세요"
              ref={pwRef}
              onKeyPress={onKeyPress}
            />
            <label>비밀번호</label>
          </div>

          <input
            className="btn_admin"
            type="button"
            value="로그인"
            onClick={handleLogin}
          />

          <div className="ad_info">
            <div>※ 관리자 전용 로그인 화면입니다.</div>
            <div>※ 비밀번호 분실 시 문의 바랍니다.</div>
            <div className="copy">© GODSAENG. ALL RIGHTS RESERVED.</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
