package com.petlover.petsocial.serviceImp;

import com.petlover.petsocial.exception.UserNotFoundException;
import com.petlover.petsocial.model.entity.AuthenticationProvider;
import com.petlover.petsocial.model.entity.User;
import com.petlover.petsocial.payload.request.SigninDTO;
import com.petlover.petsocial.payload.request.SingupDTO;
import com.petlover.petsocial.repository.UserRepository;
import com.petlover.petsocial.service.UserService;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.UUID;
@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    HttpSession session;

    @Override
    public SingupDTO createUser(SingupDTO signupDTO, String url) {
        User user = new User();
        user.setEmail(signupDTO.getEmail());
        user.setName(signupDTO.getName());
        user.setPhone(signupDTO.getPhone());
        String password = bCryptPasswordEncoder.encode(signupDTO.getPassword());
        user.setPassword(password);
        user.setRole("ROLE_USER");
        user.setEnable(false);
        user.setVerificationCode(UUID.randomUUID().toString());
        User newuser = userRepo.save(user);

        if (newuser != null) {
            sendEmail(newuser, url);
        }
        SingupDTO newSignupDTO = new SingupDTO(newuser.getEmail(),newuser.getName(),newuser.getPassword(),newuser.getPhone());
        return newSignupDTO;
    }
    @Override
    public boolean checkLogin(SigninDTO signinDTO) {
        User user = userRepo.findByEmail(signinDTO.getUsername());
        if(!user.isEnable()){
            return false;
        }
        return passwordEncoder.matches(signinDTO.getPassword(),user.getPassword());
    }



    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public boolean checkEmail(String email) {

        return userRepo.existsByEmail(email);
    }

    @Override
    public void removeSessionMessage() {

        HttpSession session = ((ServletRequestAttributes) (RequestContextHolder.getRequestAttributes())).getRequest()
                .getSession();

        session.removeAttribute("msg");
    }



    @Override
    public void sendEmail(User user, String url) {
        String from = "phucvinh710@gmail.com";
        String to = user.getEmail();
        String subject = "Account Verfication";
        String content = "Dear [[name]],<br>" + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>" + "Thank you,<br>" + "Vinh";

        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(from, "Vinhhuynh");
            helper.setTo(to);
            helper.setSubject(subject);

            content = content.replace("[[name]]", user.getName());
            String siteUrl = url + "/verify?code=" + user.getVerificationCode();

            System.out.println(siteUrl);

            content = content.replace("[[URL]]", siteUrl);

            helper.setText(content, true);

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean verifyAccount(String verificationCode) {

        User user = userRepo.findByVerificationCode(verificationCode);

        if (user == null) {
            return false;
        } else {

            user.setEnable(true);
            user.setVerificationCode(null);

            userRepo.save(user);

            return true;
        }

    }
    public void updateResetPasswordToken(String token, String email) throws UserNotFoundException {
        User customer = userRepo.findByEmail(email);
        if (customer != null) {
            customer.setResetPasswordToken(token);
            userRepo.save(customer);
        } else {
            throw new UserNotFoundException("Could not find any user with the email " + email);
        }
    }

    public User getByResetPasswordToken(String token) {
        return userRepo.findByResetPasswordToken(token);
    }

    public void updatePassword(User user, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        user.setResetPasswordToken(null);
        userRepo.save(user);
    }

    public User createUserAfterOAuthLoginSuccess(String email,String name, AuthenticationProvider provider) {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setAuthProvider(provider);
        user.setEnable(true);
        user.setRole("ROLE_USER");
        return userRepo.save(user);
    }
    public User updateUserAfterOAuthLoginSuccess(User user ,String name) {
        user.setName(name);
        user.setAuthProvider(AuthenticationProvider.GOOGLE);

        return userRepo.save(user);
    }

}
