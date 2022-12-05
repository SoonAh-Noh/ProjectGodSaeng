import { useNavigate, Link } from 'react-router-dom';
const NoticeListMini = ({ data }) => {
  return (
    <div className="cell-d">
      <div className="mainTitle"><h4>공지사항 리스트</h4></div>
      
      <table className="adminTable" border="0" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((data, key) => {
              return (
                <tr key={key}>
                  <td align="center">{data.BOARD_IDX}</td>
                  <td>
                    <Link
                      to={'/admin/boardview'}
                      state={{
                        board_idx: data.BOARD_IDX,
                      }}
                    >
                      {data.BOARD_TIT}
                    </Link>
                  </td>
                  <td align="center">{data.USER_NAME}</td>
                  <td align="center">{data.BOARD_DATE}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default NoticeListMini;
