const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.json());
app.use(cors())

const usePages = {
    pages: 1,
    setPages: function (data) { this.pages = data }
}

app.use('/', require('./routes/root'))


app.post('/v1/api/login', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send({ token: '<JWT Token>', user_id: 1234, role: 'fdsafa' })
})

//backend pagination api
app.get('/api/v1/model', async (req, res) => {
    const { page, limit } = req.query;
    usePages.setPages(page)
    const data = require('./model/data.json')
    const totalItemsNumber = data.length;
    const num_pages = Math.ceil(totalItemsNumber / limit);
    if (usePages.pages > num_pages) {
        usePages.setPages(num_pages)
    }
    const lowerLimit = usePages.pages * limit - limit;
    const upperLimit = usePages.pages * limit;
    console.log(totalItemsNumber);
    const items = data.slice(lowerLimit, upperLimit)
    res.send({
        "list": items,
        "num_pages": num_pages,
        "page": parseInt(usePages.pages),
        "limit": parseInt(limit)
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