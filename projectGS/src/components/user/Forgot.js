import React from 'react';
import '../../css/user/Forgot.scss';

const Forgot = () => {
  const sendpw = () => {
    alert('입력하신 이메일로 임시비밀번호 전송했습니다.');
  };
  return (
    <div id="findpw">
      <div className="find">
        <div className="sub-title">
          <h2>비밀번호 찾기</h2>
        </div>

        <from className="form-find">
          <div className="input-find">
            <input
              className="id_find"
              type="text"
              defaultValue=""
              placeholder=" "
            />
            <label>아이디</label>
          </div>

          <div className="input-find">
            <input
              className="email_find"
              type="email"
              defaultValue=""
              placeholder=" "
            />
            <label>이메일</label>
          </div>

          <div className="btn_find">
            <input
              className="btn-f"
              type="button"
              value="찾기"
              onClick={sendpw}
            />
          </div>
        </from>
      </div>
    </div>
  );
};

export default Forgot;
