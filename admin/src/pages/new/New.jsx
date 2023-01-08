import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/lamadev/image/upload",
        data
      );

      const { url } = uploadRes.data;

      await axios.post("/auth/register", {
        Ten: username,
        MatKhau: password,
        Email: email,
        SDT: phone,
        HinhAnh: url
      });
      window.location.replace('/users');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Username</label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="minh"
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="minh@gmail.com"
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="+84 234 567 890"
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
