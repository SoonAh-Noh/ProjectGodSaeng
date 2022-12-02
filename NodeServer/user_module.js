let userModule = {};

userModule.getUser = function (req, res, db) {
  //회원 정보 가져오기
  const id = req.body.id; //사용자 아이디

  const sqlQuery = `SELECT * FROM USER
                    WHERE USER_ID = '${id}';`;
  console.log(sqlQuery);
  //넘겨받은 db 객체 프로퍼티로 작업 수행
  db.query(sqlQuery, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
};
userModule.login = function (req, res, db) {
  console.log("/login =>", req.body);
  var id = req.body.id;
  var pw = req.body.pw;

  const sqlQuery = "SELECT * FROM USER WHERE USER_ID=? AND USER_PW=?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    console.log(result);
    console.log(typeof result);
    res.send(result);
  });
};

module.exports = userModule;
