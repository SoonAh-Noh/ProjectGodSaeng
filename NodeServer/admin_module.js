let adminModule = {};

adminModule.getNotifyList = function (req, res, db) {
  //신고 리스트 가져오기
  const where_clause = req.body.where_clause; //사용자 아이디

  let _where = `WHERE A.NOTIFY_DATE>=${where_clause.start_date} AND A.NOTIFY_DATE <= ${where_clause.end_date}
                AND D.CATEGORY = ${where_clause.category}
                AND C.NOTIFY_STATUS = ${where_clause.process};
                `;

  const sqlQuery = `SELECT A.NOTIFY_IDX, A.CAR_NUM, A.NOTIFY_DATE, A.NOTIFY_SPOT, A.NOTIFY_TXT, NOTIFY_RESULT,
                           B.USER_IDX, B.USER_NAME, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                           C.NOTIFY_STATUS,
                           D.CATEGORY
                    FROM   NOTIFY AS A
                           INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX
                           INNER JOIN PROCESS AS C ON A.NOTIFY_PNUM = C.NOTIFY_PNUM
                           INNER JOIN CATEGORY AS D ON A.CATEGORY_IDX = D.CATEGORY_IDX;`;
  console.log(sqlQuery);
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    if (err) res.send("err : " + err);
    else res.send(result);
  });
};

adminModule.update_noti = function (req, res, db) {
  //신고 리스트 수정하기
  const set_clause = req.body.set_clause; //수정할 데이터 정보

  const sqlQuery = `UPDATE NOFITY SET 
                        CATEGORY_IDX = ${set_clause.category}, 
                        NOTIFY_PNUM = ${set_clause.process}, 
                        NOTIFY_RESULT = ${set_clause.result}
                     WHERE NOTIFY_IDX = ${set_clause.notify_idx};`;

  db.query(sqlQuery, (err, result) => {
    if (err) res.send("err : " + err);
    else res.send(result);
  });
};

adminModule.upload_board = function (req, res, db, filedir) {
  //게시글(공지사항)업로드
  title = req.body.title;
  content = req.body.content;
  user_idx = req.body.user_idx;
  const sqlQuery = `INSERT INTO BOARD(BOARD_TIT, BOARD_TXT, USER_IDX, BOARD_FILE)
                    VALUES(?, ?, ?, ? );`;
  db.query(sqlQuery, [title, content, user_idx, filedir], (err, result) => {
    if (err) res.send("err : " + err);
    else res.send("success");
  });
};

adminModule.delete_board = function (req, res, db) {
  //게시글(공지사항)업로드
  board_idx = req.body.board_idx;
  const sqlQuery = `DELETE FROM BOARD WHERE BOARD_IDX=?;`;
  db.query(sqlQuery, [board_idx], (err, result) => {
    if (err) res.send("err : " + err);
    else res.send("success");
  });
};

adminModule.update_board = function (req, res, db, filedir) {
  //게시글(공지사항)수정
  title = req.body.title;
  content = req.body.content;
  user_idx = req.body.user_idx;
  board_idx = req.body.board_idx;
  filemode = req.body.filemode;
  file_txt = "";
  input_arr = [title, content, user_idx];
  console.log(filemode);
  if (parseInt(filemode) == 1) {
    file_txt = ", BOARD_FILE = ?";
    input_arr[3] = filedir;
    input_arr[4] = board_idx;
  } else if (parseInt(filemode) == 2) {
    file_txt = ", BOARD_FILE = ?";
    input_arr[3] = "";
    input_arr[4] = board_idx;
  } else {
    input_arr[3] = board_idx;
  }

  const sqlQuery = "UPDATE BOARD SET BOARD_TIT=?, BOARD_TXT=?, USER_IDX=?" + file_txt + " WHERE BOARD_IDX=?;";
  console.log(sqlQuery);
  console.log(filedir);
  db.query(sqlQuery, input_arr, (err, result) => {
    if (err) res.send("err : " + err);
    else res.send("success");
  });
};

adminModule.update_noti = function (req, res, db) {
  //신고 리스트 수정하기
  const set_clause = req.body.set_clause; //수정할 데이터 정보

  const sqlQuery = `UPDATE NOFITY SET 
                        CATEGORY_IDX = ${set_clause.category}, 
                        NOTIFY_PNUM = ${set_clause.process}, 
                        NOTIFY_RESULT = ${set_clause.result}
                     WHERE NOTIFY_IDX = ${set_clause.notify_idx};`;
  console.log(sqlQuery);

  db.query(sqlQuery, (err, result) => {
    if (err) res.send("err : " + err);
    else res.send(result);
  });
};

adminModule.get_board_list = function (req, res, db) {
  //게시글(공지사항)리스트 조회
  where_clause = req.body.is_searching == 1 ? req.body.where_clause : "";
  const sqlQuery =
    `SELECT 
              A.BOARD_IDX AS BOARD_IDX,
              date_format(A.BOARD_DATE, '%Y-%m-%d') AS BOARD_DATE,
              A.BOARD_TIT AS BOARD_TIT,
              B.USER_NAME AS USER_NAME
    FROM BOARD AS A
                   INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX ` +
    where_clause +
    " ORDER BY BOARD_IDX DESC;";

  db.query(sqlQuery, (err, result) => {
    if (err) res.send("err : " + err);
    else res.send(result);
  });
};

adminModule.get_board_data = function (req, res, db) {
  //게시글(공지사항)리스트 조회
  board_idx = req.body.board_idx;
  const sqlQuery = `SELECT 
            A.BOARD_IDX AS BOARD_IDX,
            date_format(A.BOARD_DATE, '%Y-%m-%d %H:%i:%S') AS BOARD_DATE,
            A.BOARD_TIT AS BOARD_TIT,
            B.USER_NAME AS USER_NAME,
            A.USER_IDX AS USER_IDX,
            A.BOARD_TXT AS BOARD_TXT,
            A.BOARD_FILE AS BOARD_FILE
        FROM BOARD AS A
         INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX 
        WHERE A.BOARD_IDX = ${board_idx};`;

  db.query(sqlQuery, (err, result) => {
    if (err) res.send("err : " + err);
    else res.send(result);
  });
};

module.exports = adminModule;
