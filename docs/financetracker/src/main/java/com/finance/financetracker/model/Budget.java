package com.finance.financetracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    private String month; // Example: "2025-06"

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Budget() {}

    public Budget(Long id, Double amount, String month, User user) {
        this.id = id;
        this.amount = amount;
        this.month = month;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}

