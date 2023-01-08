import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./searchItem.css";

const SearchItem = ({ item, date }) => {
  const [idKH, setKH] = useState()
  const images = [
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-standard.jpg",
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-superior.jpg",
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-junior-suite.jpg",
    "https://chumy.vn/wp-content/uploads/2019/12/giuong-khach-san-single-size.jpg",
    "https://dashboard.mixhotel.vn/uploads/images/61f4f073d6a5eb23e51e63a2/phong-doi__1_.webp",
  ];
  const { user } = useContext(AuthContext)
  console.log(user)
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/rooms/createRent", {
        idAdmin: 1,
        idKhachHang: user.idKhachHang,
        NgayBD: "2022-11-15",
        NgayKT: "2022-11-15"
      })
      res && window.location.reload();
    } catch (err) {
      console.log(err.response.data)
    }
  }
  console.log(date[0])
  return (
    <div className="searchItem">
      <img src={images[item.idLoaiPhong - 1]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.idLoaiPhong === 1 ? "Phòng Standard" : item.idLoaiPhong === 2 ? "Phòng Superior" : item.idLoaiPhong === 3 ? "Phòng Suite" : item.idLoaiPhong === 4 ? "Phòng giường đơn" : "Phòng giường đôi"}</h1>
        <span className="siDistance">{item.SoNguoi}m cách trung tâm</span>
        <span className="siTaxiOp">Miễn phí taxi</span>
        <span className="siSubtitle">
          Phòng có máy lạnh
        </span>
        <span className="siFeatures">{item.ThanhPho === "HN" ? "Hà Nội" : item.ThanhPho === "DN" ? "Đà Nẵng" : "TP. Hồ Chí Minh"}</span>
        <span className="siCancelOp">Hủy miễn phí </span>
        <span className="siCancelOpSubtitle">
          Bạn có thể hủy sau, vì vậy hãy khóa mức giá tuyệt vời này ngay hôm nay!
        </span>
      </div>
      <div className="siDetails">
        {item.idLoaiPhong && <div className="siRating">
          <span>Xuất sắc</span>
          <button>{item.idLoaiPhong}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.idLoaiPhong === 1 ? 50 : item.idLoaiPhong === 2 ? 60 : item.idLoaiPhong === 3 ? 70 : item.idLoaiPhong === 4 ? 80 : 90}</span>
          <span className="siTaxOp">Đã bao gồm thuế và phí</span>
          {/* <Link to={`/hotels/${item._id}`}> */}
          <button className="siCheckButton" onClick={handleClick}>Thuê Phòng</button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
