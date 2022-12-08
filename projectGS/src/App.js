/* 221115 선우 - 공용 및 메인페이지 레이아웃 관련 */
import GlobalStyles from './components/common/GlobalStyles';
import NotFound from './components/common/NotFound';
import Layout from './components/layout/Layout';
import SubLayout from './components/layout/SubLayout';
import MemberLayout from './components/layout/MemberLayout';
import Main from './components/Main';

/* 221115 선우 - 사용자용 페이지 관련 */
import Join from './components/user/Join';
import MyPage from './components/user/MyPage';
import Report from './components/user/Report';
import QuickReport from './components/user/QuickReport';
import ReportEnd from './components/user/ReportEnd';
import IllegalAreaGuide from './components/user/IllegalAreaGuide';
import QuickGuide from './components/user/QuickGuide';
import Notice from './components/user/Notice';
import NoticeView from './components/user/NoticeView';
import Point from './components/user/Point';
import UserReportList from './components/user/UserReportList'; // 221130 선우 - 사용자 신고내역
import UserReportView from './components/user/UserReportView'; // 221130 선우 -  사용자 신고 상세
import MyPoint from './components/user/MyPoint';
import Forgot from './components/user/Forgot';

/* 221116 순아 사용자용 페이지 추가*/
import Login from './components/user/Login';
import PointItem from './components/user/PointItem';
import PointOrder from './components/user/PointOrder';
import PointPay from './components/user/PointPay';

/* 221115 선우 - 관리자용 페이지 관련 */
//import AdminMain from './components/admin/AdminMain';
//import AdminLogin from './components/admin/AdminLogin';
import BoardManagement from './components/admin/BoardManagement';
import DisposeReport from './components/admin/DisposeReport';
import UserManagement from './components/admin/UserManagement';
import BoardWrite from './components/admin/BoardWrite';
import BoardView from './components/admin/BoardView';
import DisposeDetail from './components/admin/DisposeDetail';
import UserDetail from './components/admin/UserDetail';
import AdminLayout from './components/admin/components/AdminLayout';
import GoodsManagement from './components/admin/GoodsManagement';
import GoodsView from './components/admin/GoodsView';

/* 221116 순아 관리자용 페이지 추가*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Sidebar from './components/admin/Sidebar';
import Home from './components/admin/Home';
import AdminInformation from './components/admin/AdminInformation';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          {/* ===================== 여기가 사용자단 ===================================*/}
          {/* 메인 레이아웃 */}
          <Route element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
          {/* 서브 레이아웃 */}
          <Route element={<SubLayout />}>
            <Route path="/report" element={<Report />} />{' '}
            {/* 불법주정차 신고페이지 */}
            <Route path="/quickreport" element={<QuickReport />} />{' '}
            {/* 공유퀵보드 신고페이지 */}
            <Route path="/reportend" element={<ReportEnd />} />{' '}
            {/* 신고완료페이지 */}
            <Route
              path="/illegalareaguide"
              element={<IllegalAreaGuide />}
            />{' '}
            {/* 불법주정차 구역안내 */}
            <Route path="/quickguide" element={<QuickGuide />} />{' '}
            {/* 공유킥보드 주차금지 구역안내 */}
            <Route path="/notice" element={<Notice />} />{' '}
            {/* 공지사항 리스트 */}
            <Route path="/noticeview" element={<NoticeView />} />{' '}
            {/* 공지사항 뷰 */}
            <Route path="/point" element={<Point />} /> {/* 포인트 메인 */}
            <Route path="/pointitem" element={<PointItem />} />
            {/* 포인트 리스트 */}
            <Route path="/pointorder" element={<PointOrder />} />
            {/* 포인트 주문하기 */}
            <Route path="/pointpay" element={<PointPay />} />
            {/* 포인트 주문하기 */}
          </Route>
          {/* 회원 레이아웃 */}
          <Route element={<MemberLayout />}>
            <Route path="/login" element={<Login />} /> {/* 로그인 */}
            <Route path="/join" element={<Join />} /> {/* 회원가입 */}
            <Route path="/mypage" element={<MyPage />} /> {/* 마이페이지 */}
            <Route path="/Forgot" element={<Forgot />} /> {/* 비밀번호 찾기 */}
            <Route path="/myreport" element={<UserReportList />} />
            {/* 221130 선우 - 내 신고내역 */}
            <Route path="/myreportview" element={<UserReportView />} />
            {/* 221130 선우 - 내 신고내역 상세 */}
            <Route path="/mypoint" element={<MyPoint />} />
            {/* 221201 선우 - 내 포인트 조회 */}
          </Route>
          {/* ===================== 여기가 관리자단 ===================================*/}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/home/adminmain" element={<AdminMain />} /> */}
            {/* 관리자 - 메인 */}
            {/* <Route path="/home/adminlogin" element={<AdminLogin />} /> */}
            {/* 관리자 - 로그인 */}
            <Route path="/admin/admininfo" element={<AdminInformation />} />
            {/* 관리자 - 내정보 */}
            <Route path="/admin/boardmanage" element={<BoardManagement />} />
            {/* 관리자 - 게시판 관리 */}
            <Route path="/admin/disposereport" element={<DisposeReport />} />
            {/* 관리자 - 신고 처리 */}
            <Route path="/admin/disposedetail" element={<DisposeDetail />} />
            {/* 관리자 - 신고 처리 상세 */}
            <Route path="/admin/usermanage" element={<UserManagement />} />
            {/* 관리자 - 회원관리 */}
            <Route path="/admin/userdetail" element={<UserDetail />} />
            {/* 관리자 - 회원 정보 상세 */}
            <Route path="/admin/writenoti" element={<BoardWrite />} />
            {/* 관리자 - 게시판 작성 */}
            <Route path="/admin/boardview" element={<BoardView />} />
            {/* 관리자 - 게시판 내용 보기 */}
            <Route path="/admin/goodsmanage" element={<GoodsManagement />} />
            {/* 관리자 - 상품권관리 */}
            <Route path="/admin/goodsview" element={<GoodsView />} />
            {/* 관리자 - 상품권상세 */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
