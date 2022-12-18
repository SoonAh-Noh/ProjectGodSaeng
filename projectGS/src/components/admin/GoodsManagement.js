import * as server_bridge from '../../controller/server_bridge';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    // if (window.confirm('정말로 삭제하시겠습니까?')) {
    //   const response = await server_bridge.axios_instace.post('/deletegoods', {
    //     goods_idx: goods_idx,
    //   });
    //   if (response.data === 'success') {
    //     alert('삭제 성공!');
    //     getGoodsList();
    //   } else {
    //     alert('삭제 실패!');
    //   }
    // }
    Swal.fire({
      icon: 'warning',

      title: '정말로 삭제하시겠습니까?',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '승인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      if (result.isConfirmed) {
        server_bridge.axios_instace
          .post('/deletegoods', {
            goods_idx: goods_idx,
          })
          .then((res) => {
            if (res.data === 'success') {
              server_bridge.normalInfoAlert('삭제 성공!');
              navigate('/admin/goodsmanage');
            } else {
              server_bridge.normalAlert('삭제실패!' + '\r\n' + res.data);
            }
          });
      }
    });
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
      server_bridge.normalAlert('숫자만 입력해주세요!!');
      return;
    }
    const response = await server_bridge.axios_instace.post(
      '/insertgoods',
      formData,
    );
    if (response.data === 'success') {
      server_bridge.normalInfoAlert('등록 성공!');
      getGoodsList();
    } else {
      alert('등록 실패!');
      server_bridge.normalAlert('등록실패!' + '\r\n' + response.data);
    }
  };

  return (
    <div className="Goods Contents">
      <div className="adminTitle">
        <h3>상품권 관리</h3>
      </div>

      <div className="pageWrap subPageWrap adminSearchBar">
        <div>
          <div className="subTitle subTitle2">
            <h3>상품권 추가하기</h3>
          </div>

          <div className="searchContents">
            <div className="searchBox">
              <div className="searchType">
                <h4>상품권 이미지</h4>
              </div>
              <div className="goodsImgUp">
                <input
                  type="file"
                  accept="image/*"
                  ref={imgRef}
                  id="goodsImg"
                />
                <label htmlFor="goodsImg">
                  <i className="xi-image-o"></i>이미지 선택
                </label>
              </div>
            </div>
            <div className="searchBox">
              <div className="searchType">
                <h4>상품권 명</h4>
              </div>
              <input type="text" ref={nameRef} />
            </div>
            <div className="searchBox">
              <div className="searchType">
                <h4>가격</h4>
              </div>
              <input
                type="text"
                ref={priceRef}
                placeholder="숫자만 입력해주세요! (ex. 9000)"
              />
            </div>
          </div>
          <div className="adminBtnWrap">
            <button onClick={insertGoods} className="adminBtn adminBtn2">
              추가하기
            </button>
          </div>
        </div>
      </div>

      <div className="pageWrap subPageWrap">
        <div className="subTitle subTitleFlex">
          <h3>상품 리스트</h3>
          <div className="totalNumber">
            <p>총 {goods.length}건</p>
          </div>
        </div>
        <div className="goodsList">
          {typeof goods !== 'string' && goods.length > 0 ? (
            goods.map((item, idx) => (
              <div className="goodsWrap">
                <div
                  key={idx}
                  onClick={() =>
                    navigate('/admin/goodsview', { state: { data: item } })
                  }
                  className="goodsBox"
                >
                  <div className="goodsImg">
                    <img
                      src={server_bridge.py_url + '/' + item.GOODS_IMG}
                      alt="상품권 이미지"
                    />
                  </div>
                  <div className="goodsInfo">
                    <h4>{item.GOODS_NAME}</h4>
                    <p>{item.GOODS_PRICE} 원</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteGoods(item.GOODS_IDX)}
                  className="btnTrash"
                  title="삭제하기"
                >
                  <i className="xi-trash-o"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="noSearch noSearch2">
              <p>등록된 상품이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GoodsManagement;
