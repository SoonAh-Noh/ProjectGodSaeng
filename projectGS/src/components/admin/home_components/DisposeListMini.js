import { useNavigate } from 'react-router-dom';
import * as server_bridge from '../../../controller/server_bridge';
const DisposeListMini = ({ data }) => {
  const navigate = useNavigate();

  const moveToDetail = async (_data) => {
    //신고내역 상세페이지 이동
    const proc = await server_bridge.axios_instace.get('/get_process_list');
    navigate('/admin/disposedetail', {
      state: { data: _data, process: proc.data },
    });
  };

  return (
    <div className="cell-c">
      <div className="mainTitle">
        <h4>신고 내역</h4>
      </div>

      <div className="notifyBoxWrap">
        {typeof data !== 'string' && data.length > 0 ? (
          data.map((val, idx) => (
            <div key={idx} className="notifyBox">
              <button onClick={() => moveToDetail(val)}>
                <div className="notifyThumb">
                  {/* <img src={val.IMG_PATH} alt="테스트용 이미지" /> */}
                  <img src={server_bridge.py_url + '/' + val.IMG_PATH} alt="신고 이미지" />
                </div>
                <div className="notifyTxt">
                  <h4>{val.CATEGORY} 불법 주정차</h4>
                  <p>{val.NOTIFY_REPORT_DATE}</p>
                </div>
              </button>
            </div>
          ))
        ) : (
          <div className="noReport"><p>신고 내역이 없습니다.</p></div>
        )}
      </div>
    </div>
  );
};
export default DisposeListMini;
