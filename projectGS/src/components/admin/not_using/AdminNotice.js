import React from "react";
import "../../css/adminNotice.css";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "heading", headerName: "Heading", width: 700 },
  { field: "writer", headerName: "Writer", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: () => {
      return (
        <>
          <button className="noticeEdit">Edit</button>
          {/* <button className="noticeDelete">Delete</button> */}
          <DeleteIcon className="noticeDelete" />
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    heading: "전동 킥보드 안전 수칙",
    writer: "관리자",
    date: "2022.05.12",
  },
  {
    id: 2,
    heading: "주정차 단속 근거 법률",
    writer: "관리자",
    date: "2022.05.01",
  },
  {
    id: 3,
    heading: "단속시간 및 탄력적 주차허용 공간",
    writer: "관리자",
    date: "2022.04.27",
  },
];

export default function Notice() {
  return (
    <div className="adminNotice">
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
