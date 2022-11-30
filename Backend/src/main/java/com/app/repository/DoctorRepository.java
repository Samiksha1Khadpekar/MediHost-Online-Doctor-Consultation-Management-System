package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	//Doctor findByEmailAndPassword(String email, String password);

	List<Doctor> findByDoctorCityAndDoctorSpeciality(String doctorCity, String doctorSpeciality);

	Doctor findByEmail(String email);
	
}
