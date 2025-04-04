require('dotenv').config({ path: './.env' });
const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const locationRoutes = require('./routes/locationRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());


//DB Connection
connectDB();

//API Endpoints
app.use('/api/admins', adminRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings',bookingRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));