package com.elev8.sportswear.conexion;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Clase encargada de gestionar la conexion a la base de datos PostgreSQL
 * de Elev8 Sportswear por medio de JDBC.
 *
 * Los parametros de conexion (url, usuario, contraseña) se leen desde
 * el archivo src/main/resources/config.properties, evitando dejar
 * credenciales escritas directamente en el codigo fuente.
 *
 * Paquete: com.elev8.sportswear.conexion
 * Clase: PascalCase -> ConexionBD
 */
public class ConexionBD {

    private static final String ARCHIVO_CONFIGURACION = "config.properties";

    /**
     * Abre y retorna una nueva conexion JDBC hacia la base de datos.
     *
     * @return objeto Connection listo para usarse.
     * @throws SQLException si ocurre un error al establecer la conexion.
     */
    public static Connection obtenerConexion() throws SQLException {
        Properties propiedades = new Properties();

        try (InputStream entrada = ConexionBD.class.getClassLoader()
                .getResourceAsStream(ARCHIVO_CONFIGURACION)) {

            if (entrada == null) {
                throw new SQLException("No se encontro el archivo " + ARCHIVO_CONFIGURACION
                        + " en el classpath.");
            }
            propiedades.load(entrada);

        } catch (Exception excepcion) {
            throw new SQLException("Error al leer la configuracion de conexion: "
                    + excepcion.getMessage(), excepcion);
        }

        String urlConexion = propiedades.getProperty("db.url");
        String usuarioConexion = propiedades.getProperty("db.user");
        String claveConexion = propiedades.getProperty("db.password");

        return DriverManager.getConnection(urlConexion, usuarioConexion, claveConexion);
    }

    /**
     * Cierra de forma segura una conexion JDBC.
     *
     * @param conexion conexion a cerrar.
     */
    public static void cerrarConexion(Connection conexion) {
        if (conexion != null) {
            try {
                conexion.close();
            } catch (SQLException excepcion) {
                System.err.println("Error al cerrar la conexion: " + excepcion.getMessage());
            }
        }
    }
}
