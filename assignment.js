const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get("/files", (req, res) => {
    const directoryPath = path.join(__dirname, 'files');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ msg: "Internal Server Error" });
        }
        res.json({ files });
    });
});

app.get("/files/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'files', filename);

    console.log(`Attempting to read file: ${filePath}`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ msg: "File not found" });
            }
            return res.status(500).json({ msg: "Internal Server Error" });
        }
        res.json({ contents: data });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});