import * as server_bridge from '../../controller/server_bridge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
const GoodsView = () => {
  const imgRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  const updateGoods = async () => {
    if (window.confirm('정말로 수정하시겠습니까?')) {
      const formData = new FormData();
      formData.append('name', nameRef.current.value);
      formData.append('price', priceRef.current.value);
      formData.append(
        //업로드할 파일(파일업로드를 안한다면 "" 을 업로드)
        'img',
        imgRef.current.files[0] ? imgRef.current.files[0] : '',
      );
      formData.append('goods_idx', state.data.GOODS_IDX);

      const response = await server_bridge.axios_instace.post(
        '/updategoods',
        formData,
      );
      if (response.data === 'success') {
        alert('수정 성공!');
        navigate('/admin/goodsmanage');
      } else {
        alert('수정 실패!');
      }
    }
  };
  const deleteGoods = async (goods_idx) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const response = await server_bridge.axios_instace.post('/goodslist', {
        goods_idx: goods_idx,
      });
      if (response.data === 'success') {
        alert('삭제 성공!');
        navigate('/admin/goodsmanage');
      } else {
        alert('삭제 실패!');
      }
    }
  };
  return (
    <div>
      <div>상품권 상세보기</div>
      <div>
        <img
          src={server_bridge.py_url + '/' + state.data.GOODS_IMG}
          alt="상품권 이미지"
        />
        상품권 이미지 변경: <input type="file" accept="image/*" ref={imgRef} />
        <br />
        상품권명 :
        <input type="text" ref={nameRef} defaultValue={state.data.GOODS_NAME} />
        <br />
        가격 :
        <input
          type="text"
          ref={priceRef}
          placeholder="숫자만 입력해주세요! ex)9000"
          defaultValue={state.data.GOODS_PRICE}
        />
        <br />
        <button onClick={updateGoods}>수정하기</button>
        <button onClick={deleteGoods}>삭제하기</button>
      </div>
    </div>
  );
};
export default GoodsView;
