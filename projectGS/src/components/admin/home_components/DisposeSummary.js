const DisposeSummary = ({ data }) => {
  return (
    <div className="cell-b">
      <table border={1}>
        <thead>
          <tr>
            <th align="center">일자</th>
            <th align="center">신고접수</th>
            <th align="center">담당자배정</th>
            <th align="center">처리중</th>
            <th align="center">처리완료</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((val, idx) => (
              <tr key={idx}>
                <td align="center">{val.date}</td>
                <td align="center">{val.c1}</td>
                <td align="center">{val.c2}</td>
                <td align="center">{val.c3}</td>
                <td align="center">{val.c4}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default DisposeSummary;
