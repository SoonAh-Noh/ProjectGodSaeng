import "../../css/user/sub.scss";

const Notice = () => {
  return (
    <div id="Notice" className="subPage">
      <div className="subTop">
        <h1>공지사항</h1>
      </div>

      <div className="section">
        <div className="sub-title"><h2>공지사항</h2></div>

        <div className="noticeWrap">
          <p>총 3개</p>

          <div className="noticeBoard">
            <table border="0" cellPadding="0" cellSpacing="0">
              <colgroup>
                <col width="80px" />
                <col width="60%" />
                <col width="" />
                <col width="" />
              </colgroup>
              <tr>
                <th>No.</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
              <tr>
                <td>1</td>
                <td className="left"><a href="#">제목ㅌㅅㅌㅊ</a></td>
                <td>admin</td>
                <td>2022-11-29</td>
              </tr>
              <tr>
                <td>1</td>
                <td className="left"><a href="#">제목ㅌㅅㅌㅊ</a></td>
                <td>admin</td>
                <td>2022-11-29</td>
              </tr>
            </table>
          </div>

          <div className="noticeSearch">
            <div className="searchCate">
              <select>
                <option>제목</option>
                <option>내용</option>
                <option>제목+내용</option>
              </select>
            </div>
            <input type="text" className="searchTxt" />
            <button type="button" className="searchBtn">검색</button>
          </div>

          <div className="paging">

          </div>
        </div>

      </div>
    </div>
  );
};
export default Notice;
