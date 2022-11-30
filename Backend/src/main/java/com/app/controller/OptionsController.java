package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.OptionsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class OptionsController {
	
	@Autowired
	private OptionsService optionsService;
	
	@GetMapping("/options/{type}")
	public ResponseEntity<List<String>> getOptions(@PathVariable int type){
		try {
			return new ResponseEntity<List<String>>(optionsService.getOptions(type), HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<List<String>>(new ArrayList<>(), HttpStatus.OK);
		}
	}
	
//	@GetMapping("/sendmail")
//	public String sendSimpleMail()
//    {
// 
//        // Try block to check for exceptions
//        try {
// 
//            // Creating a simple mail message
//            SimpleMailMessage mailMessage
//                = new SimpleMailMessage();
// 
//            // Setting up necessary details
//            mailMessage.setFrom("my email");
//            mailMessage.setTo("another email");
//            mailMessage.setText("Sending from springboot app");
//            mailMessage.setSubject("Testing springboot email");
// 
//            // Sending the mail
//            javaMailSender.send(mailMessage);
//            return "Mail Sent Successfully...";
//        }
// 
//        // Catch block to handle the exceptions
//        catch (Exception e) {
//            return "Error while Sending Mail";
//        }
//    }
 
}
