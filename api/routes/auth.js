// const router = require('express').Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const passport = require('passport');

// const CLIENT_URL = "http://localhost:3000/"

// //REGISTER
// router.post('/register', async (req, res) => {
//     try {
//         //generate new password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         //create new user
//         const newUser = new User({
//             username: req.body.username,
//             password: hashedPassword,
//             email: req.body.email,
//         });
//         const user = await newUser.save();
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// //LOGIN
// router.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });
//         !user && res.status(404).json("user not found");

//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         !validPassword && res.status(400).json("wrong password");

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// //LOGIN WITH GOOGLE, FACEBOOK, GITHUB
// router.get("/login/success", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             success: true,
//             message: "successfull",
//             user: req.user,
//             cookies: req.cookies
//         })
//     }
// })

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         success: false,
//         message: "failure",
//     })
// })

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(CLIENT_URL);
// })

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed"
// }))

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get("/github/callback", passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed"
// }))

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get("/facebook/callback", passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed"
// }))

// module.exports = router;

import express from "express";
import { register, login, logout, loginAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/loginadmin", loginAdmin);
router.post("/logout", logout);

export default router;