import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';

function redeucer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const PointOrder = () => {
  const [count, setCount] = useState(1);

  const onIncrease = () => {
    setCount(count + 1);
    console.log(count);
    // console.log('+1');
  };

  const num = { count };
  console.log('구매수량', num);

  const onDecrease = () => {
    setCount(count - 1);
    // console.log('-1');
  };

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  const navigate = useNavigate();

  const { state } = useLocation(); // 포인트 아이템에서 넘겨받은 데이터
  console.log('아이템에서 넘겨받은 데이터', state);

  const handleClick = () => {
    navigate('/pointpay', { state: { num, state } });
  };
  // useEffect(() => {
  //   console.log('컴포넌트 나타남');
  //   return () => {
  //     console.log('컴포넌트가 사라짐');
  //   };
  // }, []);
  return (
    <div id="PointOrder" className="subPage">
      <div className="subTop">
        <h1>포인트 사용</h1>
      </div>

      <div className="section">
        <div className="sub-title"><h2>상품권 주문하기</h2></div>

        <div className="Order">
          <form>
            <div className="goodsTop">
              <figure className="order_img goodsImg">
                <img
                  src={server_bridge.py_url + '/' + state.article.GOODS_IMG}
                  alt="온누리상품권"
                />
              </figure>

              <div className="goodsInfo">
                <div className="giftCard goodsTitle">
                  <span className="brand">소상공인시장진흥공단</span>
                  <h3>{state.article.GOODS_NAME}</h3>
                </div>

                <div className="goodsContents">
                  <table border="0" cellPadding="0" cellSpacing="0">
                    <colgroup>
                      <col width="20%" />
                      <col />
                    </colgroup>
                    <tbody>
                    <tr>
                      <th>정상가</th>
                      <td>
                        <span className="cover-price">
                          <span className="won">￦</span>
                          <span className="price">{addComma(state.article.GOODS_PRICE)}</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>제공가</th>
                      <td>
                        <span className="cover-price">
                          <span className="won">￦</span>
                          <span className="price">{addComma(state.article.GOODS_PRICE)}</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>교환처</th>
                      <td>은행 또는 환전대행가맹점</td>
                    </tr>
                    <tr>
                      <th>유효기간</th>
                      <td>발행일로부터 5년</td>
                    </tr>
                    <tr>
                      <th>수량</th>
                      <td>
                        <div className="goodsCnt">
                          <input type="button" className="cntBtn" value="-" onClick={onDecrease} />
                          <span>{count}</span>
                          <input type="button" className="cntBtn" value="+" onClick={onIncrease} />
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <button type="button" className="btn btn-navy" onClick={handleClick}>
                    주문하기
                  </button>
                </div>
              </div>
                        
            </div>
            
            <div className="goodsDetail">
              <h4>[상품명]</h4>
              <p>{state.article.GOODS_NAME}</p>
              
              <h4>[상품설명]</h4>
              <p>{state.article.GOODS_NAME}</p>
              
              <h4>[이용안내]</h4>
              <ul>
                <li>본 상품은 예시 이미지로서 실제 상품과 다를 수 있습니다.</li>
                <li>결제 완료 후에는 주문 및 결제 취소가 불가합니다.</li>
                <li>1인당 월 구매한도는 50만원입니다.</li>
                <li>온누리상품권 통합문의처 : 중소기업통합콜센터 (☎1357)</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PointOrder;
