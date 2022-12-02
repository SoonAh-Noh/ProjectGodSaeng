import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';

const PointPay = () => {
  const { state } = useLocation(); // 포인트 오더에서 넘겨받은 데이터
  console.log('오더에서 넘겨받은 데이터', state);
  console.log('타입', typeof state.state.article.GOODS_PRICE);

  const totalPrice = state.num.count * state.state.article.GOODS_PRICE;
  console.log('총금액', totalPrice);

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  const [point, setPoint] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserPoint();
  }, []);

  const getUserPoint = async () => {
    const response = await server_bridge.axios_instace.get(
      '/get_point_list_by_user',
    );
    setPoint(response.data);
  };

  const nameRef = useRef();
  const phoneRef = useRef();

  const letter = () => {
    alert(
      `온누리 상품권이 발송되었습니다. \n - 받는 분 : ${nameRef.current.value} \n - 휴대폰번호 : ${phoneRef.current.value}`,
    );
    navigate('/mypage');
  };

  return (
    <div>
      <form>
        <div>주문 결제</div>
        <table>
          <thead>
            <tr>
              <th>상품</th>
              <th>수량</th>
              <th>판매가</th>
              <th>주문금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.state.article.GOODS_NAME}</td>
              <td>{state.num.count}</td>
              <td>{addComma(state.state.article.GOODS_PRICE)}</td>
              <td>{addComma(totalPrice)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">총 상품금액 {addComma(totalPrice)}</td>
            </tr>
          </tfoot>
        </table>
        <div>
          <div>연락처 입력하기</div>
          <span>받는 분</span>
          <input type="text" ref={nameRef} />
          <span>휴대폰 번호</span>
        </div>
        <input type="text" ref={phoneRef} />
        <div>
          <div>포인트</div>
          <span>보유</span>
          {point.map((item) => (
            <span>{item.POINT_PULS}</span>
          ))}
          <span>사용</span>
          <span>{addComma(totalPrice)}</span>
        </div>
        <button type="button" onClick={letter}>
          결제하기
        </button>
      </form>
    </div>
  );
};

export default PointPay;
