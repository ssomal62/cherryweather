package com.example.demo.account.dto;

import com.example.demo.account.entity.Account;
import com.example.demo.account.enums.UserRole;
import com.example.demo.common.exception.NotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_ACCOUNT;

public class AccountDetails implements UserDetails {

    private final Account account;

    private String email;

    public AccountDetails(Account account) {
        if (account == null) {
            throw new NotFoundException(NOT_FOUND_ACCOUNT);
        }
        this.account = account;
        this.email = account.getEmail();
    }

    public Account getAccount() {
        return account;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        UserRole userRole = account.getUserRole();
        String authority = userRole.getAuthority();
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(authority);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(simpleGrantedAuthority);
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }


    public void setEmail(String email) {
    }
}
