package com.example.demo.common.webController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value = {"",
            "/login", "/oauth", "/oauth/callback/naver","/modify/profile",
            "/login/local", "/join","/mypage","/mypage/setting",
            "/weatherDetail",
            "/ai", "/gpt", "/image", "/imageList",
            "/chat","/chat/admin","/chat/room/**",
            "/community/**","/search",
            "/club-add", "/club-add/**","/club-configurations",
            "/club-members","/club-join","/club-wait","/club-details/**",
            "/event",
            "/chat","/chat/admin","/chat/room/**",
            "/ai", "/gpt", "/image", "/imageList",
            "/weatherDetail", "/community/**",
            "/oauth/callback/naver","/modify/profile", "/mypage/setting", "/chat/room/:chatRoom/", "/alarm", "/alarm/**"
    })

    public String accountRoute() {
        return "forward:/index.html";
    }

}
