import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import "./iconfont/iconfont.css";

const Login = () => {
  const userRegRef = useRef()
  const userRef = useRef()
  const passwordRegRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        Email: userRef.current.value,
        MatKhau: passwordRef.current.value
      });
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace('/');
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', {
        Ten: userRegRef.current.value,
        MatKhau: passwordRegRef.current.value,
        Email: emailRef.current.value
      })

      res && window.location.reload();
    } catch (error) {
      console.error(error.response.data);
    }
  }

  useEffect(() => {
    const container = document.querySelector('#container');
    const signInButton = document.querySelector('#signIn');
    const signUpButton = document.querySelector('#signUp');
    signUpButton.addEventListener('click', () => container.classList.add
      ('right-panel-active'));
    signInButton.addEventListener('click', () => container.classList.remove
      ('right-panel-active'));
  }, [])


  return (
    <div className="minh">
      <div className='container' id='container'>
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleRegister}>
            <h1>Đăng Ký</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="iconfont icon-qq"></i></a>
              <a href="#" className="social"><i className="iconfont icon-weixin"></i></a>
              <a href="#" className="social"><i className="iconfont icon-weibo-copy"></i></a>
              <a href="#" className="social"><i className="iconfont icon-github"></i></a>
            </div>
            <span>Bạn có thể chọn trong số các phương pháp trên để đăng ký tài khoản của mình!</span>
            <input type="text" placeholder="Tên tài khoản" ref={userRegRef} />
            <input type="password" placeholder="Mật khẩu" ref={passwordRegRef} />
            <input type="email" placeholder="Email" ref={emailRef} />
            {/* <button id="send_code">Gửi mã xác minh</button>
            <input type="email" placeholder="Mã xác nhận" /> */}
            <button type="submit">Đăng ký</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleLogin}>
            <h1>Đăng Nhập</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="iconfont icon-qq"></i></a>
              <a href="#" className="social"><i className="iconfont icon-weixin"></i></a>
              <a href="#" className="social"><i className="iconfont icon-weibo-copy"></i></a>
              <a href="#" className="social"><i className="iconfont icon-github"></i></a>
            </div>
            <span>Bạn có thể chọn từ các phương pháp trên để đăng nhập vào tài khoản của mình!</span>
            <input type="email" placeholder="Email" ref={userRef} />
            <input type="password" placeholder="Mật khẩu" ref={passwordRef} />
            <a href="#">Quên mật khẩu?</a>
            <button type="submit">Đăng Nhập</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bạn có sẵn sàng để tạo một tài khoản?</h1>
              <p>Anh ơi, nhanh lên cho em đăng nhập.</p>
              <button className='ghost' id="signIn">Đăng Nhập</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Không tài khoản?</h1>
              <p>Bấm Đăng ký để đăng ký ngay một tài khoản.</p>
              <button className='ghost' id="signUp">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
