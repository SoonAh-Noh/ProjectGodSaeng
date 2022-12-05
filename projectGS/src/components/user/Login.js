import React from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/Login.scss';

const Login = () => {
  // 페이지 이동 navigate
  const navigate = useNavigate();

  // 로컬 로그인 엔터키 입력시 자동 로그인 버튼 클릭
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // 아이디 패스워드 인풋태그 Ref
  const idRef = useRef();
  const pwRef = useRef();

  // 로그인 버튼 클릭시 실행 함수
  const handleLogin = () => {
    // 아이디 입력 확인
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요');
      idRef.current.focus();
      return false;
    }

    // 패스워드 입력 확인
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('패스워드를 입력하세요');
      pwRef.current.focus();
      return false;
    }

    // 로그인 요청시 서버로 요청
    axios
      .post('http://localhost:5000/login', {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        console.log('로그인 정보 일치 확인', res);

        // 일치하는 사용자가 있을경우
        if (res.data.length === 1) {
          console.log('성공 idx', res.data[0].USER_ID);
          console.log('성공 id', res.data[0].USER_ID);
          console.log('성공 name', res.data[0].USER_NAME);

          // 로그인에 성공하고 세션에 값 저장
          window.sessionStorage.setItem('USER_IDX', res.data[0].USER_IDX);
          window.sessionStorage.setItem('USER_ID', res.data[0].USER_ID);
          window.sessionStorage.setItem('USER_MAIL', res.data[0].USER_MAIL);
          window.sessionStorage.setItem('USER_NAME', res.data[0].USER_NAME);
          window.sessionStorage.setItem('USER_TEL', res.data[0].USER_TEL);
          window.sessionStorage.setItem('ADMIN_OX', res.data[0].ADMIN_OX);

          alert(res.data[0].USER_NAME + '님 환영합니다!');
          // 세션에 값 저장후 메인페이지로 이동
          navigate('/');
        } else {
          console.log('실패 id', res.data[0].USER_ID);
          console.log('실패 name', res.data[0].USER_NAME);
          console.log('실패 데이터', res.data[0]);
          //아이디 비밀번호 잘못 입력할 경우 input value 초기화
          alert('잘못된 아이디와 비밀번호입니다!');
          idRef.current.value = '';
          pwRef.current.value = '';

          // 로그인 실패시 다시 로그인 페이지로
          // navigate('/login');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div id="Login">
      <div className="log">
        <div className="sub-title">
          <h2>로그인</h2>
        </div>

        <form className="form-login">
          <div className="input-box">
            <input
              className="id_login"
              type="text"
              defaultValue=""
              placeholder=" "
              ref={idRef}
            />
            <label>아이디</label>
          </div>

          <div className="input-box">
            <input
              className="pw_login"
              type="password"
              defaultValue=""
              placeholder=" "
              ref={pwRef}
              onKeyPress={onKeyPress}
            />
            <label>비밀번호</label>
          </div>

          <div className="btn_log">
            <input
              className="btn-login"
              type="button"
              value="로그인"
              onClick={handleLogin}
            />
          </div>

          <div>
            <a className="login_pw" href="/forgot">
              비밀번호 찾기
            </a>
            <a className="gaip" href="/join">
              회원가입{' '}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
