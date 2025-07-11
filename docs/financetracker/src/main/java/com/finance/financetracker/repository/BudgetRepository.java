package com.finance.financetracker.repository;

import com.finance.financetracker.model.Budget;
import com.finance.financetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget,Long> {

    /** one budget per user + month ( “YYYY-MM” ) */
    Optional<Budget> findByUserAndMonth(User user, String month);
}
