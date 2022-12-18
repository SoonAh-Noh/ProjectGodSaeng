import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
import { useState, useEffect } from 'react';
import $ from 'jquery';
//==========================================
import { BiChevronDown } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import { CiDollar } from 'react-icons/ci';
import { CiReceipt } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';

import logo from '../../images/logo-w.png';
import '../../css/user/common.scss';
import '../../css/header.css';

const Header = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(false);
  // 로그아웃시 세션 초기화
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    setLogin((prev) => !prev);
    navigate('/');
  };

  const [login, setLogin] = useState(false);
  const name = window.sessionStorage.getItem('USER_NAME');
  useEffect(() => {
    $('.menu > ul > li').on('mouseover', function () {
      $(this).children('.submenu').addClass('on');
    });
    $('.menu > ul > li').on('mouseleave', function () {
      $(this).children('.submenu').removeClass('on');
    });

    // button
    document
      .querySelectorAll('.button')
      .forEach(
        (button) =>
          (button.innerHTML =
            '<div><span>' +
            button.textContent.trim().split('').join('</span><span>') +
            '</span></div>'),
      );

    //mobile
    // $('#togglemenu').on('click', function () {
    // $(this).toggleClass('active');
    // $('.menu').toggleClass('active');
    // $('.login').toggleClass('active');
    // });
  }, [$]);
  const handleToggle = () => {
    setMode(!mode);
  };
  return (
    <div id="Header">
      <div className="logo">
        <a href="/" title="메인으로">
          <img src={logo} alt="안전꽹과리 로고" />
        </a>
      </div>
      {/* <div className="menu"> */}
      <div className={`menu ${mode ? 'active' : ''}`}>
        <ul>
          <li>
            <a>불법주정차 신고</a>
            <ul className="submenu sub1">
              <li>
                <a href="/report">불법주정차 신고</a>
              </li>
              <li>
                <a href="/quickreport">공유킥보드 신고</a>
              </li>
            </ul>
          </li>
          <li>
            <a>불법주정차 안내</a>
            <ul className="submenu sub2">
              <li>
                <a href="/illegalareaguide">주정차 금지 구역</a>
              </li>
              <li>
                <a href="/quickguide">공유킥보드 주차 금지 구역</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/point">포인트 사용</a>
          </li>
          <li>
            <a href="/notice">공지사항</a>
          </li>
        </ul>
      </div>

      {/* 로그인 여부 확인 */}
      {/* <div className="login"> */}

      <div className={`login ${mode ? 'active' : ''}`}>
        {window.sessionStorage.getItem('USER_ID') ? (
          <ul className="mydropmenu ">
            <li className="logOn">
              <a href="/mypage">
                <FaRegUser />
                {name} 님<BiChevronDown />
              </a>
              <ul className="depth_1">
                <li>
                  <a href="/mypage">
                    <CiEdit />
                    회원정보
                  </a>
                </li>
                {/* 
                221213 선우 - 회원정보에 병합되어서 필요 없어졌으므로 삭제
                <li>
                  <a href="/ManagementP">
                    <CiDollar />
                    포인트 관리
                  </a>
                </li> */}
                <li>
                  <a href="/myreport">
                    <CiReceipt />
                    신고현황
                  </a>
                </li>
                <li>
                  <a onClick={logout}>
                    <CiLogout />
                    로그아웃
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <a href="/login">로그인</a>
            </li>
            <li>
              <a href="/join">회원가입</a>
            </li>
          </ul>
        )}
      </div>

      <button
        type="button"
        id="togglemenu"
        className={`ham visible-lg ${mode ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </button>
    </div>
  );
};
export default Header;
