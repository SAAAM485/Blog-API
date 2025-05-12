require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const blogRoutes = require("./routes/blogRouter");
app.use("/", blogRoutes);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});
