const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/simple-interest", (req, res) => {
    const principal = parseInt(req.query.principal);
    const rate = parseInt(req.query.rate);
    const time = parseInt(req.query.time);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        return res.status(400).send("Invalid information provided");
    }
    const simpleInterest = (principal * rate * time) / 100;
    res.send(simpleInterest.toString());
});

app.listen(3000);