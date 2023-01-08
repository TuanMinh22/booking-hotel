import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
const List = ({ datas }) => {
  const [info, setInfo] = useState([])
  const [data, setData] = useState({})
  console.log(datas)
  // useEffect(() => {
  //   datas.map((d) => {
  //     setData(d)
  //   })
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/rooms/getR/${datas[0].idKhachHang}`);
        setInfo(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [datas])

  console.log(info)
  console.log(data.idKhachHang)

  const images = [
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-standard.jpg",
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-superior.jpg",
    "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/06/phong-junior-suite.jpg",
    "https://chumy.vn/wp-content/uploads/2019/12/giuong-khach-san-single-size.jpg",
    "https://dashboard.mixhotel.vn/uploads/images/61f4f073d6a5eb23e51e63a2/phong-doi__1_.webp",
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Phòng</TableCell>
            <TableCell className="tableCell">Ten</TableCell>
            <TableCell className="tableCell">Ngày bắt đầu</TableCell>
            <TableCell className="tableCell">Ngay kết thúc</TableCell>
            <TableCell className="tableCell">Trạng Thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{i}</TableCell>
              <TableCell className="tableCell">{data.Ten}</TableCell>
              <TableCell className="tableCell">{row.NgayBD}</TableCell>
              <TableCell className="tableCell">{row.NgayKT}</TableCell>
              <TableCell className="tableCell">da thue</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
