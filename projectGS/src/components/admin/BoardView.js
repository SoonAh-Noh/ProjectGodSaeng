import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as server_bridge from '../../controller/server_bridge';
let board_idx = 0; //게시판 리스트에서 받아온 게시글 번호를 담을 글로벌 변수
const BoardView = () => {
  useEffect(() => {
    //페이지가 로드되면 실행
    board_idx = location.state.board_idx; //location에 저장해서 넘겨준 게시글 번호를 저장
    showBoardContents(board_idx);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
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
  const updateBoard = () => {
    //게시글 수정 페이지로 이동
    navigate('/admin/writenoti', { state: board });
  };
  const deleteBoard = async () => {
    //게시글 삭제 기능
    var result = window.confirm('정말로 삭제하시겠습니까?');
    if (result) {
      const res = await server_bridge.axios_instace.post('/delete_board', {
        board_idx: board_idx,
      });

      if (res.data === 'success') {
        alert('삭제 완료!');
      } else {
        alert('삭제 실패!');
      }
      navigate('/admin/boardmanage');
    }

    return;
  };
  return (
    <div>
      <div>
        제목 : {board.BOARD_TIT} <br />
        작성자 : {board.USER_NAME}
        <br />
        작성일 : {board.BOARD_DATE}
        <br />
        <button onClick={updateBoard}>수정하기</button>
        <br />
        <button onClick={deleteBoard}>삭제하기</button>
        <br />
      </div>
      <div>
        {board.BOARD_FILE !== '' ? (
          <a
            href={
              server_bridge.py_url + '/download_file/' + board.BOARD_FILE.dir
            }
          >
            {board.BOARD_FILE.filename}
          </a>
        ) : (
          ''
        )}
      </div>
      <div>{board.BOARD_TXT}</div>
    </div>
  );
};
export default BoardView;
