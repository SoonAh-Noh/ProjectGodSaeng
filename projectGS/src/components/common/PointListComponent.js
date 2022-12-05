import { useState, useEffect } from 'react';
import * as server_bridge from '../../controller/server_bridge';
import Page from '../../components/admin/components/Page';

const PointListComponent = ({ user_id }) => {
  const [list, setPointList] = useState([]);
  const [point, setTotalPoint] = useState(0);
  const [pointrecord, setPointRecord] = useState([]);
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 5; //한 페이지에 보여줄 게시글 갯수
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  useEffect(() => {
    getList();
  }, []);
  const setCurrentPage = (e) => {
    //페이징 처리용 함수
    setPage(e);
  };
  const getList = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    calculatePoint(response.data);
    setPointList(response.data);
    setCnt(response.data.length);
  };
  const calculatePoint = (data) => {
    let p = 0;
    let record_arr = [];

    for (let i = data.length - 1; i >= 0; i--) {
      p += parseInt(data[i].POINT_PLUS) - parseInt(data[i].POINT_MINUS);
      record_arr.push(p);
    }

    setPointRecord(record_arr.reverse());
    setTotalPoint(p);
  };
  return (
    <div>
      <div> 사용 가능한 포인트 {point} point</div>

      <div>
        <div>전체 point 내역 {list.length} 건</div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>구분</th>
              <th>Point</th>
              <th>Point 잔액</th>
              <th>날짜</th>
              <th>내역</th>
            </tr>
          </thead>
          <tbody>
            {typeof list !== 'string' && list.length > 0 ? (
              list.map((data, idx) => (
                <tr key={idx}>
                  <td>{data.POINT_IDX}</td>
                  <td>{parseInt(data.POINT_PLUS) === 0 ? '차감' : '적립'}</td>
                  <td>
                    {parseInt(data.POINT_PLUS) === 0
                      ? '-' + data.POINT_MINUS
                      : data.POINT_PLUS}
                  </td>
                  <td>{pointrecord[idx]}</td>
                  <td>{data.POINT_DATE}</td>
                  <td>
                    {data.POINT_CHANGE +
                      (data.NOTIFY_IDX !== null
                        ? ` - 신고번호 [${data.NOTIFY_IDX}]`
                        : '')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>적립된 포인트가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <div>
          {typeof list !== 'string' && (
            <Page //페이지네이션 객체(component/admin/Page.js)
              page={page} //현재 페이지
              totalcnt={totalcnt} //총 게시글 갯수
              setPage={setCurrentPage} //페이징 처리함수
              itemcount={itemcount} //한 페이지에 몇개를 보여줄건지를 뜻함
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default PointListComponent;
