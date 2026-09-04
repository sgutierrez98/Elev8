package com.elev8.servlet;

import com.elev8.model.User;
import com.elev8.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    private UserService userService;

    @Override
    public void init() throws ServletException {
        userService = new UserService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        req.getRequestDispatcher("/register.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String email = req.getParameter("email");
        String password = req.getParameter("password");
        String confirmPassword = req.getParameter("confirmPassword");
        String firstName = req.getParameter("firstName");
        String lastName = req.getParameter("lastName");
        String phone = req.getParameter("phone");

        // Validaciones
        if (email == null || email.trim().isEmpty()) {
            req.setAttribute("error", "El correo es obligatorio");
            req.getRequestDispatcher("/register.jsp").forward(req, resp);
            return;
        }

        if (password == null || password.trim().isEmpty() || password.length() < 6) {
            req.setAttribute("error", "La contraseña debe tener al menos 6 caracteres");
            req.getRequestDispatcher("/register.jsp").forward(req, resp);
            return;
        }

        if (!password.equals(confirmPassword)) {
            req.setAttribute("error", "Las contraseñas no coinciden");
            req.getRequestDispatcher("/register.jsp").forward(req, resp);
            return;
        }

        if (firstName == null || firstName.trim().isEmpty()) {
            req.setAttribute("error", "El nombre es obligatorio");
            req.getRequestDispatcher("/register.jsp").forward(req, resp);
            return;
        }

        // Crear usuario
        User user = new User();
        user.setEmail(email.trim());
        user.setPassword(password);
        user.setFirstName(firstName.trim());
        user.setLastName(lastName != null ? lastName.trim() : "");
        user.setPhone(phone != null ? phone.trim() : "");

        User created = userService.register(user);

        if (created != null) {
            req.setAttribute("success", "Cuenta creada correctamente. ¡Inicia sesión!");
            req.getRequestDispatcher("/login.jsp").forward(req, resp);
        } else {
            req.setAttribute("error", "El correo ya está registrado o hubo un error");
            req.getRequestDispatcher("/register.jsp").forward(req, resp);
        }
    }
}