package com.finance.financetracker.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.finance.financetracker.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
