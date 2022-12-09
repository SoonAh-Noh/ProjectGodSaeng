import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user/Join.scss';

const MyInfo = () => {
  const id = window.sessionStorage.getItem('USER_ID');
  const name = window.sessionStorage.getItem('USER_NAME');
  const mail = window.sessionStorage.getItem('USER_MAIL');
  const tel = window.sessionStorage.getItem('USER_TEL');
  return (
    <div id="Join">
      <div className="jo">
        <div className="sub-title">
          <h2>개인정보 수정</h2>
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
              defaultValue=""
              placeholder=" "
            />
            <label>비밀번호 (문자, 숫자, 특수문자 포함 8-20자)</label>
          </div>

          <div className="input-box">
            <input
              className="join_pwck"
              type="password"
              size="20"
              defaultValue=" "
              placeholder=" "
            />
            <label>비밀번호 재입력</label>
          </div>

          <div className="input-box">
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
          </div>

          <div>
            <input className="sign_up" type="button" value="수정하기" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
