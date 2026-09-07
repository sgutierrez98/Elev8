package com.elev8.business.service;

import com.elev8.persistence.dao.UserDAO;
import com.elev8.persistence.model.User;
import org.mindrot.jbcrypt.BCrypt;

/**
 * Servicio para gestión de usuarios y autenticación
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class UserService {

    private final UserDAO userDAO;

    public UserService() {
        this.userDAO = new UserDAO();
    }

    /**
     * Autenticar un usuario por email y contraseña
     * @param email Correo electrónico
     * @param password Contraseña (plano)
     * @return Usuario autenticado o null
     */
    public User authenticate(String email, String password) {
        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            return null;
        }

        User user = userDAO.findByEmail(email.trim());
        if (user == null) {
            return null;
        }

        // Verificar contraseña con BCrypt
        if (BCrypt.checkpw(password, user.getPassword())) {
            return user;
        }

        return null;
    }

    /**
     * Registrar un nuevo usuario
     * @param user Datos del usuario
     * @return Usuario registrado o null si falla
     */
    public User register(User user) {
        if (user == null || user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            return null;
        }

        // Verificar si el email ya existe
        User existing = userDAO.findByEmail(user.getEmail());
        if (existing != null) {
            return null;
        }

        // Hashear la contraseña
        if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        }

        return userDAO.save(user);
    }

    /**
     * Buscar usuario por email
     * @param email Correo electrónico
     * @return Usuario encontrado o null
     */
    public User findByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return null;
        }
        return userDAO.findByEmail(email);
    }

    /**
     * Buscar usuario por ID
     * @param id ID del usuario
     * @return Usuario encontrado o null
     */
    public User findById(int id) {
        return userDAO.findById(id);
    }

    /**
     * Obtener todos los usuarios
     * @return Lista de usuarios
     */
    public java.util.List<User> findAll() {
        return userDAO.findAll();
    }

    /**
     * Actualizar un usuario
     * @param user Usuario con datos actualizados
     * @return Usuario actualizado o null
     */
    public User update(User user) {
        if (user == null || user.getId() == 0) {
            return null;
        }
        return userDAO.save(user);
    }

    /**
     * Eliminar un usuario (borrado lógico)
     * @param id ID del usuario
     * @return true si se eliminó correctamente
     */
    public boolean delete(int id) {
        return userDAO.delete(id);
    }

    /**
     * Cambiar contraseña de un usuario
     * @param userId ID del usuario
     * @param newPassword Nueva contraseña (plano)
     * @return true si se actualizó correctamente
     */
    public boolean changePassword(int userId, String newPassword) {
        if (newPassword == null || newPassword.trim().isEmpty() || newPassword.length() < 6) {
            return false;
        }

        String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
        return userDAO.updatePassword(userId, hashedPassword);
    }

    /**
     * Verificar si un usuario tiene rol de administrador
     * @param userId ID del usuario
     * @return true si es administrador
     */
    public boolean isAdmin(int userId) {
        User user = findById(userId);
        return user != null && "ADMIN".equals(user.getRole());
    }
}