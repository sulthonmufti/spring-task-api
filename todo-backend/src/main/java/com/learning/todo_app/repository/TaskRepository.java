package com.learning.todo_app.repository;

import com.learning.todo_app.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Di sini sudah tersedia fungsi save(), findAll(), deleteById(), dll.
}