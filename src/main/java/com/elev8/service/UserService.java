package com.elev8.service;

import com.elev8.dao.UserDAO;
import com.elev8.model.User;
import org.mindrot.jbcrypt.BCrypt;

public class UserService {

    private UserDAO userDAO;

    public UserService() {
        this.userDAO = new UserDAO();
    }

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

    public User findByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return null;
        }
        return userDAO.findByEmail(email);
    }

    public User findById(int id) {
        return userDAO.findById(id);
    }
}