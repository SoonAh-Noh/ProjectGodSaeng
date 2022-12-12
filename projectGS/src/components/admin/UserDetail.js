import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// import styles from './css/UserDetail.module.scss';
import UserInfoContainer from './components/UserInfoContainer';
import UserDisposeList from './UserDisposeList';
import PointListComponent from '../common/PointListComponent';
//import PagedTable from './components/PagedTable';
import * as server_bridege from '../../controller/server_bridge';

const UserDetail = () => {
  const { state } = useLocation(); //state{user_idx:user_idx}
  const [user, setUser] = useState({}); //회원 정보를 관리하고 넘겨주기 위한 위한 state
   const navigate = useNavigate();

  useEffect(() => {
    //페이지가 렌더링될때마다 실행되는 hook
    getUserData();
  }, []);
  
  const getUserData = async () => {
    //사용자 정보를 받아온다.
    const res = await server_bridege.axios_instace.post('/getuserinfo', {
      user_idx: state.user_idx,
    });
    //console.log(res.data[0]);
    setUser(res.data[0]);
  };
  return (
    <div className="Contents">
      <div className="adminTitle flexBetween">
        <h3>회원 상세</h3>
        <button type="button" className="adminBtn btnUndo" onClick={()=>{navigate('/admin/usermanage')}}>목록으로</button>
      </div>

      <div className="userLayout">
        <div className="userInfo">
          <div className="pageWrap">
            <div className="subTitle"><h4>회원 정보</h4></div>
            <UserInfoContainer data={user} />
          </div>
        </div>

        <div className="userReport">
          <div className="pageWrap subPageWrap">
            <div className="subTitle"><h4>신고 내역</h4></div>
            <UserDisposeList user_idx={state.user_idx} />
          </div>
        </div>

        <div className="userPoint">
          <div className="pageWrap subPageWrap">
            <div className="subTitle"><h4>포인트 이력</h4></div>
            <PointListComponent user_id={state.user_id} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
