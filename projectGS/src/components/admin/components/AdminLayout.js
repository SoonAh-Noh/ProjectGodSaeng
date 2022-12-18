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
import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import styles from '../css/AdminLayout.module.scss';
import '../../../css/admin/sub.scss';
//import Backgroundworker from '../../../controller/Backgroundworker.js';

const AdminLayout = () => {
  const navigate = useNavigate();
  //let socket = '';
  const [txt, setTxt] = useState('');
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    window.location.href = '/admin';
  };

  let socket = io('http://localhost:5000', {
    //소켓통신(실시간 양방향 통신)
    transports: ['websocket'],
  });

  useEffect(() => {
    console.log(socket.connected);
    if (!socket.connected) {
      console.log('소켓 연결됨!!');
      socket.connect(); // 소켓연결
      socket.on('response', function (msg) {
        //대기하다가 response로 데이터가 날라오면(신고접수되면) 반응
        console.log(msg);
        setTxt('새로운 신고가 들어왔습니다!');
      });
    }
  }, []);
  const handleClose = () => {
    document.getElementById('popUp').classList.add('off');
    setTxt('');
  };

  return (
    <div id="Admin">
      {window.sessionStorage.getItem('ADMIN_OX') == 'O' ? (
        <div>
          <header>
            <h1>안전꽹과리 관리자 페이지</h1>
            <button onClick={logout}>
              <i className="xi-log-out"></i>
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

          <div id="popUp" className={txt !== '' ? 'on' : 'off'}>
            <button type="button" className="close" onClick={handleClose}>
              <i className="xi-close"></i>
            </button>
            <div className="popupTxt">
              <iframe
                src="https://giphy.com/embed/HZvKgdDvta65uAyg0r"
                width="60"
                height="60"
                frameBorder="0"
                class="giphy-embed"
                allowFullScreen
              ></iframe>
              <p>{txt}</p>
            </div>
          </div>
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
