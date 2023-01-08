import axios from "axios";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const [hn, setHN] = useState([]);
  const [dn, setDN] = useState([]);
  const [hcm, setHCM] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByCity/HN");
        setHN(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByCity/DN");
        setDN(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms/getRoomByCity/HCM");
        setHCM(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="featured">
      <>
        <div className="featuredItem">
          <img
            src="https://media.mia.vn/uploads/blog-du-lich/dao-buoc-quanh-ho-hoan-kiem-kham-pha-vien-ngoc-sang-cua-thu-do-03-1639495939.png"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Hà Nội</h1>
            <h2>{hn.length} phòng</h2>
          </div>
        </div>

        <div className="featuredItem">
          <img
            src="https://statics.vinpearl.com/da-nang-beach-thumb_1651076727.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Đà Nẵng</h1>
            <h2>{dn.length} phòng</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://hdproland.com/media/uploads/uploads/27115239-hinh-anh-thuc-te-trung-tam-tp-hcm.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>TP. Hồ Chí Minh</h1>
            <h2>{hcm.length} phòng</h2>
          </div>
        </div>
      </>
    </div>
  );
};

export default Featured;
