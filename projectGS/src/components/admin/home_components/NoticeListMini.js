import { useNavigate, Link } from 'react-router-dom';
const NoticeListMini = ({ data }) => {
  return (
    <div className="cell-d">
      <div>공지사항 리스트(관리자메인)</div>
      <table border={1}>
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
                  <td>{data.BOARD_IDX}</td>
                  <td>
                    <Link
                      to={'/home/boardview'}
                      state={{
                        board_idx: data.BOARD_IDX,
                      }}
                    >
                      {data.BOARD_TIT}
                    </Link>
                  </td>
                  <td>{data.USER_NAME}</td>
                  <td>{data.BOARD_DATE}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default NoticeListMini;
