package com.example.springbootfirst.controllers;

import com.example.springbootfirst.jwt.JwtTokenProvider;
import com.example.springbootfirst.models.LoginDetails;
import com.example.springbootfirst.models.UserDetailsDto;
import com.example.springbootfirst.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.springbootfirst.models.RegisterDetails;
import com.example.springbootfirst.payload.LoginResponse;



import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDetailsDto request) {
        String response = registerService.registerNewUser(request);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDetails request) {
    try {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()
                )
        );

        String token = jwtTokenProvider.generateToken(authentication);


        RegisterDetails user = registerService.findByUserName(request.getUserName());


        LoginResponse response = new LoginResponse(Long.valueOf(user.getEmpId()), user.getUserName(), token,user.getRoles(),user.getEmail());
        return ResponseEntity.ok(response);

    } catch (AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", "Invalid username or password"));
    }
}
}
