// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE
// BY GOD'S GRACE ALONE

require("dotenv").config(); 

const express = require("express"); 
const fs = require("fs");
const path = require("path");

const cors = require("cors")
const app = express();

app.use(cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false
}));

app.set("port", process.env.PORT || 4001);


app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ praiseToTheLord: "The Lord alone is praised" });
});

app.post("/api/contracts", (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided from api" });
        }

        const filePath = "/tmp/contract_registry.json";

        fs.writeFileSync(
            filePath,
            JSON.stringify(req.body, null, 2),
            "utf8"
        );

        res.status(200).json({ data_received: req.body});
    } catch (err) {
        next(err);
    }
});

app.get("/api/retrieve_contract_details", (req, res, next) => {
    try {
        const filePath = "/tmp/contract_registry.json";

        if (!fs.existsSync(filePath)) {
            return res.status(400).json({ error: "No data provided from cache" });
        }

        const registry = JSON.parse(fs.readFileSync(filePath, "utf8"));
        res.status(200).json({ data: registry });
    } catch (err) {
        next(err);
    }
});


// ✅ REAL error-handling middleware
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message
    });
});

app.listen(app.get("port"), () => {
    console.log(`Server graciously running on port ${app.get("port")}`);
});

// module.exports = app
