const express = require('express');
const connectMongo = require('./database')
const cors = require('cors')

connectMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/fooditem'));
app.use('/api', require('./routes/orders'));

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});