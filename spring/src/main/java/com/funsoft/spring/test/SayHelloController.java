package com.funsoft.spring.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class SayHelloController {

    @GetMapping
    public SayHello sayHello() {
        return new SayHello("Hello Mustafa");
    }
}
