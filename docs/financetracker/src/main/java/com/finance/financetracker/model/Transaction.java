package com.finance.financetracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type;   // INCOME or EXPENSE

    @Enumerated(EnumType.STRING)    // ✅ NEW: Category enum
    private Category category;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /* ---------- constructors ---------- */

    public Transaction() {}

    public Transaction(Long id, String title, Double amount,
                       TransactionType type, Category category,
                       LocalDate date, User user) {
        this.id       = id;
        this.title    = title;
        this.amount   = amount;
        this.type     = type;
        this.category = category;
        this.date     = date;
        this.user     = user;
    }

    /* ---------- getters ---------- */

    public Long getId()           { return id; }
    public String getTitle()      { return title; }
    public Double getAmount()     { return amount; }
    public TransactionType getType() { return type; }
    public Category getCategory() { return category; }
    public LocalDate getDate()    { return date; }
    public User getUser()         { return user; }

    /* ---------- setters ---------- */

    public void setId(Long id)                 { this.id = id; }
    public void setTitle(String title)         { this.title = title; }
    public void setAmount(Double amount)       { this.amount = amount; }
    public void setType(TransactionType type)  { this.type = type; }
    public void setCategory(Category category) { this.category = category; }
    public void setDate(LocalDate date)        { this.date = date; }
    public void setUser(User user)             { this.user = user; }
}
