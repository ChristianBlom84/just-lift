const express = require('express');
const config = require('dotenv').config({ path: "./deploy/.env" });

const connectDB = require('./config/db');

const app = express();

// Connect Database
(async () => {
  try {
    console.log("Connecting to DB");
    await connectDB();
  } catch (error) {
    console.log("MongoDB connection error");
    console.error(error);
    setTimeout(connectDB(), 5000);
  }
})();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));