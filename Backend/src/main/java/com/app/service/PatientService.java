package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.PatientDTO;
import com.app.pojos.Patient;
import com.app.repository.PatientRepository;

@Service
@Transactional(rollbackOn = Exception.class)
public class PatientService implements IPatientService{
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	public String registerPatient(PatientDTO patientDTO) {
		
		Patient newPatient = new Patient(patientDTO);
		
		patientRepository.save(newPatient);
		
		return "Registered Successfully.";
		
	}
	
	@Override
	public String updatePatient(PatientDTO patientDTO) {
		Patient patient = new Patient(patientDTO);
		patient.setPatientId(patientDTO.getPatientId());
		patientRepository.save(patient);
		return "Profile Updated Successfully";
	}

	@Override
	public Object authenticatePatient(String email, String password) {
		
		Patient patient = patientRepository.findByEmail(email);
		if(patient != null && patient.getPassword().equals(password) ) {
			PatientDTO patientDTO = new PatientDTO(patient);
			return patientDTO;
		}
		else {
			return new String("Invalid Password!!!");
		}
	}

}
