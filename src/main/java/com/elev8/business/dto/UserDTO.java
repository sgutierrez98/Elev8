package com.elev8.business.dto;

/**
 * DTO para transferir datos de Usuario
 * @author Elev8 Sportswear Team
 * @version 1.0.0
 */
public class UserDTO {
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String role;

    public UserDTO() {}

    public UserDTO(int id, String email, String firstName, String lastName, String phone, String role) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getFullName() { return firstName + " " + lastName; }
}