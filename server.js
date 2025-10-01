import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const API_KEY = process.env.MAILERLITE_API_KEY;


const app = express();
app.use(cors({ origin: "https://www.origenefashion.com" }));
app.use(express.json());

// Newsletter signup endpoint
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const response = await axios.post(
      "https://connect.mailerlite.com/api/subscribers",
      {
        email: email,
        status: "active"
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Subscription failed", error: error.response?.data });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
