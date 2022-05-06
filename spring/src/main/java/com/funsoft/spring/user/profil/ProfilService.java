package com.funsoft.spring.user.profil;

import com.funsoft.spring.user.AppRole;
import com.funsoft.spring.user.AppUser;

public interface ProfilService {

    AppUser findByUsername(String username);
    AppUser saveUser(String username, String email, String photoname, String password, String confirmedPassword);
    AppUser updateUser(String username, String email, String photoname);
    AppRole saveRole(AppRole role);
    void addRoleToUser(String username,String rolename);

}
