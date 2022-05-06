package com.funsoft.spring.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private AppUserRepository appUserRepository;

	@GetMapping
	public List<AppUser> getAllUser() {
		return this.appUserRepository.findAll();
	}
}




