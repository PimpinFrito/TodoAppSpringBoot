package me.todoapp.service;

import me.todoapp.entity.User;
import me.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public void addUser(User user) {
        System.out.println(userRepository.save(user));
    }

    @Override
    public boolean userExists(String userId) {
        return userRepository.existsById(userId);
    }
}
