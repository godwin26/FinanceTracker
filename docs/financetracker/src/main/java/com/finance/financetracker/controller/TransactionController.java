package com.finance.financetracker.controller;

import com.finance.financetracker.dto.SummaryDTO;
import com.finance.financetracker.model.Transaction;
import com.finance.financetracker.model.User;
import com.finance.financetracker.repository.TransactionRepository;
import com.finance.financetracker.repository.UserRepository;
import com.finance.financetracker.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired private TransactionRepository transactionRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private TransactionService transactionService;

    /* --------------------------------------------------
       1.  Create
       -------------------------------------------------- */
    @PostMapping
    public Transaction create(@RequestBody Transaction tx, Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        tx.setUser(user);
        tx.setDate(LocalDate.now());
        return transactionRepository.save(tx);
    }

    /* --------------------------------------------------
       2.  Read all
       -------------------------------------------------- */
    @GetMapping
    public List<Transaction> getAll(Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionRepository.findByUser(user);
    }

    /* --------------------------------------------------
       3.  Update
       -------------------------------------------------- */
    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id,
                              @RequestBody Transaction updatedTx,
                              Principal principal) {

        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!tx.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");

        tx.setTitle(updatedTx.getTitle());
        tx.setAmount(updatedTx.getAmount());
        tx.setType(updatedTx.getType());
        tx.setDate(updatedTx.getDate());
        tx.setCategory(updatedTx.getCategory());

        return transactionRepository.save(tx);
    }

    /* --------------------------------------------------
       4.  Delete
       -------------------------------------------------- */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!tx.getUser().getId().equals(user.getId())) throw new RuntimeException("Unauthorized");
        transactionRepository.delete(tx);
    }

    /* --------------------------------------------------
       5.  Filter  (type, category, date range)
           Example: /api/transactions/filter?type=EXPENSE&category=FOOD&startDate=2025-07-01&endDate=2025-07-31
       -------------------------------------------------- */
    @GetMapping("/filter")
    public List<Transaction> filter(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            Principal principal) {

        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return transactionService.getFilteredTransactions(user, startDate, endDate, type, category);
    }

    /* --------------------------------------------------
       6.  Monthly summary
          GET /api/transactions/summary?month=2025-07
       -------------------------------------------------- */
    @GetMapping("/summary")
    public SummaryDTO summary(@RequestParam String month, Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionService.monthlySummary(user, month);
    }
}
