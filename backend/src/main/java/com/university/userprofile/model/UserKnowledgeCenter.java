package com.university.userprofile.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "user_knowledge_centers")
public class UserKnowledgeCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private String centerName;
    private String area;
    private String facilitator;
    private String associatedTeachers;
    private String disciplines;

    // Constructors
    public UserKnowledgeCenter() {}

    public UserKnowledgeCenter(User user, String centerName, String area, String facilitator) {
        this.user = user;
        this.centerName = centerName;
        this.area = area;
        this.facilitator = facilitator;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCenterName() { return centerName; }
    public void setCenterName(String centerName) { this.centerName = centerName; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getFacilitator() { return facilitator; }
    public void setFacilitator(String facilitator) { this.facilitator = facilitator; }

    public String getAssociatedTeachers() { return associatedTeachers; }
    public void setAssociatedTeachers(String associatedTeachers) { this.associatedTeachers = associatedTeachers; }

    public String getDisciplines() { return disciplines; }
    public void setDisciplines(String disciplines) { this.disciplines = disciplines; }
}