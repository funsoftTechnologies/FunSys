package com.funsoft.spring.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";

    public static final long EXPIRATION_TIME = 864_000_000; //10 days
//    public static final long EXPIRATION = 10 * 24 * 3600;

    public static final String TOKEN_PREFIX = "Bearer";
//    public static final String HEADER_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";
//    public static final String JWT_HEADER_NAME = "Authorization";

    public static final String USERNAME_ = "Username";
}