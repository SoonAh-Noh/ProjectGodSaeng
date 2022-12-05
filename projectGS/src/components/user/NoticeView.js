import '../../css/user/sub.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as server_bridge from '../../controller/server_bridge';
let board_idx = 0; //게시판 리스트에서 받아온 게시글 번호를 담을 글로벌 변수
const Notice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    //페이지가 로드되면 실행
    board_idx = location.state.board_idx; //location에 저장해서 넘겨준 게시글 번호를 저장
    showBoardContents(board_idx);
  }, []);
  const [board, setData] = useState(server_bridge.board_inner); //게시판 정보를 담고있는 state

  const showBoardContents = async (board_idx) => {
    //디비에 게시판 번호에 해당하는 데이터를 가져온다
    const res = await server_bridge.axios_instace.post('/board_view', {
      board_idx: board_idx,
    });
    let data = res.data[0];
    //console.log(data);
    data.BOARD_FILE = data.BOARD_FILE !== '' ? JSON.parse(data.BOARD_FILE) : ''; //파일이 저장된 게시글이면 JSON형변환하여 객체에 재저장
    setData(data);
  };
  const goToList = () => {
    navigate('/notice');
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

        <div className="noticeView">
          <div className="title">
            <h3> {board.BOARD_TIT}</h3>
          </div>
          <div className="info">
            <ul>
              <li>{board.BOARD_DATE}</li>
              <li> {board.USER_NAME}</li>
              <li>
                {board.BOARD_FILE !== '' ? (
                  <>
                    파일 다운로드 :
                    <a
                      href={
                        server_bridge.py_url +
                        '/download_file/' +
                        board.BOARD_FILE.dir
                      }
                    >
                      {board.BOARD_FILE.filename}
                    </a>
                  </>
                ) : (
                  ''
                )}
              </li>
            </ul>
          </div>
          <div>
            {/* 221202 선우 - 이게 파일 다운로드 (여기에 파일 다운로드를 배치하는건 어떠십니까)  */}
            {/* {board.BOARD_FILE !== '' ? (
              <>
                파일 다운로드 :
                <a
                  href={
                    server_bridge.py_url +
                    '/download_file/' +
                    board.BOARD_FILE.dir
                  }
                >
                  {board.BOARD_FILE.filename}
                </a>
              </>
            ) : (
              ''
            )} */}
          </div>
          <div className="contents">{board.BOARD_TXT}</div>
          <div className="btn-wrap">
            <button type="button" className="btn btn-navy" onClick={goToList}>
              목록으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notice;
