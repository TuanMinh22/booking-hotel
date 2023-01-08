import axios from "axios";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const [info1, setInfo1] = useState([]);
  const [info2, setInfo2] = useState([]);
  const [info3, setInfo3] = useState([]);
  const [info4, setInfo4] = useState([]);
  const [info5, setInfo5] = useState([]);

  const { data, loading, error } = useFetch("/rooms/getRoomTypes");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByType/1");
        setInfo1(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByType/2");
        setInfo2(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByType/3");
        setInfo3(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByType/4");
        setInfo4(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByType/5");
        setInfo5(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  const a = [info1, info2, info3, info4, info5]


  const images = [
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-standard.jpg",
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-superior.jpg",
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-junior-suite.jpg",
    "https://chumy.vn/wp-content/uploads/2019/12/giuong-khach-san-single-size.jpg",
    "https://dashboard.mixhotel.vn/uploads/images/61f4f073d6a5eb23e51e63a2/phong-doi__1_.webp",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.TenLoai}</h1>
                  <h2>{a[i].length} phòng</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
