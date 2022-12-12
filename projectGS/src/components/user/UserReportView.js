import { useRef, useState, useEffect } from 'react';
import * as server_bridge from '../../controller/server_bridge';
import * as admin_ctrl from '../../controller/admin_ctrl';
import { useNavigate, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

const UserReportView = () => {
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
  return (
    // <div>
    //   <div className="container section">
    //     <div className="sub-title my-title">
    //       <h2>나의 신고 상세내역</h2>
    //     </div>
    //     <div>
    //       <h4>신고자 정보</h4>
    //       {data.USER_OX === 'O' ? '회원' : '비회원신고'}
    //       <br />
    //       id : {data.USER_ID}
    //       <br />
    //       이메일 : {data.USER_MAIL}
    //       <br />
    //       전화번호 : {data.USER_TEL}
    //     </div>
    //     <div>
    //       <h4>신고내용</h4>
    //       <br />
    //       차량번호 : {data.CAR_NUM}
    //       <br />
    //       장소 : {data.NOTIFY_SPOT}
    //       <br />
    //       처리 상태 :
    //       <select
    //         key={uuid()}
    //         defaultValue={data.NOTIFY_PNUM}
    //         ref={processRef}
    //         disabled
    //       >
    //         {process.map((val2, key2) => (
    //           <option key={key2} value={val2.NOTIFY_PNUM}>
    //             {val2.NOTIFY_STATUS}
    //           </option>
    //         ))}
    //       </select>
    //       <br />
    //       신고 내용 : {data.NOTIFY_TXT}
    //       <br />
    //       사진 :{' '}
    //       <img
    //         src={server_bridge.py_url + '/' + data.IMG_PATH}
    //         alt="사진샘플"
    //       />
    //       {/* 사진 : <img src="" alt="사진샘플" /> */}
    //       <br />
    //       신고 처리
    //       <br />
    //       <textarea
    //         cols="30"
    //         rows="10"
    //         defaultValue={data.NOTIFY_RESULT}
    //         ref={resultRef}
    //         disabled
    //       ></textarea>
    //       <br />
    //       {/* <button onClick={() => updateDispose(data.NOTIFY_IDX)}>처리반영</button> */}
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="container section">
        <div className="sub-title my-title">
          <h2>나의 신고 상세내역</h2>
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
        <br />
        <div className="reportDispose">
          <div className="subTitle">
            <h4>신고처리</h4>
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
                        disabled
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
                    cols="30"
                    rows="10"
                    defaultValue={data.NOTIFY_RESULT}
                    ref={resultRef}
                    disabled
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserReportView;
