export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.HinhAnh || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.Ten}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.Email}
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.SDT}
        </div>
      );
    },
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.HinhAnh || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
        </div>
      );
    },
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  // {
  //   field: "title",
  //   headerName: "Title",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         {params.row.TinhTrang}
  //       </div>
  //     );
  //   },
  // },
  {
    field: "LoaiPhong",
    headerName: "Loại Phòng",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.idLoaiPhong === 1 ? "Phòng Standard" :
            params.row.idLoaiPhong === 2 ? "Phòng Superior" :
              params.row.idLoaiPhong === 3 ? "Phòng Suite" :
                params.row.idLoaiPhong === 4 ? "Phòng giường đơn" :
                  "Phòng giường đôi"
          }
        </div>
      );
    },
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.SoNguoi}
        </div>
      );
    },
  },
  {
    field: "TinhTrang",
    headerName: "Tình Trạng",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.TinhTrang}
        </div>
      );
    },
  },
  {
    field: "ThanhPho",
    headerName: "Thành Phố",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.ThanhPho === 'HN' ? "Hà Nội" : (params.row.ThanhPho === 'DN' ? "Đà Nẵng" : "TP. Hồ Chí Minh")}
        </div>
      );
    },
  },
];
