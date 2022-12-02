import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  // 페이지 이동 navigate
  const navigate = useNavigate();

  // 로컬 회원가입 엔터키 입력시 자동 버튼 클릭
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  // 아이디 패스워드 닉네임 인풋태그 Ref
  const idRef = useRef();
  const pwRef = useRef();
  const pwCkRef = useRef();
  const nameRef = useRef();
  const mailRef = useRef();
  const telRef = useRef();

  const [idComment, setIdComment] = useState('');
  const [pwComment, setPwComment] = useState('');
  const [pwCkComment, setPwCkComment] = useState('');
  const [nameComment, setNameComment] = useState('');
  const [mailComment, setMailComment] = useState('');
  const [telComment, setTelComment] = useState('');

  // 아이디 중복 체크
  var id = '';
  const idChange = (e) => {
    id = idRef.current.value;
    axios.post('http://localhost:5000/idCheck', { id }).then((res) => {
      setIdComment('');
      if (res.data[0].CNT !== 0) {
        setIdComment('중복된 아이디가 있습니다.');
      } else {
        setIdComment('');
      }
    });
  };

  const handleRegister = () => {
    // 아이디 입력 확인
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요');
      pwRef.current.focus();
      return false;
    }
    // 비밀번호 입력 확인
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('비밀번호를 입력하세요');
      pwRef.current.focus();
      return false;
    }
    // 비밀번호 재입력 확인
    if (pwCkRef.current.value === '' || pwCkRef.current.value === undefined) {
      alert('비밀번호를 재입력하세요');
      pwCkRef.current.focus();
      return false;
    }
    // 이름 입력 확인
    if (nameRef.current.value === '' || nameRef.current.value === undefined) {
      alert('이름을 입력하세요');
      pwRef.current.focus();
      return false;
    }
    // 이메일 입력 확인
    if (mailRef.current.value === '' || mailRef.current.value === undefined) {
      alert('이름을 입력하세요');
      mailRef.current.focus();
      return false;
    }
    // 휴대폰 번호 입력 확인
    if (telRef.current.value === '' || telRef.current.value === undefined) {
      alert('핸드폰 번호를 입력하세요');
      telRef.current.focus();
      return false;
    }
    // 비밀번호 와 비밀번호 체크 값 비교
    if (pwRef.current.value !== pwCkRef.current.value) {
      alert('비밀번호가 서로 다릅니다');
      pwCkRef.current.focus();
      return false;
    }

    // 회원가입 요청
    axios
      .post('http://localhost:5000/join', {
        id: idRef.current.value,
        pw: pwRef.current.value,
        name: nameRef.current.value,
        mail: mailRef.current.value,
        tel: telRef.current.value,
      })
      .then((res) => {
        console.log(res);
        //회원가입에 성공하면
        if (res.data === '회원가입 성공') {
          //로그인 페이지로 이동
          navigate('/login');
        } else {
          // 회원가입에 실패하면 input value 초기화
          idRef.current.value = '';
          pwRef.current.value = '';
          pwCkRef.current.value = '';
          nameRef.current.value = '';
          mailRef.current.value = '';
          telRef.current.value = '';

          // 회원가입 페이지로 이동
          navigate('/join');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div id="Join">
      <div className="memberSection">
        <div className="sub-title"><h2>회원가입</h2></div>
        
        <form>
          <div>아이디</div>
          <input
            className="id"
            type="text"
            size="20"
            defaultValue=""
            ref={idRef}
            onChange={idChange}
            placeholder="아이디 입력(6-20자)"
          />
          <div>비밀번호</div>
          <input
            className="pw"
            type="password"
            size="20"
            defaultValue=""
            ref={pwRef}
            placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8-20자)"
          />
          <div>비밀번호 재입력</div>
          <input
            className="pwck"
            type="password"
            size="20"
            defaultValue=""
            ref={pwCkRef}
            placeholder="비밀번호 재입력"
          />
          <div>이름</div>
          <input
            className="name"
            type="text"
            size="20"
            defaultValue=""
            ref={nameRef}
            placeholder="이름 입력"
          />
          <div>이메일</div>
          <input
            className="email"
            type="email"
            size="20"
            defaultValue=""
            ref={mailRef}
            placeholder="이메일 주소 입력"
          />
          <div>핸드폰</div>
          <input
            className="tel"
            type="text"
            size="20"
            defaultValue=""
            ref={telRef}
            placeholder="휴대폰 번호 입력"
            onKeyPress={onKeyPress}
          />
          <div>
            <input
              className="sign_up"
              type="button"
              value="회원가입"
              onClick={handleRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
