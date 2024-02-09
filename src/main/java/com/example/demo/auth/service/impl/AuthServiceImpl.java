package com.example.demo.auth.service.impl;

import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.account.service.impl.AccountServiceImpl;
import com.example.demo.auth.dto.SignInRequestDto;
import com.example.demo.auth.dto.SignInResponseDto;
import com.example.demo.auth.service.AuthService;
import com.example.demo.common.exception.AuthException;
import com.example.demo.common.exception.NotFoundException;
import com.example.demo.common.jwt.JwtProvider;
import com.example.demo.common.jwt.dto.JwtResponseDto;
import com.example.demo.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.example.demo.account.enums.UserStatus.DELETED;
import static com.example.demo.account.enums.UserStatus.RESTRICTED;
import static com.example.demo.common.constant.AuthConstant.*;
import static com.example.demo.common.exception.enums.ExceptionStatus.*;
import static com.example.demo.common.utils.CookieUtil.createCookie;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AccountServiceImpl accountService;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisService redisService;
    private final ApplicationEventPublisher eventPublisher;

    // 로그인
    @Override
    @Transactional
    public ResponseEntity<SignInResponseDto> signIn(
            final SignInRequestDto signInRequestDto
    ) {
        String email = signInRequestDto.getEmail();
        String requestedPassword = signInRequestDto.getPassword();
        Account account = accountService.findAccountByEmail(email);

        checkUserStatusByEmail(account);
        checkPasswordIsCorrect(requestedPassword, account);

        final JwtResponseDto jwtResponseDto = jwtProvider.createJwtToken(email);
        redisService.setDataExpire(email, jwtResponseDto.getRefreshToken(),
                REFRESH_TOKEN_EXPIRE_TIME);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, createCookie(AUTHORIZATION_KEY, jwtResponseDto.getRefreshToken()).toString())
                .header(HttpHeaders.AUTHORIZATION, BEARER_PREFIX + jwtResponseDto.getAccessToken())
                .body(
                        SignInResponseDto.builder()
                                .userName(account.getName())
                                .userRole(account.getUserRole())
                                .grantType(jwtResponseDto.getGrantType())
                                .accessToken(jwtResponseDto.getAccessToken())
                                .refreshToken(jwtResponseDto.getRefreshToken())
                                .expiresIn(jwtResponseDto.getAccessTokenExpiresIn())
                                .build()
                );
    }


    // ################### private methods ################### //
    protected void checkUserStatusByEmail(Account account) {
        if (account.getUserStatus().equals(DELETED)) {
            throw new NotFoundException(DELETED_ACCOUNT);
        }
        if (account.getUserStatus().equals(RESTRICTED)) {
            throw new AuthException(RESTRICTED_ACCOUNT);
        }
    }

    private void checkPasswordIsCorrect(String requestedPassword, Account account) {
        if (!passwordEncoder.matches(requestedPassword, account.getPassword())) {
            throw new AuthException(INVALID_ID_OR_PW);
        }
    }

}
