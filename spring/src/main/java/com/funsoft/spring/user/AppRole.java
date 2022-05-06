package com.funsoft.spring.user;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity @Data @ToString
public class AppRole {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String roleName;
}
