package com.elev8.sportswear.dao;

import com.elev8.sportswear.modelo.Producto;

import java.sql.SQLException;
import java.util.List;


public interface IProductoDAO {

    boolean insertarProducto(Producto producto) throws SQLException;

    Producto consultarProductoPorId(int idProducto) throws SQLException;

    List<Producto> consultarTodosLosProductos() throws SQLException;

    boolean actualizarProducto(Producto producto) throws SQLException;

    boolean eliminarProducto(int idProducto) throws SQLException;
}

