import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/Join.scss';
import * as server_bridge from '../../controller/server_bridge';
import Swal from 'sweetalert2';

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

const MyInfo = () => {
  const id = window.sessionStorage.getItem('USER_ID');
  const name = window.sessionStorage.getItem('USER_NAME');
  const mail = window.sessionStorage.getItem('USER_MAIL');
  const tel = window.sessionStorage.getItem('USER_TEL');
  const [pass, setPass] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setNormalPass();
    loadCaptchaEnginge(6);
  }, []);

  const setNormalPass = async () => {
    const res = await server_bridge.axios_instace.post('/getuserinfo', {
      user_idx: window.sessionStorage.getItem('USER_IDX'),
    });
    setPass(res.data[0].USER_PW);
    console.log(res.data);
    setUser(res.data[0]);
  };

  //비밀번호 유효성 검사
  const checkPassword = (e) => {
    //  8 ~ 10자 영문, 숫자, 문자  조합
    var regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
    // 형식에 맞는 경우 true 리턴
    console.log('비밀번호 유효성 검사 :: ', regExp.test(e));
    console.log(regExp.test(e));

    // if (regExp.test(e.target.value) == false) {
    //   setPwComment(
    //     '비밀번호는 영어, 숫자, 특수문자를 포함해 총 8글자 이상이어야 합니다.',
    //   );
    // } else {
    //   setPwComment('');
    // }

    return regExp.test(e);
  };

  // 이메일 유효성 검사
  const checkEmail = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    // console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value));
    // console.log(regExp.test(e.target.value));

    // if (regExp.test(e.target.value) == false) {
    //   setEmailComment('올바른 이메일 형식이 아닙니다.');
    // } else {
    //   setEmailComment('');
    // }

    return regExp.test(e);
  };

  // 핸드폰번호 유효성 검사
  const checkPhonenumber = (e) => {
    // '-' 입력 시
    var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    // 숫자만 입력시
    var regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    // 형식에 맞는 경우 true 리턴
    // console.log('핸드폰번호 유효성 검사 :: ', regExp2.test(e.target.value));
    // console.log(regExp.test(e.target.value));

    // if (regExp2.test(e.target.value) == false) {
    //   setPhoneComment("'-'없이 번호만 입력해주세요");
    // } else {
    //   setPhoneComment('');
    // }

    return regExp2.test(e);
  };

  const passRef = useRef();
  const nameRef = useRef();
  const mailRef = useRef();
  const telRef = useRef();
  const btnRef = useRef();
  const newPassRef = useRef();
  const newPassChkRef = useRef();
  const [captchaPass, setCaptchaPass] = useState(false);
  const [passMode, setPassMode] = useState(false);

  const updateUserInfo = async () => {
    // 이름 입력 확인
    if (nameRef.current.value === '' || nameRef.current.value === undefined) {
      // alert('이름을 입력하세요');
      Swal.fire({
        title: '이름을 입력하세요',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      nameRef.current.focus();
      return false;
    }
    // 이메일 입력 확인
    if (mailRef.current.value === '' || mailRef.current.value === undefined) {
      // alert('이메일을 입력하세요');
      Swal.fire({
        title: '이메일을 입력하세요',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      mailRef.current.focus();
      return false;
    }
    // 휴대폰 번호 입력 확인
    if (telRef.current.value === '' || telRef.current.value === undefined) {
      // alert('핸드폰 번호를 입력하세요');
      Swal.fire({
        title: '핸드폰 번호를 입력하세요',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      telRef.current.focus();
      return false;
    }

    //비밀번호 관련 사항은 비밀번호가 수정되는 모드이면 유효성 체크 등을 확인

    if (passMode === true) {
      // 비밀번호 입력 확인
      if (passRef.current.value === '' || passRef.current.value === undefined) {
        // alert('기존 비밀번호를 입력하세요');
        Swal.fire({
          title: '기존 비밀번호를 입력하세요',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#191d73',
          backdrop: `rgba(0,0,0,0.4)`,
        });
        passRef.current.focus();
        return false;
      }

      //비밀번호가 기존 비밀번호와 동일한지 확인
      if (passRef.current.value !== user.USER_PW) {
        // alert('기존 비밀번호가 일치하지 않습니다!');
        Swal.fire({
          title: '기존 비밀번호가 일치하지 않습니다!',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#191d73',
          backdrop: `rgba(0,0,0,0.4)`,
        });
        passRef.current.focus();
        passRef.current.value = '';
        return false;
      }

      // 비밀번호 재입력 확인
      if (
        newPassRef.current.value === '' ||
        newPassRef.current.value === undefined
      ) {
        // alert('새 비밀번호를 입력하세요');
        Swal.fire({
          title: '새 비밀번호를 입력하세요!',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#191d73',
          backdrop: `rgba(0,0,0,0.4)`,
        });
        newPassRef.current.focus();
        return false;
      }
      // 비밀번호 와 비밀번호 체크 값 비교
      if (newPassRef.current.value !== newPassChkRef.current.value) {
        // alert('새 비밀번호가 서로 다릅니다');
        Swal.fire({
          title: '새 비밀번호가 서로 다릅니다!',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#191d73',
          backdrop: `rgba(0,0,0,0.4)`,
        });
        newPassRef.current.value = '';
        newPassChkRef.current.value = '';
        newPassRef.current.focus();
        return false;
      }

      // 비밀번호 유효성 검사
      if (checkPassword(newPassRef.current.value) == false) {
        // alert('비밀번호 형식이 아닙니다');
        Swal.fire({
          title: '비밀번호 형식이 아닙니다!',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#191d73',
          backdrop: `rgba(0,0,0,0.4)`,
        });
        newPassRef.current.focus();
        return false;
      }
      setPass(newPassRef.current.value);
    }

    // 이메일 유효성 검사
    if (checkEmail(mailRef.current.value) == false) {
      // alert('이메일 형식이 아닙니다');
      Swal.fire({
        title: '이메일 형식이 아닙니다!',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      mailRef.current.focus();
      return false;
    }

    // 핸드폰 유효성 검사
    if (checkPhonenumber(telRef.current.value) == false) {
      // alert('핸드폰 형식이 아닙니다');
      Swal.fire({
        title: '핸드폰 형식이 아닙니다!',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      telRef.current.focus();
      return false;
    }

    //자동인식방지캡쳐
    let user_captcha_value =
      document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha_value) === false) {
      // alert('자동입력 방지 문자가 다릅니다!!');
      Swal.fire({
        title: '자동입력 방지 문자가 다릅니다!!',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      return false;
    }

    const res = await server_bridge.axios_instace.post('/updateuserinfo', {
      user_pw: pass,
      user_name: nameRef.current.value,
      user_tel: telRef.current.value,
      user_mail: mailRef.current.value,
      user_idx: window.sessionStorage.getItem('USER_IDX'),
      admin_ox: 'X',
    });

    if (res.data === 'success') {
      // alert('회원정보 수정 성공!');
      Swal.fire({
        title: '회원정보 수정 성공!',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      //로그인 페이지로 이동
      navigate('/');
    } else {
      // alert('회원정보 수정 실패!' + '\r\n' + res.data);
      Swal.fire({
        title: '회원정보 수정 실패!' + '\r\n' + res.data,
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
    }
  };

  const changePassMode = (e) => {
    let btn = btnRef.current;

    if (!passMode) {
      btn.className = 'btn';
    } else {
      btn.className = 'btn btn-navy';
    }

    setPassMode(!passMode);
    e.preventDefault();
  };

  return (
    <div id="Join">
      <div className="jo" style={{ height: '1050px' }}>
        <div className="sub-title">
          <h2>회원정보 수정</h2>
        </div>

        <form className="form-join">
          <div className="input-box">
            <input
              className="join_id"
              type="text"
              size="20"
              defaultValue={id}
              placeholder=" "
            />
            <label>아이디</label>
          </div>

          <div className="input-box">
            <button
              ref={btnRef}
              className="btn btn-navy"
              onClick={changePassMode}
            >
              비밀번호 수정하기
            </button>
          </div>
          {passMode && (
            <>
              <div className="input-box">
                <input
                  className="join_pw"
                  type="password"
                  size="20"
                  defaultValue=""
                  placeholder=""
                  ref={passRef}
                />
                <label>현재 비밀번호</label>
              </div>

              <div className="input-box">
                <input
                  className="join_pw"
                  type="password"
                  size="20"
                  defaultValue=""
                  placeholder=""
                  ref={newPassRef}
                />
                <label>새 비밀번호 (문자, 숫자, 특수문자 포함 8-20자)</label>
              </div>

              <div className="input-box">
                <input
                  className="join_pwck"
                  type="password"
                  size="20"
                  defaultValue=""
                  placeholder=""
                  ref={newPassChkRef}
                />
                <label>새 비밀번호 확인</label>
              </div>
            </>
          )}

          <div className="input-box">
            <input
              className="join_name"
              type="text"
              size="20"
              defaultValue={user.USER_NAME}
              placeholder=" "
              ref={nameRef}
            />
            <label>이름</label>
          </div>

          <div className="input-box">
            <input
              className="join_email"
              type="email"
              size="20"
              defaultValue={user.USER_MAIL}
              placeholder=" "
              ref={mailRef}
            />
            <label>이메일</label>
          </div>

          <div className="input-box">
            <input
              className="join_tel"
              type="text"
              size="20"
              defaultValue={user.USER_TEL}
              placeholder=" "
              ref={telRef}
            />
            <label>핸드폰('-'없이 숫자만 입력)</label>
          </div>

          <div className="input-box">
            <p>보안문자를 보이는 대로 입력해주세요.</p>
            <div>
              <LoadCanvasTemplate reloadText="새로고침" />
              <input
                type="text"
                className="user_captcha_input"
                id={'user_captcha_input'}
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <input
              className="sign_up"
              type="button"
              value="수정하기"
              onClick={updateUserInfo}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
