import { db } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//UPDATE 
export const updateUser = (req, res) => {
    //check user
    const q = "SELECT * FROM khachhang WHERE idKhachHang = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows == 0) {
            console.log(`Không có id book để cập nhật: ${req.params.id}`);
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.MatKhau, salt);
        const q = "UPDATE khachhang SET Ten=?,MatKhau=?,Email=?,SDT=?,HinhAnh=? WHERE idKhachHang=?";
        // if (req.body.Ten === null) var ten = data[0].Ten;
        const values = [req.body.Ten, hash, req.body.Email, req.body.SDT, req.body.HinhAnh, req.params.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(req.body);
        });
    });
}

// DELETE ALL
export const deleteUser = (req, res) => {
    const q = "SELECT * FROM khachhang WHERE idKhachHang = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        const q = `DELETE FROM KhachHang where idKhachHang = ?`;

        db.query(q, req.params.id, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been deleted.");
        });
    });
}

//GET USER
export const getUser = (req, res) => {
    const q = "SELECT * FROM khachhang WHERE idKhachHang = (?)";

    db.query(q, req.params.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const getUsers = (req, res) => {
    const q = "SELECT * FROM khachhang";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}