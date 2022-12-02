import React from "react";
import "../../css/summaryWidgets.css";

export default function SummaryWidgets() {
  return (
    <div className="summaryWidgets">
      <div className="summaryTitle">일자별 요약</div>
      <table className="summaryTable">
        <tr className="summaryTr">
          <th className="summaryDate">일자</th>
          <th className="summaryReceipt">접수</th>
          <th className="summaryProgress">진행</th>
          <th className="summaryDrop">취하</th>
          <th className="summaryFinish">완료</th>
        </tr>
        <tr className="summaryTr">
          <td className="summaryDate">0</td>
          <td className="summaryReceipt">0</td>
          <td className="summaryProgress">0</td>
          <td className="summaryDrop">0</td>
          <td className="summaryFinish">0</td>
        </tr>
        <tr className="summaryTr">
          <td className="summaryDate">0</td>
          <td className="summaryReceipt">0</td>
          <td className="summaryProgress">0</td>
          <td className="summaryDrop">0</td>
          <td className="summaryFinish">0</td>
        </tr>
      </table>
    </div>
  );
}
