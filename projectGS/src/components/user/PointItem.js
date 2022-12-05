import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const PointItem = ({ article }) => {
  // console.log('아이템 img', article.GOODS_IMG);
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/pointorder', { state: { article } }); // 포인트오더에 넘겨줄 값
    // navigate(`/pointorder/${article.id}`);
  };

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  return (
    <div className="goodsItem">
      <figure onClick={onClick}>
        <img src={server_bridge.py_url + '/' + article.GOODS_IMG} alt="온누리상품권" />
        <figcaption>
          {/* <br />
          <div className="giftCard">{article.GOODS_NAME}</div>
          <br /> */}
          <h4>
            <span className="won">￦</span>
            <span className="price">{addComma(article.GOODS_PRICE)}</span>
          </h4>
        </figcaption>
      </figure>
    </div>
  );
};

export default PointItem;
