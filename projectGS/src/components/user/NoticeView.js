import "../../css/user/sub.scss";

const Notice = () => {
  return (
    <div id="Notice" className="subPage">
      <div className="subTop">
        <h1>공지사항</h1>
      </div>

      <div className="section">
        <div className="sub-title"><h2>공지사항</h2></div>

        <div className="noticeView">
            <div className="title"><h3>공지사항제목제목제목</h3></div>
            <div className="info">
                <ul>
                    <li>날짜</li>
                    <li>작성자</li>
                    <li>file</li>
                </ul>
            </div>
            <div className="contents">
                공지사항 내용내용
            </div>
            <div className="btn-wrap">
                <button type="button" className="btn btn-navy">목록으로</button>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Notice;
