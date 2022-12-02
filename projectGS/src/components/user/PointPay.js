import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PointPay = () => {
  const { state } = useLocation(); // 포인트 오더에서 넘겨받은 데이터
  console.log('오더에서 넘겨받은 데이터', state);
  console.log('타입', typeof state.state.article.price);

  const totalPrice = state.num.count * state.state.article.price;
  console.log('총금액', totalPrice);

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
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
              <td>{state.state.article.title}</td>
              <td>{state.num.count}</td>
              <td>{addComma(state.state.article.price)}</td>
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
          <input type="text" />
          <span>휴대폰 번호</span>
        </div>
        <input type="text" />
        <div>
          <div>포인트</div>
          <span>보유</span>
          <span>10,000원</span>
          <span>사용</span>
          <span>{addComma(totalPrice)}</span>
        </div>
        <button type="button">결제하기</button>
      </form>
    </div>
  );
};

export default PointPay;
