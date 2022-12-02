import * as server_bridge from '../../controller/server_bridge';
import CsvDownload from 'react-json-to-csv';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from './components/Page';

const DisposeReport = () => {
  const [category, setCategory] = useState([{ CATEGORY_IDX: 0, CATEGORY: '' }]); //신고 분류 리스트(DB에서 가져온 CATEGORy)
  const [process, setProcess] = useState([
    //신고 절차 리스트(DB에서 가져온 PROCESS)
    { NOTIFY_PNUM: 0, NOTIFY_STATUS: '' },
  ]);
  const [disport, setList] = useState([]); //신고 리스트
  const checkRefs = useRef([]); //체크박스 리스트 ref
  const start_dateRef = useRef(); //검색할 시작날짜 ref
  const end_dateRef = useRef(); //검색할 마지막 날짜 ref
  const categoryRef = useRef(); //카테고리 ref

  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 5; //한 페이지에 보여줄 게시글 갯수
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  const navigate = useNavigate(); //페이지 이동용 네비게이터

  useEffect(() => {
    //페이지가 렌더링될때마다 실행되는 hook
    getComponentData();
    handleReportList();
  }, []);

  const getComponentData = async () => {
    //컴포넌트 생성용 리스트 받아오기
    const cate = await server_bridge.axios_instace.get('/get_cate_list');
    const proc = await server_bridge.axios_instace.get('/get_process_list');
    setCategory(cate.data);
    setProcess(proc.data);
  };

  const handleReportList = async () => {
    //여기서 선택된 진행사항이 있는지를 체크한다.
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
      mode: 'admin',
      user_id: window.sessionStorage.getItem('USER_ID'),
    };
    //console.log(req_data);

    const res = await server_bridge.axios_instace.post(
      //선택한 검색 범위에 따른 신고 결과 가져오기
      '/getDisposeList',
      req_data,
    );
    //console.log(res.data);
    setList(res.data);
    //console.log(res.data);
    setCnt(res.data.length);
  };
  const addToRefs = (e) => {
    //페이지가 로드될때마다 ref를 집어넣기 때문에 프로세스의 길이보다 길어지기 전까지만 넣게한다.
    if (checkRefs.current.length < process.length) checkRefs.current.push(e);
  };
  const setCurrentPage = (e) => {
    //페이징 처리용 함수
    setPage(e);
  };
  const move2Detail = (data) => {
    console.log(data);
    navigate('/admin/disposedetail', {
      state: { data: data, process: process },
    });
  };
  const downloadCSV = () => {
    //csv 다운로드용.. 인데 현재 사용하는 component도 잘 동작하는거로 보이나 혹시 몰라서 남겨놓음
    let csv = '';
    let header = '';
    for (let key in disport[0]) {
      header += key + ',';
    }
    header = header.slice(0, -1);
    csv += header + '\r\n';
    for (let i = 0; i < disport.length; i++) {
      let row = '';
      for (let j in disport[i]) {
        row += "'" + disport[i][j] + "',";
      }
      row.slice(0, row.length, -1);
      csv += row + '\r\n';
    }

    //let url = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(csv);
    //let url = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(csv);
    let link = document.createElement('a');

    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.style = 'visibility:hidden';
    link.download = '신고내역.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      관리자의 신고 내용 처리 페이지
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
      <CsvDownload
        className="excelbtn"
        // data : object 또는 object의 배열
        data={disport}
        delimiter={','}
        // filename : 파일이름
        filename="신고내역.csv"
      >
        엑셀 다운로드
      </CsvDownload>
      {/* <button onClick={downloadCSV}>엑셀 다운로드</button> */}
      {/* <div>월별 그래프를 이 페이지에서 굳이 봐야하나 하는 생각이 들어서 일단 제외</div>  */}
      <div>
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>no</th>
                <th>신고자</th>
                <th>처리상태</th>
                <th>카테고리</th>
                <th>신고일시</th>
                <th>더보기</th>
              </tr>
            </thead>
            <tbody>
              {typeof disport !== 'string' && disport.length > 0 ? (
                disport
                  .slice(page * itemcount - itemcount, page * itemcount)
                  .map((data, key) => (
                    //disport.map((val, key) => (
                    //<DisposeDetail val={val} key={key} process={process} />

                    <tr key={key}>
                      <td>{data.NOTIFY_IDX}</td>
                      <td>
                        {data.USER_NAME === null ? '비회원' : data.USER_NAME}
                      </td>
                      <td>{data.NOTIFY_STATUS}</td>
                      <td>{data.CATEGORY}</td>
                      <td>{data.NOTIFY_DATE}</td>
                      <td>
                        <button onClick={() => move2Detail(data)}>
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={6}></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {typeof disport !== 'string' && (
          <Page //페이지네이션 객체(component/admin/Page.js)
            page={page} //현재 페이지
            totalcnt={totalcnt} //총 게시글 갯수
            setPage={setCurrentPage} //페이징 처리함수
            itemcount={itemcount} //한 페이지에 몇개를 보여줄건지를 뜻함
          />
        )}
      </div>
    </div>
  );
};
export default DisposeReport;
