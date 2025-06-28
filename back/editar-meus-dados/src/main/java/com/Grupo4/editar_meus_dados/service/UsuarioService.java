package com.Grupo4.editar_meus_dados.service;

import com.Grupo4.editar_meus_dados.model.Informacoes;
import com.Grupo4.editar_meus_dados.model.Usuario;
import com.Grupo4.editar_meus_dados.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario buscarUsuarioPorId(Long id) {
        return usuarioRepository.findByIdWithInformacoes(id).orElse(null);
    }

    @Transactional
    public Usuario atualizarUsuario(Long id, String nome, String email, String userName,
                                    String emailSecundario, String curriculoLattes, String telefone, String fotoUrl) {
        Usuario usuarioExistente = usuarioRepository.findByIdWithInformacoes(id)
                                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));

        if (nome != null) usuarioExistente.setNome(nome);
        if (email != null) usuarioExistente.setEmail(email);
        if (userName != null) usuarioExistente.setUserName(userName);
        if (fotoUrl != null) usuarioExistente.setFotoUrl(fotoUrl);

        
        Informacoes informacoes = usuarioExistente.getInformacoes();
        if (informacoes == null) {
            informacoes = new Informacoes();
            usuarioExistente.setInformacoes(informacoes);
        }

        if (emailSecundario != null) informacoes.setEmailSecundario(emailSecundario);
        if (curriculoLattes != null) informacoes.setCurriculoLattes(curriculoLattes);
        if (telefone != null) informacoes.setTelefone(telefone);
        informacoes.setUltimoAcesso(LocalDateTime.now());

        
        return usuarioRepository.save(usuarioExistente);
    }
}