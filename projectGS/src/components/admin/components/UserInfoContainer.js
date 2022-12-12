import { useState, useRef, useReducer } from 'react';
import Swal from 'sweetalert2';
import * as server_bridge from '../../../controller/server_bridge';

import userIcon from '../../../images/profile.png';

const UserInfoContainer = ({ data }) => {
  const pwRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const mailRef = useRef();
  const oRef = useRef();
  const xRef = useRef();

  const updateUser = async (e) => {
    e.preventDefault();

    Swal.fire({
      icon: 'warning',

      title: '정말로 수정하시겠습니까?',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((update) => {
      if (update) {
        server_bridge.axios_instace
          .post('/updateuserinfo', {
            user_pw: data.USER_PW,
            user_name: nameRef.current.value,
            user_tel: telRef.current.value,
            user_mail: mailRef.current.value,
            user_idx: data.USER_IDX,
            user_ox: oRef.current.checked ? 'O' : 'X',
          })
          .then((res) => {
            if (res.data === 'success') {
              server_bridge.normalInfoAlert('수정 성공!');
            } else {
              server_bridge.normalAlert('수정 실패!' + '\r\n' + res.data);
            }
          });
      }
    });

    // if (window.confirm('정말로 수정하시겠습니까?')) {
    //     const res = await server_bridge.axios_instace.post('/updateuserinfo', {
    //         user_pw: data.USER_PW,
    //         user_name: nameRef.current.value,
    //         user_tel: telRef.current.value,
    //         user_mail: mailRef.current.value,
    //         user_idx: data.USER_IDX,
    //         user_ox: oRef.current.checked ? 'O' : 'X',
    //     });
    //     if (res.data === 'success') {
    //         alert('회원 정보 수정에 성공했습니다!');
    //     } else {
    //         alert('회원 정보 수정에 실패했습니다!' + '\r\n' + res.data);
    //     }
    // }
  };
  //console.log('관리자여부가아닌 회원여부확인', data);

  //사용자 정보 핸들링용 공용 컴포넌트
  return (
    <div className="userWrap">
      <div className="userImg">
        <img src={userIcon} alt="Profile" />
      </div>
      <div className="user">
        <table className="userTable" border="0" cellPadding="0" cellSpacing="0">
          <colgroup>
            <col width="120px;" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input
                  type="text"
                  ref={nameRef}
                  defaultValue={data.USER_NAME}
                />
              </td>
            </tr>
            <tr>
              <th>아이디</th>
              <td>
                <input type="text" defaultValue={data.USER_ID} disabled />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  type="text"
                  ref={mailRef}
                  defaultValue={data.USER_MAIL}
                />
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                <input type="text" ref={telRef} defaultValue={data.USER_TEL} />
              </td>
            </tr>
            <tr>
              <th>회원 여부</th>
              <td>
                <div className="radioWrap">
                  {data.USER_OX === 'O' ? (
                    <>
                      <input
                        type="radio"
                        id="user_o"
                        name="user"
                        value="O"
                        ref={oRef}
                        defaultChecked
                      />
                      <label htmlFor="user_o">일반회원</label>
                      <input
                        type="radio"
                        id="user_x"
                        name="user"
                        value="X"
                        ref={xRef}
                      />
                      <label htmlFor="user_x">비회원</label>
                    </>
                  ) : (
                    <>
                      <input
                        type="radio"
                        id="user_o"
                        name="user"
                        value="O"
                        ref={oRef}
                      />
                      <label htmlFor="user_o">일반회원</label>
                      <input
                        type="radio"
                        id="user_x"
                        name="user"
                        value="X"
                        ref={xRef}
                        defaultChecked
                      />
                      <label htmlFor="user_x">비회원</label>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="adminBtnWrap">
          <button
            type="submit"
            className="adminBtn adminBtn2 adminBtnNavy"
            onClick={updateUser}
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserInfoContainer;
