const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://localhost:27017/elev8_db',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ Error al conectar MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
