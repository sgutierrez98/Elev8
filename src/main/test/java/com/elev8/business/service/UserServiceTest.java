package com.elev8.business.service;

import com.elev8.persistence.dao.UserDAO;
import com.elev8.persistence.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para UserService
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserDAO userDAO;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService();
    }

    @Test
    void testAuthenticate_ValidCredentials_ReturnsUser() {
        // Arrange
        String email = "test@elev8.com";
        String password = "123456";
        User mockUser = new User();
        mockUser.setEmail(email);

        when(userDAO.findByEmail(email)).thenReturn(mockUser);

        // Act
        User result = userService.authenticate(email, password);

        // Assert
        assertNotNull(result);
        assertEquals(email, result.getEmail());
        verify(userDAO, times(1)).findByEmail(email);
    }

    @Test
    void testAuthenticate_InvalidCredentials_ReturnsNull() {
        // Arrange
        String email = "test@elev8.com";
        String password = "wrongpassword";

        when(userDAO.findByEmail(email)).thenReturn(null);

        // Act
        User result = userService.authenticate(email, password);

        // Assert
        assertNull(result);
        verify(userDAO, times(1)).findByEmail(email);
    }

    @Test
    void testRegister_NewUser_ReturnsSavedUser() {
        // Arrange
        User user = new User();
        user.setEmail("new@elev8.com");
        user.setPassword("123456");
        user.setFirstName("Test");
        user.setLastName("User");

        when(userDAO.findByEmail(user.getEmail())).thenReturn(null);
        when(userDAO.save(any(User.class))).thenReturn(user);

        // Act
        User result = userService.register(user);

        // Assert
        assertNotNull(result);
        assertEquals(user.getEmail(), result.getEmail());
        verify(userDAO, times(1)).findByEmail(user.getEmail());
        verify(userDAO, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_DuplicateEmail_ReturnsNull() {
        // Arrange
        User user = new User();
        user.setEmail("existing@elev8.com");
        user.setPassword("123456");

        User existingUser = new User();
        existingUser.setEmail("existing@elev8.com");

        when(userDAO.findByEmail(user.getEmail())).thenReturn(existingUser);

        // Act
        User result = userService.register(user);

        // Assert
        assertNull(result);
        verify(userDAO, times(1)).findByEmail(user.getEmail());
        verify(userDAO, never()).save(any(User.class));
    }
}