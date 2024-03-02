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
import com.example.demo.common.jwt.dto.JwtReissueResponseDto;
import com.example.demo.common.jwt.dto.JwtRequestDto;
import com.example.demo.common.jwt.dto.JwtResponseDto;
import com.example.demo.service.RedisService;
import io.jsonwebtoken.Claims;
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
import static org.springframework.beans.propertyeditors.CustomBooleanEditor.VALUE_TRUE;

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

    /**
     * 로그인
     */
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

    /**
     * 로그아웃 처리를 위해 사용자 인증 수단(토큰)을 검증하고, 무효화한다.
     */
    @Override
    @Transactional
    public void signOut(final JwtRequestDto jwtRequestDto) {
        jwtProvider.validateToken(jwtRequestDto.getAccessToken());

        Claims claims = jwtProvider.getInfoFromToken(jwtRequestDto.getAccessToken());
        String email = claims.getSubject();

        invalidateToken(email, jwtRequestDto.getAccessToken());
    }

    /**
     * 토큰 재발급
     *
     * @param jwtRequestDto 기존 토큰
     * @return 재발급된 토큰
     */
    @Override
    @Transactional
    public ResponseEntity<JwtReissueResponseDto> reissue(final JwtRequestDto jwtRequestDto) {

        validateRefreshToken(jwtRequestDto);
        validateRefreshTokenOwnership(jwtRequestDto);

        String email = jwtProvider.getInfoFromToken(jwtRequestDto.getAccessToken()).getSubject();

        JwtResponseDto jwtResponseDto = jwtProvider.createJwtToken(email);

        return ResponseEntity
                .ok()
                .header(AUTHORIZATION_HEADER, BEARER_PREFIX + jwtResponseDto.getAccessToken())
                .body(
                        JwtReissueResponseDto.builder()
                                .accessToken(jwtResponseDto.getAccessToken())
                                .refreshToken(jwtRequestDto.getRefreshToken())
                                .accessTokenExpiresIn(jwtResponseDto.getAccessTokenExpiresIn())
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

    private void invalidateToken(String email, String accessToken) {
        redisService.deleteData(email);
        redisService.setDataExpire(
                BLACK_LIST_KEY_PREFIX + accessToken,
                VALUE_TRUE, ACCESS_TOKEN_EXPIRE_TIME / 1000L);
    }

    /**
     * 토큰의 유효성을 검증한다.
     */
    private void validateRefreshToken(JwtRequestDto jwtRequestDto) {
        jwtProvider.validateToken(jwtRequestDto.getRefreshToken());
    }

    /**
     * 요청자와 토큰의 소유자 정보가 일치하는지 검증한다.
     */
    private void validateRefreshTokenOwnership(JwtRequestDto jwtRequestDto) {
        String email = jwtProvider.getInfoFromToken(jwtRequestDto.getAccessToken()).getSubject();
        String validRefreshToken = redisService.getData(email);
        if (!jwtRequestDto.getRefreshToken().equals(validRefreshToken)) {
            throw new AuthException(EXPIRED_REFRESH_TOKEN);
        }
    }

}
