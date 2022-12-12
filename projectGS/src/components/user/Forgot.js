import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/user/Forgot.scss';

const Forgot = () => {
  const navigate = useNavigate();
  const sendpw = () => {
    // alert('입력하신 이메일로 임시 비밀번호를 전송했습니다.');
    Swal.fire({
      title: '입력하신 이메일로 임시 비밀번호를 전송했습니다.',
      icon: 'warning',
      confirmButtonText: '확인',
      confirmButtonColor: '#191d73',
      backdrop: `rgba(0,0,0,0.4)`,
    });

    //로그인 페이지로 이동
    navigate('/login');
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
