package com.example.demo.common.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value = {"", "/login", "/club", "/event", "/chat",
            "/mypage", "/oauth", "/login/local", "/join", "/club-add", "/ai", "/gpt", "/image",
            "/imageList", "/weatherDetail", "/chat/room/:chatRoom/"})
    public String accountRoute() {
        return "forward:/index.html";
    }

}
