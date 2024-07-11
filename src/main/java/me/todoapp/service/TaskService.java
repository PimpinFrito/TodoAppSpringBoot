package me.todoapp.service;

import me.todoapp.entity.Task;
import me.todoapp.entity.User;

import java.util.List;

public interface TaskService {

    List<Task> getTest();

    Task createTask(Task task);

    List<Task> getAllTasks(String userId);


    Task getTask(Long id);

    Task updateTask(Task task);

    void deleteTask(Long taskId);

    Task completeTask(Task task);
}
