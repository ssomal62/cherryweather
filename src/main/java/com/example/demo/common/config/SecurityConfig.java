package com.example.demo.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
//@EnableWebSecurity
@RequiredArgsConstructor
//@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {


    public static final String ALLOWED_ORIGINS = "cherryweather.site";
    public static final String ALLOWED_METHODS = "GET, POST, DELETE, PATCH";
//
//    @Bean
//    public static PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
//        http.httpBasic(AbstractHttpConfigurer::disable)
//                .csrf(AbstractHttpConfigurer::disable)
//                .formLogin(AbstractHttpConfigurer::disable)
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
////                .requiresChannel(channel -> channel.anyRequest().requiresSecure())
//                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//                .authorizeHttpRequests(authorize -> authorize
//                        .anyRequest().permitAll()
//                )
//                .addFilterBefore(new JwtAuthFilter(jwtProvider, redisService),
//                        UsernamePasswordAuthenticationFilter.class)
//                .exceptionHandling(exception -> exception
//                        .authenticationEntryPoint(new CustomAuthEntryPoint())
//                )
//                .exceptionHandling(exception -> exception
//                        .accessDeniedHandler(new CustomAccessDeniedHandler())
//                );
//        return http.build();
//    }

    /**
     * CORS(Cross-Origin Resource Sharing) 설정
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
