import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [numberPerson, setNumberPerson] = useState(null);
  const [city, setCity] = useState("");
  const [stateCurrent, setStateCurrent] = useState("");
  const [LP, setLP] = useState("");

  const { data, loading, error } = useFetch("/rooms/getRoomTypes");
  console.log(data)

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/rooms/createroom", {
        idLoaiPhong: LP,
        TinhTrang: stateCurrent,
        SoNguoi: numberPerson,
        ThanhPho: city
      });

      res && window.location.replace('/rooms');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label>Số người</label>
                <input
                  type="number"
                  placeholder="Nhập số người"
                  onChange={(e) => setNumberPerson(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Thành phố</label>
                <input
                  type="text"
                  placeholder="Nhập thành phố"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Tình trạng</label>
                <input
                  type="text"
                  placeholder="Nhập tình trạng"
                  onChange={(e) => setStateCurrent(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Chọn loại phòng</label>
                <select
                  onChange={(e) => setLP(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((m) => (
                      <option key={m.idLoaiPhong} value={m.idLoaiPhong}>{m.TenLoai}</option>
                    ))}
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
