import { db } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js"

export const register = (req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM KhachHang WHERE Email = ? OR Ten = ?";

    db.query(q, [req.body.Email, req.body.Ten], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.MatKhau, salt);

        const q = "INSERT INTO khachhang(`Ten`,`Email`,`MatKhau`,`SDT`,`HinhAnh`) VALUES (?)";
        const values = [req.body.Ten, req.body.Email, hash, req.body.SDT, req.body.HinhAnh];
        console.log(hash);
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
}

export const login = (req, res) => {
    //CHECK USER
    const q = "SELECT * FROM khachhang WHERE Email = ?";

    db.query(q, [req.body.Email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.MatKhau,
            data[0].MatKhau
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].idKhachHang }, "jwtkey");
        const { MatKhau, ...other } = data[0];

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(other);
    });
}

//LOGIN WITH ADMIN
export const loginAdmin = (req, res) => {
    //CHECK USER

    const q = "SELECT * FROM Admin WHERE Ten = ?";

    db.query(q, [req.body.Ten], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.MatKhau,
            data[0].MatKhau
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].idAdmin }, "jwtkey");
        const { MatKhau, ...other } = data[0];

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(other);
    });
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
}