package com.learning.todo_app.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tasks")
@Data // Ini dari Lombok agar tidak perlu tulis Getter/Setter manual
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean isCompleted;
}