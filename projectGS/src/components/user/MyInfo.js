import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/Join.scss';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
// import ClientCaptcha from 'react-client-captcha';
import * as server_bridge from '../../controller/server_bridge';

const MyInfo = () => {
  const id = window.sessionStorage.getItem('USER_ID');
  const name = window.sessionStorage.getItem('USER_NAME');
  const mail = window.sessionStorage.getItem('USER_MAIL');
  const tel = window.sessionStorage.getItem('USER_TEL');

  const passRef = useRef();
  const nameRef = useRef();
  const mailRef = useRef();
  const telRef = useRef();

  const getGoodsList = async (data) => {
    const res = await server_bridge.axios_instace.post('/updateuserinfo', {
      user_pw: data.USER_PW,
      user_name: nameRef.current.value,
      user_tel: telRef.current.value,
      user_mail: mailRef.current.value,
      user_idx: data.USER_IDX,
      admin_ox: 'X',
    });
  };
  return (
    <div id="Join">
      <div className="jo">
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
            <input
              className="join_pw"
              type="password"
              size="20"
              defaultValue=" "
              placeholder=" "
            />
            <label>현재 비밀번호</label>
          </div>

          <div className="input-box">
            <input
              className="join_pw"
              type="password"
              size="20"
              defaultValue=" "
              placeholder=" "
            />
            <label>새 비밀번호 (문자, 숫자, 특수문자 포함 8-20자)</label>
          </div>

          <div className="input-box">
            <input
              className="join_pwck"
              type="password"
              size="20"
              defaultValue=" "
              placeholder=" "
            />
            <label>새 비밀번호 확인</label>
          </div>

          <div>
            <p>보안문자를 보이는 대로 입력해주세요.</p>
            <div>
              <LoadCanvasTemplate reloadText="여기에 보여주고싶은 문구 입력" />
            </div>
            <div>
              {/* <ClientCaptcha captchaCode={(code) => console.log(code)} /> */}
              <input type="text" placeholder="보안문자를 입력하세요" />
            </div>
          </div>

          {/* <div className="input-box">
            <input
              className="join_name"
              type="text"
              size="20"
              defaultValue={name}
              placeholder=" "
            />
            <label>이름</label>
          </div>

          <div className="input-box">
            <input
              className="join_email"
              type="email"
              size="20"
              defaultValue={mail}
              placeholder=" "
            />
            <label>이메일</label>
          </div>

          <div className="input-box">
            <input
              className="join_tel"
              type="text"
              size="20"
              defaultValue={tel}
              placeholder=" "
            />
            <label>핸드폰('-'없이 숫자만 입력)</label>
          </div> */}

          <div>
            <input className="sign_up" type="button" value="수정하기" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
