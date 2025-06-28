package com.Grupo4.editar_meus_dados.dto;

import java.time.LocalDate;

public class UsuarioCreateDto {

    private String nome;
    private String email;
    private String userName;
    private LocalDate dataIngresso;
    private String fotoUrl;
    private InformacoesDto informacoes;

    
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public InformacoesDto getInformacoes() {
        return informacoes;
    }

    public void setInformacoes(InformacoesDto informacoes) {
        this.informacoes = informacoes;
    }
}