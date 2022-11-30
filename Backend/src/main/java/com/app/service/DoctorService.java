package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.DoctorDTO;
import com.app.pojos.Doctor;
import com.app.repository.DoctorRepository;

@Service
@Transactional(rollbackOn = Exception.class)
public class DoctorService implements IDoctorService{

	@Autowired
	private DoctorRepository doctorRepository;
	
	@Override
	public String registerDoctor(DoctorDTO doctorDTO) {
		
		Doctor newDoctor = new Doctor(doctorDTO);
		doctorRepository.save(newDoctor);
		return "Registered Successfully";
		
	}

	@Override
	public DoctorDTO authenticateDoctor(String email, String password) {
		
		Doctor doctor = doctorRepository.findByEmail(email);
		if(doctor != null && doctor.getPassword().equals(password)) {
			DoctorDTO doctorDTO = new DoctorDTO(doctor);
			return doctorDTO;
		}
		else{
			return null;
		}
	}
	
	@Override
	public List<DoctorDTO> getDoctorsByCityAndSpeciality(String doctorCity, String doctorSpeciality) {
	
		List<Doctor> doctor = doctorRepository.findByDoctorCityAndDoctorSpeciality(doctorCity, doctorSpeciality);
		List<DoctorDTO> doctorDTOList = new ArrayList<>();
		
		for(Doctor d : doctor) {
			DoctorDTO tempDoctorDTO = new DoctorDTO(d);
			doctorDTOList.add(tempDoctorDTO);
		}
		return doctorDTOList;
	}

	@Override
	public String updateDoctor(DoctorDTO doctorDTO) {
		
//		Doctor doctor = doctorRepository.findByEmail(doctorDTO.getEmail());
//		doctor.setDoctorName(doctorDTO.getDoctorName());
//		doctor.setPassword(doctorDTO.getPassword());
//		doctor.setDoctorAddress(doctorDTO.getDoctorAddress());
//		doctor.setDoctorCity(doctorDTO.getDoctorCity());
//		doctor.setDoctorMobileNo(doctorDTO.getDoctorMobileNo());
		
		Doctor doctor = new Doctor(doctorDTO);
	    doctor.setDoctorId(doctorDTO.getDoctorId());
		doctorRepository.save(doctor);
		return "Profile Updated Successfully";
		
	}
}
