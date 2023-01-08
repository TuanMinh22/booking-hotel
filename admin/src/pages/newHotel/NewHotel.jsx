import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewHotel = () => {
  const [info, setInfo] = useState([]);
  const [numberPerson, setNumberPerson] = useState(null);
  const [city, setCity] = useState("");
  const [stateCurrent, setStateCurrent] = useState("");
  const [LP, setLP] = useState("");

  const { roomId } = useParams();
  const { data, loading, error } = useFetch(`/rooms/${roomId}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomTypes");
        setInfo(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  console.log(data)
  console.log(info)
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/rooms/${roomId}`, {
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

  // console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>UPDATE ROOM</h1>
        </div>
        <div className="bottom">
          <div className="right">

            {
              data.map((m) => (
                <form onSubmit={handleClick}>
                  <div className="formInput">
                    <label>Số người</label>
                    <input
                      type="number"
                      placeholder={m.SoNguoi}
                      onChange={(e) => setNumberPerson(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Thành phố</label>
                    <input
                      type="text"
                      placeholder={m.ThanhPho === 'HN' ? "Hà Nội" : (m.ThanhPho === 'DN' ? "Đà Nẵng" : "TP. Hồ Chí Minh")}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Tình trạng</label>
                    <input
                      type="text"
                      placeholder={m.TinhTrang}
                      onChange={(e) => setStateCurrent(e.target.value)}
                    />
                  </div>
                  <div className="formInput">
                    <label>Chọn loại phòng</label>
                    <select
                      onChange={(e) => setLP(e.target.value)}
                    >
                      {info &&
                        info.map((x) => (
                          <option key={x.idLoaiPhong} value={x.idLoaiPhong}>{x.TenLoai}</option>
                        ))}
                    </select>
                  </div>
                  <button type="submit">Send</button>
                </form>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
