package me.todoapp.repository;

import me.todoapp.entity.Task;
import me.todoapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(String userId);
}
