const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error('Error connecting to MongoDB: ' , error);
        })
    } catch (error) {
        console.error('Error conntecting to the database: ' , error);
    }
}

module.exports = connectDB;
