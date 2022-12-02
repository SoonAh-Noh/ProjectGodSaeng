import pymysql
from werkzeug.utils import secure_filename
import time
import os

from pymysql.constants import CLIENT
import bcrypt
from datetime import datetime, timedelta

# 221123 선우 - 이제 사용 안하는게 좋을 것 같음
# 이유 => connection이 닫히지 않은 상태로 유지되어있어서 클라이언트에서 비동기로 요청을 2개 이상 보낼때 오류가 발생하게 됨.
# 따라서 db connecter 함수와 닫는 함수를 추가로 생성하여 db에 접근할 필요가 있을때마다 열고 닫는것을 반복하는 것이 좋음.
# db = pymysql.connect(
#     user='jsa_5',
#     passwd='godsang',
#     host='project-db-stu.ddns.net',
#     db='jsa_5',
#     charset='utf8',
#     port=3307
# )
# cursor = db.cursor(pymysql.cursors.DictCursor)  # 데이터 추출시에 dict 형식으로 추출할수 있게 해줌


def conn_db():  # 디비 커넥터(연결해주는 객체를 리턴)
    return pymysql.connect(
        user='jsa_5',
        passwd='godsang',
        host='project-db-stu.ddns.net',
        db='jsa_5',
        charset='utf8',

        port=3307,
        client_flag=CLIENT.MULTI_STATEMENTS,
    )


def close_conn(conn):  # 디비 커넥터를 받아와서 닫아줌
    conn.close()


def select_data():  # select 문 적용시의 사용 예제
    db = conn_db()  # 디비 연결
    # 커서(select 결과를 dict형태로 변환)생성
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM USER"  # 쿼리문
    cursor.execute(sql)  # sql문 구동
    res = cursor.fetchall()  # 구동한 sql문 결과를 변수에 받는다.
    close_conn(db)  # 연결한 디비를 닫는다.
    return res  # 받아온 결과를 리턴


def insert_data(data):  # insert 문 적용시의 사용예제
    db = conn_db()  # 디비 연결
    # 커서(select 결과를 dict형태로 변환)생성
    cursor = db.cursor(pymysql.cursors.DictCursor)
    insert_tuple = (data["USER_ID"], data["USER_PW"], data["USER_NAME"],
                    data["USER_TEL"], data["ADMIN_OX"], data["USER_OX"])  # 입력하고자 하는 데이터의 튜플
    sql = """
            INSERT INTO USER(`USER_ID`, `USER_PW`, `USER_NAME`, `USER_TEL`, `ADMIN_OX`, `USER_OX`)
            VALUES(%s, %s, %s, %s, %s, %s);
          """  # sql문

    try:  # 입력 성공/실패 시의 예외처리를 위한 try/except문
        cursor.execute(sql, insert_tuple)  # sql문 구동
        db.commit()  # 변동사항 저장(커밋)
        close_conn(db)  # 연결한 디비를 닫는다.
        return "success"  # 성공시에는 success 를 리턴
    except Exception as e:  # 실패시의 예외처리
        # 실패해도 db커넥터는 항상 닫아줘야함.(안닫혔음에도 새 디비 커넥터를 새로 생성하는 불상사 방지)
        close_conn(db)
        return "err : " + str(e)  # 에러 문구 리턴

# 221117 선우 여기서부터 관리자 기능


def get_noti4admin(where_clause):  # 안쓰는 함수
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """       SELECT A.NOTIFY_IDX, A.CAR_NUM, A.NOTIFY_DATE, A.NOTIFY_SPOT, A.NOTIFY_TXT, NOTIFY_RESULT,
                           B.USER_IDX, B.USER_NAME, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                           C.NOTIFY_STATUS,
                           D.CATEGORY
                    FROM   NOTIFY AS A
                           INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX
                           INNER JOIN PROCESS AS C ON A.NOTIFY_PNUM = C.NOTIFY_PNUM
                           INNER JOIN CATEGORY AS D ON A.CATEGORY_IDX = D.CATEGORY_IDX;"""

    _where = """WHERE A.NOTIFY_DATE>= %s AND A.NOTIFY_DATE <= %s
                AND D.CATEGORY = %s
                AND C.NOTIFY_STATUS = %s;
                """
    where_tuple = (where_clause["start_date"],
                   where_clause["end_date"],
                   where_clause["category"],
                   where_clause["process"])
    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_noti4admin(where_clause):
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """UPDATE NOFITY SET
                CATEGORY_IDX = %s,
                NOTIFY_PNUM = %s,
                NOTIFY_RESULT = %s
            WHERE NOTIFY_IDX = %s;"""

    where_tuple = (where_clause["start_date"],
                   where_clause["end_date"],
                   where_clause["category"],
                   where_clause["process"])
    try:
        cursor.execute(sql)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def insert_board(request):
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    form_data = request.form.to_dict()

    # file =request.files["notifile"]

    timestamp = int(time.time())
    path = "uploads/" + str(timestamp)
    _dir = '{"filename":"'+request.files["notifile"].filename+'","dir":"' + \
        path+"/"+request.files["notifile"].filename + \
        '"}' if request.files else ""

    if _dir != "":
        file = request.files["notifile"]
        filename = secure_filename(file.filename)
        os.makedirs(path, exist_ok=True)
        file.save(os.path.join(path, filename))

    sql = """INSERT INTO BOARD(BOARD_TIT, BOARD_TXT, USER_IDX, BOARD_FILE)
                    VALUES(%s, %s, %s, %s );"""

    insert_tuple = (form_data["title"],
                    form_data["content"],
                    form_data["user_idx"],
                    _dir)
    try:
        cursor.execute(sql, insert_tuple)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_board_list(where_clause):  # 공지사항 관리의 게시판 리스트
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """SELECT
              A.BOARD_IDX AS BOARD_IDX,
              date_format(A.BOARD_DATE, '%Y-%m-%d') AS BOARD_DATE,
              A.BOARD_TIT AS BOARD_TIT,
              B.USER_NAME AS USER_NAME
    FROM BOARD AS A
                   INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX """
    sql += where_clause + " ORDER BY BOARD_IDX DESC;"

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def select_board(board_idx):  # 게시판(공지사항)내용 상세보기(관리자)
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = """SELECT
              A.BOARD_IDX AS BOARD_IDX,
              date_format(A.BOARD_DATE, '%Y-%m-%d %H:%i:%S') AS BOARD_DATE,
              A.BOARD_TIT AS BOARD_TIT,
              B.USER_NAME AS USER_NAME,
              A.USER_IDX AS USER_IDX,
              A.BOARD_TXT AS BOARD_TXT,
              A.BOARD_FILE AS BOARD_FILE
    FROM BOARD AS A
                   INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX """
    sql += " WHERE A.BOARD_IDX = %s;" % (board_idx)

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def update_board(request):  # 공지사항(게시판) 수정
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    form_data = request.form.to_dict()

    # file =request.files["notifile"]

    timestamp = int(time.time())
    path = "uploads/" + str(timestamp)
    _dir = '{"filename":"'+request.files["notifile"].filename+'","dir":"' + \
        path+"/"+request.files["notifile"].filename + \
        '"}' if request.files else ""

    if _dir != "":
        file = request.files["notifile"]
        filename = secure_filename(file.filename)
        os.makedirs(path, exist_ok=True)
        file.save(os.path.join(path, filename))

    board_idx = form_data["board_idx"]
    filemode = form_data["filemode"]
    file_txt = ""

    input_arr = [form_data["title"],
                 form_data["content"], form_data["user_idx"]]

    if int(filemode) == 1:
        file_txt = ", BOARD_FILE = %s"
        input_arr.append(_dir)
        input_arr.append(board_idx)
    elif int(filemode) == 2:
        file_txt = ", BOARD_FILE = %s"
        input_arr.append("")
        input_arr.append(board_idx)
    else:
        input_arr.append(board_idx)

    sql = "UPDATE BOARD SET BOARD_TIT=%s, BOARD_TXT=%s, USER_IDX=%s" + \
        file_txt + " WHERE BOARD_IDX=%s;"

    insert_tuple = tuple(input_arr)
    try:
        cursor.execute(sql, insert_tuple)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def delete_board(data):  # 공지사항(게시판) 삭제

    # file =request.files["notifile"]
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = "DELETE FROM BOARD WHERE BOARD_IDX=%d;" % (int(data["board_idx"]))
    print(sql)

    try:
        cursor.execute(sql)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        return "err : " + str(e)


def join(data):  # 회원가입
    print("회원가입 데이터야 나와랏", data)
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)
    pw = (bcrypt.hashpw(data["pw"].encode('UTF-8'),
          bcrypt.gensalt())).decode('utf-8')
    print(pw)
    join_tuple = (data["id"], data["pw"], data["name"],
                  data["mail"], data["tel"], "O")  # 입력하고자 하는 데이터의 튜플
    sql = """
            INSERT INTO USER(`USER_ID`, `USER_PW`, `USER_NAME`, `USER_MAIL`, `USER_TEL`, `USER_OX`)
            VALUES(%s, %s, %s, %s, %s, %s);
          """

    try:
        cursor.execute(sql, join_tuple)
    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_cate_list():  # 카테고리 리스트
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = "SELECT * FROM CATEGORY;"
    cursor.execute(sql)
    res = cursor.fetchall()
    close_conn(db)
    return res


def get_process_list():  # 신고 프로세스 리스트
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = "SELECT * FROM PROCESS;"
    cursor.execute(sql)
    res = cursor.fetchall()
    close_conn(db)
    return res


def get_dispose_list(body_data):  # 신고 리스트
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """   SELECT
                    A.NOTIFY_IDX, A.USER_IDX, B.USER_NAME, B.USER_ID, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                    A.CATEGORY_IDX, C.CATEGORY, A.CAR_NUM, 
                    date_format(A.NOTIFY_DATE, '%Y-%m-%d %H:%i:%S') AS NOTIFY_DATE, 
                    A.NOTIFY_SPOT,
                    A.NOTIFY_TXT, A.NOTIFY_PNUM, D.NOTIFY_STATUS, A.NOTIFY_RESULT,
                    E.IMG_IDX, E.IMG_PATH                    
                FROM IMG AS E
                    LEFT JOIN NOTIFY    AS A ON E.NOTIFY_IDX    = A.NOTIFY_IDX
                    LEFT JOIN USER      AS B ON A.USER_IDX      = B.USER_IDX
                    LEFT JOIN CATEGORY  AS C ON A.CATEGORY_IDX  = C.CATEGORY_IDX
                    LEFT JOIN PROCESS   AS D ON A.NOTIFY_PNUM   = D.NOTIFY_PNUM """
    cate = body_data["category"]
    proc = list(body_data["process"])
    start_date = body_data["range"]["start_date"]
    end_date = body_data["range"]["end_date"]
    mode = body_data["mode"]
    user_id = body_data["user_id"]

    where_cate = " A.CATEGORY_IDX = " + str(cate) if cate != "" else ""
    where_proc = ""

    if len(proc) > 0:
        where_proc += "("
        for idx, proc_val in enumerate(proc):
            if idx != 0:
                where_proc += " OR "
            where_proc += " A.NOTIFY_PNUM = " + str(proc_val)
        where_proc += ")"

    where_start_date = " A.NOTIFY_DATE >='" + \
        start_date if start_date != "" else ""
    where_end_date = " A.NOTIFY_DATE <='"+end_date if end_date != "" else ""

    where_temp = ""

    if where_cate != "":
        where_temp += where_cate+" "
    if where_proc != "":
        if where_temp != "":
            where_temp += " AND "
        where_temp += where_proc+" "
    if where_start_date != "":
        if where_temp != "":
            where_temp += " AND "
        where_temp += ""+where_start_date + " 00:00:00' "
    if where_end_date != "":
        if where_temp != "":
            where_temp += " AND "
        where_temp += where_end_date + " 23:59:59' "

    # 사용자 / 관리자의 보여주는 범위 처리
    if mode == "user":
        if where_temp != "":
            where_temp += " AND "
        where_temp += f" B.USER_ID = '{user_id}'"

    if where_temp != "":
        sql += " WHERE " + where_temp + " "
    sql += " ORDER BY A.NOTIFY_IDX DESC;"

    print(sql)

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_dispose_list_detail(body_data):  # 신고내역상세보기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """   SELECT
                    A.NOTIFY_IDX, A.USER_IDX, B.USER_NAME, B.USER_ID, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                    A.CATEGORY_IDX, C.CATEGORY, A.CAR_NUM, 
                    date_format(A.NOTIFY_DATE, '%Y-%m-%d %H:%i:%S') AS NOTIFY_DATE, 
                    A.NOTIFY_SPOT,
                    A.NOTIFY_TXT, A.NOTIFY_PNUM, D.NOTIFY_STATUS, A.NOTIFY_RESULT,
                    E.IMG_IDX, E.IMG_PATH                    
                FROM IMG AS E
                    LEFT JOIN NOTIFY    AS A ON E.NOTIFY_IDX    = A.NOTIFY_IDX
                    LEFT JOIN USER      AS B ON A.USER_IDX      = B.USER_IDX
                    LEFT JOIN CATEGORY  AS C ON A.CATEGORY_IDX  = C.CATEGORY_IDX
                    LEFT JOIN PROCESS   AS D ON A.NOTIFY_PNUM   = D.NOTIFY_PNUM """

    sql += ' WHERE A.NOTIFY_IDX='+str(body_data["NOTIFY_IDX"])+";"

    print(sql)

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def update_dispose(body_data):  # 신고내역 수정하기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = "UPDATE NOTIFY SET NOTIFY_RESULT=%s, NOTIFY_PNUM=%s WHERE NOTIFY_IDX=%s;"

    insert_tuple = (
        body_data["NOTIFY_RESULT"], body_data["NOTIFY_PNUM"], body_data["NOTIFY_IDX"])
    try:
        cursor.execute(sql, insert_tuple)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def login(data):  # 사용자 로그인
    print("로그인 데이터야 나와랏", data)
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)
    # login_tuple = (data["id"], data["pw"])  # 입력하고자 하는 데이터의 튜플
    sql = f"SELECT * FROM USER WHERE USER_ID='{data['id']}' AND USER_PW='{data['pw']}';"
    print(sql)
    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_daily_summary_per_weeks():  # 1주일간 통계보기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    now = datetime.now()
    before_one_weeks = now-timedelta(days=6)
    now = now.strftime("%Y-%m-%d")
    before_one_weeks = before_one_weeks.strftime("%Y-%m-%d")

    sql = f"""   SELECT DATE_FORMAT(A.NOTIFY_DATE, "%Y-%m-%d") as NOTIFY_DATE, 
                        A.NOTIFY_PNUM AS NOTIFY_PNUM,
                        B.NOTIFY_STATUS AS NOTIFY_STATUS
                    FROM PROCESS AS B
                    LEFT JOIN NOTIFY AS A ON A.NOTIFY_PNUM=B.NOTIFY_PNUM
                WHERE A.NOTIFY_DATE>='{before_one_weeks} 00:00:00' AND A.NOTIFY_DATE<='{now} 23:59:59'; """

    print(sql)

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_nofity_mini():  # 신고내역 미니리스트
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """   SELECT
                    A.NOTIFY_IDX, A.USER_IDX, B.USER_NAME, B.USER_ID, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                    A.CATEGORY_IDX, C.CATEGORY, A.CAR_NUM, 
                    date_format(A.NOTIFY_DATE, '%Y-%m-%d %H:%i:%S') AS NOTIFY_DATE, 
                    A.NOTIFY_SPOT,
                    A.NOTIFY_TXT, A.NOTIFY_PNUM, D.NOTIFY_STATUS, A.NOTIFY_RESULT,
                    E.IMG_IDX, E.IMG_PATH                    
                FROM IMG AS E
                    LEFT JOIN NOTIFY    AS A ON E.NOTIFY_IDX    = A.NOTIFY_IDX
                    LEFT JOIN USER      AS B ON A.USER_IDX      = B.USER_IDX
                    LEFT JOIN CATEGORY  AS C ON A.CATEGORY_IDX  = C.CATEGORY_IDX
                    LEFT JOIN PROCESS   AS D ON A.NOTIFY_PNUM   = D.NOTIFY_PNUM 
                WHERE A.NOTIFY_PNUM != 4
                ORDER BY A.NOTIFY_IDX DESC;"""

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_board_list_mini():  # 공지사항 미니(관리자 메인)
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """SELECT
              A.BOARD_IDX AS BOARD_IDX,
              date_format(A.BOARD_DATE, '%Y-%m-%d') AS BOARD_DATE,
              A.BOARD_TIT AS BOARD_TIT,
              B.USER_NAME AS USER_NAME
            FROM BOARD AS A
              INNER JOIN USER AS B ON A.USER_IDX = B.USER_IDX """
    sql += "ORDER BY BOARD_IDX DESC LIMIT 3;"

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def adminlogin(data):  # 관리자 로그인
    print("관리자 로그인 나와랏", data)
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)
    adminlogin_tuple = (data["id"], data["pw"])
    #sql = "SELECT * FROM USER WHERE USER_ID=%s AND USER_PW=%s;"
    sql = f"SELECT * FROM USER WHERE USER_ID='{data['id']}' AND USER_PW='{data['pw']}';"
    print(sql)
    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def report(request):  # 신고접수

    form_data = request.form.to_dict()
    # 221130 선우 - 파일 업로드는 번호판 인식을 위해 먼저 업로드하므로 이제는 필요없음
    # timestamp = int(time.time())
    # path = 'static/images/' + str(timestamp)
    # os.makedirs(path, exist_ok=True)  # 폴더 생성
    # file = request.files["img"]
    # # print('파일 이름', file)
    # filename = secure_filename(file.filename)  # 파일명과 경로를 합치기
    # # print('파일 네임', filename)
    # file.save(os.path.join(path, filename))
    # file_dir = path+"/"+request.files["img"].filename
    # print(file_dir)

    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = "INSERT INTO NOTIFY(CATEGORY_IDX, CAR_NUM, NOTIFY_SPOT, NOTIFY_DATE, NOTIFY_TXT, NOTIFY_PNUM) VALUES (%s, %s, %s, %s, %s, %s); \
        INSERT INTO IMG(NOTIFY_IDX, IMG_PATH) VALUES (LAST_INSERT_ID(), %s);"
    # report_tuple = (form_data["category"], form_data["carNum"], form_data["notifySpot"],
    #                 form_data["notifyDate"], form_data["notifyTxt"], "1", file_dir)
    report_tuple = (form_data["category"], form_data["carNum"], form_data["notifySpot"],
                    form_data["notifyDate"], form_data["notifyTxt"], "1", form_data["img_path"])

    try:
        cursor.execute(sql, report_tuple)
        db.commit()
        return "success"
    except Exception as e:
        return "err : " + str(e)


def update_userinfo(body_data):  # 사용자 정보 수정하기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""UPDATE USER SET 
                USER_PW = '{body_data['user_pw']}', 
                USER_NAME='{body_data['user_name']}', 
                USER_TEL='{body_data['user_tel']}' 
              WHERE USER_IDX = {body_data['user_idx']}; """

    try:
        cursor.execute(sql)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_user_info(body_data):  # 사용자 상세 정보 가져오기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""SELECT * FROM USER WHERE USER_IDX={body_data["user_idx"]}; """

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def search_user_info(body_data):  # 사용자 목록 가져오기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""SELECT * FROM USER """
    where = ""
    if body_data["is_searching"] == 1:
        where = f"""WHERE {body_data["search_option"]} LIKE '%{body_data["keyword"]}%'"""
    sql += where + ";"

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def get_poit_list_by_user(body_data):  # 사용자별 포인트 리스트 가져오기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""            
            SELECT A.POINT_IDX, A.POINT_PLUS, A.POINT_MINUS, A.POINT_CHANGE, A.NOTIFY_IDX,
             date_format(A.POINT_DATE, '%Y-%m-%d %H:%i') AS POINT_DATE
            FROM POINT AS A
            LEFT JOIN USER AS B ON A.USER_IDX=B.USER_IDX
            WHERE B.USER_ID = '{body_data["user_id"]}'
            ORDER BY A.POINT_IDX DESC;
        """

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def insert_goods(request):  # 상품권 입력하기
    form_data = request.form.to_dict()

    path = 'static/goods'
    os.makedirs(path, exist_ok=True)  # 폴더 생성
    file = request.files["img"]
    # print('파일 이름', file)
    filename = secure_filename(file.filename)  # 파일명과 경로를 합치기
    # print('파일 네임', filename)
    file.save(os.path.join(path, filename))
    file_dir = path+"/"+request.files["img"].filename
    print(file_dir)

    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""INSERT INTO GOODS(GOODS_NAME, GOODS_PRICE, GOODS_IMG) 
                VALUES ('{form_data["name"]}', {form_data["price"]}, '{file_dir}'); """

    try:
        cursor.execute(sql)
        db.commit()
        return "success"
    except Exception as e:
        return "err : " + str(e)


def get_goods_list():  # 상품권 리스트 가져오기
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = "SELECT * FROM GOODS ORDER BY GOODS_PRICE ASC;"

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)


def delete_goods(body_data):  # 상품권 삭제

    # file =request.files["notifile"]
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""DELETE FROM GOODS WHERE GOODS_IDX={body_data["goods_idx"]};"""
    print(sql)

    try:
        cursor.execute(sql)
        db.commit()
        close_conn(db)
        return "success"
    except Exception as e:
        return "err : " + str(e)


def update_goods(request):  # 상품권 수정하기
    form_data = request.form.to_dict()

    path = 'static/goods'
    img = ""
    if len(request.files) > 0:
        os.makedirs(path, exist_ok=True)  # 폴더 생성
        file = request.files["img"]
        # print('파일 이름', file)
        filename = secure_filename(file.filename)  # 파일명과 경로를 합치기
        # print('파일 네임', filename)
        file.save(os.path.join(path, filename))
        file_dir = path+"/"+request.files["img"].filename
        print(file_dir)
        img = ", GOODS_IMG='"+file_dir+"' "

    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = f"""UPDATE GOODS SET 
                GOODS_NAME='{form_data["name"]}', 
                GOODS_PRICE={form_data["price"]} 
                {img} 
                WHERE GOODS_IDX={form_data["goods_idx"]} ; """

    try:
        cursor.execute(sql)
        db.commit()
        return "success"
    except Exception as e:
        return "err : " + str(e)


def get_dispose_list_byuser(body_data):  # 관리자) 사용자 관리 - 신고 리스트
    db = conn_db()
    cursor = db.cursor(pymysql.cursors.DictCursor)

    sql = """   SELECT
                    A.NOTIFY_IDX, A.USER_IDX, B.USER_NAME, B.USER_ID, B.USER_MAIL, B.USER_TEL, B.USER_OX,
                    A.CATEGORY_IDX, C.CATEGORY, A.CAR_NUM, 
                    date_format(A.NOTIFY_DATE, '%Y-%m-%d %H:%i:%S') AS NOTIFY_DATE, 
                    A.NOTIFY_SPOT,
                    A.NOTIFY_TXT, A.NOTIFY_PNUM, D.NOTIFY_STATUS, A.NOTIFY_RESULT,
                    E.IMG_IDX, E.IMG_PATH                    
                FROM IMG AS E
                    LEFT JOIN NOTIFY    AS A ON E.NOTIFY_IDX    = A.NOTIFY_IDX
                    LEFT JOIN USER      AS B ON A.USER_IDX      = B.USER_IDX
                    LEFT JOIN CATEGORY  AS C ON A.CATEGORY_IDX  = C.CATEGORY_IDX
                    LEFT JOIN PROCESS   AS D ON A.NOTIFY_PNUM   = D.NOTIFY_PNUM """

    user_idx = body_data["user_idx"]

    sql += " WHERE A.USER_IDX = " + str(user_idx) + " "
    sql += " ORDER BY A.NOTIFY_IDX DESC;"

    print(sql)

    try:
        row_cnt = cursor.execute(sql)
        # db.commit()
        if row_cnt > 0:
            res = cursor.fetchall()
            close_conn(db)
            return res
        else:
            close_conn(db)
            return "nothing"

    except Exception as e:
        close_conn(db)
        return "err : " + str(e)
