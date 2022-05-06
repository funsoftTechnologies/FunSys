package com.funsoft.spring.user.profil;

import com.funsoft.spring.user.AppRole;
import com.funsoft.spring.user.AppRoleRepository;
import com.funsoft.spring.user.AppUser;
import com.funsoft.spring.user.AppUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfilServiceImpl implements ProfilService {

    AppUserRepository appUserRepository;
    AppRoleRepository appRoleRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public ProfilServiceImpl(AppUserRepository appUserRepository, AppRoleRepository appRoleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.appRoleRepository = appRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public AppUser saveUser(String username, String email, String photoname,String password, String confirmedPassword) {

        AppUser user = appUserRepository.findByUsername(username);

        if (user != null) throw new RuntimeException("User already exists");

        if (!password.equals(confirmedPassword)) throw new RuntimeException("Please confirm your password");

        AppUser appUser = new AppUser();

        appUser.setUsername(username);
        appUser.setEmail(email);
        appUser.setPhotoname(username + ".png");
        appUser.setActived(true);

        appUser.setPassword(bCryptPasswordEncoder.encode(password));
        appUserRepository.save(appUser);

        addRoleToUser(username, "USER");
        return appUser;
    }

    @Override
    public AppUser updateUser(String username, String email, String Photoname) {

        AppUser user = appUserRepository.findByUsername(username);

        if (user == null) throw new RuntimeException("User not exists");

        AppUser appUser = new AppUser();
        appUser.setUsername(username);
        appUser.setEmail(email);
        appUser.setPhotoname(username + ".png");
        return appUserRepository.save(appUser);
    }

    @Override
    public AppRole saveRole(AppRole role) {
        return appRoleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String rolename) {
        AppUser appUser = appUserRepository.findByUsername(username);
        AppRole appRole = appRoleRepository.findByRoleName(rolename);
        appUser.getRoles().add(appRole);
    }

    @Override
    public AppUser findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }
}