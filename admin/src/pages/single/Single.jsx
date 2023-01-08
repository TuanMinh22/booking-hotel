import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Single = () => {
  const { userId } = useParams()
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/users/${userId}`);

  console.log(userId)
  console.log(typeof data[0])
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {
              data.map((m) => (
                <div className="item">
                  <img
                    src={
                      m.HinhAnh
                    }
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{m.Ten}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{m.Email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{m.SDT}</span>
                    </div>

                  </div>
                </div>
              ))
            }

          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List datas={data} />
        </div>
      </div>
    </div>
  );
};

export default Single;
