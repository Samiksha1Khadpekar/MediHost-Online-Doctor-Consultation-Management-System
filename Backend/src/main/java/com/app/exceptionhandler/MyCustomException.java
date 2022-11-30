package com.app.exceptionhandler;

@SuppressWarnings("serial")
public class MyCustomException extends Exception {
	public MyCustomException(String errorMessage) {
		super(errorMessage);
	}
}
