package com.funsoft.spring.security;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.funsoft.spring.user.AppUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
												HttpServletResponse response) throws AuthenticationException {

		try {
			AppUser appUser = new ObjectMapper().readValue(request.getInputStream(), AppUser.class);
			System.out.println("attemptAuthentication");
			System.out.println("appUser : " + appUser.getUsername());
			System.out.println("appUser : " + appUser.getPassword());

			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							appUser.getUsername(),
							appUser.getPassword()));
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request,
											HttpServletResponse response,
											FilterChain chain,
											Authentication authResult) throws IOException {

		User user = (User) authResult.getPrincipal();
		System.out.println("successfulAuthentication");
		System.out.println("user : " + user.getUsername());
		System.out.println("user : " + user);

		List<String> roles = new ArrayList<>();

		authResult.getAuthorities().forEach(a->{
			roles.add(a.getAuthority());
		});

//		String jwtToken = JWT.create()
//				.withIssuer(request.getRequestURI())
//				.withSubject(user.getUsername())
//				.withArrayClaim("roles", roles.toArray(new String[roles.size()]))
//				.withExpiresAt(new Date(System.currentTimeMillis()+SecurityConstants.EXPIRATION_TIME))
//				.sign(Algorithm.HMAC256(SecurityConstants.SECRET));

		String jwtToken = Jwts.builder()
				.setSubject(((User) authResult.getPrincipal()).getUsername())
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET.getBytes())
				.claim("roles", ((User) authResult.getPrincipal()).getAuthorities())
				.compact();

		response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + jwtToken);
		response.addHeader(SecurityConstants.USERNAME_,   ""+ ((User)authResult.getPrincipal()).getUsername());
	}
}





//		Collection<GrantedAuthority> roles = ((User)authResult.getPrincipal()).getAuthorities();

//response.addHeader("Access-Control-Allow-Origin", "*");
/*        response.addHeader("Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        if (response.getHeader("Access-Control-Allow-Origin") == null)
            response.addHeader("Access-Control-Allow-Origin", "*");*/