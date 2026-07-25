package com.elev8.sportswear.dao;

import com.elev8.sportswear.modelo.Producto;

import java.sql.SQLException;
import java.util.List;

/**
 * Contrato del DAO (Data Access Object) para la entidad Producto.
 * Define las cuatro operaciones basicas exigidas por la evidencia:
 * insercion, consulta, actualizacion y eliminacion.
 *
 * Paquete: com.elev8.sportswear.dao
 * Interfaz: PascalCase con prefijo "I" -> IProductoDAO
 */
public interface IProductoDAO {

    boolean insertarProducto(Producto producto) throws SQLException;

    Producto consultarProductoPorId(int idProducto) throws SQLException;

    List<Producto> consultarTodosLosProductos() throws SQLException;

    boolean actualizarProducto(Producto producto) throws SQLException;

    boolean eliminarProducto(int idProducto) throws SQLException;
}
