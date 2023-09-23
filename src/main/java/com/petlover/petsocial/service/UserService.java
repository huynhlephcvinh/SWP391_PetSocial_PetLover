package com.petlover.petsocial.service;


import com.petlover.petsocial.exception.UserNotFoundException;
import com.petlover.petsocial.model.entity.AuthenticationProvider;
import com.petlover.petsocial.model.entity.User;


public interface UserService {
    public User createUser(User user, String url);
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

}
