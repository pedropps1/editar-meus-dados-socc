package com.Grupo4.editar_meus_dados.dto;

import com.Grupo4.editar_meus_dados.model.Usuario;
import com.Grupo4.editar_meus_dados.model.Informacoes; // Importe Informacoes para o construtor

import java.time.LocalDate;
import java.time.LocalDateTime; // Para o ultimoAcesso dentro de InformacoesDTO

public class UsuarioDTO {

    private Long id;
    private String userName;
    private String nome;
    private String email;
    private LocalDate dataIngresso;
    private String fotoUrl;
    private InformacoesDTO informacoes;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.userName = usuario.getUserName();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.dataIngresso = usuario.getDataIngresso();
        this.fotoUrl = usuario.getFotoUrl();

       
        if (usuario.getInformacoes() != null) {
            
            this.informacoes = new InformacoesDTO(usuario.getInformacoes());
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDate getDataIngresso() { return dataIngresso; }
    public void setDataIngresso(LocalDate dataIngresso) { this.dataIngresso = dataIngresso; }
    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
    public InformacoesDTO getInformacoes() { return informacoes; }
    public void setInformacoes(InformacoesDTO informacoes) { this.informacoes = informacoes; }

    
    public static class InformacoesDTO {
        private Long id;
        private String emailSecundario;
        private String curriculoLattes;
        private String telefone;
        private LocalDateTime ultimoAcesso;

        public InformacoesDTO(Informacoes informacoes) {
            this.id = informacoes.getId();
            this.emailSecundario = informacoes.getEmailSecundario();
            this.curriculoLattes = informacoes.getCurriculoLattes();
            this.telefone = informacoes.getTelefone();
            this.ultimoAcesso = informacoes.getUltimoAcesso();
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getEmailSecundario() { return emailSecundario; }
        public void setEmailSecundario(String emailSecundario) { this.emailSecundario = emailSecundario; }
        public String getCurriculoLattes() { return curriculoLattes; }
        public void setCurriculoLattes(String curriculoLattes) { this.curriculoLattes = curriculoLattes; }
        public String getTelefone() { return telefone; }
        public void setTelefone(String telefone) { this.telefone = telefone; }
        public LocalDateTime getUltimoAcesso() { return ultimoAcesso; }
        public void setUltimoAcesso(LocalDateTime ultimoAcesso) { this.ultimoAcesso = ultimoAcesso; }
    }
}