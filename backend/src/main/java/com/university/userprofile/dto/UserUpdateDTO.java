package com.university.userprofile.dto;

import com.university.userprofile.model.UserRole;
import jakarta.validation.constraints.Email;

import java.util.Set;

public class UserUpdateDTO {
    private String fullName;
    
    @Email
    private String email;
    
    @Email
    private String alternativeEmail;
    
    private String lattesUrl;
    private String phone;
    private Set<UserRole> roles;

    // Constructors
    public UserUpdateDTO() {}

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAlternativeEmail() { return alternativeEmail; }
    public void setAlternativeEmail(String alternativeEmail) { this.alternativeEmail = alternativeEmail; }

    public String getLattesUrl() { return lattesUrl; }
    public void setLattesUrl(String lattesUrl) { this.lattesUrl = lattesUrl; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Set<UserRole> getRoles() { return roles; }
    public void setRoles(Set<UserRole> roles) { this.roles = roles; }
}