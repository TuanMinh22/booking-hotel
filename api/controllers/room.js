import { db } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createRoom = async (req, res) => {
    const q = "INSERT INTO Phong(`idLoaiPhong`,`TinhTrang`,`SoNguoi`,`ThanhPho`) VALUES(?)";
    const values = [req.body.idLoaiPhong, req.body.TinhTrang, req.body.SoNguoi, req.body.ThanhPho];

    await db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Room has been created");
    })
}

export const updateRoom = async (req, res) => {
    const q = "SELECT * FROM Phong WHERE idPhong = (?)";

    await db.query(q, [req.params.id], (err, data) => {
        if (err) throw err;
        if (data.length === 0) return res.send("Room not already exist");

        const q = "UPDATE Phong SET idLoaiPhong=?,TinhTrang=?,SoNguoi=?,ThanhPho=? where idPhong=?";
        const values = [req.body.idLoaiPhong, req.body.TinhTrang, req.body.SoNguoi, req.body.ThanhPho, req.params.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Room has been updated");
        });
    })
}

export const deleteRoom = async (req, res) => {
    const q = "SELECT * FROM Phong WHERE idPhong = (?)";

    await db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.send("Room not already exist");

        const q = "DELETE FROM Phong WHERE idPhong=?";
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Room has been deleted");
        })
    });
}

export const getRoom = async (req, res) => {
    const q = "SELECT * FROM Phong where idPhong = ?";

    db.query(q, req.params.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getRooms = async (req, res) => {
    const q = "SELECT * FROM Phong"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const getRoomTypes = async (req, res) => {
    const q = "SELECT * FROM LoaiPhong"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getRoomByCity = async (req, res) => {
    const q = "SELECT * FROM Phong where ThanhPho=?";
    const value = req.params.flag;
    db.query(q, value, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getStar = async (req, res) => {
    const q = "SELECT SUM(DanhGia.MoTa) FROM Phong join DanhGiaPhong on Phong.idPhong = DanhGiaPhong.idPhong join DanhGia on DanhGiaPhong.idDanhGia = DanhGia.idDanhGia where Phong.idPhong = ?"

    db.query(q, req.params.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getRoomByType = async (req, res) => {
    const q = "SELECT idPhong FROM Phong where idLoaiPhong=?";

    db.query(q, req.params.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getRoomsBySearch = async (req, res) => {
    const q = `SELECT * FROM Phong where TinhTrang="chua thue" and ThanhPho=? and SoNguoi>=?`;

    db.query(q, [req.query.ThanhPho, req.query.SoNguoi], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const createRent = async (req, res) => {
    const q = "INSERT INTO DatPhong(`idAdmin`,`idKhachHang`,`NgayBD`,`NgayKT`) VALUES(?)";
    const value = [req.body.idAdmin, req.body.idKhachHang, req.body.NgayBD, req.body.NgayKT];

    db.query(q, [value], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getR = async (req, res) => {
    const q = "SELECT * FROM DatPhong where idKhachHang=?";

    db.query(q, req.params.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}