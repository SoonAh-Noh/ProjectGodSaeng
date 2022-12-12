import React from 'react';
// import '../../css/todoList.css';
import { useEffect } from 'react';
import $ from 'jquery';

export default function TodoList({ data }) {
  useEffect(() => {
    animate('.todoCnt1', data.c1_sum);
    animate('.todoCnt2', data.c2_sum);
    animate('.todoCnt3', data.c3_sum);
    animate('.todoCnt4', data.c4_sum);
  }, []);

  const animate = (c_name, data) => {
    $({ val: 0 }).animate(
      { val: data },
      {
        duration: 400,
        step: function () {
          var num = numberWithCommas(Math.floor(this.val));
          $(c_name).text(num);
        },
        complete: function () {
          var num = numberWithCommas(Math.floor(this.val));
          $(c_name).text(num);
        },
      },
    );
  };

  // 천단위 컴마
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className="todoList">
      <div className="todoTitle">
        <h3>신고 처리 현황</h3>
      </div>
      <div className="todoListItem">
        <div className="todoContainer tc1">
          <span className="newList cTitle">신규</span>
          <span className="newCount todoCnt todoCnt1">{data.c1_sum}</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer tc2">
          <span className="progressList cTitle">담당자배정</span>
          <span className="progressCount todoCnt todoCnt2">{data.c2_sum}</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer tc3">
          <span className="dropList cTitle">처리중</span>
          <span className="dropCount todoCnt todoCnt3">{data.c3_sum}</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer tc4">
          <span className="finishList cTitle">완료</span>
          <span className="finishCount todoCnt todoCnt4">{data.c4_sum}</span>
        </div>
      </div>
    </div>
  );
}
