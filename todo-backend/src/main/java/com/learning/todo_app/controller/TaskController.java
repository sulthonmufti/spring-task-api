package com.learning.todo_app.controller;

import com.learning.todo_app.entity.Task;
import com.learning.todo_app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
//@CrossOrigin(origins = "*") //agar semua domain bisa akses backend ini
@CrossOrigin(origins = {
    "http://localhost:3000", 
    "http://10.66.90.225:3000" //domain lain yang akan diizinkan (di ZeroTier pribadi)
}) //agar react nanti bisa akses backend ini
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Create a new task
    @PostMapping
    public Task createTask(@Valid @RequestBody Task task) {
        return taskRepository.save(task);
    }

    // Update a task
    @PutMapping("/{id}")
    public Task updateTask(@Valid @PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task tidak ditemukan"));

        task.setTitle(taskDetails.getTitle());
        task.setCompleted(taskDetails.isCompleted());

        return taskRepository.save(task);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}