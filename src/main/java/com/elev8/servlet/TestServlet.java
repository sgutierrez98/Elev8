package com.elev8.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/test")
public class TestServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("text/html");
        resp.getWriter().println("<h1 style='color:green;'>✅ Test Servlet funciona!</h1>");
        resp.getWriter().println("<p>Si ves esto, los Servlets estan funcionando correctamente.</p>");
        resp.getWriter().println("<a href='/elev8/'>Volver al inicio</a>");
    }
}