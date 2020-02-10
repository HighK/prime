var express = require("express");
var app = express();
var cors = require("cors");
var mysql = require("mysql2/promise");
const session = require("express-session");
const models = require("./models/index.js");
const cookieParser = require("cookie-parser");

// database connection ===============================================================

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch(err => {
    console.log("연결 실패");
    console.log(err);
  });

// configuration ===============================================================

app.use(
  session({
    key: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
  })
);

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

var userRouter = require("./routes/user");
var projectRouter = require("./routes/project");

//  ===============================================================

app.use("/project", projectRouter);
app.use("/auth", userRouter);
app.get("/", () => {});

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
