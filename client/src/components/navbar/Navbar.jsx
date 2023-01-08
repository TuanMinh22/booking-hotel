import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login")
  }
  // console.log(user);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
        {user ?
          (
            <>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <img src={user.HinhAnh ? user.HinhAnh : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} className="avatar" />
              </Link>
              <div className="log">
                <span class="btnLogout" onClick={handleLogout} >Logout</span>
              </div>
            </>
          )
          : (
            <div className="navItems">
              <Link to="/login">
                <button className="navButton">Đăng ký</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Đăng nhập</button>
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Navbar;
