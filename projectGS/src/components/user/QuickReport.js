import React, { useState, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as server_bridge from '../../controller/server_bridge';
import Swal from 'sweetalert2';
import '../../css/user/sub.scss';

const QuickReport = () => {
  // ==============================================
  const navigate = useNavigate();

  const imgRef = useRef();
  const companyRef = useRef();
  const notifySpotRef = useRef();
  const notifyDateRef = useRef();
  const notifyTxtRef = useRef();
  const userTelRef = useRef();
  const btnRef = useRef();

  // 이미지 파일 업로드 & 미리보기 =====================================
  const [imageSrc, setImageSrc] = useState('');
  //221208 선우 - 이미지 인식을 위해 업로드한 파일의 경로를 저장하는 state
  const [uploadedSrc, setUploadedSrc] = useState('');

  const saveImage = async (e) => {
    //번호판 인식
    //const plateImg = imgRef.current.files[0];
    const plateImg = e.target.files[0];

    const formData = new FormData(); //서버에 넘겨줄 데이터 객체
    formData.append('img', plateImg);

    setImageSrc(server_bridge.py_url + '/static/images/loading.gif'); //로딩중 이미지 세팅

    const response = await server_bridge.axios_instace.post(
      //서버에 번호판 인식 요청
      '/savequick',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    const result = response.data; // {dir : "파일이 저장된 경로", result:"번호판 인식 결과"}

    encodeFileToBase64(plateImg); //번호판 이미지 세팅
    setUploadedSrc(result.dir); //저장된 번호판 이미지파일의 경로를 세팅
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const writeReport = async (e) => {
    e.preventDefault();
    // 사진 업로드 확인
    if (imgRef.current.value === '' || imgRef.current.value === undefined) {
      // alert('불법주정차 공유킥보드 사진을 등록하세요');
      Swal.fire({
        title: '불법주정차 공유킥보드 사진을 등록하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      imgRef.current.focus();
      return false;
    }

    // 회사명 입력 확인
    if (
      companyRef.current.value === '' ||
      companyRef.current.value === undefined
    ) {
      // alert('킥보드 회사명을 입력하세요');
      Swal.fire({
        title: '킥보드 회사명을 입력하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      companyRef.current.focus();
      return false;
    }

    // 발생일자 입력 확인
    if (
      notifyDateRef.current.value === '' ||
      notifyDateRef.current.value === undefined
    ) {
      // alert('발생일자를 입력하세요');
      Swal.fire({
        title: '발생일자를 입력하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      notifyDateRef.current.focus();
      return false;
    }

    // 발생지역 입력 확인
    if (
      notifySpotRef.current.value === '' ||
      notifySpotRef.current.value === undefined
    ) {
      // alert('발생지역을 입력하세요');
      Swal.fire({
        title: '발생지역을 입력하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      notifySpotRef.current.focus();
      return false;
    }

    // 신고내역 입력 확인
    if (
      notifyTxtRef.current.value === '' ||
      notifyTxtRef.current.value === undefined
    ) {
      // alert('신고내용을 입력하세요');
      Swal.fire({
        title: '신고내용을 입력하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      notifyTxtRef.current.focus();
      return false;
    }

    // 휴대폰 번호 입력 확인
    if (
      userTelRef.current.value === '' ||
      userTelRef.current.value === undefined
    ) {
      // alert('휴대폰 번호를 입력하세요');
      Swal.fire({
        title: '휴대폰 번호를 입력하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      userTelRef.current.focus();
      return false;
    }

    // 개인정보 수집 동의 체크 확인
    if (btnRef.current.checked === false) {
      // alert('개인정보 수집 동의하세요');
      Swal.fire({
        title: '개인정보 수집 동의하세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
      userTelRef.current.focus();
      return false;
    }

    const formData = new FormData(); //서버에 넘겨줄 데이터 객체
    //221208 선우 - 카테고리는 없지만 넣어야하므로 고정값으로 "기타"에 해당
    formData.append('category', 10);
    // formData.append('img', imgRef.current.files[0]);
    // formData.append('img_path', imgRef.current.files[0].name);
    formData.append('img_path', uploadedSrc);
    //221130 선우 - 번호판 인식을 위해 이미 파일 업로드를 했으므로 다시 업로드할 필요가 없음
    console.log('이미지파일 이름', imgRef.current.files[0].name); // 파일명 확인
    //221208 선우 - 원래는 회사명이지만 회사명 컬럼이 따로 없기때문에 차량번호 컬럼에 저장
    formData.append('carNum', companyRef.current.value);
    formData.append('notifySpot', notifySpotRef.current.value);
    formData.append('notifyDate', notifyDateRef.current.value);
    formData.append('notifyTxt', notifyTxtRef.current.value);

    // 221208 선우 비회원의 회원가리 처리용 데이터
    formData.append(
      'user_idx',
      window.sessionStorage.getItem('USER_IDX') !== null
        ? window.sessionStorage.getItem('USER_IDX')
        : 'null',
    ); //비회원 신고일경우 'null'
    formData.append('user_tel', userTelRef.current.value); //비회원이던 아니던 전화번호는 일단 보낸다.

    let timestamp = '';
    timestamp += Date.now();
    let name = 'member_' + timestamp; //비회원용 아이디, 이름
    formData.append(
      'user_name',
      window.sessionStorage.getItem('USER_IDX') === null ? name : '',
    ); //비회원 신고용 user_name

    console.log(window.sessionStorage.getItem('USER_IDX'));

    const res = await server_bridge.axios_instace.post('/report', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (res.data === 'success') {
      console.log('성공', res.data);
      // alert('신고 접수가 완료되었습니다.');
      navigate('/reportend', {
        state: {
          is_non_member:
            window.sessionStorage.getItem('USER_IDX') === null ? true : false,
          name: name,
        },
      });
      //반약에 비회원 신고였을 경우에는 여기서 미리 설정한 비회원 아이디를 넘겨줘서
      //신고 완료 페이지에서 비회원신고일 경우 회원번호를 state로 넘겨준 비회원아이디로 검색한다.
    } else {
      console.log('실패', res.data);
      // alert('신고 접수가 정상적으로 이루어지지 않았습니다.');
      Swal.fire({
        title: '신고 접수가 정상적으로 이루어지지 않았습니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#191d73',
        backdrop: `rgba(0,0,0,0.4)`,
      });
    }
    // navigate('/');
  };

  // 카카오 주소 검색 API ===============================================
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState('');
  const selectAddress = (data) => {
    // console.log(`
    //             주소: ${data.address},
    //             우편번호: ${data.zonecode}
    //         `);
    setOpenPostcode(false);
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },
    // // 주소 선택 이벤트
    // selectAddress: (data) => {
    //   console.log(`
    //             주소: ${data.address},
    //             우편번호: ${data.zonecode}
    //         `);
    // },
  };

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    setOpenPostcode(false);
  };

  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  // const toggleOn = (e) => {
  //   e.target.classList.toggle('on');
  // }

  // 개인정보 동의 내용 숨기기
  const [value, setValue] = useState(true);
  function onClickHide(e) {
    setValue((value) => !value);
    e.target.classList.toggle('on');
  }

  // 달력 미래 선택 금지
  const now_utc = Date.now(); // 지금 날짜를 밀리초로
  // getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
  const timeOff = new Date().getTimezoneOffset() * 60000; // 분단위를 밀리초로 변환
  // new Date(now_utc-timeOff).toISOString()은 '2022-12-07T11:07:00.134Z'를 반환
  const today = new Date(now_utc - timeOff).toISOString().substring(0, 16);

  return (
    <div id="Report" className="subPage">
      <div className="subTop">
        <h1>공유킥보드 신고</h1>
        <ul>
          <li>
            <a href="/report">불법주정차 신고</a>
          </li>
          <li className="on">
            <a href="/quickreport">공유킥보드 신고</a>
          </li>
        </ul>
      </div>

      <div className="container section">
        <div className="sub-title">
          <h2>공유킥보드 신고</h2>
        </div>

        <div className="reportProcess">
          <ul>
            <li className="on">
              <span>1</span>신고서 작성
            </li>
            <li>
              <i></i>
              <i></i>
              <i></i>
            </li>
            <li>
              <span>2</span>접수 완료
            </li>
          </ul>
        </div>

        <div className="reportForm">
          <form onSubmit={writeReport}>
            <div className="row">
              <div className="col-2 col-sm-12">
                <div className="rTitle">
                  <h3>사진 업로드</h3>
                </div>
              </div>
              <div className="col-10 col-sm-12">
                <input
                  className="img reportImg"
                  name="img"
                  id="img"
                  ref={imgRef}
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                />

                {imageSrc && (
                  <div className="viewImg">
                    <img src={imageSrc} alt="preview-img" />
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-2 col-sm-12">
                <div className="rTitle">
                  <h3>킥보드 회사</h3>
                </div>
              </div>

              <div className="col-10 col-sm-12">
                <div className="inputWrap">
                  <input
                    className="carNum"
                    name="carNum"
                    ref={companyRef}
                    type="text"
                    placeholder="킥보드 회사명을 입력해주세요"
                    value={text}
                    onChange={onChange}
                  />
                  {/* <input type="button" className="inputBtn" value="수정" onClick={onReset} /> */}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-2 col-sm-12">
                <div className="rTitle">
                  <h3>발생 일자</h3>
                </div>
              </div>
              <div className="col-10 col-sm-12">
                <input
                  className="notifyDate half"
                  name="notifyDate"
                  type="datetime-local"
                  max={today}
                  ref={notifyDateRef}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-2 col-sm-12">
                <div className="rTitle">
                  <h3>발생 지역</h3>
                </div>
              </div>
              <div className="col-10 col-sm-12">
                <div className="inputWrap inputWrap2">
                  <input
                    className="notifySpot"
                    name="notifySpot"
                    ref={notifySpotRef}
                    type="text"
                    placeholder="장소를 입력해주세요"
                    onClick={handle.clickButton}
                    defaultValue={address}
                  />
                  <input
                    type="button"
                    className="inputBtn"
                    value="우편번호 찾기"
                    onClick={handle.clickButton}
                  />
                </div>
                {openPostcode && (
                  <div className="postWrap">
                    <DaumPostcode
                      onComplete={onCompletePost} // 값을 선택할 경우 실행되는 이벤트
                      autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                      defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="row notAlign">
              <div className="col-2 col-sm-12">
                <div className="rTitle">
                  <h3>신고 내용</h3>
                </div>
              </div>
              <div className="col-10 col-sm-12">
                <textarea
                  className="notifyTxt"
                  name="notifyTxt"
                  ref={notifyTxtRef}
                  placeholder="위반 사항을 입력해주세요"
                />
              </div>
            </div>

            <div className="row notAlign">
              <div className="col-2 col-sm-12">
                <div className="rTitle">
                  <h3>휴대전화</h3>
                </div>
              </div>

              <div className="col-10 col-sm-12">
                <div className="col-12">
                  <input
                    className="userTel half"
                    name="userTel"
                    ref={userTelRef}
                    type="text"
                    placeholder="핸드폰 번호를 입력해주세요"
                  />
                </div>

                <div className="col-12">
                  {/* <input type="radio" id="checkOk" name="privacyCk" />
                  <label for="checkOk">예</label>
                  <input type="radio" id="checkNo" name="privacyCk" />
                  <label for="checkNo">아니오</label> */}

                  <div className="half checkWrap">
                    <input type="checkbox" id="checkOk" ref={btnRef} />
                    <label for="checkOk">개인정보 수집 동의</label>

                    <button
                      type="button"
                      className="privacyBtn"
                      onClick={onClickHide}
                    >
                      내용보기
                    </button>
                  </div>
                  {value === false && (
                    <div className="privacyTxt">
                      <strong>
                        1. 개인정보의 수집 및 이용 목적(개인정보보호법 제15조)
                      </strong>
                      <br />
                      안전꽹과리는 관계법령 등에서 정하는 소관 업무의 수행을
                      위하여 다음과 같이 개인정보를 수집 및 이용합니다. 수집된
                      개인정보는 정해진 목적 이외의 용도로는 이용되지 않으며
                      수집 목적이 변경될 경우 사전에 알리고 동의를 받을
                      예정입니다.
                      <br />※ 관계법령 등 : 민원사무 처리에 관한 법률 및 동법
                      시행령, 행정안전부의 설치와 운영에 관한 법률, 전자정부법
                      및 동법 시행령 등 <br />
                      <br />
                      가. 민원사무 접수·처리·사후관리 서비스 제공민원신청서에
                      포함된 개인정보는 민원의 접수·처리 등 소관 업무 수행을
                      위해 행정·공공기관에서 이용합니다. <br />
                      나. 타 행정·공공기관 시스템 이용민원사무의 전자적 처리를
                      위해 내부적으로 타 시스템 연계 및 이용 시 개인정보를
                      이용합니다. <br />
                      다. 안전꽹과리 정책지원 안전꽹과리 서비스 향상 및
                      정책평가를 위하여 접수된 민원은 관계 법령에 따라 분석·평가
                      및 처리결과의 사후관리를 시행합니다.
                      <br />
                      <br />
                      <strong>
                        2. 수집하는 개인정보의 항목(개인정보보호법 제15조,
                        제16조)
                      </strong>
                      <br />
                      가. 필수항목: 휴대전화 <br />
                      나. 선택항목: 성명, 기업명, 이메일 <br />
                      다. 자동수집항목: IP(Internet Protocol)주소, 이용내용의
                      기록- 부정한 방법으로 타인명의를 사용하는 경우에 대비하기
                      위해 정보이용내역 등을 자동수집 합니다. <br />※ 부정한
                      방법으로 타인명의 사용 시, 주민등록법 제37조(벌칙)에 의해
                      처벌 받을 수 있습니다. <br />
                      <br />
                      <strong>
                        3. 개인정보의 보유 및 이용기간(공공기록물 관리에 관한
                        법률 시행령 제26조)
                      </strong>
                      <br />
                      안전꽹과리는 원칙적으로 개인정보 보존기간이 경과하거나,
                      처리목적이 달성된 경우에는 지체 없이 개인정보를
                      파기합니다. 다만, 다른 법령에 따라 보존하여야 하는
                      경우에는 그러하지 않을 수 있습니다. <br />
                      1) 신고, 제안: 10년 <br />
                      2) 회원정보: 회원탈퇴시 즉시 파기 <br />
                      3) 자동수집항목 중 IP주소: 1년 <br />
                      4. 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른
                      불이익 내용(개인정보보호법 제16조) <br />
                      민원 신청 시 수집하는 필요한 최소한의 정보 외의 개인정보
                      수집에 동의를 거부할 권리가 있으나 최소한의 개인정보
                      수집동의 거부 시에는 민원 신청 서비스가 제한됩니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div>비고</div> */}

            <div className="btn-wrap">
              <button className="btn btn-navy">신고하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickReport;
