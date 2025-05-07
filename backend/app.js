require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

// 中間件配置
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// 使用路由
const authRoutes = require("./routes/auth");
const filesRoutes = require("./routes/fileManager");
app.use("/", authRoutes);
app.use("/", filesRoutes);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});
