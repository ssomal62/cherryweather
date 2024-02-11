// /*
//  * @(#)ApiClientTest.java $version 2017. 5. 19.
//  *
//  * Copyright 2007 NHN Corp. All rights Reserved.
//  * NHN PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
//  */
// package com.example.demo.weather.service;
//
// import com.example.demo.common.config.NCPGeoLocationConfig;
// import lombok.RequiredArgsConstructor;
// import org.junit.Test;
// import org.springframework.beans.factory.annotation.Value;
//
// @RequiredArgsConstructor
// public class NCPGeoLocationService {
//
//     @Value("${ncp.storage.accessKey}")
//     private final String accessKey;
//     @Value("${ncp.storage.secretKey}")
//     private final String secretKey;
//     private final String ip = "221.148.138.87";
//
//
//     public void simple() throws Exception {
//         final NCPGeoLocationConfig ncpGeoLocationConfig = new NCPGeoLocationConfig(accessKey, secretKey);
//         ncpGeoLocationConfig.run(ip);
//     }
// }
