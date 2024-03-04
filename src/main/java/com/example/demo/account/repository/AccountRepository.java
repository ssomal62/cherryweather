package com.example.demo.account.repository;

import com.example.demo.account.entity.Account;
import com.example.demo.account.enums.RegisterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface AccountRepository extends JpaRepository<Account, Long> {

    // ## 이메일로 회원 조회 ## //
    Optional<Account> findByEmail(String email);

    // ## 이메일 중복 체크 ## //
    boolean existsByEmail(String email);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Account a WHERE a.email = :email AND a.registType = :registerType")
    boolean existsByEmailAndRegisterType(@Param("email") String email, @Param("registerType") RegisterType registerType);

    // 필요한 경우, 다음과 같이 새로운 쿼리 메서드를 추가할 수 있습니다.
    // 예시: 사용자의 등록 타입을 조회하는 메서드
    @Query("SELECT a.registType FROM Account a WHERE a.email = :email")
    Optional<RegisterType> findRegisterTypeByEmail(String email);


    Optional<Account> findAccountByNameAndPhoneNumber(String name, String phoneNumber);

}