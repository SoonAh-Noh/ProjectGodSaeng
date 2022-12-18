import { useRef, useState, useEffect } from 'react';
import * as server_bridge from '../../controller/server_bridge';
import * as admin_ctrl from '../../controller/admin_ctrl';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import uuid from 'react-uuid';
const DisposeDetail = () => {
  const { state } = useLocation(); //게시글 상세보기에서 받아온 해당 게시글의 데이터
  const [data, setDisposeData] = useState(admin_ctrl); //신고내역의 상세 내용
  const [process, setProcess] = useState([]); //신고 절차(DB의 PROCESS 테이블의 리스트)
  const processRef = useRef(); //신고 절차의 수정을 위한 컴포넌트 접근용 ref
  const resultRef = useRef(); //신고 결과 답변을 적은 textarea를 추적하는 ref
  const navigate = useNavigate(); //페이지 이동용 네비게이터
  useEffect(() => {
    //페이지가 로드될때마다 실행
    if (state !== null) {
      //이전 페이지에서 넘겨받은 데이타가 있는지(수정모드인지) 체크
      setDisposeData(state.data); //수정하기 위한 데이터 세팅
      setProcess(state.process);
    }
  }, []);

  const updateDispose = async (NOTIFY_IDX) => {
    //신고 내역 수정
    if (parseInt(data.NOTIFY_PNUM) === 4) {
      //alert('이미 처리 완료된 신고글입니다!');
      server_bridge.normalAlert('이미 처리 완료된 신고글입니다!');
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: '정말로 수정하시겠습니까?',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      if (result.isConfirmed) {
        server_bridge.axios_instace
          .post('/updateDispose', {
            USER_IDX: data.USER_IDX === null ? 'non' : data.USER_IDX,
            NOTIFY_IDX: NOTIFY_IDX, //신고 번호
            NOTIFY_PNUM: processRef.current.value, //신고 처리 프로세스의 변경시 사용
            NOTIFY_RESULT: resultRef.current.value, //산고 결과
          })
          .then((res) => {
            if (res.data === 'success') {
              server_bridge.normalInfoAlert('수정 성공!');
              navigate('/admin/disposereport');
            } else {
              server_bridge.normalAlert('수정 실패!' + '\r\n' + res.data);
            }
          });
      }
    });

    // if (window.confirm('정말로 수정하시겠습니까?')) {
    //   const res = await server_bridge.axios_instace.post('/updateDispose', {
    //     USER_IDX: data.USER_IDX === null ? 'non' : data.USER_IDX,
    //     NOTIFY_IDX: NOTIFY_IDX, //신고 번호
    //     NOTIFY_PNUM: processRef.current.value, //신고 처리 프로세스의 변경시 사용
    //     NOTIFY_RESULT: resultRef.current.value, //산고 결과
    //   });
    //   if (res.data === 'success') {
    //     server_bridge.normalAlert('수정 성공!');
    //     navigate('/admin/disposereport');
    //   } else {
    //     server_bridge.normalAlert('수정 실패!' + '\r\n' + res.data);
    //   }
    // }
  };
  return (
    <div className="Contents">
      <div className="adminTitle">
        <h3>신고 처리</h3>
      </div>
      <div className="pageWrap">
        <div className="reportInfo">
          <div className="subTitle">
            <h4>신고자 정보</h4>
          </div>
          <table
            className="boardTable boardTable2"
            border="0"
            cellPadding="0"
            cellSpacing="0"
          >
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
            {data.USER_OX === 'O' ? (
              <tbody>
                <tr>
                  <th>회원번호</th>
                  <td>{data.USER_IDX}</td>
                  <th>아이디</th>
                  <td>{data.USER_ID}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{data.USER_MAIL}</td>
                  <th>연락처</th>
                  <td>{data.USER_TEL}</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <th>신고자</th>
                  <td>비회원</td>
                  <th>연락처</th>
                  <td>{data.USER_TEL}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <div className="reportDetail">
          <div className="subTitle">
            <h4>신고내용</h4>
          </div>

          <table
            className="boardTable boardTable2"
            border="0"
            cellPadding="0"
            cellSpacing="0"
          >
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>{data.CAR_NUM}</td>
                <th>위반장소</th>
                <td>{data.NOTIFY_SPOT}</td>
              </tr>
              <tr>
                <th>신고사진</th>
                <td colSpan={3}>
                  <img
                    src={server_bridge.py_url + '/' + data.IMG_PATH}
                    alt={data.CAR_NUM}
                  />
                </td>
              </tr>
              <tr>
                <th>신고내용</th>
                <td colSpan={3}>{data.NOTIFY_TXT}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="reportDispose">
          <div className="subTitle">
            <h4>신고내용</h4>
          </div>

          <table
            className="boardTable boardTable2"
            border="0"
            cellPadding="0"
            cellSpacing="0"
          >
            <colgroup>
              <col width="15%" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>신고 처리</th>
                <td>
                  <div className="searchWrap">
                    <div className="searchCate">
                      <select
                        key={uuid()}
                        defaultValue={data.NOTIFY_PNUM}
                        ref={processRef}
                      >
                        {process.map((val2, key2) => (
                          <option key={key2} value={val2.NOTIFY_PNUM}>
                            {val2.NOTIFY_STATUS}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>처리 사유</th>
                <td>
                  <textarea
                    defaultValue={data.NOTIFY_RESULT}
                    ref={resultRef}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="adminBtnWrap adminBtnWrap2">
          <button
            type="button"
            className="adminBtn adminBtn2"
            onClick={() => {
              navigate('/admin/disposereport');
            }}
          >
            취소
          </button>
          <button
            onClick={() => updateDispose(data.NOTIFY_IDX)}
            className="adminBtn adminBtn2 adminBtnNavy"
          >
            처리반영
          </button>
        </div>
      </div>
    </div>
  );
};
export default DisposeDetail;
