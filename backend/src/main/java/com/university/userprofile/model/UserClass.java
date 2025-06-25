package com.university.userprofile.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "user_classes")
public class UserClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private String classCode;
    private String discipline;
    private String knowledgeCenter;
    private String schedule;
    private Integer workload;

    // Constructors
    public UserClass() {}

    public UserClass(User user, String classCode, String discipline, String knowledgeCenter, String schedule, Integer workload) {
        this.user = user;
        this.classCode = classCode;
        this.discipline = discipline;
        this.knowledgeCenter = knowledgeCenter;
        this.schedule = schedule;
        this.workload = workload;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getClassCode() { return classCode; }
    public void setClassCode(String classCode) { this.classCode = classCode; }

    public String getDiscipline() { return discipline; }
    public void setDiscipline(String discipline) { this.discipline = discipline; }

    public String getKnowledgeCenter() { return knowledgeCenter; }
    public void setKnowledgeCenter(String knowledgeCenter) { this.knowledgeCenter = knowledgeCenter; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public Integer getWorkload() { return workload; }
    public void setWorkload(Integer workload) { this.workload = workload; }
}