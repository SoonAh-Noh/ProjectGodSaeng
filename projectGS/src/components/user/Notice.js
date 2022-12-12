import '../../css/user/sub.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Page from '../../components/admin/components/Page';
import * as server_bridge from '../../controller/server_bridge';

const Notice = () => {
  const searchRef = useRef(); //검색 텍스트
  const optionRef = useRef(); //검색 옵션
  const navigate = useNavigate(); //링크 네비게이터
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 10; //한 페이지에 보여줄 게시글 갯수
  const [board_list, setList] = useState([]); // 게시판 리스트
  const [totalcnt, setCnt] = useState(0); //총 게시글 갯수

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    //게시글 리스트를 가져온다.
    const opt = optionRef.current.value;
    const search = searchRef.current.value;
    let where_clause = `WHERE `;
    if (opt === 'BOARD_TIT') {
      //제목검색
      where_clause += ` A.BOARD_TIT LIKE '%${search}%' `;
    } else if (opt === 'BOARD_TXT') {
      //내용검색
      where_clause += ` A.BOARD_TXT LIKE '%${search}%' `;
    } else if (opt === 'BOARD_TOTAL') {
      //제목+내용
      where_clause += ` A.BOARD_TIT LIKE '%${search}%' OR A.BOARD_TXT LIKE '%${search}%' `;
    }

    let where = {
      //게시글을 검색할 조건절의 데이터를 서버에 넘겨주기 위한 dict
      is_searching: search !== '' ? 1 : 0,
      where_clause: where_clause,
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
    <div id="Notice" className="subPage">
      <div className="subTop">
        <h1>공지사항</h1>
      </div>

      <div className="section">
        <div className="sub-title">
          <h2>공지사항</h2>
        </div>

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
              <thead>
                <tr>
                  <th>No.</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {typeof board_list !== 'string' && board_list.length > 0 ? (
                  board_list
                    .slice(page * itemcount - itemcount, page * itemcount) //여기서 보여주려고 하는 리스트를 잘라내서 페이징 처리
                    .map((data, key) => {
                      return (
                        <tr key={key} align="center">
                          <td>{data.BOARD_IDX}</td>
                          <td align="left">
                            <Link
                              to={'/noticeview'}
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
                    })
                ) : (
                  <tr>
                    <td colSpan={4}></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="noticeSearch">
            <div className="searchCate">
              <select ref={optionRef}>
                <option value="BOARD_TIT">제목</option>
                <option value="BOARD_TXT">내용</option>
                <option value="BOARD_TOTAL">제목+내용</option>
              </select>
            </div>
            <input type="text" className="searchTxt" ref={searchRef} />
            <button type="button" className="searchBtn" onClick={getList}>
              검색
            </button>
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
        </div>
      </div>
    </div>
  );
};
export default Notice;
