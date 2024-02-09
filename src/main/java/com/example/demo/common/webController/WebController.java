package com.example.demo.common.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value = {"", "/login", "/club", "/event", "/test" })
    public String accountRoute() {
        return "forward:/index.html";
    }

}
