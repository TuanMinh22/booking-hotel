import "./profile.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'


export default function Profile() {
    const user = useContext(AuthContext)
    const [file, setFile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/lamadev/image/upload",
                data
            );

            const { url } = uploadRes.data;
            const res = await axios.put(`/users/${user.user.idKhachHang}`, {
                Ten: username,
                MatKhau: password,
                Email: email,
                SDT: phone,
                HinhAnh: url
            });
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            window.location.reload();

        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE", payload: err.response.data });
        }
    }
    console.log(username);
    return (
        <div className="profile">
            <Navbar />
            <Header />
            <div className="profileContent">
                <div className="profileImg">
                    <img src={
                        file
                            ? URL.createObjectURL(file)
                            : (user.user.HinhAnh ? user.user.HinhAnh : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")
                    }
                        alt="" />
                    {file ? <CancelIcon className="profileCancelImg" onClick={() => setFile("")} /> : <div></div>}
                </div>
                <div className="profileRight">
                    <form onSubmit={handleUpdate}>
                        <div className="formInput">
                            <label htmlFor="file">
                                Image: <DriveFolderUploadIcon className="icon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className="formInput">
                            <label>Tên</label>
                            <input
                                type="text"
                                placeholder={user.user.Ten ? user.user.Ten : `Nhap tên`}
                                onChange={(e) => setUsername(e.target.value ? e.target.value : user.Ten)}
                            />
                        </div>
                        <div className="formInput">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhap mật khẩu"
                                onChange={(e) => setPassword(e.target.value ? e.target.value : user.MatKhau)}
                            />
                        </div>
                        <div className="formInput">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder={user.user.Email ? user.user.Email : `Nhap email`}
                                onChange={(e) => setEmail(e.target.value ? e.target.value : user.Email)}
                            />
                        </div>
                        <div className="formInput">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                placeholder={user.user.SDT ? user.user.SDT : `Nhap SDT`}
                                onChange={(e) => setPhone(e.target.value ? e.target.value : user.SDT)}
                            />
                        </div>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <MailList />
            <Footer />
        </div>
    )
}
