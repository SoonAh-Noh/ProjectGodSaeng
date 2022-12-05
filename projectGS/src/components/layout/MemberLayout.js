import Header from "./Header";
import Footer from "./Footer";
import { Outlet, Link, useNavigate } from "react-router-dom";


import StraightIcon from '@mui/icons-material/Straight';
import "../../css/user/basic.css"
import "../../css/user/member.scss"
import { useEffect, useState } from "react";

const MemberLayout = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  // 스크롤 이벤트
  const onScroll = (e) => {
    if (scrollY > 300) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }

    // console.log('스크롤',window.pageYOffset);
  };

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', onScroll);
    };
    scrollListener();

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  });

  const onScrollTop = () => {
      window.scrollTo({
          top:0,
          behavior:"smooth"
      });
      setScrollY(0);
      // setScrollActive(false);
  }

  return (
    <div className="memberMain">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <button type="button" onClick={onScrollTop} className={scrollActive ? 'btn-up fixed' : 'btn-up'}><StraightIcon /></button>
      <footer className="memberFoot">
        <Footer />
      </footer>
    </div>
  );
};
export default MemberLayout;
