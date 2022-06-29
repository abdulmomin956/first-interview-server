# server.js
```jsx
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

// app.get এর বদলে app.use এবং require ব্য়বহার করতে হবে।
app.use('/', require('./routes/root'))


app.post('/v1/api/login', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send({ token: '<JWT Token>', user_id: 1234, role: 'fdsafa' })
})


app.listen(port, () => {
    console.log('Listening the port' + port)
})
```