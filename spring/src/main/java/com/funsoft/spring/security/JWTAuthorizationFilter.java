package com.funsoft.spring.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

	// Test si le Token est ok
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
									FilterChain filterChain) throws ServletException, IOException {

//		response.addHeader(
//				"Access-Control-Allow-Origin", "*");
//
//		response.addHeader(
//				"Access-Control-Allow-Headers",
//				"Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,authorization");
//
//		response.addHeader(
//				"Access-Control-Expose-Headers",
//				"Access-Control-Allow-Origin, Access-Control-Allow-Credentials, authorization");


		if(request.getMethod().equals("OPTIONS")){
			response.setStatus(HttpServletResponse.SC_OK);
		}
		else if(request.getRequestURI().equals("/login")) {
			filterChain.doFilter(request, response);
		}
		else {
			String jwtToken = request.getHeader(SecurityConstants.HEADER_STRING);

			if (jwtToken == null || !jwtToken.startsWith(SecurityConstants.TOKEN_PREFIX)) {
				filterChain.doFilter(request, response);
				return;
			}

			String jwt = jwtToken.substring(SecurityConstants.TOKEN_PREFIX.length());

			System.out.println("JWT = " + jwt);


//			JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(SecurityConstants.SECRET)).build();
//			DecodedJWT decodedJWT = jwtVerifier.verify(jwt);

//			String username = decodedJWT.getSubject();
//			List<String> roles = decodedJWT.getClaims().get("roles").asList(String.class);


			Claims claims = Jwts.parser()
					.setSigningKey(SecurityConstants.SECRET.getBytes())
					.parseClaimsJws(jwt.replace(SecurityConstants.TOKEN_PREFIX, ""))
					.getBody();

			String username = claims.getSubject();

			if (username == null){
				filterChain.doFilter(request, response);
				return;
			}

			ArrayList<Map<String, String>> roles = (ArrayList<Map<String, String>>) claims.get("roles");

			System.out.println("username = " + username);
			System.out.println("roles = " + roles);

			Collection<GrantedAuthority> authorities = new ArrayList<>();

			roles.forEach(r -> authorities.add(new SimpleGrantedAuthority(r.get("authority"))));

			UsernamePasswordAuthenticationToken user =
					new UsernamePasswordAuthenticationToken(username, null, authorities);

			SecurityContextHolder.getContext().setAuthentication(user);

			filterChain.doFilter(request, response);
		}
	}
}
