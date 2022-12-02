import React from 'react';
import '../../css/sidebar.css';
import FaceIcon from '@mui/icons-material/Face';
import LaunchIcon from '@mui/icons-material/Launch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import SettingsIcon from "@mui/icons-material/Settings";
import CampaignIcon from '@mui/icons-material/Campaign';

import { Outlet } from 'react-router-dom';
import TopBar from '../not_using/TopBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopBar />
      <div className="sidebar">
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Dashboard1</h3>
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
                      navigate('/home/admininfo');
                    }}
                  >
                    <FaceIcon />내 정보
                  </button>
                </li>

                <li className="sidebarListItem">
                  <button
                    onClick={() => {
                      navigate('/home/noticecomponent');
                    }}
                  >
                    <CampaignIcon />
                    공지사항
                  </button>
                </li>
              </ul>
              <h3 className="sidebarTitle">Dashboard2</h3>
              <ul className="sidebarList">
                <li className="sidebarListItem">
                  <button
                    onClick={() => {
                      navigate('/home/disposereport');
                    }}
                  >
                    <InventoryIcon />
                    신고 처리
                  </button>
                </li>
                <li className="sidebarListItem">
                  <button
                    onClick={() => {
                      navigate('/home/usermanage');
                    }}
                  >
                    <ContactPageIcon />
                    회원 관리
                  </button>
                </li>
                <li className="sidebarListItem">
                  <button
                    onClick={() => {
                      navigate('/home/boardmanage');
                    }}
                  >
                    <ContentPasteIcon />
                    게시판 관리
                  </button>
                </li>
                <li className="sidebarListItem">
                  <button
                    onClick={() => {
                      navigate('/home/boardmanage');
                    }}
                  >
                    <ContentPasteIcon />
                    게시판 관리
                  </button>
                </li>
                {/* <li className="sidebarListItem">
                  <button>
                    <SettingsIcon />
                    환경 설정
                  </button>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
