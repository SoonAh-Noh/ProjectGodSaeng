import React from "react";
import "../../css/notifyListWidgets.css";

export default function NotifyListWidgets() {
  return (
    <div className="notifyListWidgets">
      <span className="notifyListTitle">신고내역</span>
      <ul className="notifyListAll">
        <li className="notifyListItem">
          <img
            src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="이미지 없음"
            className="notifyListImg"
          />
          <div className="notifyListContent">
            <span className="notifyListHeading">제목</span>
            <span className="notifyListSubstance">내용</span>
          </div>
        </li>
        <li className="notifyListItem">
          <img
            src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="이미지 없음"
            className="notifyListImg"
          />
          <div className="notifyListContent">
            <span className="notifyListHeading">제목</span>
            <span className="notifyListSubstance">내용</span>
          </div>
        </li>
        <li className="notifyListItem">
          <img
            src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="이미지 없음"
            className="notifyListImg"
          />
          <div className="notifyListContent">
            <span className="notifyListHeading">제목</span>
            <span className="notifyListSubstance">내용</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
