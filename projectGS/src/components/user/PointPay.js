import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as server_bridge from '../../controller/server_bridge';
const PointPay = () => {
  const { state } = useLocation(); // 포인트 오더에서 넘겨받은 데이터
  // console.log('오더에서 넘겨받은 데이터', state);
  // console.log('타입', typeof state.state.article.GOODS_PRICE);
  const totalPrice = state.num.count * state.state.article.GOODS_PRICE;
  console.log('총금액', totalPrice);
  // 1000의 자리마다 ,를 찍어주는 정규식
  const addComma = (num) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  };
  // 포인트 가져오기 위한 작업
  const [point, setPoint] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserPoint();
    pointRegister();
  }, []);

  const user_id = window.sessionStorage.getItem('USER_ID');
  const user_idx = window.sessionStorage.getItem('USER_IDX');
  console.log('아이디', user_id);
  console.log('IDX', user_idx);
  const getUserPoint = async () => {
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    setPoint(response.data);
  };

  // 결제 버튼 누르면 팝업
  const nameRef = useRef();
  const phoneRef = useRef();

  const [lave, setLave] = useState(0); //포인트를 보관할 state
  const pointRegister = async () => {
    //이건 맨처음에 포인트를 세팅해주는 함수
    //1. db랑 통신해서 유저 본인이 가진 포인트 리스트를 가져온다.
    const response = await server_bridge.axios_instace.post(
      '/pointlistbyuser',
      {
        user_id: user_id,
      },
    );
    //2. 가져온 포인트의 리스트를 반복문으로 돌리기 위해 변수에 담아준다.
    const point_list = response.data;
    console.log(point_list);
    //3. 포인트의 리스트를 반복문으로 돌려서 계산한다.
    let temp = 0; //반복문으로 돌려서 계산한 결과를 누적해서 담을 변수. temporary 의 약자로, 이렇게 임시로 사용할 변수는 코딩할때 temp라고 자주 주게됨.
    point_list.forEach((item) => {
      console.log('나옴', item);
      temp += parseInt(item.POINT_PLUS) - parseInt(item.POINT_MINUS);
    });
    //4. state 로 관리할 lave를 담아준다.
    setLave(temp);
  };

  const pointForm = async () => {
    //보유 포인트 계산
    let p = 0;
    point.forEach((item) => {
      p += parseInt(item.POINT_PLUS) - parseInt(item.POINT_MINUS);
    });
    const lave = p - totalPrice;

    console.log('보유', p);
    console.log('사용', totalPrice);
    console.log('잔여', lave);
    if (lave >= 0) {
      //잔여 포인트가 0 이상이면
      const response = await server_bridge.axios_instace.post('/insertpoint', {
        NOTIFY_IDX: null,
        USER_IDX: user_idx,
        POINT_PLUS: 0,
        POINT_MINUS: totalPrice,
        POINT_CHANGE: '테스트 포인트 차감',
      });
      console.log(response.data);
      if (response.data === 'success') {
        alert(`구매가 완료 되었습니다.`);
        // navigate('/');
      } else {
        alert('실패');
      }
    } else {
      //포인트가 부족하면
      alert('포인트 부족!');
    }
  };

  return (
    <div id="PointPay" className="subPage">
      <div className="subTop">
        <h1>포인트 사용</h1>
      </div>

      <div className="section">
        <div className="sub-title"><h2>상품권 결제하기</h2></div>

        <form>
          <div className="payWrap">
            <div className="orderWrap">
              <div className="orderList">
                <h3><span className="num">1</span>주문 내역 확인</h3>

                <table border="0" cellPadding="0" cellSpacing="0">
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
                      <td className="textLeft goods">
                        <div className="orderImg">
                          <img src={server_bridge.py_url + '/' + state.state.article.GOODS_IMG} alt="상품권이미지" />
                        </div>
                        <div className="orderGoods">
                          <span>소상공인시장진흥공단</span><br />
                          {state.state.article.GOODS_NAME}
                        </div>
                      </td>
                      <td>{state.num.count}</td>
                      <td>{addComma(state.state.article.GOODS_PRICE)}</td>
                      <td>
                        {addComma(state.state.article.GOODS_PRICE * state.num.count)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3" className="textRight">총 상품금액</th>
                      <td>
                        {/* 총 상품금액{' '} */}
                        <strong className="ft_og totalPrice">{addComma(state.state.article.GOODS_PRICE * state.num.count)}</strong> <i>point</i>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="orderInfo">
                <h3><span className="num">2</span>수신자 정보 입력</h3>

                <table border="0" cellPadding="0" cellSpacing="0">
                  <colgroup>
                    <col width="20%;" />
                    <col />
                  </colgroup>
                  <tr>
                    <th>받는 분</th>
                    <td><input type="text" ref={nameRef} /></td>
                  </tr>
                  <tr>
                    <th>휴대폰 번호</th>
                    <td><input type="text" ref={phoneRef} /></td>
                  </tr>
                </table>
              </div>
            </div>


            <div className="userPoint">
              <h3><span className="num">3</span>결제하기</h3>

              <table border="0" cellPadding="0" cellSpacing="0">
                <tr>
                  <td></td>
                  <th>보유 포인트</th>
                  <td>{addComma(lave)} <i>point</i></td>
                </tr>
                <tr>
                  <td>-</td>
                  <th>사용 포인트</th>
                  <td>{addComma(totalPrice)} <i>point</i></td>
                </tr>
                <tr>
                  <td>=</td>
                  <th>잔여 포인트</th>
                  <td>{addComma(lave - totalPrice)} <i>point</i></td>
                </tr>
              </table>

              <button type="button" onClick={pointForm} className="btn btn-navy">결제하기</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
export default PointPay;
