const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
    try {
        const dataPesanan = req.body;

        if (!Array.isArray(dataPesanan)) {
        return res.status(400).json({ error: "❌ Format data harus array of array" });
        }

        const response = await axios.post(process.env.WEBAPP_URL, dataPesanan, {
        headers: { "Content-Type": "application/json" }
        });

        res.status(200).send(response.data);
    } catch (err) {
        console.error("❌ Gagal kirim:", err.message);
        res.status(500).json({ error: "❌ Server gagal kirim ke Web App" });
    }
});

    app.listen(5000, () => {
    console.log("🚀 Backend aktif di http://localhost:5000");
});
