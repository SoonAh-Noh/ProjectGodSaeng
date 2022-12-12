import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';

const MyPage = () => {
  const name = window.sessionStorage.getItem('USER_NAME');

  const handleInfo = () => {
    navigate('/myinfo');
  };

  // 1000단위 컴마
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  // 포인트 가져오기 위한 작업
  const navigate = useNavigate();
  useEffect(() => {
    havePoint();
  }, []);

  const user_id = window.sessionStorage.getItem('USER_ID');

  const [point, setPoint] = useState([]);
  const havePoint = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    const point_list = response.data;

    let temp = 0;
    point_list.forEach((item) => {
      console.log('나옴', item);
      temp += parseInt(item.POINT_PLUS) - parseInt(item.POINT_MINUS);
    });
    setPoint(temp);
  };

  return (
    <div id="MyPage">
      <div className="memberSection">
        <div className="sub-title">
          <h2>마이페이지</h2>
          <div className="input-box">
            <label>이름</label>
            <input
              className="mypage_name"
              type="text"
              size="20"
              defaultValue={name}
              placeholder=" "
            />
          </div>
          <div className="input-box">
            <label>보유 포인트</label>
            <input
              className="mypage_point"
              type="text"
              size="20"
              defaultValue={addComma(point)}
              placeholder=" "
            />
          </div>
          <div className="input-box">
            <label>신고 건수</label>
            <input
              className="mypage_report"
              type="text"
              size="20"
              defaultValue={'건수'}
              placeholder=" "
            />
          </div>
          <button onClick={handleInfo}>회원정보 수정</button>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
