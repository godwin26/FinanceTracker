package com.finance.financetracker.service.impl;

import com.finance.financetracker.model.Budget;
import com.finance.financetracker.model.User;
import com.finance.financetracker.repository.BudgetRepository;
import com.finance.financetracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepo;

    @Override
    public Budget saveOrUpdate(User user, String month, Double amount) {
        return budgetRepo.findByUserAndMonth(user, month)
                .map(b -> { b.setAmount(amount); return budgetRepo.save(b); })
                .orElseGet(() ->
                        budgetRepo.save(new Budget(null, amount, month, user)));
    }

    @Override
    public Budget get(User user, String month) {
        return budgetRepo
                .findByUserAndMonth(user, month)
                .orElse(null);
    }
}

