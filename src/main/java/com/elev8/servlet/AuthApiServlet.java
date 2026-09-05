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

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
            // Leer el body de la petición
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = req.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String jsonBody = sb.toString();
            System.out.println("📥 Body recibido: " + jsonBody);

            Map<String, String> requestData = gson.fromJson(jsonBody, Map.class);

            if ("/login".equals(pathInfo)) {
                handleLogin(req, resp, requestData);
            } else if ("/register".equals(pathInfo)) {
                handleRegister(req, resp, requestData);
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Endpoint no encontrado\"}");
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private void handleLogin(HttpServletRequest req, HttpServletResponse resp,
                             Map<String, String> data) throws IOException {

        String email = data.get("email");
        String password = data.get("password");

        System.out.println("🔐 Login intento: " + email);

        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Email y contraseña son obligatorios\"}");
            return;
        }

        User user = userService.authenticate(email.trim(), password);

        if (user != null) {
            HttpSession session = req.getSession();
            session.setAttribute("user", user);
            session.setAttribute("isLoggedIn", true);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", user);
            response.put("message", "Login exitoso");
            response.put("token", "dummy-token-" + System.currentTimeMillis());

            System.out.println("✅ Login exitoso: " + email);
            resp.getWriter().write(gson.toJson(response));
        } else {
            System.out.println("❌ Login fallido: " + email);
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Correo o contraseña incorrectos\"}");
        }
    }

    private void handleRegister(HttpServletRequest req, HttpServletResponse resp,
                                Map<String, String> data) throws IOException {

        String email = data.get("email");
        String password = data.get("password");
        String firstName = data.get("firstName");
        String lastName = data.get("lastName");
        String phone = data.get("phone");

        System.out.println("📝 Registro intento: " + email);

        // Validaciones
        if (email == null || email.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"El correo es obligatorio\"}");
            return;
        }

        if (password == null || password.trim().isEmpty() || password.length() < 6) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"La contraseña debe tener al menos 6 caracteres\"}");
            return;
        }

        if (firstName == null || firstName.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"El nombre es obligatorio\"}");
            return;
        }

        User user = new User();
        user.setEmail(email.trim());
        user.setPassword(password);
        user.setFirstName(firstName.trim());
        user.setLastName(lastName != null ? lastName.trim() : "");
        user.setPhone(phone != null ? phone.trim() : "");

        User created = userService.register(user);

        if (created != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Usuario registrado correctamente");

            System.out.println("✅ Registro exitoso: " + email);
            resp.getWriter().write(gson.toJson(response));
        } else {
            System.out.println("❌ Registro fallido: " + email + " (email ya registrado)");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"El correo ya está registrado\"}");
        }
    }
}