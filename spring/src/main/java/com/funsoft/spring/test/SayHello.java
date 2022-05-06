package com.funsoft.spring.test;

import lombok.Data;

@Data
class SayHello{
    private String messageText;

    public SayHello(String messageText) {
        this.messageText = messageText;
    }
}