package me.todoapp.controller;

import jakarta.persistence.EntityNotFoundException;
import me.todoapp.entity.Task;
import me.todoapp.entity.User;
import me.todoapp.service.TaskService;
import me.todoapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private final TaskService taskService;

    @Autowired
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService){
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<Task> getAllTasks() {
        return taskService.getTest();
    }

    @GetMapping("/findByUser")
    public List<Task> getUserTasks(@RequestParam String userId){
        return this.taskService.getAllTasks(userId);
    }

    @GetMapping("/{taskId}")
    public Task getTask(@PathVariable Long taskId){
        return taskService.getTask(taskId);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId){
        taskService.deleteTask(taskId);
    }

    @PutMapping
    public Task updateTask(@RequestBody Task task){
        return taskService.updateTask(task);
    }
}
