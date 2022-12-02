import FaceIcon from '@mui/icons-material/Face';
import LaunchIcon from '@mui/icons-material/Launch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CampaignIcon from '@mui/icons-material/Campaign';
import HouseIcon from '@mui/icons-material/House';
import LogoutIcon from '@mui/icons-material/Logout';
import MoneyIcon from '@mui/icons-material/Money';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from '../css/AdminLayout.module.scss';
const AdminLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    window.location.href = '/admin';
  };
  return (
    <div>
      <header className={styles.menu}>
        <div>
          {window.sessionStorage.getItem('USER_ID') !== null ? (
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
          )}
        </div>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <button
              onClick={() => {
                window.open('/');
              }}
            >
              <LaunchIcon />
              사이트 바로가기
            </button>
          </li>
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/admin');
              }}
            >
              <HouseIcon />
              메인페이지
            </button>
          </li>
          {/* <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/home/admininfo');
              }}
            >
              <FaceIcon />내 정보(미완)
            </button>
          </li> */}

          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/admin/boardmanage');
              }}
            >
              <CampaignIcon />
              공지사항
            </button>
          </li>
        </ul>
        {/* <h3 className="sidebarTitle"></h3> */}
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/admin/disposereport');
              }}
            >
              <InventoryIcon />
              신고 처리
            </button>
          </li>
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/admin/usermanage');
              }}
            >
              <ContactPageIcon />
              회원 관리(미완)
            </button>
          </li>
          <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/admin/goodsmanage');
              }}
            >
              <MoneyIcon />
              상품권 관리
            </button>
          </li>
          {/* <li className="sidebarListItem">
            <button
              onClick={() => {
                navigate('/admin/boardmanage');
              }}
            >
              <ContentPasteIcon />
              게시판 관리
            </button>
          </li> */}
          {/* <li className="sidebarListItem">
                  <button>
                    <SettingsIcon />
                    환경 설정
                  </button>
                </li> */}
        </ul>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
export default AdminLayout;
