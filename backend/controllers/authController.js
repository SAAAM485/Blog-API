const db = require("../db/queries");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await db.verifyAdminUser(username, password);

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successfully", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

async function logout(req, res) {
    // Invalidate the token on the client side
    res.status(200).json({ message: "Logout successfully" });
}

module.exports = {
    login,
    logout,
};
