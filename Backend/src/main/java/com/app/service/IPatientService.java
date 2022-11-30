package com.app.service;

import com.app.dto.PatientDTO;

public interface IPatientService {

	public String registerPatient(PatientDTO patientDTO);
	
	public String updatePatient(PatientDTO patientDTO);
	
	public Object authenticatePatient(String email, String password);
}
