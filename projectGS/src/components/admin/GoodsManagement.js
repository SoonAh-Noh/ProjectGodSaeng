import * as server_bridge from '../../controller/server_bridge';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const GoodsManagement = () => {
  const imgRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const [goods, setGoods] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getGoodsList();
  }, []);
  const deleteGoods = async (goods_idx) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await server_bridge.axios_instace.post('/goodslist', {
        goods_idx: goods_idx,
      });
      if (response.data === 'success') {
        alert('삭제 성공!');
        getGoodsList();
      } else {
        alert('삭제 실패!');
      }
    }
  };
  const getGoodsList = async () => {
    const response = await server_bridge.axios_instace.get('/goodslist');
    setGoods(response.data);
  };
  const insertGoods = async () => {
    const formData = new FormData();
    formData.append('img', imgRef.current.files[0]);
    formData.append('name', nameRef.current.value);
    try {
      formData.append('price', parseInt(priceRef.current.value));
    } catch (error) {
      alert('숫자만 입력해주세요!!');
      return;
    }
    const response = await server_bridge.axios_instace.post(
      '/insertgoods',
      formData,
    );
    if (response.data === 'success') {
      alert('등록 성공!');
      getGoodsList();
    } else {
      alert('등록 실패!');
    }
  };

  return (
    <div>
      <div>상품권 목록</div>
      <div>
        상품권 추가하기 <br />
        상품권 이미지 : <input type="file" accept="image/*" ref={imgRef} />
        <br />
        상품권명 : <input type="text" ref={nameRef} />
        <br />
        가격 :{' '}
        <input
          type="text"
          ref={priceRef}
          placeholder="숫자만 입력해주세요! ex)9000"
          style={{ width: '300px' }}
        />
        <br />
        <button onClick={insertGoods}>추가하기</button>
      </div>
      {typeof goods !== 'string' && goods.length > 0 ? (
        goods.map((item, idx) => (
          <div
            key={idx}
            onClick={() =>
              navigate('/admin/goodsview', { state: { data: item } })
            }
            style={{ cursor: 'pointer' }}
          >
            <img
              src={server_bridge.py_url + '/' + item.GOODS_IMG}
              alt="상품권 이미지"
            />
            <br />
            {item.GOODS_NAME}
            <br />
            {item.GOODS_PRICE} 원
            <br />
            <button onClick={() => deleteGoods(item.GOODS_IDX)}>
              삭제하기
            </button>
          </div>
        ))
      ) : (
        <div>등록한 상품이 없습니다!</div>
      )}
    </div>
  );
};
export default GoodsManagement;
