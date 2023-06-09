package com.exam.examserver.service.impl;

import com.exam.examserver.helper.UserFoundException;
import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;
import com.exam.examserver.repository.RoleRepository;
import com.exam.examserver.repository.UserRepository;
import com.exam.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local =this.userRepository.findByUsername(user.getUsername());
        if(local!= null){
            System.out.println("User is already there !!");
            throw new  UserFoundException();
        }else{
            //create user
            //it will remove all the roles from set and add it role repo
            for(UserRole ur: userRoles){
                roleRepository.save(ur.getRole());
            }

            // all the roles are assign to the user
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);

        }
        return local;
    }

    //getting user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userid) {
        this.userRepository.deleteById(userid);
    }
}
