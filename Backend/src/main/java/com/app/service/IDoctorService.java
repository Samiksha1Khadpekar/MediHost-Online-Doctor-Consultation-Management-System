package com.app.service;

import java.util.List;

import com.app.dto.DoctorDTO;

public interface IDoctorService {

	public String registerDoctor(DoctorDTO doctorDTO);
	
	public DoctorDTO authenticateDoctor(String email, String password);
	
	public List<DoctorDTO> getDoctorsByCityAndSpeciality(String doctorCity, String doctorSpeciality);
	
	public String updateDoctor(DoctorDTO doctorDTO);
}
