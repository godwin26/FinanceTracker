package com.finance.financetracker.service;

import com.finance.financetracker.model.Budget;
import com.finance.financetracker.model.User;

public interface BudgetService {
    Budget saveOrUpdate(User user, String month, Double amount);
    Budget get(User user, String month);
}
