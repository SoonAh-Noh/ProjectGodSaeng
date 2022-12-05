import FaceIcon from '@mui/icons-material/Face';
import LaunchIcon from '@mui/icons-material/Launch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CampaignIcon from '@mui/icons-material/Campaign';
import HouseIcon from '@mui/icons-material/House';
import LogoutIcon from '@mui/icons-material/Logout';
import MoneyIcon from '@mui/icons-material/Money';

import AdminLogin from '../AdminLogin';
import Sidebar from './Sidebar';

import { Outlet, useNavigate } from 'react-router-dom';

import styles from '../css/AdminLayout.module.scss';
import "../../../css/admin/sub.scss";


const AdminLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    window.location.href = '/admin';
  };
  return (
    <div id="Admin">
      {window.sessionStorage.getItem('USER_ID') == 'admin'? (
        <div>
          <header>
              <h1>안전꽹과리 관리자 페이지</h1>
              <button onClick={logout}>
                <LogoutIcon />
                로그아웃
              </button>
              {/*window.sessionStorage.getItem('USER_ID') !== null ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/admin/admininfo');
                    }}
                  >
                    <FaceIcon />내 정보
                  </button>
                  <button onClick={logout}>
                    <LogoutIcon />
                    로그아웃
                  </button>
                </>
              ) : (
                ''
              )*/}
          </header>
          
          <Sidebar />
          <main id="AdminLayout" className={styles.main}>
            <Outlet />
          </main>
        </div>
      ) : (
        <div>
          <AdminLogin />
        </div>
      )}
    </div> 
  );
};
export default AdminLayout;
