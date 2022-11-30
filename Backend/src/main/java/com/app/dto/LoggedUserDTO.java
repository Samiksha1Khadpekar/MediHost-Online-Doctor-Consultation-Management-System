package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoggedUserDTO {

	private boolean isDoctor;
	
	private Object userDTO;
	
	public LoggedUserDTO(boolean isDoctor, Object userDTO) {
		this.isDoctor = isDoctor;
		this.userDTO = userDTO;
	}
}
