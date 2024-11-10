const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const authRoutes = require('./routes/auth');
const TaskRoute = require('./routes/taskroute');
require('./config/DB');

const app = express();
const PORT = process.env.PORT;

// Enable CORS for all origins
const corsOptions = {
  origin: '*', // This will allow all domains to access the API
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
};

app.use(cors(corsOptions)); // Apply CORS globally with the defined options
app.use(express.json()); 

// Your routes
app.use('/api', authRoutes);
app.use('/task', TaskRoute);

app.get('/', (req, res) => {
    res.send('Hello from the Node.js backend!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config(); 
// const authRoutes = require('./routes/auth');
// const TaskRoute = require('./routes/taskroute');
// require('./config/DB');

// const app = express();
// const PORT = process.env.PORT;

// app.use(cors());
// app.use(express.json()); 

// app.use('/api', authRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello from the Node.js backend!');
// });
// app.use('/task', TaskRoute);
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
