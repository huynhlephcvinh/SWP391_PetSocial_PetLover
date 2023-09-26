package com.petlover.petsocial.config;


import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            User users = userRepo.findByEmail(username);
            System.out.println(users);
            if (users == null) {
                throw new UsernameNotFoundException("user not found");
            } else {

                return new org.springframework.security.core.userdetails.User(username, users.getPassword(),new ArrayList<>());
            }

        }
    }

