import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Page from './components/Page';
import * as server_bridge from '../../controller/server_bridge';

const BoardManagement = () => {
  const searchRef = useRef(); //검색 텍스트
  const optionRef = useRef(); //검색 옵션
  const navigate = useNavigate(); //링크 네비게이터
  const [page, setPage] = useState(1); //페이징 처리되어 나눠지는 총 게시판의 페이지 갯수
  const itemcount = 3; //한 페이지에 보여줄 게시글 갯수
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
    <div>
      <div>
        검색
        <select name="search_option" id="search_option" ref={optionRef}>
          <option value="BOARD_TIT">제목</option>
          <option value="USER_NAME">작성자</option>
        </select>
        <input type="text" name="search" id="search" ref={searchRef} />
        <button onClick={getList}>검색</button>
      </div>
      <div className="updownSpace"></div>
      <button onClick={() => navigate('/admin/writenoti')}>글쓰기</button>
      <div className="updownSpace"></div>
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
          {typeof board_list !== 'string' && board_list.length > 0 ? (
            board_list
              .slice(page * itemcount - itemcount, page * itemcount) //여기서 보여주려고 하는 리스트를 잘라내서 페이징 처리
              .map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data.BOARD_IDX}</td>
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
  );
};
export default BoardManagement;
