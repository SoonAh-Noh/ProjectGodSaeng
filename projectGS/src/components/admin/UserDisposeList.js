import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Page from '../admin/components/Page';
import * as server_bridge from '../../controller/server_bridge';
const UserDisposeList = ({ user_idx }) => {
  useEffect(() => {
    handleReportList();
  }, []);
  const [process, setProcess] = useState([
    //신고 절차 리스트(DB에서 가져온 PROCESS)
    { NOTIFY_PNUM: 0, NOTIFY_STATUS: '' },
  ]);
  const [body, setBody] = useState([]);
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 5; //한 페이지에 보여줄 게시글 갯수
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  const navigate = useNavigate(); //페이지 이동용 네비게이터
  const setCurrentPage = (e) => {
    //페이징 처리용 함수
    setPage(e);
  };
  const handleReportList = async () => {
    const res = await server_bridge.axios_instace.post(
      //선택한 검색 범위에 따른 신고 결과 가져오기
      '/getDisposeListByuser',
      {
        user_idx: user_idx,
      },
    );
    //console.log(res.data);
    //console.log(typeof res.data);
    setBody(res.data);
    //console.log(res.data);
    //console.log(res.data);
    setCnt(res.data.length);

    const proc = await server_bridge.axios_instace.get('/get_process_list');
    setProcess(proc.data);
  };
  return (
    <>
      <div className="noticeBoard">
        <table border="0" cellPadding="0" cellSpacing="0">
          <colgroup>
            <col width="80px" />
            <col width="60%" />
            <col width="" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>카테고리</th>
              <th>신고일시</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
            {typeof body !== 'string' && body.length > 0 ? (
              body
                .slice(page * itemcount - itemcount, page * itemcount)
                .map((data, key) => (
                  //disport.map((val, key) => (
                  //<DisposeDetail val={val} key={key} process={process} />

                  <tr
                    key={key}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      navigate('/admin/disposedetail', {
                        state: { data: data, process: process },
                      })
                    }
                  >
                    <td>{data.NOTIFY_IDX}</td>
                    <td>{data.CATEGORY}</td>
                    <td>{data.NOTIFY_DATE}</td>
                    <td>{data.NOTIFY_STATUS}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={4}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="paging">
        {typeof body !== 'string' && (
          <Page //페이지네이션 객체(component/admin/Page.js)
            page={page} //현재 페이지
            totalcnt={totalcnt} //총 게시글 갯수
            setPage={setCurrentPage} //페이징 처리함수
            itemcount={itemcount} //한 페이지에 몇개를 보여줄건지를 뜻함
          />
        )}
      </div>
    </>
  );
};
export default UserDisposeList;
