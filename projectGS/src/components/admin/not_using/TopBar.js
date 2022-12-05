import React from "react";
// import "../../css/topBar.css";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="topBar">
      <div className="topBarWrapper">
        <div className="topLeft">
          <span
            className="logo"
            onClick={() => {
              navigate("/home");
            }}
          >
            갓생살조
          </span>
        </div>
        <div className="topRight">
          <button
            className="Login"
            onClick={() => {
              navigate("/home/adminlogin");
            }}
          >
            {/* 로그인 여부에 따른 이모티콘 변경 */}
            <div>
              {window.sessionStorage.getItem("USER_ID") ? (
                <LogoutIcon className="icon" />
              ) : (
                <LoginIcon className="icon" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
