import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../css/userManagement.css';
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
  const move2userdetail = (user_idx, user_id) => {
    //사용자 상세 정보 보기로 이동
    navigate('/admin/userdetail', {
      state: { user_idx: user_idx, user_id: user_id },
    });
  };
  return (
    <div className="userManagement Contents">
      <div className="adminTitle"><h3>회원 관리</h3></div>

      <div className="pageWrap subPageWrap adminSearchBar">
        <div className="subTitle subTitle2">
          <h3>회원 검색</h3>
        </div>

        <div className="flexBetween">
          <div className="searchWrap">
            <div className="searchCate">
              <select ref={optionRef}>
                <option value="USER_ID">아이디</option>
                <option value="USER_NAME">이름</option>
                <option value="USER_TEL">연락처</option>
                <option value="USER_MAIL">이메일</option>
              </select>
            </div>
            <input type="text" ref={keywordRef} className="searchTxt" />
          </div>

          <div className="adminBtnWrap2">
            <button onClick={() => getUserList(1)} className="adminBtn adminBtn2 searchBtn">검색</button>
            
            <button onClick={reset} className="adminBtn btnUndo" title="검색 초기화">초기화</button>
          </div>
        </div>
      </div>
      <div className="userTitleContainer pageWrap">
        <div className="subTitle subTitleFlex">
          <h3>회원 리스트</h3>
          <div className="totalNumber">
            <p>총 {user.length}건</p>
          </div>
         </div>
        
        <div className="userContainer">
          {typeof user !== 'string' && user.length > 0 ? ( //사용자가 1명 이상일때만 리스트를 활성화
            user.map((data, idx) => (
              <div className="userBox">
                <div
                  key={idx}
                  className="userShow"
                  onClick={() => move2userdetail(data.USER_IDX, data.USER_ID)}
                >
                  <ul>
                    <li className="userName">&nbsp;{data.USER_NAME}</li>
                    <li className="userTel">&nbsp;{data.USER_TEL}</li>
                    <li className="userMail">&nbsp;{data.USER_MAIL}</li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="noSearch noSearch2"><p>검색결과가 없습니다.</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserManagement;
