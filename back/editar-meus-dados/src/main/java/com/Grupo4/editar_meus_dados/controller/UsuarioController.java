package com.Grupo4.editar_meus_dados.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Grupo4.editar_meus_dados.dto.UsuarioDTO;
import com.Grupo4.editar_meus_dados.model.Usuario;
import com.Grupo4.editar_meus_dados.service.UsuarioService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Endpoint para buscar um usuário pelo ID.
     * GET /api/usuarios/{id}
     *
     * @param id O ID do usuário a ser buscado.
     * @return ResponseEntity com o objeto Usuario se encontrado, ou 404 Not Found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable Long id) { 
        Usuario usuario = usuarioService.buscarUsuarioPorId(id); 
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario);
        return ResponseEntity.ok(usuarioDTO);
    }

    /**
     * Endpoint para editar os dados de um usuário existente.
     * PUT /api/usuarios/{id}
     *
     * @param id O ID do usuário a ser editado.
     * @param nome Novo nome do usuário (opcional, pode ser mantido o atual se não alterado).
     * @param email Novo email principal (opcional).
     * @param userName Novo nome de usuário (opcional).
     * @param emailSecundario Novo email secundário (opcional).
     * @param telefone Novo telefone (opcional).
     * @param curriculoLattes Novo link para currículo Lattes (opcional).
     * @param fotoUrl Arquivo da nova foto (opcional).
     * @return ResponseEntity com o usuário atualizado e status 200 OK, ou status de erro.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> editarUsuario(
            @PathVariable Long id,
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String emailSecundario,
            @RequestParam(required = false) String curriculoLattes,
            @RequestParam(required = false) String telefone,
            @RequestParam(required = false) String fotoUrl) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizarUsuario(
                id, nome, email, userName, emailSecundario, curriculoLattes, telefone, fotoUrl
            );

            UsuarioDTO usuarioDTO = new UsuarioDTO(usuarioAtualizado);
            return ResponseEntity.ok(usuarioDTO);
        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().build();
        }
    }
}