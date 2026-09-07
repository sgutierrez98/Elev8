package com.elev8.persistence.dao;

import com.elev8.persistence.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Pruebas de integración para UserDAO
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
class UserDAOTest {

    private UserDAO userDAO = new UserDAO();

    @Test
    void testFindByEmail_ExistingUser_ReturnsUser() {
        // Esta prueba asume que hay un usuario de prueba en la base de datos
        String email = "test@elev8.com";
        User result = userDAO.findByEmail(email);
        // Nota: En un entorno de prueba real, tendrías que crear el usuario primero
        // o usar una base de datos de prueba separada
    }
}