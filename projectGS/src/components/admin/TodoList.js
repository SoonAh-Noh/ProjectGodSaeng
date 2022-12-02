import React from 'react';
import '../../css/todoList.css';
import { useEffect } from 'react';

export default function TodoList({ data }) {
  return (
    <div className="todoList">
      <div className="todoTitle">현재 진행중인 건</div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="newList">신규</span>
          <span className="newCount">{data.c1_sum}</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="progressList">담당자배정</span>
          <span className="progressCount">{data.c2_sum}</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="dropList">처리중</span>
          <span className="dropCount">{data.c3_sum}</span>
        </div>
      </div>
      <div className="todoListItem">
        <div className="todoContainer">
          <span className="finishList">완료</span>
          <span className="finishCount">{data.c4_sum}</span>
        </div>
      </div>
    </div>
  );
}
