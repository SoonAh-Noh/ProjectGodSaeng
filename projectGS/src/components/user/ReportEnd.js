import React, { useState, useRef, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as server_bridge from '../../controller/server_bridge';

import checkIcon from '../../images/check.png';
import '../../css/user/sub.scss';

const ReportEnd = () => {
  const [idx, setIdx] = useState();
  const { state } = useLocation();

  useEffect(() => {
    notifyidx();
    console.log(state);
  }, []);

  const notifyidx = async () => {
    const res = await server_bridge.axios_instace.post('./notifyidx', {
      user_idx: window.sessionStorage.getItem('USER_IDX'),
      user_name: state.is_non_member ? state.name : '',
    });
    setIdx(res.data[0].NOTIFY_IDX);
    console.log('나와라', res.data[0]);
  };

  console.log(idx);
  return (
    <div id="ReportEnd" className="subPage">
      <div className="subTop">
        <h1>불법주정차 신고</h1>
        <ul>
          <li className="on">
            <a href="report">불법주정차 신고</a>
          </li>
          <li>
            <a href="/quickreport">공유킥보드 신고</a>
          </li>
        </ul>
      </div>

      <div className="container section">
        <div className="sub-title">
          <h2>불법주정차 신고</h2>
        </div>

        <div className="reportProcess">
          <ul>
            <li>
              <span>1</span>신고서 작성
            </li>
            <li>
              <i></i>
              <i></i>
              <i></i>
            </li>
            <li className="on">
              <span>2</span>접수 완료
            </li>
          </ul>
        </div>

        <div className="resultBox">
          <img src={checkIcon} alt="체크표시" />
          <h2>
            신고가 정상적으로 접수되었습니다. <br />
            접수번호는 <strong className="ft_og">{idx}</strong>
            입니다.
          </h2>
        </div>

        <div className="btn-wrap">
          <a className="button btn btn-navy" href="/">
            메인으로
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportEnd;
