package com.finance.financetracker.repository;

import com.finance.financetracker.model.Transaction;
import com.finance.financetracker.model.TransactionType;
import com.finance.financetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Fetch all transactions for a specific user
    List<Transaction> findByUser(User user);

    // Filter by transaction type
    List<Transaction> findByUserAndType(User user, TransactionType type);

    // Filter by date range
    List<Transaction> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);
}


