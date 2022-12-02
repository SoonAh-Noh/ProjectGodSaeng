import * as server_bridge from '../../controller/server_bridge';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/noti.css';
const WriteNotify = () => {
  const mode_list = ['write', 'update']; //새 게시글 작성/ 수정 모드의 리스트
  const titleRef = useRef(); //제목
  const contentRef = useRef(); //내용
  const fileRef = useRef(); //파일
  const filelabelRef = useRef(); //파일 레이블
  const navigate = useNavigate(); //링크 네비게이터
  const { state } = useLocation(); //게시글 상세보기에서 받아온 해당 게시글의 데이터
  const [mode, setMode] = useState(mode_list[0]); //새 게시글 작성/ 수정 여부
  const [isfileuploading, setFileUploadeMode] = useState(false); //파일 업로드하는가 /아닌가의 여부를 체크
  const [board, setData] = useState(server_bridge.board_inner); //게시판 데이터를 추출 및 가공하기 위한 state

  useEffect(() => {
    //페이지가 로드될때마다 실행
    if (state !== null) {
      //이전 페이지에서 넘겨받은 데이타가 있는지(수정모드인지) 체크
      setMode(mode_list[1]); //수정모드로 전환
      setData(state); //수정하기 위한 데이터 세팅

      changeFile(
        //파일 상태 변경(업로드된 파일이 있다면 반영하고 그렇지 않다면 파일을 선택하라는 메세지 출력)
        state.BOARD_FILE === ''
          ? '파일을 선택해주세요'
          : state.BOARD_FILE.filename,
      );
    }
  }, []);

  const writeNoti = async (e) => {
    //새 게시글 작성
    e.preventDefault();
    const formData = new FormData(); //서버에 넘겨줄 데이터 객체
    formData.append('title', titleRef.current.value); //제목
    formData.append('content', contentRef.current.value); //내용
    formData.append('user_idx', 1); //사용자 회원번호
    formData.append(
      //업로드할 파일(파일업로드를 안한다면 "" 을 업로드)
      'notifile',
      fileRef.current.files[0] ? fileRef.current.files[0] : '',
    );

    if (mode === mode_list[0]) {
      //새 글쓰기 모드
      const res = await server_bridge.axios_instace.post(
        '/uploadnoti',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (res.data === 'success') {
        alert('입력성공!');
      } else {
        alert('입력실패!');
      }
    } else {
      //수정모드
      formData.append('board_idx', board.BOARD_IDX);
      if (filelabelRef.current.innerHTML !== '파일을 선택해주세요') {
        //첨부하고자 하는 파일이 있는 경우 => 파일 변경하지않고 업로드된 파일 유지 / 다른 파일 업로드
        if (board.BOARD_FILE === '') {
          //처음부터 파일이 없었던경우
          //다른 파일 업로드
          formData.append('filemode', 1);
        } else {
          //처음부터 파일이 업로드되어있던경우
          if (board.BOARD_FILE.filename === filelabelRef.current.innerHTML) {
            //다른 파일을 업로드 하지 않고 현상 유지
            formData.append('filemode', 0);
          } else {
            //파일이 업로드되어있던 상태에서 다른 파일을 업로드
            formData.append('filemode', 1);
          }
        }
      } else {
        //파일을 삭제한 경우
        formData.append('filemode', 2);
      }

      const res = await server_bridge.axios_instace.post(
        '/updatenoti',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      if (res.data === 'success') {
        alert('수정성공!');
      } else {
        console.log(res.data);
        alert('수정실패!');
      }
    }

    navigate('/admin/boardmanage'); //최종적으로 게시판 리스트로 이동
  };
  const changeFile = (text) => {
    //업로드할 파일 추가/변동/삭제시 수행
    let ischanging = true;
    if (text === '파일을 선택해주세요') ischanging = false;
    setFileUploadeMode(ischanging);
    filelabelRef.current.innerHTML = text;
    //console.log(board.BOARD_FILE.filename, filelabelRef.current.innerHTML);
  };

  return (
    <div>
      {mode === mode_list[0] ? '작성모드' : '수정모드'}
      <form onSubmit={writeNoti}>
        <div>
          제목{' '}
          <input
            type="text"
            name="title"
            ref={titleRef}
            defaultValue={board.BOARD_TIT}
          />
        </div>
        <input
          type="file"
          name="notifile"
          id="notifile"
          ref={fileRef}
          onChange={() => changeFile(fileRef.current.files[0].name)}
        />
        <label id="labelbutton" htmlFor="notifile">
          파일선택
        </label>
        <label ref={filelabelRef}>파일을 선택해주세요</label>
        {isfileuploading === true ? (
          <input
            type="button"
            onClick={(e) => {
              fileRef.current.value = null;
              changeFile('파일을 선택해주세요');
            }}
            value="삭제"
          />
        ) : (
          ''
        )}

        <div className="updownSpace" />
        <div>
          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            ref={contentRef}
            defaultValue={board.BOARD_TXT}
          />
        </div>
        <button>업로드</button>
      </form>
    </div>
  );
};
export default WriteNotify;
