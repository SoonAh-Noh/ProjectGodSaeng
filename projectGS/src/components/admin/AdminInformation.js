import React, { useState, useRef, useEffect } from 'react';
import * as server_bridge from '../../controller/server_bridge';
const AdminInformation = () => {
  const [mode, setMode] = useState(false);
  const [user, setUser] = useState({});
  const passRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const onClick = () => {
    setMode(!mode);
  };
  useEffect(() => {
    setUserInfo();
  }, []);

  const updateInfo = async () => {
    const res = await server_bridge.axios_instace.post('/updateadmininfo', {
      user_pw: passRef.current.value,
      user_tel: telRef.current.value,
      user_name: nameRef.current.value,
      user_idx: window.sessionStorage.getItem('USER_IDX'),
    });
    if (res.data === 'success') alert('수정 성공!');
    else {
      alert('수정 실패!');
      console.log(res.data);
    }

    window.location.href = '/admin/admininfo';
  };
  const setUserInfo = async () => {
    const res = await server_bridge.axios_instace.post('/getuserinfo', {
      user_idx: window.sessionStorage.getItem('USER_IDX'),
    });
    setUser(res.data[0]);
  };
  return (
    <div className="adminInformation">
      <div className="adminInformationContent">
        <h3>내 정보</h3>
        {mode && <button onClick={updateInfo}>수정하기</button>}
        <button onClick={onClick}>{!mode ? '수정하기' : '수정취소'}</button>
        <table border={1}>
          <tr>
            <th>아이디</th>
            <td>{user.USER_ID}</td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              {!mode ? (
                '****'
              ) : (
                <input type="password" name="pass" id="pass" ref={passRef} />
              )}
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              {!mode ? (
                user.USER_NAME
              ) : (
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.USER_NAME}
                  ref={nameRef}
                />
              )}
            </td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              {!mode ? (
                user.USER_TEL
              ) : (
                <input
                  type="text"
                  name="tel"
                  id="tel"
                  defaultValue={user.USER_TEL}
                  ref={telRef}
                />
              )}
            </td>
          </tr>
          <tr>
            <th>관리자 등급</th>
            <td>일반 관리자</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default AdminInformation;
