package com.example.demo.auth.dto.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class OAuthAccountInfoDto2 {

    @NotNull
    String id;

    @NotNull
    String name;


    @Builder
    public OAuthAccountInfoDto2(@JsonProperty("id") String id,
                                @JsonProperty("properties.nickname") String nickname){
        this.id = id;
        this.name = nickname;

//        this.gender = Gender.valueOf(kakaoAccount.getGender().toUpperCase());
    }
}
