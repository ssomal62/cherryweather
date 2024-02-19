package com.example.demo.account.service.impl;

import com.example.demo.account.dto.AccountDetails;
import com.example.demo.account.entity.Account;
import com.example.demo.account.repository.AccountRepository;
import com.example.demo.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_ACCOUNT;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccountDetailsServiceImpl implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmail(username)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_ACCOUNT));
        return new AccountDetails(account);
    }
}
