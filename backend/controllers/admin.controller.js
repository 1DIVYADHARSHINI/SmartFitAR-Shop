import Admin from "../models/Admin.model.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  /*console.log("LOGIN DATA:", email, password);*/

  try {
    const admin = await Admin.findOne({ email, password });

    {
      /*console.log("ADMIN FOUND:", admin);*/
    }

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
