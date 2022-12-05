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
    <div className="adminInformation Contents">
      <div className="adminInformationContent pageWrap">
        <div className="adminTitle"><h3>관리자 정보</h3></div>
        
        <table className="adminTable2" border="0" cellPadding="0" cellSpacing="0">
          <colgroup>
            <col width="50px" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
          <tr>
            <th>No.</th>
            <th>아이디</th>
            <th>비밀번호</th>
            <th>이름</th>
            <th>연락처</th>
            <th>관리자 등급</th>
            <th>정보 수정</th>
          </tr>
          </thead>
          <tbody>
          <tr align="center">
            <td>1</td>
            <td>{user.USER_ID}</td>
            <td>
              {!mode ? (
                '****'
              ) : (
                <input type="password" name="pass" id="pass" ref={passRef} />
              )}
            </td>
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
            <td>일반 관리자</td>
            <td>
              <div className="tableBtnWrap">
                {mode && <button onClick={updateInfo} className="adminBtn adminBtnNavy">수정하기</button>}
                {/* <button onClick={onClick} className="tableBtn btnReset">{!mode ? '수정하기' : '수정취소'}</button> */}
                {!mode ? <button onClick={onClick} className="adminBtn adminBtnNavy">수정하기</button> : 
                  <button onClick={onClick} className="adminBtn">수정취소</button>
                }
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInformation;
