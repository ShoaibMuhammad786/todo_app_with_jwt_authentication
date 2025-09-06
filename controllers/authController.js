const authService = require("../services/authService");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });
    if (!role) return res.status(400).json({ error: "User role is required" });

    const data = await authService.createUser({ name, email, password, role });

    res.status(400).json(data);
  } catch (error) {
    console.log("err while creating user >>> ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });

    const data = await authService.loginUser({ email, password });
    res.status(200).json(data);
  } catch (error) {
    console.log(`Error while sign in >>> `, error);
    res.status(500).json({ error: error.message });
  }
};
