const express = require('express');
const cors = require('cors');
const config = require('dotenv').config({ path: './deploy/.env' });
const logger = require('./loggers/logger');
const errorLogger = require('./loggers/errorLogger');

const connectDB = require('./config/db');

const app = express();
const router = express.Router();

const corsOptions = {
	origin: process.env.ALLOW_ORIGIN
};

// Connect Database
(async () => {
	try {
		console.log('Connecting to DB');
		await connectDB();
	} catch (error) {
		console.log('MongoDB connection error');
		console.error(error);
		setTimeout(connectDB(), 5000);
	}
})();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use(router);
router.use('/api/auth', require('./routes/api/auth'));
router.use('/api/exercises', require('./routes/api/exercises'));
router.use('/api/workouts', require('./routes/api/workouts'));
router.use('/api/history', require('./routes/api/history'));

// Loggers
app.use(logger);
app.use(errorLogger);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export server for backend tests
module.exports = server;
