import React, { useEffect, useState } from 'react';
// import '../../css/sidebar.css';
import FaceIcon from '@mui/icons-material/Face';
import LaunchIcon from '@mui/icons-material/Launch';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import MoneyIcon from '@mui/icons-material/Money';
// import SettingsIcon from "@mui/icons-material/Settings";
import CampaignIcon from '@mui/icons-material/Campaign';
import HouseIcon from '@mui/icons-material/House';

import { Outlet } from 'react-router-dom';
import TopBar from '../not_using/TopBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import $ from 'jquery';

import '../../../css/admin/common.scss';

const Sidebar = () => {
  const navigate = useNavigate();

  const [menuOn, setMenuOn] = useState('main');
  const storageItems = window.sessionStorage.getItem('menu');
  useEffect(() => {
    $('.sidebarListItem button')
      .not('li.userSiteGo button')
      .click(function () {
        $('.sidebarListItem').not(this.parent).removeClass('on');
        $(this).parent('li').addClass('on');
      });
  }, []);

  return (
    <div id="SideBar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList userSite">
            <li className="sidebarListItem userSiteGo">
              <button
                onClick={() => {
                  window.open('/');
                }}
              >
                <LaunchIcon />
                사이트 바로가기
              </button>
            </li>
          </ul>

          <ul className="sidebarList adminSite">
            <li
              className={
                'sidebarListItem ' +
                (storageItems === null || storageItems === 'main' ? ' on ' : '')
              }
              id="main"
            >
              <button
                onClick={() => {
                  navigate('/admin');
                  window.sessionStorage.setItem('menu', 'main');
                }}
              >
                <HouseIcon />
                메인페이지
              </button>
            </li>
            <li
              className={
                'sidebarListItem ' + (storageItems === 'info' ? ' on ' : '')
              }
              id="info"
            >
              <button
                onClick={() => {
                  navigate('/admin/admininfo');
                  window.sessionStorage.setItem('menu', 'info');
                }}
              >
                <FaceIcon />
                관리자 정보{' '}
              </button>
            </li>
          </ul>

          <ul className="sidebarList">
            <li
              className={
                'sidebarListItem ' + (storageItems === 'board' ? ' on ' : '')
              }
              id="board"
            >
              <button
                onClick={() => {
                  navigate('/admin/boardmanage');
                  window.sessionStorage.setItem('menu', 'board');
                }}
              >
                <CampaignIcon />
                공지사항 관리
              </button>
            </li>

            <li
              className={
                'sidebarListItem ' + (storageItems === 'report' ? ' on ' : '')
              }
              id="report"
            >
              <button
                onClick={() => {
                  navigate('/admin/disposereport');
                  window.sessionStorage.setItem('menu', 'report');
                }}
              >
                <InventoryIcon />
                신고 처리
              </button>
            </li>

            <li
              className={
                'sidebarListItem ' + (storageItems === 'user' ? ' on ' : '')
              }
              id="user"
            >
              <button
                onClick={() => {
                  navigate('/admin/usermanage');
                  window.sessionStorage.setItem('menu', 'user');
                }}
              >
                <ContactPageIcon />
                회원 관리
              </button>
            </li>
            {/* 2212022 선우 추가 */}

            <li
              className={
                'sidebarListItem ' + (storageItems === 'goods' ? ' on ' : '')
              }
              id="goods"
            >
              <button
                onClick={() => {
                  navigate('/admin/goodsmanage');
                  window.sessionStorage.setItem('menu', 'goods');
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
