import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div>
      <form>
        <div>주문하기~</div>
        <div>
          <span className="brand">{state.article.brand}</span>
          <figure className="order_img">
            <img src={state.article.img} alt="온누리상품권" />
          </figure>
        </div>
        <section>
          <ul>
            <div className="giftCard">{state.article.title}</div>
            <li>
              <div>정상가</div>
              <div>
                <span className="cover-price">
                  <span className="won">￦</span>
                  <span className="price">{addComma(state.article.price)}</span>
                </span>
              </div>
            </li>
            <li>
              <div>제공가</div>
              <div>
                <span className="cover-price">
                  <span className="won">￦</span>
                  <span className="price">{addComma(state.article.price)}</span>
                </span>
              </div>
            </li>
            <li>
              <div>교환처</div>
              <div>은행 또는 환전대행가맹점</div>
            </li>
            <li>
              <div>유효기간</div>
              <div>발행년도로부터 5년</div>
            </li>
            <li>
              <div>수량</div>
              <div>
                <input type="button" value="-" onClick={onDecrease} />
                <span>{count}</span>
                <input type="button" value="+" onClick={onIncrease} />
              </div>
            </li>
          </ul>
          <button type="button" onClick={handleClick}>
            주문하기
          </button>
        </section>
        <hr />
        <div>
          <b>[상품명]</b>
          <p>{state.article.title}</p>
          <br />
          <b>[상품설명]</b>
          <p>{state.article.title}</p>
          <br />
          <b>[이용안내]</b>
          <p>- 본 상품은 예시 이미지로서 실제 상품과 다를 수 있습니다.</p>
          <p>- 결제 완료 후에는 주문 및 결제 취소가 불가합니다.</p>
          <p>- 1인당 월 구매한도는 50만원입니다.</p>
          <p>- 온누리상품권 통합문의처 : 중소기업통합콜센터 (☎1357)</p>
        </div>
      </form>
    </div>
  );
};

export default PointOrder;
