package com.elev8.sportswear.modelo;

import java.math.BigDecimal;

/**
 * Clase modelo (entidad) que representa un producto del catalogo de
 * Elev8 Sportswear.
 *
 * Corresponde a la clase "Producto" definida en el diagrama de clases
 * elaborado en las evidencias de diseño previas (fase de analisis y diseño
 * del ciclo de vida del software).
 *
 * Estandar de nombramiento aplicado:
 *  - Clase: PascalCase (Producto)
 *  - Atributos y metodos: camelCase (idProducto, obtenerNombreProducto...)
 *  - Paquete: minusculas (com.elev8.sportswear.modelo)
 */
public class Producto {

    private int idProducto;
    private String nombreProducto;
    private String categoria;
    private String talla;
    private String marca;
    private BigDecimal precioUnitario;
    private int stockDisponible;

    public Producto() {
    }

    public Producto(String nombreProducto, String categoria, String talla,
                     String marca, BigDecimal precioUnitario, int stockDisponible) {
        this.nombreProducto = nombreProducto;
        this.categoria = categoria;
        this.talla = talla;
        this.marca = marca;
        this.precioUnitario = precioUnitario;
        this.stockDisponible = stockDisponible;
    }

    public Producto(int idProducto, String nombreProducto, String categoria, String talla,
                     String marca, BigDecimal precioUnitario, int stockDisponible) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.categoria = categoria;
        this.talla = talla;
        this.marca = marca;
        this.precioUnitario = precioUnitario;
        this.stockDisponible = stockDisponible;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public int getStockDisponible() {
        return stockDisponible;
    }

    public void setStockDisponible(int stockDisponible) {
        this.stockDisponible = stockDisponible;
    }

    @Override
    public String toString() {
        return "ID: " + idProducto
                + " | Nombre: " + nombreProducto
                + " | Categoria: " + categoria
                + " | Talla: " + talla
                + " | Marca: " + marca
                + " | Precio: $" + precioUnitario
                + " | Stock: " + stockDisponible;
    }
}
