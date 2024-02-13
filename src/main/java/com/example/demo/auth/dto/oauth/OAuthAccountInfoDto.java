package com.example.demo.auth.dto.oauth;

import com.example.demo.account.enums.Gender;
import com.example.demo.auth.dto.oauth.kakao.KakaoAccountResponse;
import com.example.demo.auth.dto.oauth.naver.NaverAccountResponse;
import com.example.demo.common.exception.NotFoundException;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

import static com.example.demo.common.exception.enums.ExceptionStatus.INVALID_INPUT_VALUE;


@Value
@NoArgsConstructor(force = true)
public class OAuthAccountInfoDto {

    @NotNull
    String id;

    @NotNull
    String name; // 닉네임 또는 실제 이름

    @NotNull
    String email; // 카카오계정(이메일)

    @Nullable
    String phoneNumber; // 카카오계정(전화번호)

    @Nullable
//    Gender gender; // 성별
//
//    @Nullable
//    String birthday; // 생일
//
//    @Nullable
//    String profileImage; // 프로필 사진
//
//    @Nullable
//    String profileNickname; // 프로필 닉네임


//    @Nullable
//    Gender gender;

    @Builder
    public OAuthAccountInfoDto(KakaoAccountResponse kakaoResponse, KakaoAccountResponse.KakaoAccount kakaoAccount) {
        this.id = kakaoResponse.getId();
        this.name = kakaoAccount.getName();
        this.email = kakaoAccount.getEmail();
        this.phoneNumber = kakaoAccount.getPhoneNumber();
//        this.gender = Gender.valueOf(kakaoAccount.getGender().toUpperCase());
    }

    public OAuthAccountInfoDto(NaverAccountResponse naverAccount) {
        NaverAccountResponse.NaverAccount naverAccountResponse = naverAccount.getNaverAccount();
        this.id = naverAccountResponse.getId();
        this.name = naverAccountResponse.getName();
        this.email = naverAccountResponse.getEmail();
        this.phoneNumber = naverAccountResponse.getPhoneNumber();
//        this.gender = toEnum(naverAccountResponse.getGender());
    }

    private Gender toEnum(String gender) {
        if (gender.equals("M")) {
            return Gender.MALE;
        }
        if (gender.equals("F")) {
            return Gender.FEMALE;
        }
        throw new NotFoundException(INVALID_INPUT_VALUE);
    }
}

