import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  console.log('아이템 id', article.id);
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
    <div>
      <figure onClick={onClick}>
        <img src={article.img} alt="온누리상품권" />
        <figcaption>
          <span className="brand">{article.brand}</span>
          <br />
          <div className="giftCard">{article.title}</div>
          <br />
          <span className="won">￦</span>
          <span className="price">{addComma(article.price)}</span>
        </figcaption>
      </figure>
    </div>
  );
};

// return (
//   <li className="tags">
//     <button
//       // className={`${tagData.isChecked ? 'tagBtn' : 'tagBtnOFF'}`}
//       type="button"
//       style={{ backgroundColor: tagData.color }}
//       onClick={() => clickTagBtn(tagData.id)}
//     >
//       {tagData.title}
//     </button>
//   </li>
//   );
// };

export default PointItem;
