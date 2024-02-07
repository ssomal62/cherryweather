package com.example.demo.account.service;

import com.example.demo.account.dto.SignUpRequestDto;
import com.example.demo.account.entity.Account;

public interface AccountService {

    void createAccount(final SignUpRequestDto signUpRequestDto);

    Account findAccountByEmail(final String email);

}
