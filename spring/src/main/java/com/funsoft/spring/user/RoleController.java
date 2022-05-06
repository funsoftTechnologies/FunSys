package com.funsoft.spring.user;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

	private final AppRoleRepository appRoleRepository;

	public RoleController(AppRoleRepository appRoleRepository) {
		this.appRoleRepository = appRoleRepository;
	}

	@GetMapping
	public List<AppRole> getRoles() {
		return this.appRoleRepository.findAll();
	}

	@PostMapping
	public AppRole postRole(@RequestBody AppRole role) {
		return this.appRoleRepository.save(role);
	}
}
