package com.funsoft.spring.user.profil;

import lombok.Data;

@Data
class ProfilForm {
	private String username;
	private String email;
	private String photoname;
	private String password;
	private String confirmedPassword;
}