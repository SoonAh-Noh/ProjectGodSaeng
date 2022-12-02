import axios from 'axios';

export var node_url = 'http://localhost:8000'; //노드 서버를 사용하게 될 경우 이 url을 axios url에 대입
export var py_url = 'http://localhost:5000'; //파이썬 서버를 사용하게 될 경우 이 url을 axios url에 대입
var url_now = '';

export const board_inner = {
  //게시판 리스트의 베이스가 되는 객체
  BOARD_IDX: '',
  BOARD_DATE: '',
  BOARD_TIT: '',
  USER_NAME: '',
  USER_IDX: '',
  BOARD_TXT: '',
  BOARD_FILE: '',
};

function setThisUrl() {
  //사용할 서버 세팅
  url_now = py_url;
  return url_now;
}

export function getThisUrl() {
  return url_now;
}
export const axios_instace = axios.create({
  //모듈화한 axios 객체.
  baseURL: setThisUrl(),
});
