import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Page from './components/Page';
import * as server_bridge from '../../controller/server_bridge';

const BoardManagement = () => {
  const searchRef = useRef(); //검색 텍스트
  const optionRef = useRef(); //검색 옵션
  const navigate = useNavigate(); //링크 네비게이터
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 5; //한 페이지에 보여줄 게시글 갯수
  const [board_list, setList] = useState([]); // 게시판 리스트
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수
  
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    //게시글 리스트를 가져온다.
    let where = {
      //게시글을 검색할 조건절의 데이터를 서버에 넘겨주기 위한 dict
      is_searching: searchRef.current.value !== '' ? 1 : 0,
      where_clause:
        'WHERE ' +
        (optionRef.current.value === 'BOARD_TIT'
          ? 'A.BOARD_TIT'
          : 'B.USER_NAME') +
        ' LIKE "%' +
        searchRef.current.value +
        '%"',
    };
    const res = await server_bridge.axios_instace.post('/board_list', where);
    setCnt(res.data.length);
    setList(res.data);
  };
  const setCurrentPage = (e) => {
    //페이징 처리용 함수
    setPage(e);
  };
  return (
    <div className="Contents">
      <div className="adminTitle"><h3>공지사항 관리</h3></div>

      <div className="pageWrap subPageWrap adminSearchBar">
        <div className="subTitle subTitle2">
          <h3>공지사항 검색</h3>
        </div>
        <div className="flexBetween">
          <div className="searchWrap">
            <div className="searchCate">
              <select name="search_option" id="search_option" ref={optionRef}>
                <option value="BOARD_TIT">제목</option>
                <option value="USER_NAME">작성자</option>
              </select>
            </div>
            <input type="text" name="search" id="search" ref={searchRef} className="searchTxt" />
          </div>

          <div className="adminBtnWrap2">            
            <button onClick={getList} className="adminBtn adminBtn2 searchBtn">검색</button>
          </div>
        </div>
      </div>

      <div className="pageWrap subPageWrap">
        <div className="subTitle subTitleFlex">
          <h3>공지사항 리스트</h3>
          <div className="totalNumber">
            <p>총 {board_list.length}건</p>
          </div>
        </div>

        <table className="adminTable2" border="0" cellPadding="0" cellSpacing="0">
          <colgroup>
            <col width="80px" />
            <col />
            <col width="120px" />
            <col width="160px" />
            <col width="100px" />
          </colgroup>
          <thead>
            <tr>
              <th>No.</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>첨부파일</th>
            </tr>
          </thead>
          <tbody>
            {typeof board_list !== 'string' && board_list.length > 0 ? (
              board_list
                .slice(page * itemcount - itemcount, page * itemcount) //여기서 보여주려고 하는 리스트를 잘라내서 페이징 처리
                .map((data, key) => {
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
                      <td align="center"><i className={data.BOARD_FILE ? "xi-diskette fileIcon" : " "}></i></td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={5}></td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="btnRight">
          <button onClick={() => navigate('/admin/writenoti')} className="adminBtn adminBtn2 adminBtnNavy">글쓰기</button>
        </div>

        <div>
          {typeof body !== 'string' && (
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
export default BoardManagement;
