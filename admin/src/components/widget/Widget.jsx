import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HomeIcon from '@mui/icons-material/Home';
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  let datas;
  const [rooms, setRoom] = useState()
  const [info, setInfo] = useState([])
  const { data, loading, error } = useFetch("/users");
  const userN = data.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms");
        setInfo(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);
  const diff = 20;

  switch (type) {
    case "user":
      datas = {
        title: "USERS",
        amount: userN,
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "room":
      datas = {
        title: "ROOMS",
        amount: info.length,
        isMoney: false,
        link: "See all rooms",
        icon: (
          <HomeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      datas = {
        title: "EARNINGS",
        amount: 100,
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      datas = {
        title: "BALANCE",
        amount: 100,
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{datas.title}</span>
        <span className="counter">
          {datas.isMoney && "$"} {datas.amount}
        </span>
        <span className="link">{datas.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {datas.icon}
      </div>
    </div>
  );
};

export default Widget;
