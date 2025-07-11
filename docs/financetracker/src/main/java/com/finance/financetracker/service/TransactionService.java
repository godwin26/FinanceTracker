package com.finance.financetracker.service;

import com.finance.financetracker.model.Transaction;
import com.finance.financetracker.model.User;
import com.finance.financetracker.dto.SummaryDTO;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {

    // ✅ Filter transactions with optional filters
    List<Transaction> getFilteredTransactions(User user,
                                              LocalDate from,
                                              LocalDate to,
                                              String type,
                                              String category);

    // ✅ Monthly summary method for analytics
    SummaryDTO monthlySummary(User user, String month);
}
