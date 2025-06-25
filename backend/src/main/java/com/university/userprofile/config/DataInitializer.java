package com.university.userprofile.config;

import com.university.userprofile.model.*;
import com.university.userprofile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // Create sample user
        User user = new User("João da Silva Texeira", "joao.silva@ufg.br", "joao.silva");
        user.setAlternativeEmail("joao.texeira.alternativo@email.com");
        user.setLattesUrl("http://lattes.cnpq.br/6423122444432953");
        user.setPhone("(62) 98297-3241");
        user.setJoinDate(LocalDate.of(2017, 2, 12));
        user.setAvatarUrl("https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg");

        Set<UserRole> roles = new HashSet<>();
        roles.add(UserRole.ADMINISTRATOR);
        roles.add(UserRole.TEACHER);
        user.setRoles(roles);

        User savedUser = userService.createUser(user);

        // Create knowledge centers
        Set<UserKnowledgeCenter> knowledgeCenters = new HashSet<>();
        
        UserKnowledgeCenter kc1 = new UserKnowledgeCenter(savedUser, "Transdisciplinar", "Transdisciplinar", "Sérgio Teixeira de Carvalho");
        kc1.setAssociatedTeachers("TR,JS,A");
        kc1.setDisciplines("≡");
        knowledgeCenters.add(kc1);

        UserKnowledgeCenter kc2 = new UserKnowledgeCenter(savedUser, "Inteligência Artificial", "Sistemas Inteligentes", "Rogério Lopes Salvini");
        kc2.setAssociatedTeachers("SS,JS");
        kc2.setDisciplines("≡");
        knowledgeCenters.add(kc2);

        savedUser.setKnowledgeCenters(knowledgeCenters);

        // Create classes
        Set<UserClass> classes = new HashSet<>();
        
        UserClass class1 = new UserClass(savedUser, "INF0056 - A", "Engenharia de Software", "Fundamentos de Sistemas e Software", "25M23", 64);
        classes.add(class1);

        UserClass class2 = new UserClass(savedUser, "INF0283 - A", "Computação e Sociedade", "Transdisciplinar", "2T45", 32);
        classes.add(class2);

        UserClass class3 = new UserClass(savedUser, "INF0284 - A", "Introdução à Programação", "Conceitos, Métodos e Técnicas de Computação", "35T2345", 128);
        classes.add(class3);

        savedUser.setClasses(classes);

        userService.createUser(savedUser);
    }
}