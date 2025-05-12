require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRouter");
const clientRoutes = require("./routes/clientRouter");
const adminRoutes = require("./routes/adminRouter");
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});
