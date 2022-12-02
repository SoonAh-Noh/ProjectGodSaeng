import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './css/UserDetail.module.scss';
import UserInfoContainer from './components/UserInfoContainer';
import UserDisposeList from './UserDisposeList';
//import PagedTable from './components/PagedTable';
import * as server_bridege from '../../controller/server_bridge';
const UserDetail = () => {
  const { state } = useLocation(); //state{user_idx:user_idx}
  const [user, setUser] = useState({}); //회원 정보를 관리하고 넘겨주기 위한 위한 state
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
    <div className={styles.udContainer}>
      <div className={styles.ud_item}>
        <UserInfoContainer data={user} />
        {/* 사용자 정보 사용에 활용할 공용 컨테이너 */}
      </div>
      <div className={styles.ud_item}>
        <div>개인 신고 내역</div>
        <UserDisposeList user_idx={state.user_idx} />
      </div>
      <div className={styles.ud_item}>
        <div>포인트 이력</div>
      </div>
    </div>
  );
};
export default UserDetail;
