import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [minh, setMinh] = useState();
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => (path === 'users' ? item.idKhachHang : item.idPhong) !== id));
      window.location.reload();
    } catch (err) { }
  };
  console.log(data)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {
              path === 'users' ?
                (<Link to={`/users/${params.row.idKhachHang}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>) :
                (<Link to={`/rooms/${params.row.idPhong}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton" style={{ borderColor: "yellow", color: "black" }}>Update</div>
                </Link>)
            }

            <div
              className="deleteButton"
              onClick={() => handleDelete(path === 'users' ? params.row.idKhachHang : params.row.idPhong)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => path === 'users' ? row.idKhachHang : row.idPhong}
      />
    </div>
  );
};

export default Datatable;
