package com.elev8.sportswear.vista;

import com.elev8.sportswear.dao.IProductoDAO;
import com.elev8.sportswear.dao.ProductoDAO;
import com.elev8.sportswear.modelo.Producto;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;


public class MenuPrincipal {

    private static final IProductoDAO productoDAO = new ProductoDAO();
    private static final Scanner entradaEscaner = new Scanner(System.in);

    public static void main(String[] argumentos) {
        int opcionSeleccionada;

        do {
            mostrarMenu();
            opcionSeleccionada = leerOpcionEntera();

            switch (opcionSeleccionada) {
                case 1 -> insertarProducto();
                case 2 -> consultarTodosLosProductos();
                case 3 -> consultarProductoPorId();
                case 4 -> actualizarProducto();
                case 5 -> eliminarProducto();
                case 0 -> System.out.println("Cerrando modulo de productos Elev8 Sportswear...");
                default -> System.out.println("Opcion invalida. Intente nuevamente.");
            }
        } while (opcionSeleccionada != 0);

        entradaEscaner.close();
    }

    private static void mostrarMenu() {
        System.out.println("\n===== ELEV8 SPORTSWEAR - MODULO DE PRODUCTOS =====");
        System.out.println("1. Insertar producto");
        System.out.println("2. Consultar todos los productos");
        System.out.println("3. Consultar producto por ID");
        System.out.println("4. Actualizar producto");
        System.out.println("5. Eliminar producto");
        System.out.println("0. Salir");
        System.out.print("Seleccione una opcion: ");
    }

    private static void insertarProducto() {
        try {
            System.out.print("Nombre del producto: ");
            String nombreProducto = entradaEscaner.nextLine();

            System.out.print("Categoria (ej. Calzado, Camisetas, Accesorios): ");
            String categoria = entradaEscaner.nextLine();

            System.out.print("Talla: ");
            String talla = entradaEscaner.nextLine();

            System.out.print("Marca: ");
            String marca = entradaEscaner.nextLine();

            System.out.print("Precio unitario: ");
            BigDecimal precioUnitario = new BigDecimal(entradaEscaner.nextLine());

            System.out.print("Stock disponible: ");
            int stockDisponible = Integer.parseInt(entradaEscaner.nextLine());

            Producto nuevoProducto = new Producto(nombreProducto, categoria, talla,
                    marca, precioUnitario, stockDisponible);

            boolean insercionExitosa = productoDAO.insertarProducto(nuevoProducto);
            System.out.println(insercionExitosa
                    ? "Producto insertado correctamente."
                    : "No se pudo insertar el producto.");

        } catch (SQLException excepcionSql) {
            System.err.println("Error de base de datos al insertar: " + excepcionSql.getMessage());
        } catch (NumberFormatException excepcionFormato) {
            System.err.println("Precio o stock invalido: " + excepcionFormato.getMessage());
        }
    }

    private static void consultarTodosLosProductos() {
        try {
            List<Producto> listaProductos = productoDAO.consultarTodosLosProductos();
            if (listaProductos.isEmpty()) {
                System.out.println("No hay productos registrados.");
            } else {
                listaProductos.forEach(System.out::println);
            }
        } catch (SQLException excepcionSql) {
            System.err.println("Error de base de datos al consultar: " + excepcionSql.getMessage());
        }
    }

    private static void consultarProductoPorId() {
        try {
            System.out.print("ID del producto a consultar: ");
            int idProducto = Integer.parseInt(entradaEscaner.nextLine());

            Producto producto = productoDAO.consultarProductoPorId(idProducto);
            System.out.println(producto != null ? producto : "Producto no encontrado.");

        } catch (SQLException excepcionSql) {
            System.err.println("Error de base de datos al consultar: " + excepcionSql.getMessage());
        } catch (NumberFormatException excepcionFormato) {
            System.err.println("ID invalido: " + excepcionFormato.getMessage());
        }
    }

    private static void actualizarProducto() {
        try {
            System.out.print("ID del producto a actualizar: ");
            int idProducto = Integer.parseInt(entradaEscaner.nextLine());

            Producto productoExistente = productoDAO.consultarProductoPorId(idProducto);
            if (productoExistente == null) {
                System.out.println("Producto no encontrado.");
                return;
            }

            System.out.print("Nuevo nombre (" + productoExistente.getNombreProducto() + "): ");
            productoExistente.setNombreProducto(entradaEscaner.nextLine());

            System.out.print("Nueva categoria (" + productoExistente.getCategoria() + "): ");
            productoExistente.setCategoria(entradaEscaner.nextLine());

            System.out.print("Nueva talla (" + productoExistente.getTalla() + "): ");
            productoExistente.setTalla(entradaEscaner.nextLine());

            System.out.print("Nueva marca (" + productoExistente.getMarca() + "): ");
            productoExistente.setMarca(entradaEscaner.nextLine());

            System.out.print("Nuevo precio (" + productoExistente.getPrecioUnitario() + "): ");
            productoExistente.setPrecioUnitario(new BigDecimal(entradaEscaner.nextLine()));

            System.out.print("Nuevo stock (" + productoExistente.getStockDisponible() + "): ");
            productoExistente.setStockDisponible(Integer.parseInt(entradaEscaner.nextLine()));

            boolean actualizacionExitosa = productoDAO.actualizarProducto(productoExistente);
            System.out.println(actualizacionExitosa
                    ? "Producto actualizado correctamente."
                    : "No se pudo actualizar el producto.");

        } catch (SQLException excepcionSql) {
            System.err.println("Error de base de datos al actualizar: " + excepcionSql.getMessage());
        } catch (NumberFormatException excepcionFormato) {
            System.err.println("Valor numerico invalido: " + excepcionFormato.getMessage());
        }
    }

    private static void eliminarProducto() {
        try {
            System.out.print("ID del producto a eliminar: ");
            int idProducto = Integer.parseInt(entradaEscaner.nextLine());

            boolean eliminacionExitosa = productoDAO.eliminarProducto(idProducto);
            System.out.println(eliminacionExitosa
                    ? "Producto eliminado correctamente."
                    : "No se encontro el producto a eliminar.");

        } catch (SQLException excepcionSql) {
            System.err.println("Error de base de datos al eliminar: " + excepcionSql.getMessage());
        } catch (NumberFormatException excepcionFormato) {
            System.err.println("ID invalido: " + excepcionFormato.getMessage());
        }
    }

    private static int leerOpcionEntera() {
        try {
            return Integer.parseInt(entradaEscaner.nextLine().trim());
        } catch (NumberFormatException excepcionFormato) {
            return -1;
        }
    }
}
