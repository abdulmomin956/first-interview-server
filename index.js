const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('running the server with' + port)
})


app.post('/v1/api/login', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send({ token: '<JWT Token>', user_id: 1234, role: 'fdsafa' })
})


app.listen(port, () => {
    console.log('Listening the port' + port)
})