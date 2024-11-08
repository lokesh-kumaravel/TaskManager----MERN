const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const authRoutes = require('./routes/auth');
require('./config/DB');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json()); 

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
