const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://anubhavsingh:sa44yi%40Anu123@cluster-kfin2010312.bmr22.mongodb.net/user_app");

const userSchema = mongoose.model('Users', {
    name : String,
    email : String,
    password : String
});

app.post('/signUp', async (req, res) => {
    const {name, email, password} = req.body;
    const existingUser = await userSchema.findOne({email : email});
    if(existingUser){
        return res.status(400).json({
            message : "User Already Exists"
        });
    }
    const user = new userSchema({name, email, password});
    await user.save();
    res.json({
        message : "User Created Successfully"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})