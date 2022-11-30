package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoggedUserDTO;
import com.app.dto.LoginDTO;
import com.app.service.DoctorService;
import com.app.service.PatientService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	
	@Autowired
	PatientService patientService;
	
	@Autowired
	DoctorService doctorService;
	
	@PostMapping(path = "/api/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDTO){
		
		String email = loginDTO.getEmail();
		String password = loginDTO.getPassword();
		
		Object doctorDTO = doctorService.authenticateDoctor(email, password);
		Object patientDTO = patientService.authenticatePatient(email, password);
		
		try {
			if(doctorDTO != null) {
					return new ResponseEntity<>(new LoggedUserDTO(true, doctorDTO), HttpStatus.OK);
			}
			else if(patientDTO != null){
					return new ResponseEntity<>(new LoggedUserDTO(false, patientDTO), HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>("Invalid email!!!" , HttpStatus.NOT_FOUND);
			}
		} 
		catch (Exception e) {
			
			return new ResponseEntity<String>("Something went wrong!!!." , HttpStatus.BAD_REQUEST);
		}
		
	}
}
