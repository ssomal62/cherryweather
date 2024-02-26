package com.example.demo.common.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value = {"",
            "/login", "/oauth", "/login/local", "/join","/mypage",
            "/club-add", "/club-add/**","/club-configurations",
            "/club-members","/club-join","/club-wait","/club-search","/club-details/**",
            "/event",
            "/chat","/chat/admin","/chat/room/**",
            "/ai", "/gpt", "/image", "/imageList",
            "/weatherDetail","/community/**",
            "/oauth/callback/naver","/modify/profile", "/mypage/setting", "/chat/room/:chatRoom/", "/alarm"
    })

    public String accountRoute() {
        return "forward:/index.html";
    }

}
