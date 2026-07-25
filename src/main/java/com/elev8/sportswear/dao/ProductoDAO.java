package com.elev8.sportswear.dao;

import com.elev8.sportswear.conexion.ConexionBD;
import com.elev8.sportswear.modelo.Producto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Implementacion del DAO de Producto. Realiza las operaciones CRUD
 * (Create, Read, Update, Delete) contra la tabla "productos" de la
 * base de datos PostgreSQL de Elev8 Sportswear, usando JDBC con
 * PreparedStatement para prevenir inyeccion SQL.
 *
 * Paquete: com.elev8.sportswear.dao
 * Clase: PascalCase -> ProductoDAO
 * Metodos: camelCase -> insertarProducto, consultarProductoPorId...
 */
public class ProductoDAO implements IProductoDAO {

    private static final String SQL_INSERTAR =
            "INSERT INTO productos (nombre_producto, categoria, talla, marca, precio_unitario, stock_disponible) "
                    + "VALUES (?, ?, ?, ?, ?, ?)";

    private static final String SQL_CONSULTAR_POR_ID =
            "SELECT id_producto, nombre_producto, categoria, talla, marca, precio_unitario, stock_disponible "
                    + "FROM productos WHERE id_producto = ?";

    private static final String SQL_CONSULTAR_TODOS =
            "SELECT id_producto, nombre_producto, categoria, talla, marca, precio_unitario, stock_disponible "
                    + "FROM productos ORDER BY id_producto";

    private static final String SQL_ACTUALIZAR =
            "UPDATE productos SET nombre_producto = ?, categoria = ?, talla = ?, marca = ?, "
                    + "precio_unitario = ?, stock_disponible = ? WHERE id_producto = ?";

    private static final String SQL_ELIMINAR =
            "DELETE FROM productos WHERE id_producto = ?";

    /**
     * Inserta un nuevo producto en el catalogo de Elev8 Sportswear.
     */
    @Override
    public boolean insertarProducto(Producto producto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_INSERTAR)) {

            sentencia.setString(1, producto.getNombreProducto());
            sentencia.setString(2, producto.getCategoria());
            sentencia.setString(3, producto.getTalla());
            sentencia.setString(4, producto.getMarca());
            sentencia.setBigDecimal(5, producto.getPrecioUnitario());
            sentencia.setInt(6, producto.getStockDisponible());

            int filasAfectadas = sentencia.executeUpdate();
            return filasAfectadas > 0;
        }
    }

    /**
     * Consulta un producto especifico a partir de su identificador.
     */
    @Override
    public Producto consultarProductoPorId(int idProducto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_CONSULTAR_POR_ID)) {

            sentencia.setInt(1, idProducto);

            try (ResultSet resultado = sentencia.executeQuery()) {
                if (resultado.next()) {
                    return mapearProducto(resultado);
                }
                return null;
            }
        }
    }

    /**
     * Consulta el listado completo de productos del catalogo.
     */
    @Override
    public List<Producto> consultarTodosLosProductos() throws SQLException {
        List<Producto> listaProductos = new ArrayList<>();

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_CONSULTAR_TODOS);
             ResultSet resultado = sentencia.executeQuery()) {

            while (resultado.next()) {
                listaProductos.add(mapearProducto(resultado));
            }
        }
        return listaProductos;
    }

    /**
     * Actualiza los datos de un producto existente.
     */
    @Override
    public boolean actualizarProducto(Producto producto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ACTUALIZAR)) {

            sentencia.setString(1, producto.getNombreProducto());
            sentencia.setString(2, producto.getCategoria());
            sentencia.setString(3, producto.getTalla());
            sentencia.setString(4, producto.getMarca());
            sentencia.setBigDecimal(5, producto.getPrecioUnitario());
            sentencia.setInt(6, producto.getStockDisponible());
            sentencia.setInt(7, producto.getIdProducto());

            int filasAfectadas = sentencia.executeUpdate();
            return filasAfectadas > 0;
        }
    }

    /**
     * Elimina un producto del catalogo a partir de su identificador.
     */
    @Override
    public boolean eliminarProducto(int idProducto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ELIMINAR)) {

            sentencia.setInt(1, idProducto);

            int filasAfectadas = sentencia.executeUpdate();
            return filasAfectadas > 0;
        }
    }

    /**
     * Metodo de apoyo (privado) que transforma una fila del ResultSet
     * en un objeto Producto.
     */
    private Producto mapearProducto(ResultSet resultado) throws SQLException {
        Producto producto = new Producto();
        producto.setIdProducto(resultado.getInt("id_producto"));
        producto.setNombreProducto(resultado.getString("nombre_producto"));
        producto.setCategoria(resultado.getString("categoria"));
        producto.setTalla(resultado.getString("talla"));
        producto.setMarca(resultado.getString("marca"));
        producto.setPrecioUnitario(resultado.getBigDecimal("precio_unitario"));
        producto.setStockDisponible(resultado.getInt("stock_disponible"));
        return producto;
    }
}
