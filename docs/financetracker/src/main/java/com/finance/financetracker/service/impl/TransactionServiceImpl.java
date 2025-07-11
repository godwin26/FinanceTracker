package com.finance.financetracker.service.impl;

import com.finance.financetracker.dto.SummaryDTO;
import com.finance.financetracker.model.Budget;
import com.finance.financetracker.model.Transaction;
import com.finance.financetracker.model.TransactionType;
import com.finance.financetracker.model.User;
import com.finance.financetracker.repository.BudgetRepository;
import com.finance.financetracker.repository.TransactionRepository;
import com.finance.financetracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired private TransactionRepository transactionRepository;
    @Autowired private BudgetRepository budgetRepository;

    /* --------------------------------------------------
       1. Filtered transactions (date, type, category)
       -------------------------------------------------- */
    @Override
    public List<Transaction> getFilteredTransactions(User user,
                                                     LocalDate from,
                                                     LocalDate to,
                                                     String type,
                                                     String category) {

        List<Transaction> all = transactionRepository.findByUser(user);

        return all.stream()
                .filter(tx ->
                        (from == null || !tx.getDate().isBefore(from)) &&
                                (to == null || !tx.getDate().isAfter(to)) &&
                                (type == null || tx.getType().name().equalsIgnoreCase(type)) &&
                                (category == null || tx.getCategory().name().equalsIgnoreCase(category))
                )
                .toList();
    }

    /* --------------------------------------------------
       2. Monthly summary for analytics
       -------------------------------------------------- */
    @Override
    public SummaryDTO monthlySummary(User user, String month) {

        // Convert "YYYY-MM" to first/last day of that month
        LocalDate start = LocalDate.parse(month + "-01");
        LocalDate end   = start.withDayOfMonth(start.lengthOfMonth());

        List<Transaction> txs =
                transactionRepository.findByUserAndDateBetween(user, start, end);

        double income  = txs.stream()
                .filter(tx -> tx.getType() == TransactionType.INCOME)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double expense = txs.stream()
                .filter(tx -> tx.getType() == TransactionType.EXPENSE)
                .mapToDouble(Transaction::getAmount)
                .sum();

        Budget budget = budgetRepository.findByUserAndMonth(user, month).orElse(null);
        Double limit     = (budget != null) ? budget.getAmount() : null;
        Double remaining = (limit  != null) ? limit - expense   : null;

        return new SummaryDTO(month, income, expense, limit, remaining);
    }
}
