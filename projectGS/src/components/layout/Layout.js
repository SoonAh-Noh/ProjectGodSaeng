import Header from "./Header";
import Footer from "./Footer";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import StraightIcon from '@mui/icons-material/Straight';
import "../../css/user/basic.css";

const Layout = () => {
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
    <div>
      <header>
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <button type="button" onClick={onScrollTop} className={scrollActive ? 'btn-up fixed' : 'btn-up'}><StraightIcon /></button>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;
