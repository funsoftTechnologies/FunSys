package com.funsoft.spring.security;

import com.funsoft.spring.user.AppUser;
import com.funsoft.spring.user.profil.ProfilService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    ProfilService profilService;

    public UserDetailsServiceImpl(ProfilService profilService){
        this.profilService = profilService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AppUser appUser = profilService.findByUsername(username);

        if(appUser == null) throw new UsernameNotFoundException("invalid user");

        Collection<GrantedAuthority> authorities = new ArrayList<>();

        appUser.getRoles().forEach(r-> authorities.add(new SimpleGrantedAuthority(r.getRoleName())));

        return new User(appUser.getUsername(),appUser.getPassword(),authorities);
    }
}