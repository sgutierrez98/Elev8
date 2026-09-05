package com.elev8.servlet;

import com.elev8.model.User;
import com.elev8.service.UserService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * API REST para Autenticación
 * Endpoint: /api/auth
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
@WebServlet("/api/auth/*")
public class AuthApiServlet extends HttpServlet {

    private UserService userService;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        userService = new UserService();
        gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();

        try {
            Map<String, String> requestData = gson.fromJson(req.getReader(), Map.class);

            if ("/login".equals(pathInfo)) {
                handleLogin(req, resp, requestData);
            } else if ("/register".equals(pathInfo)) {
                handleRegister(req, resp, requestData);
            } else if ("/logout".equals(pathInfo)) {
                handleLogout(req, resp);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Endpoint no encontrado\"}");
            }

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    private void handleLogin(HttpServletRequest req, HttpServletResponse resp,
                             Map<String, String> data) throws IOException {

        String email = data.get("email");
        String password = data.get("password");

        User user = userService.authenticate(email, password);

        if (user != null) {
            HttpSession session = req.getSession();
            session.setAttribute("user", user);
            session.setAttribute("isLoggedIn", true);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", user);
            response.put("message", "Login exitoso");

            resp.getWriter().write(gson.toJson(response));
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Correo o contraseña incorrectos\"}");
        }
    }

    private void handleRegister(HttpServletRequest req, HttpServletResponse resp,
                                Map<String, String> data) throws IOException {

        User user = new User();
        user.setEmail(data.get("email"));
        user.setPassword(data.get("password"));
        user.setFirstName(data.get("firstName"));
        user.setLastName(data.get("lastName"));
        user.setPhone(data.get("phone"));

        User created = userService.register(user);

        if (created != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Usuario registrado correctamente");
            resp.getWriter().write(gson.toJson(response));
        } else {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"El correo ya está registrado\"}");
        }
    }

    private void handleLogout(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        resp.getWriter().write("{\"success\":true,\"message\":\"Sesión cerrada\"}");
    }
}