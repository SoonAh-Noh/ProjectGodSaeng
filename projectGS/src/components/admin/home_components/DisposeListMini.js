import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../../controller/server_bridge';
const DisposeListMini = ({ data }) => {
  const navigate = useNavigate();

  const moveToDetail = async (_data) => {
    //신고내역 상세페이지 이동
    const proc = await server_bridge.axios_instace.get('/get_process_list');
    navigate('/home/disposedetail', {
      state: { data: _data, process: proc.data },
    });
  };

  return (
    <div className="cell-c">
      <div className="mainTitle"><h4>신고 내역</h4></div>
      
      {typeof data !== 'string' && data.length > 0 ? (
        data.map((val, idx) => (
          <div key={idx}>
            <div>
              {/* <img src={val.IMG_PATH} alt="테스트용 이미지" /> */}
              <img src="#" alt="테스트용 이미지" />
            </div>
            <div>
              {val.CATEGORY} 불법 주정차 <br />
              {val.NOTIFY_TXT}
              <button onClick={() => moveToDetail(val)}>상세보기</button>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default DisposeListMini;
