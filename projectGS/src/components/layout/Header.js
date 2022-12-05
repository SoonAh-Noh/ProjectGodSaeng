import { Outlet, Link, useNavigate } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
import { useState, useEffect } from 'react';
import $ from 'jquery';

import logo from '../../images/logo-w.png';
import '../../css/user/common.scss';

const Header = () => {
  const navigate = useNavigate();

  // 로그아웃시 세션 초기화
  const logout = () => {
    window.sessionStorage.clear();
    console.log('세션초기화');

    setLogin((prev) => !prev);
    navigate('/');
  };

  const [login, setLogin] = useState(false);

  // const onMouse = (e) => {
  //   e.target.nextElementSibling.classList.add('on');
  //   // e.target.classList.add('on');
  // };

  // const leaveMouse = (e) => {
  //   e.target.classList.remove('on');
  // };
  useEffect(() => {
    $('.menu > ul > li').mouseover(function () {
      $(this).children('.submenu').addClass('on');
    });
    $('.menu > ul > li').mouseleave(function () {
      $(this).children('.submenu').removeClass('on');
    });
  }, []);

  return (
    <div id="Header">
      <div className="logo">
        <a href="/" title="메인으로">
          <img src={logo} alt="안전꽹과리 로고" />
        </a>
      </div>
      <div className="menu">
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
      <div className="login">
        {window.sessionStorage.getItem('USER_ID') ? (
          <ul className="logOn">
            <li>
              <a onClick={logout}>로그아웃</a>
            </li>
            <li>
              <a href="/mypage" className="goMyPage">
                마이페이지
              </a>
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
    </div>
  );
};
export default Header;
