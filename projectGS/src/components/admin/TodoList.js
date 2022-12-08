import React from 'react';
// import '../../css/todoList.css';
import { useEffect } from 'react';
import $ from 'jquery';

export default function TodoList({ data }) {
  useEffect(() => {
    //animate('.todoCnt1', data.c1_sum)//이런식으로 하면 되지 싶음?
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
  // 코드를 줄이고 싶다,,
  $({ val: 0 }).animate(
    { val: data.c1_sum },
    {
      duration: 400,
      step: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt1').text(num);
      },
      complete: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt1').text(num);
      },
    },
  );

  $({ val: 0 }).animate(
    { val: data.c2_sum },
    {
      duration: 400,
      step: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt2').text(num);
      },
      complete: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt2').text(num);
      },
    },
  );

  $({ val: 0 }).animate(
    { val: data.c3_sum },
    {
      duration: 400,
      step: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt3').text(num);
      },
      complete: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt3').text(num);
      },
    },
  );

  $({ val: 0 }).animate(
    { val: data.c4_sum },
    {
      duration: 400,
      step: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt4').text(num);
      },
      complete: function () {
        var num = numberWithCommas(Math.floor(this.val));
        $('.todoCnt4').text(num);
      },
    },
  );

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
