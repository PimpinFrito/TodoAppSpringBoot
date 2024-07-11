package me.todoapp.service;

import me.todoapp.entity.Task;
import me.todoapp.entity.User;
import me.todoapp.repository.TaskRepository;
import me.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService{

    private final UserService userService;
    private final TaskRepository taskRepository;
    public TaskServiceImpl(TaskRepository repository, UserService userService){
        taskRepository = repository;
        this.userService = userService;
    }

    @Override
    public List<Task> getTest() {
        return taskRepository.findAll();
    }

    @Override
    public Task createTask(Task task) {
        User user = task.getUser();
        // Needs a user connected to the task
        if(user == null) return null;

        if (!userService.userExists(user.getId())) {
            //If the user isn't found in the DB, add them and save the task
            //TODO: go to Auth0 and set it to auto add users to local mysql DB after they sign up
            userService.addUser(task.getUser());
        }
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks(String userId) {
        if(userService.userExists(userId)) {
            return taskRepository.findByUserId(userId);
        }
        return new ArrayList<>();
    }

    @Override
    public Task getTask(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.orElse(null);
    }

    @Override
    public Task updateTask(Task task) {
        Optional<Task> optionalExistingTask = taskRepository.findById(task.getId());
        if(optionalExistingTask.isPresent()){
            return taskRepository.save(task);
        }
        return null;
    }

    @Override
    public void deleteTask(Long taskId) {
        System.out.println(taskId);
        taskRepository.deleteById(taskId);
    }

    @Override
    public Task completeTask(Task task) {
        Optional<Task> optionalExistingTask = taskRepository.findById(task.getId());
        if(optionalExistingTask.isPresent()){
            task.setCompleted(true);
            return taskRepository.save(task);
        }
        return null;
    }
}
