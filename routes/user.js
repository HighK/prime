const express = require("express");
const router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
const hCrypto = require("../utils/crypto");

router.get("/check", async function(req, res, next) {
  let token = req.cookies.user || 1;
  if (token === 1) {
    res.send("권한이 없습니다.");
    next();
  }
  let decoded = jwt.verify(token, secretObj.secret);
  if (decoded) {
    let token = jwt.sign(
      {
        email: decoded.email
      },
      secretObj.secret, // 비밀 키
      {
        expiresIn: "3d"
      }
    );
    res.cookie("user", token);

    res.send("권한 접근");
  } else {
    res.send("권한이 없습니다.");
  }
});

router.post("/signup", async function(req, res, next) {
  let body = req.body;

  let inputPassword = body.password;
  let overlap = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  });

  if (overlap) {
    res.status(404);
    next();
  } else {
    let salt = Math.round(new Date().valueOf() * Math.random()) + "";
    let hashPassword = hCrypto.hashPassword(inputPassword, salt);
    let result = await models.user.create({
      name: body.userName,
      email: body.userEmail,
      password: hashPassword,
      salt: salt
    });
    res.send(result);
  }
});

router.post("/login", async function(req, res, next) {
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email: body.userEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = hCrypto.hashPassword(inputPassword, salt);

  if (dbPassword === hashPassword) {
    console.log("비밀번호 일치");
    let token = jwt.sign(
      {
        email: body.userEmail
      },
      secretObj.secret, // 비밀 키
      {
        expiresIn: "3d"
      }
    );
    res.cookie("user", token);
    res.json({
      token: token
    });
  } else {
    res.status(404);
  }
});

router.post("/logout", async function(req, res, next) {
  res.clearCookie("user");
  res.send("로그아웃 완료");
});

module.exports = router;
