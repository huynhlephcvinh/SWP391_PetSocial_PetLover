package com.petlover.petsocial.service;


import com.petlover.petsocial.exception.UserException;
import com.petlover.petsocial.exception.UserNotFoundException;
import com.petlover.petsocial.model.entity.AuthenticationProvider;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.SigninDTO;
import com.petlover.petsocial.payload.request.SingupDTO;
import com.petlover.petsocial.payload.request.UserDTO;
import com.petlover.petsocial.payload.request.UserUpdateDTO;

import java.util.List;


public interface UserService {
    public SingupDTO createUser(SingupDTO signupDTO, String url);
    public String checkLogin(SigninDTO signinDTO);
    public User getUserByEmail(String email);

    public boolean checkEmail(String email);

    public void removeSessionMessage();
    public void sendEmail(User user, String path);
    public boolean verifyAccount(String verificationCode);
    public void updateResetPasswordToken(String token, String email) throws UserNotFoundException;
    public User getByResetPasswordToken(String token);
    public void updatePassword(User user, String newPassword);
    public User createUserAfterOAuthLoginSuccess(String email,String name, AuthenticationProvider provider);
    public User updateUserAfterOAuthLoginSuccess(User user ,String name);

    public UserDTO findUserProfileByJwt(String jwt) throws UserException;
    public UserDTO editprofile(int id, UserUpdateDTO userDTO) throws UserException;
    public UserDTO findUserProfileById(int idUser) throws UserException;

    public List<User> getAllUsers();

}
