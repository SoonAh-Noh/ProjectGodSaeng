import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Page from '../admin/components/Page';
import * as server_bridge from '../../controller/server_bridge';
const UserReportList = () => {
  const header = ['No', '카테고리', '신고일시', '처리상태'];
  const [body, setBody] = useState([]);
  const [category, setCategory] = useState([{ CATEGORY_IDX: 0, CATEGORY: '' }]); //신고 분류 리스트(DB에서 가져온 CATEGORy)
  const [process, setProcess] = useState([
    //신고 절차 리스트(DB에서 가져온 PROCESS)
    { NOTIFY_PNUM: 0, NOTIFY_STATUS: '' },
  ]);
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 5; //한 페이지에 보여줄 게시글 갯수
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  const navigate = useNavigate(); //페이지 이동용 네비게이터
  //const [disport, setList] = useState([]); //신고 리스트
  const checkRefs = useRef([]); //체크박스 리스트 ref
  const start_dateRef = useRef(); //검색할 시작날짜 ref
  const end_dateRef = useRef(); //검색할 마지막 날짜 ref
  const categoryRef = useRef(); //카테고리 ref
  useEffect(() => {
    getComponentData();
    handleReportList();
  }, []);
  const addToRefs = (e) => {
    //페이지가 로드될때마다 ref를 집어넣기 때문에 프로세스의 길이보다 길어지기 전까지만 넣게한다.
    if (checkRefs.current.length < process.length) checkRefs.current.push(e);
  };
  const getComponentData = async () => {
    //컴포넌트 생성용 리스트 받아오기
    const cate = await server_bridge.axios_instace.get('/get_cate_list');
    const proc = await server_bridge.axios_instace.get('/get_process_list');
    setCategory(cate.data);
    setProcess(proc.data);
  };
  const setCurrentPage = (e) => {
    //페이징 처리용 함수
    setPage(e);
  };
  const handleReportList = async () => {
    let proc_arr = [];
    checkRefs.current.map((checkbox, key) => {
      if (checkbox.checked) proc_arr.push(parseInt(checkbox.value));
      return '';
    });

    //여기서 날짜 값을 가져온다.
    const start_date = start_dateRef.current.value;
    const end_date = end_dateRef.current.value;

    //카테고리 값 가져오기
    const cate = categoryRef.current.value;

    const req_data = {
      process: proc_arr.length > 0 ? proc_arr : '',
      range: { start_date: start_date, end_date: end_date },
      category: cate === 'default' ? '' : parseInt(cate),
      mode: 'user',
      user_id:
        window.sessionStorage.getItem('USER_ID') !== null
          ? window.sessionStorage.getItem('USER_ID')
          : '',
    };
    const res = await server_bridge.axios_instace.post(
      //선택한 검색 범위에 따른 신고 결과 가져오기
      '/getDisposeList',
      req_data,
    );
    //console.log(res.data);
    setBody(res.data);
    //console.log(res.data);
    //console.log(res.data);
    setCnt(res.data.length);
  };
  return (
    <>
      <div>
        기간 : <input type="date" ref={start_dateRef} /> ~{' '}
        <input type="date" ref={end_dateRef} />
      </div>
      <div>
        카테고리 :
        <select name="cate_sel" id="cate_sel" ref={categoryRef}>
          <option value="default">전체</option>
          {category.length > 1 &&
            category.map((val, key) => (
              <option key={key} value={val.CATEGORY_IDX}>
                {val.CATEGORY}
              </option>
            ))}
        </select>
      </div>
      <div>
        처리 상태 :
        {process.length > 1 &&
          process.map((val, key) => (
            <span key={key}>
              <input
                type="checkbox"
                id={`process_` + key}
                name={`process_` + key}
                value={val.NOTIFY_PNUM}
                ref={addToRefs}
              />
              <label htmlFor={`process_` + key}>{val.NOTIFY_STATUS}</label>
            </span>
          ))}
        <button onClick={handleReportList}>검색</button>
      </div>
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
                      navigate('/myreportview', {
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
export default UserReportList;
