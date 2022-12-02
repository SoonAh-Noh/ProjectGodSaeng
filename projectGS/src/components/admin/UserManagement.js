import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/userManagement.css';
import * as server_bridge from '../../controller/server_bridge';
const UserManagement = () => {
  const navigate = useNavigate(); //페이지 이동용 네비게이터
  const [user, setUserList] = useState([]); //사용자 데이터 담는 state
  const keywordRef = useRef(); //검색 키워드 접근용 ref
  const optionRef = useRef(); //검색 옵션 접근용 ref

  useEffect(() => {
    //페이지가 렌더링되면 자동으로 실행되는 hook
    getUserList(0); //회원 정보를 가져온다. 파라미터의 숫자 0은 검색 키워드 활성화/비활성화용
  }, []);

  const getUserList = async (is_searching) => {
    //사용자 리스트 불러오는 함수
    const res = await server_bridge.axios_instace.post('/getuserlist', {
      is_searching: is_searching, //1 : 검색 키워드를 포함하는 모드 / 2 : 검색 키워드를 포함하지 않는 전체 검색 모드
      search_option: optionRef.current.value,
      keyword: keywordRef.current.value,
    });
    setUserList(res.data); //리스트를 state에 담아서 관리
    //console.log(res.data);
    return;
  };
  const reset = () => {
    //검색 결과 / 검색창 리셋
    optionRef.current.value = 'USER_ID';
    keywordRef.current.value = '';
    getUserList(0);
  };
  const move2userdetail = (user_idx) => {
    //사용자 상세 정보 보기로 이동
    navigate('/admin/userdetail', {
      state: { user_idx: user_idx },
    });
  };
  return (
    <div className="userManagement">
      <div className="userTitleContainer">
        <h3 className="userTitle">회원 관리</h3>
        <div>
          <select ref={optionRef}>
            <option value="USER_ID">아이디</option>
            <option value="USER_NAME">이름</option>
            <option value="USER_TEL">연락처</option>
            <option value="USER_MAIL">이메일</option>
          </select>
          <input
            type="text"
            ref={keywordRef}
            placeholder="검색어를 입력해주세요"
          />
          <button onClick={() => getUserList(1)}>검색</button>
          <button onClick={reset}>초기화</button>
        </div>
        <div className="userContainer">
          {typeof user !== 'string' && user.length > 0 ? ( //사용자가 1명 이상일때만 리스트를 활성화
            user.map((data, idx) => (
              <div
                key={idx}
                className="userShow"
                onClick={() => move2userdetail(data.USER_IDX)}
              >
                <ul>
                  <li>{data.USER_NAME}</li>
                  <li>{data.USER_TEL}</li>
                  <li>{data.USER_MAIL}</li>
                </ul>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserManagement;
