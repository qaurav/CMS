const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB", conn.connection.host)
    }catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}
module.exports = connectDB;