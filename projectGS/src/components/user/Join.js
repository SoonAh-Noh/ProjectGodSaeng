import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/Join.scss';

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
  const checkEmailRef = useRef();
  const checkPasswordRef = useRef();
  const checkPhonenumberRef = useRef();

  const [idComment, setIdComment] = useState('');
  const [pwComment, setPwComment] = useState('');
  const [emailComment, setEmailComment] = useState('');
  const [phoneComment, setPhoneComment] = useState('');

  // 아이디 중복 체크
  var id = '';
  const idChange = (e) => {
    id = idRef.current.value;
    axios.post('http://localhost:5000/idCheck', { id }).then((res) => {
      setIdComment('');
      // console.log(res);
      // console.log(res.data);
      if (res.data[0].CNT != 0) {
        setIdComment('중복된 아이디가 있습니다.');
      } else {
        setIdComment('');
      }
    });
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

  const handleRegister = () => {
    // 아이디 입력 확인
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요');
      idRef.current.focus();
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
      nameRef.current.focus();
      return false;
    }
    // 이메일 입력 확인
    if (mailRef.current.value === '' || mailRef.current.value === undefined) {
      alert('이메일을 입력하세요');
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

    // 비밀번호 유효성 검사
    if (checkPassword(pwRef.current.value) == false) {
      alert('비밀번호 형식이 아닙니다');
      pwRef.current.focus();
      return false;
    }

    // 이메일 유효성 검사
    if (checkEmail(mailRef.current.value) == false) {
      alert('이메일 형식이 아닙니다');
      mailRef.current.focus();
      return false;
    }

    // 핸드폰 유효성 검사
    if (checkPhonenumber(telRef.current.value) == false) {
      alert('핸드폰 형식이 아닙니다');
      telRef.current.focus();
      return false;
    }

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
        if (res.data === 'success') {
          alert('회원가입 성공');
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
      <div className="jo">
        <div className="sub-title">
          <h2>회원가입</h2>
        </div>

        <form className="form-join">
          <div className="input-box">
            <p>{idComment}</p>
            <input
              className="join_id"
              type="text"
              size="20"
              defaultValue=""
              ref={idRef}
              onChange={idChange}
              placeholder=" "
            />
            <label>아이디 (문자, 숫자 포함 6-20자)</label>
          </div>

          <div className="input-box">
            <p>{pwComment}</p>
            <input
              className="join_pw"
              type="password"
              size="20"
              defaultValue=""
              ref={pwRef}
              placeholder=" "
              onBlur={checkPassword}
            />
            <label>비밀번호 (문자, 숫자, 특수문자 포함 8-20자)</label>
          </div>

          <div className="input-box">
            <input
              className="join_pwck"
              type="password"
              size="20"
              defaultValue=""
              ref={pwCkRef}
              placeholder=" "
            />
            <label>비밀번호 재입력</label>
          </div>

          <div className="input-box">
            <input
              className="join_name"
              type="text"
              size="20"
              defaultValue=""
              ref={nameRef}
              placeholder=" "
            />
            <label>이름</label>
          </div>

          <div className="input-box">
            <p>{emailComment}</p>
            <input
              className="join_email"
              type="email"
              size="20"
              defaultValue=""
              ref={mailRef}
              placeholder=" "
              onBlur={checkEmail}
            />
            <label>이메일</label>
          </div>

          <div className="input-box">
            <p>{phoneComment}</p>
            <input
              className="join_tel"
              type="text"
              size="20"
              defaultValue=""
              ref={telRef}
              placeholder=" "
              onKeyPress={onKeyPress}
              onBlur={checkPhonenumber}
            />
            <label>핸드폰('-'없이 숫자만 입력)</label>
          </div>

          <div>
            <input
              className="sign_up"
              type="button"
              value="가입하기"
              onClick={handleRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
