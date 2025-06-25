package com.university.userprofile.service;

import com.university.userprofile.dto.UserUpdateDTO;
import com.university.userprofile.model.User;
import com.university.userprofile.model.UserRole;
import com.university.userprofile.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User updateUser(Long userId, UserUpdateDTO updateDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updateDTO.getFullName() != null) {
            user.setFullName(updateDTO.getFullName());
        }
        if (updateDTO.getEmail() != null) {
            user.setEmail(updateDTO.getEmail());
        }
        if (updateDTO.getAlternativeEmail() != null) {
            user.setAlternativeEmail(updateDTO.getAlternativeEmail());
        }
        if (updateDTO.getLattesUrl() != null) {
            user.setLattesUrl(updateDTO.getLattesUrl());
        }
        if (updateDTO.getPhone() != null) {
            user.setPhone(updateDTO.getPhone());
        }
        if (updateDTO.getRoles() != null) {
            user.setRoles(updateDTO.getRoles());
        }

        return userRepository.save(user);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}