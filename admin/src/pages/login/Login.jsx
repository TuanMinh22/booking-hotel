import axios from "axios";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/loginadmin", {
        Ten: userRef.current.value,
        MatKhau: passwordRef.current.value
      })
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        window.location.replace('/');

      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }

  return (
    <div className="login-wrapper">
      <form action="" className="form" autocomplete="off">
        <h2>Login</h2>
        <div className="input-group">
          <input type="text" name="loginUser" id="loginUser" placeholder="Username" required ref={userRef} />
        </div>
        <div className="input-group">
          <input type="password" name="loginPassword" id="loginPassword" placeholder="Password" required ref={passwordRef} />
        </div>
        <input type="submit" value="Login" className="submit-btn" onClick={handleSubmit} disabled={loading} />
        {error && <span>{error.message}</span>}

        <a href="#forgot-pw" className="forgot-pw">Forgot Password?</a>
      </form>
      <div id="forgot-pw">
        <form action="" className="form" autocomplete="off">
          <a href="#" className="close">&times;</a>
          <h2>Reset Password</h2>
          <div className="input-group">
            <input type="email" name="email" id="email" placeholder="Email" required />
          </div>
          <input type="submit" value="Submit" className="submit-btn" />
        </form>
      </div>
    </div>
  )
};

export default Login;
