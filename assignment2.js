const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
    {
        username : "harkirat@gmail.com",
        password : "123",
        name : "harkirat singh"
    },
    {
        username : "raman@gmail.com",
        password : "123321",
        name : "raman singh"
    },
    {
        username : "priya@gmail.com",
        password : "123321",
        name : "priya kumari"
    }
];

function userExists(username, password) {
    if(ALL_USERS.find(user => user.username === username && user.password === password)) {
        return true;
    } else {
        return false;
    }
}

app.post("/signIn", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        return res.status(403).json({
            msg: "User does not exist",
        });
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        res.json({
            users: ALL_USERS.filter(user => user.username !== username),
        });
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000);