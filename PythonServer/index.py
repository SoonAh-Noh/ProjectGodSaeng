import os
import json
from flask import Flask, jsonify, request, send_file, Response, make_response
from flask_cors import CORS  # 라이브러리 설치 필요 - pip install flask_cors
import dbconnecter
import ml_easyOCR
from werkzeug.utils import secure_filename
from functools import wraps
import time
import summary
import urllib.parse

app = Flask(__name__)
CORS(app)


def get_body_data(request):
    if request.method == "GET":  # get 방식으로 전달받았을 때 실행
        body_data = request.args.to_dict()  # 클라이언트에서 전달받은 데이터를 json 형식으로 파싱

    elif request.method == "POST":  # post 방식으로 전달받았을 때 실행
        # 클라이언트에서 전달받은 데이터를 json 형식으로 파싱
        body_data = json.loads(request.get_data(), encoding="utf-8")
    return body_data


# 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
@app.route("/pythonserver", methods=["GET", "POST"])
def func():
    body_data = get_body_data(request)
    sendData = {"connection": "success",
                "method": request.method, "data": body_data["testdata"]}

    return jsonify(sendData)  # 클라이언트에 json 형식으로 데이터를 전달


@app.route("/pydbinsert", methods=["GET", "POST"])
def ctrl_data():
    body_data = get_body_data(request)
    return dbconnecter.insert_data(body_data)


# 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
@app.route("/pydbselect", methods=["GET", "POST"])
def sel_data():
    sendData = dbconnecter.select_data()

    return jsonify(sendData)  # 클라이언트에 json 형식으로 데이터를 전달


# 이렇게 하면 Get 방식 post 방식 둘다 받을 수 있음.
# @app.route("/notilist4admin", methods=["GET", "POST"])
# def send_noti_list():  # 신고리스트
#     body_data = get_body_data(request)
#     sendData = dbconnecter.get_noti4admin(body_data)
#     return jsonify(sendData)


# @app.route("/updatenoti4admin", methods=["GET", "POST"])
# def updatenoti4admin():  # 신고글 수정
#     body_data = get_body_data(request)
#     return dbconnecter.get_noti4admin(body_data)


@app.route("/uploadnoti", methods=["GET", "POST"])
def upload_board():  # 게시판(공지사항) 업로드
    return dbconnecter.insert_board(request)


@app.route("/updatenoti", methods=["GET", "POST"])
def update_board():  # 게시판(공지사항) 수정
    print("tetesfasdfsd")
    return dbconnecter.update_board(request)


@app.route("/board_list", methods=["GET", "POST"])
def send_list():  # 게시판(공지사항) 리스트
    body_data = get_body_data(request)
    where_clause = body_data["where_clause"] if body_data["is_searching"] == 1 else ""
    return dbconnecter.get_board_list(where_clause)


@app.route("/board_view", methods=["GET", "POST"])
def send_notiivew():  # 게시판(공지사항) 상세보기
    body_data = get_body_data(request)
    board_idx = body_data["board_idx"]
    return dbconnecter.select_board(board_idx)


@app.route("/delete_board", methods=["GET", "POST"])
def delete_board():  # 게시판(공지사항) 삭제하기
    body_data = get_body_data(request)
    return dbconnecter.delete_board(body_data)


@app.route("/download_file/<path:subpath>", methods=["GET", "POST"])
def download_file(subpath):  # 등록한 파일 다운로드하기
    return send_file(subpath, as_attachment=True)


@app.route("/join", methods=["POST"])
def join():  # 회원가입
    body_data = get_body_data(request)
    return dbconnecter.join(body_data)


@app.route("/login", methods=["GET", "POST"])
def login():  # 사용자 로그인
    body_data = get_body_data(request)
    return dbconnecter.login(body_data)


@app.route("/home/adminlogin", methods=["GET", "POST"])
def adminlogin():  # 관리자 로그인
    body_data = get_body_data(request)
    return dbconnecter.adminlogin(body_data)


@app.route("/report", methods=["GET", "POST"])
def report():  # 신고접수
    # body_data = get_body_data(request)
    return dbconnecter.report(request)


@app.route("/get_cate_list", methods=["GET"])
def get_cate_list():  # 등록한 파일 다운로드하기
    sendData = dbconnecter.get_cate_list()
    return jsonify(sendData)


@app.route("/get_process_list", methods=["GET"])
def get_process_list():  # 신고 진행 절차 받아오기
    sendData = dbconnecter.get_process_list()
    return jsonify(sendData)


@app.route("/getDisposeList", methods=["GET", "POST"])
def get_dispose_list():  # 신고 리스트 받아오기
    body_data = get_body_data(request)
    sendData = dbconnecter.get_dispose_list(body_data)
    return jsonify(sendData)
    # return sendData


@app.route("/updateDispose", methods=["GET", "POST"])
def update_dispose():  # 신고내역 수정하기
    body_data = get_body_data(request)
    sendData = dbconnecter.update_dispose(body_data)
    return jsonify(sendData)


@app.route("/getDisposeDetail", methods=["GET", "POST"])
def get_dispose_detail():  # 신고 내역 상세 가져오기
    body_data = get_body_data(request)
    sendData = dbconnecter.get_dispose_list_detail(body_data)
    return jsonify(sendData)


@app.route("/getDailySummary", methods=["GET", "POST"])
def get_daily_summary_per_weeks():  # 오늘로부터 1주일간의 일별 통계
    sendData = dbconnecter.get_daily_summary_per_weeks()
    result = summary.summay_daily_record(sendData)
    #decoded_data = urllib.parse.unquote(result, encoding='utf-8')
    return result


@app.route("/getNotifyMini", methods=["GET", "POST"])
def get_notify_mini():  # 메인페이지용 신고 통계
    sendData = dbconnecter.get_nofity_mini()
    return jsonify(sendData)


@app.route("/getBoardMini", methods=["GET", "POST"])
def get_board_list_mini():  # 메인페이지용 공지사항 통계
    sendData = dbconnecter.get_board_list_mini()
    return jsonify(sendData)


@app.route("/updateadmininfo", methods=["GET", "POST"])
def update_admin_info():  # 사용자 정보 업데이트
    body_data = get_body_data(request)
    sendData = dbconnecter.update_userinfo(body_data)
    return jsonify(sendData)


@app.route("/getuserinfo", methods=["GET", "POST"])
def get_user_info():  # 유저 단일 데이터 가져오기
    body_data = get_body_data(request)
    sendData = dbconnecter.get_user_info(body_data)
    return jsonify(sendData)


@app.route("/getuserlist", methods=["GET", "POST"])
def get_user_list():  # 유저 목록 가져오기
    body_data = get_body_data(request)
    sendData = dbconnecter.search_user_info(body_data)
    return jsonify(sendData)


@app.route("/readplate", methods=["GET", "POST"])
def read_plate():  # 자동차 번호판 인식시키기

    timestamp = int(time.time())
    path = 'static/images/plate/' + str(timestamp)
    os.makedirs(path, exist_ok=True)  # 폴더 생성
    file = request.files["img"]
    # print('파일 이름', file)
    filename = secure_filename(file.filename)  # 파일명과 경로를 합치기
    # print('파일 네임', filename)
    file.save(os.path.join(path, filename))
    file_dir = path+"/"+request.files["img"].filename

    res = ml_easyOCR.find_plate_no(file_dir)

    return jsonify({"result": res, "dir": file_dir})


@app.route("/pointlistbyuser", methods=["GET", "POST"])
def get_poit_list_by_user():  # 사용자 포인트 목록 가져오기
    body_data = get_body_data(request)
    sendData = dbconnecter.get_poit_list_by_user(body_data)
    return jsonify(sendData)


@app.route("/insertgoods", methods=["GET", "POST"])
def insert_goods():  # 상품권 등록하기
    sendData = dbconnecter.insert_goods(request)
    return jsonify(sendData)


@app.route("/goodslist", methods=["GET", "POST"])
def get_goods_list():  # 사용자 포인트 목록 가져오기
    body_data = get_body_data(request)
    sendData = dbconnecter.get_goods_list()
    return jsonify(sendData)


@app.route("/updategoods", methods=["GET", "POST"])
def update_goods():  # 사용자 포인트 목록 가져오기
    sendData = dbconnecter.update_goods(request)
    return jsonify(sendData)


@app.route("/getDisposeListByuser", methods=["GET", "POST"])
def get_dispose_list_byuser():  # 신고 리스트 받아오기
    body_data = get_body_data(request)
    sendData = dbconnecter.get_dispose_list_byuser(body_data)
    return jsonify(sendData)


if __name__ == "__main__":
    app.run(debug=True)
