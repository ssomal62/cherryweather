package com.example.demo.account.dto;

import com.example.demo.account.entity.Account;
import com.example.demo.account.entity.ActivitiesArea;
import com.example.demo.account.entity.Agreement;
import com.example.demo.account.entity.Interest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Value;

import java.util.ArrayList;
import java.util.List;

import static com.example.demo.account.enums.RegisterType.LOCAL;
import static com.example.demo.account.enums.UserRole.ROLE_CUSTOMER;
import static com.example.demo.account.enums.UserStatus.ACTIVE;


@Value
@Builder
public class SignUpRequestDto {

    @Pattern(regexp = "^[가-힣]{2,20}$", message = "이름은 한글 2자 이상, 20자 이하만 가능합니다.")
    @NotNull String name;

    @Email(message = "유효한 이메일 주소를 입력하세요.")
    @NotNull String email;

    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,300}$",
            message = "비밀번호는 8자 이상, 300자 이하이며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.")
    @NotNull String password;

    @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "휴대폰 번호 형식이 유효하지 않습니다.")
    @NotNull String phoneNumber;

    @Pattern(regexp = "^(MALE|FEMALE)$", message = "성별 형식이 일치하지 않습니다.")
    @NotNull String gender;

    @NotNull(message = "프로필 이름은 필수입니다.")
    String profileName;

    @Pattern(regexp = "^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12]\\d|3[01])$",
            message = "생년월일 형식이 일치하지 않습니다.")
    @NotNull String birthdate;

    @NotNull Boolean serviceAgreement;

    @NotNull Boolean privacyAgreement;

    @NotNull Boolean notifiedAgreement;

    List<String> interests;

    String primaryActivityArea;

    String secondaryActivityArea;

    String tertiaryActivityArea;

    public Account toAccountEntity(final String encodedPassword) {
        return Account.builder()
                .name(this.name)
                .email(this.email)
                .password(encodedPassword) // 암호화 로직을 서비스 레이어에서 처리해야 함
                .phoneNumber(this.phoneNumber)
                .gender(this.gender)
                .dateOfBirth(this.birthdate)
                .profileName(this.profileName)
                .profileImage("기본이미지 넣어야함")
                .rating("13도")// DB에 맞게 형식 변환 필요
                .registerType(LOCAL)
                .userStatus(ACTIVE)
                .userRole(ROLE_CUSTOMER)
                .build();
    }

    public List<Interest> toInterestEntities(Account account) {
        List<Interest> interestsList = new ArrayList<>();

        if (this.interests != null && !this.interests.isEmpty()) {
            Interest interestEntity = Interest.builder()
                    .account(account)
                    .interestFirst(this.interests.size() > 0 ? this.interests.get(0) : null)
                    .interestSecond(this.interests.size() > 1 ? this.interests.get(1) : null)
                    .interestThird(this.interests.size() > 2 ? this.interests.get(2) : null)
                    .interestFourth(this.interests.size() > 3 ? this.interests.get(3) : null)
                    .interestFifth(this.interests.size() > 4 ? this.interests.get(4) : null)
                    .build();
            interestsList.add(interestEntity);
        }

        return interestsList;
    }

    public Agreement toAgreementEntity(Account account) {
        return Agreement.builder()
                .accountId(account.getAccountId())
                .agreementUseTerms(this.serviceAgreement)
                .agreementInfoOffer(this.privacyAgreement)
                .agreementGetNotified(this.notifiedAgreement)
                .build();
    }

    public ActivitiesArea toActivitiesAreaEntity(Account account) {
        return ActivitiesArea.builder()
                .accountId(account)
                .activitiesAreaFirst(this.primaryActivityArea)
                .activitiesAreaSecond(this.secondaryActivityArea)
                .activitiesAreaThird(this.tertiaryActivityArea)
                .build();
    }

}
