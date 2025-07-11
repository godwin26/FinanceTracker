package com.finance.financetracker.dto;

public record SummaryDTO(String month,
                         double totalIncome,
                         double totalExpense,
                         Double budgetLimit,
                         Double remaining) {
}
