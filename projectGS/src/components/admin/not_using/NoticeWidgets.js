import React from "react";
import "../../css/noticeWidgets.css";

export default function NoticeWidgets() {
  return (
    <div className="noticeWidgets">
      <div className="noticeTitle">공지사항</div>
      <table className="noticeTable">
        <tr className="noticeTr">
          <th className="noticeNum">No</th>
          <th className="noticeHeading">제목</th>
          <th className="noticeWriter">작성자</th>
          <th className="noticeDate">작성일</th>
        </tr>
        <tr className="noticeTr">
          <td className="noticeNum">1</td>
          <td className="noticeHeading">전동 킥보드 안전 수칙</td>
          <td className="noticeWriter">관리자</td>
          <td className="noticeDate">2022.05.12</td>
        </tr>
        <tr className="noticeTr">
          <td className="noticeNum">2</td>
          <td className="noticeHeading">주정차 단속 근거 법률</td>
          <td className="noticeWriter">관리자</td>
          <td className="noticeDate">2022.05.01</td>
        </tr>
        <tr className="noticeTr">
          <td className="noticeNum">3</td>
          <td className="noticeHeading">단속시간 및 탄력적 주차허용 공간</td>
          <td className="noticeWriter">관리자</td>
          <td className="noticeDate">2022.04.27</td>
        </tr>
      </table>
    </div>
  );
}
