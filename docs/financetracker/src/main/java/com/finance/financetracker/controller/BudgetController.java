package com.finance.financetracker.controller;

import com.finance.financetracker.model.Budget;
import com.finance.financetracker.model.User;
import com.finance.financetracker.repository.UserRepository;
import com.finance.financetracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired private BudgetService budgetService;
    @Autowired private UserRepository userRepo;

    /** POST  /api/budgets   { "month":"2025-06","amount":2000 } */
    @PostMapping
    public Budget setBudget(@RequestBody BudgetRequest req, Principal principal){
        User user = userRepo.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return budgetService.saveOrUpdate(user, req.month(), req.amount());
    }

    /** GET /api/budgets?month=2025-06 */
    @GetMapping
    public Budget getBudget(@RequestParam String month, Principal principal){
        User user = userRepo.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return budgetService.get(user, month);
    }

    /* simple record to map JSON ⇄ Java */
    public record BudgetRequest(String month, Double amount){}
}
