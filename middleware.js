const express = require('express');
const app = express();
const z = require('zod');

const mySchema = z.array(z.number());

app.use(express.json());

app.post('/health-checkup', (req, res) => {
    const kidneys = req.body.kidneys;
    const response = mySchema.safeParse(kidneys);
    if(!response.success) {
        return res.status(400).send({error: response.error.errors[0].message});
    }
});

app.listen(3000, () => {});