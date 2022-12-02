import "../../css/user/common.scss"

const Footer = () => {
  // return <div>여기가 푸터</div>;
  return (
    <div id="Footer">
      <div className="info">
        <h4>안전꽹과리</h4>
        <ul>
          <li>광주광역시 동구 제봉로 92, 광주인공지능사관학교(대성학원1~3층)</li>
          <li><strong>TEL</strong> 062-710-3257~9</li>
        </ul>
        <p className="copy">&copy; GODSAENG. ALL RIGHTS RESERVED.</p>
      </div>

      <div className="ft-menu">
        <ul>
          <li><a href="#">이용약관</a></li>
          <li><a href="#">개인정보취급방침</a></li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
