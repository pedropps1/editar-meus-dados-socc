package com.Grupo4.editar_meus_dados.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    private LocalDate dataIngresso;

    @Column(length = 500)
    private String fotoUrl;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "informacoes_id")
    private Informacoes informacoes;

    public Usuario() {
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataIngresso() {
        return dataIngresso;
    }

    public void setDataIngresso(LocalDate dataIngresso) {
        this.dataIngresso = dataIngresso;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public Informacoes getInformacoes() {
        return informacoes;
    }

    public void setInformacoes(Informacoes informacoes) {
        this.informacoes = informacoes;
    }

    @Override
    public String toString() {
        return "Usuario{" +
               "id=" + id +
               ", userName='" + userName + '\'' +
               ", nome='" + nome + '\'' +
               ", email='" + email + '\'' +
               ", dataIngresso=" + dataIngresso +
               ", fotoUrl='" + fotoUrl + '\'' +
               ", informacoes=" + informacoes +
               '}';
    }
}