package me.todoapp.service;

import me.todoapp.entity.User;

public interface UserService {

    void addUser(User user);

    boolean userExists(String userId);
}
