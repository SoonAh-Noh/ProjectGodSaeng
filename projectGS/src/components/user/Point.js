import React from 'react';
import * as server_bridge from '../../controller/server_bridge';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointItem from './PointItem';

const Point = () => {
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGoodsList();
  }, []);

  // console.log('구우웃~', goods);

  const getGoodsList = async () => {
    const response = await server_bridge.axios_instace.get('/goodslist');
    setGoods(response.data);
    console.log(response.data);
  };

  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };

  // console.log('상품권 리스트', goods);
  return (
    <div id="Point" className="subPage">
      <div className="subTop">
        <h1>포인트 사용</h1>
      </div>


      <div className="section">
        <div className="sub-title"><h2>포인트 사용</h2></div>

        <div className="goods">
          <form>
            <div className="goodsList"><span>소상공인시장진흥공단</span><h3>온누리상품권</h3></div>
            <div className="goodsWrap">
            {goods.map((item) => {
              return <PointItem article={item} />;
            })}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Point;
