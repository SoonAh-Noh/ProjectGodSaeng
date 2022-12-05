import React, { useState, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as server_bridge from '../../controller/server_bridge';

import checkIcon from "../../images/check.png";
import "../../css/user/sub.scss";

const ReportEnd = () => {


    return (
    <div id="ReportEnd" className="subPage">
      <div className="subTop">
        <h1>불법주정차 신고</h1>
        <ul>
          <li className="on"><a href="report">불법주정차 신고</a></li>
          <li><a href="/quickreport">공유킥보드 신고</a></li>
        </ul>
      </div>

      <div className="container section">
        <div className="sub-title"><h2>불법주정차 신고</h2></div>

        <div className="reportProcess">
          <ul>
            <li><span>1</span>신고서 작성</li>
            <li><i></i><i></i><i></i></li>
            <li className="on"><span>2</span>접수 완료</li>
          </ul>
        </div>

        <div className="resultBox">
            <img src={checkIcon} alt="체크표시" />
            <h2>신고가 정상적으로 접수되었습니다. <br />접수번호는 <strong className="ft_og">욕심</strong> 입니다.</h2>
        </div>

        <div className="btn-wrap">
          <a className="btn btn-navy" href="/">메인으로</a>
        </div>
      </div>
    </div>
  );
};

export default ReportEnd;
