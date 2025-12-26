// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE
// BY GOD'S GRACE ALONE

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 4001)

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    // res.type("application/json")
    res.status(200).json({praiseToTheLord: "The Lord alone is praised"})
})

app.post("/api/contracts", (req,res,next)=>{

    if(!req.body || Object.keys(req.body).length === 0){
        return res.status(400).json({error: "No data provided from api"})
    }

    const payload = req.body;

    const filePath = path.join(__dirname, "contract_registry.json");

    if (fs.existsSync(filePath)){
        fs.unlinkSync(filePath)
    }
    
    // registry.push(payload);
    let registry = JSON.parse(fs.readFileSync(filePath))

    fs.writeFileSync(filePath, JSON.stringify(registry, null, 2))


    res.status(200).json({updated: true})
})

app.get("/api/retrieve_contract_details", (req,res)=>{

    filePath = path.join(__dirname, "contract_registry.json");

    if (fs.existsSync(filePath)){
        registry = JSON.parse(fs.readFileSync(filePath))
        res.status(200).json({data: registry})
    }
    else{
        res.status(400).json({error: "No data provided from cache"})
    }
})

app.use((req,res,next)=>{
    res.status(500).json({error: "Server error"})
})

app.listen(app.get("port"), ()=>{
    console.log(`Server graciously running on port ${app.get("port")}`)
})