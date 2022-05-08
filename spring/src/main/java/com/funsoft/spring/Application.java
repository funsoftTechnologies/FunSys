package com.funsoft.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class Application {

//    @Autowired
//    JdbcTemplate jdbcTemplate;

    public static Logger logger = LoggerFactory.getLogger(Application.class);

    @PostConstruct
    public void init() {
        logger.info("Application started ...");
    }

    public static void main(String[] args) {
        logger.info("Application executed ...");
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Override
//    public void run(String... args) throws Exception {
//        String sql = "CREATE TABLE ARTICLE";
//
//        List<Article> articles = jdbcTemplate.query(sql,
//                BeanPropertyRowMapper.newInstance(Article.class));
//    }

}
