import { React, useState, useRef } from 'react';
import gift_card_5000 from './5000.png';
import gift_card_10000 from './10000.png';
import gift_card_30000 from './30000.png';
import { useNavigate } from 'react-router-dom';
// import items from './Items';
import PointItem from './PointItem';
import PointOrder from './PointOrder';

const Point = () => {
  const navigate = useNavigate();

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  const items = [
    {
      id: 1,
      img: gift_card_5000,
      brand: '소상공인시장진흥공단',
      title: '온누리상품권 5천원권',
      price: 5000,
    },
    {
      id: 2,
      img: gift_card_10000,
      brand: '소상공인시장진흥공단',
      title: '온누리상품권 1만원권',
      price: 10000,
    },
    {
      id: 3,
      img: gift_card_30000,
      brand: '소상공인시장진흥공단',
      title: '온누리상품권 3만원권',
      price: 30000,
    },
  ];

  return (
    <div>
      <form>
        <div>상품 리스트</div>
        <div>
          {items.map((article) => {
            return <PointItem article={article} />;
          })}
        </div>
      </form>
    </div>
  );
};

export default Point;
