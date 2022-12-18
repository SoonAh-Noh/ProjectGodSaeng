// 마이페이지 - 포인트 관리
import { useState, useEffect } from 'react';
import * as server_bridge from '../../controller/server_bridge';
import Page from '../../components/admin/components/Page';
import { SlArrowLeft } from 'react-icons/sl';
import '../../css/user/ManagementP.scss';

const ManagementP = () => {
  const [list, setPointList] = useState([]);
  const [point, setTotalPoint] = useState(0);
  const [pointrecord, setPointRecord] = useState([]);
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 5; //한 페이지에 보여줄 게시글 갯수
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  const user_id = window.sessionStorage.getItem('USER_ID');
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

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  return (
    <div id="Notice" className="subPage">
      {/* <div className="subTop"> 
      <div>
        <h1>포인트 관리</h1>
      </div>*/}
      <div className="managementP">
        {/* 내용 1 - Head */}
        {/* <div className="miniTitle">
          <a>마이페이지</a>
          <SlArrowLeft />
          <a>포인트 관리</a>
        </div> */}
        <div className="pointTitle">
          <h2>현재 회원님의 포인트</h2>
        </div>
        {/* 내용 2 */}
        <div className="pointSubTitle">
          <h3>• 포인트 총 잔액: {addComma(point)}p</h3>
        </div>
        {/* 내용 3 - 목록 리스트 */}
        <div className="topList">
          <table border="0" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>NO</th>
                <th>일시</th>
                <th>신고유형</th>
                <th>적립</th>
                <th>사용</th>
                <th>포인트 잔액</th>
              </tr>
            </thead>
            <tbody>
              {typeof list !== 'string' && list.length > 0 ? (
                list
                  .slice(page * itemcount - itemcount, page * itemcount)
                  .map((data, idx) => (
                    <tr>
                      <td align="center">{parseInt(data.POINT_NO + 1)}</td>
                      <td>{data.POINT_DATE}</td>
                      <td>
                        {data.POINT_CHANGE +
                          (data.NOTIFY_IDX !== null
                            ? ` - 신고번호 [${data.NOTIFY_IDX}]`
                            : '')}
                      </td>
                      <td className="point_tdcss">
                        {parseInt(data.POINT_PLUS) === 0
                          ? ''
                          : '+ ' + addComma(data.POINT_PLUS) + '🪙'}
                      </td>
                      <td className="point_tdcss">
                        {parseInt(data.POINT_PLUS) !== 0
                          ? ''
                          : '- ' + addComma(data.POINT_MINUS) + '🪙'}
                      </td>
                      <td className="point_tdcss">
                        {addComma(pointrecord[idx]) + '🪙'}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="noSearch">
                      <p>적립된 포인트가 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
        {/* 안내사항 */}
        <div className="pointInfo">
          <span>
            • 잔여 포인트: 사용가능한 포인트로 사용방법은 💰5,000p이상시 사용
            가능합니다.
          </span>
          <br />
          <span>
            • 소멸예정 포인트: 소멸되기 2개월 전에 안내되며 소멸예정월 1일에
            소멸됩니다.
          </span>
        </div>
      </div>
    </div>
  );
};
export default ManagementP;
