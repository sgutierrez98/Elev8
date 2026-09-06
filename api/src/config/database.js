/**
 * Configuración de conexión a MongoDB
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */

const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Conecta a la base de datos MongoDB
 * @returns {Promise} - Promesa de conexión
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error al conectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;