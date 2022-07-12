const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.json());
app.use(cors())

// app.get('/', (req, res) => {
//     res.send('running the server with ' + port)
// })

app.use('/', require('./routes/root'))


app.post('/v1/api/login', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send({ token: '<JWT Token>', user_id: 1234, role: 'fdsafa' })
})

//backend pagination api
app.get('/api/v1/model', async (req, res) => {
    const { page, limit } = req.query;
    // console.log(page, limit);
    const data = require('./model/data.json')
    const totalItemsNumber = data.length;
    const lowerLimit = page * limit - limit;
    const upperLimit = page * limit;
    // console.log(totalItemsNumber);
    const num_pages = totalItemsNumber / limit;
    const items = data.slice(lowerLimit, upperLimit)
    res.send({
        "list": items,
        "num_pages": num_pages,
        "page": page,
        "limit": limit
    }
    )
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(port, () => {
    console.log('Listening the port' + port)
})