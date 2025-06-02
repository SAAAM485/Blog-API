require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://saaam485.github.io",
            "https://blog-api-frontend-admin.netlify.app",
            "https://blog-api-frontend-client.netlify.app",
        ],
    })
);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRouter");
const clientRoutes = require("./routes/clientRouter");
const adminRoutes = require("./routes/adminRouter");
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});
