/*
 * @(#)ApiClient.java $version 2017. 5. 19.
 *
 * Copyright 2007 NHN Corp. All rights Reserved.
 * NHN PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.example.demo.common.geoLocation;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Component
public class GeoLocationClient {

    // @Value("${ncp.storage.accessKey}")
    // private String accessKey="01D5D1E98BCD9F920C41";

    // @Value("${ncp.storage.secretKey}")
    // private String secretKey="E99A96B5B34B8DB0BD861D89D887A7E2941C1EFA";
    private String accessKey;

    private String secretKey;
    private final CloseableHttpClient httpClient;

    public GeoLocationClient(@Value("${ncp.storage.accessKey}") String accessKey, @Value("${ncp.storage.secretKey}") String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;

        final int timeout = 5000;
        final RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(timeout).setConnectTimeout(timeout).build();
        httpClient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
    }

    public static void main(final String[] args) {
        if(args.length != 3) {
            System.out.println("Usage : accessKey secretKey ip");
            return;
        }

        try {
            /** args[0] => accessKey, args[1] => secretKey, args[2] => IP, **/
            System.out.println(args[0] + args[1] + args[2]);
            final GeoLocationClient geoLocationClient = new GeoLocationClient(args[0], args[1]);
            geoLocationClient.run(args[2]);
        } catch(final Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public String run(final String ip) throws Exception {
        try {
        final String requestMethod = "GET";
        final String hostName = "https://geolocation.apigw.ntruss.com";
        final String requestUrl = "/geolocation/v2/geoLocation";

        final Map<String, List<String>> requestParameters = new HashMap<String, List<String>>();
        requestParameters.put("ip", Arrays.asList(ip));
        requestParameters.put("ext", Arrays.asList("t"));
        requestParameters.put("responseFormatType", Arrays.asList("json"));

        SortedMap<String, SortedSet<String>> parameters = convertTypeToSortedMap(requestParameters);

        String timestamp = generateTimestamp();
        // System.out.println("timestamp: " + timestamp);

        String baseString = requestUrl + "?" + getRequestQueryString(parameters);
        // System.out.println("baseString : " + baseString);

        String signature = makeSignature(requestMethod, baseString, timestamp, accessKey, secretKey);
        // System.out.println("signature : " + signature);

        final String requestFullUrl = hostName + baseString;
        final HttpGet request = new HttpGet(requestFullUrl);
        request.setHeader("x-ncp-apigw-timestamp", timestamp);
        request.setHeader("x-ncp-iam-access-key", accessKey);
        request.setHeader("x-ncp-apigw-signature-v2", signature);

        final CloseableHttpResponse response;
        response = httpClient.execute(request);

        final String msg = getResponse(response);
        // System.out.println("msg : " + msg);
        // System.out.println("response : " + response);

            return msg;
        } catch(Exception e) {
            String errorMessage = "Failed to retrieve geo location data: " + e.getMessage();
            throw new RuntimeException(errorMessage, e);
        }
    }

    private String getResponse(final CloseableHttpResponse response) throws Exception {
        final StringBuffer buffer = new StringBuffer();

        try(final BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()))) {
            String msg;
            while((msg = reader.readLine()) != null) {
                buffer.append(msg);
            }

        } catch(IOException e) {
            String errorMessage = "Error while reading response: " + e.getMessage();
            throw new RuntimeException(errorMessage, e);
        }
        return buffer.toString();
    }


    /**
     * @param requestParameters // * @param significantParameters
     */
    private static SortedMap<String, SortedSet<String>> convertTypeToSortedMap(final Map<String, List<String>> requestParameters) {
        final SortedMap<String, SortedSet<String>> significateParameters = new TreeMap<String, SortedSet<String>>();
        final Iterator<String> parameterNames = requestParameters.keySet().iterator();
        while(parameterNames.hasNext()) {
            final String parameterName = parameterNames.next();
            List<String> parameterValues = requestParameters.get(parameterName);
            if(parameterValues == null) {
                parameterValues = new ArrayList<String>();
            }

            for(String parameterValue : parameterValues) {
                if(parameterValue == null) {
                    parameterValue = "";
                }

                SortedSet<String> significantValues = significateParameters.get(parameterName);
                if(significantValues == null) {
                    significantValues = new TreeSet<String>();
                    significateParameters.put(parameterName, significantValues);
                }
                significantValues.add(parameterValue);
            }

        }
        return significateParameters;
    }

    private static String generateTimestamp() {
        return Long.toString(System.currentTimeMillis());
    }

    /**
     * query string 생성
     *
     * @param significantParameters
     * @return
     */
    private static String getRequestQueryString(final SortedMap<String, SortedSet<String>> significantParameters) {
        final StringBuilder queryString = new StringBuilder();
        final Iterator<Map.Entry<String, SortedSet<String>>> paramIt = significantParameters.entrySet().iterator();
        while(paramIt.hasNext()) {
            final Map.Entry<String, SortedSet<String>> sortedParameter = paramIt.next();
            final Iterator<String> valueIt = sortedParameter.getValue().iterator();
            while(valueIt.hasNext()) {
                final String parameterValue = valueIt.next();

                queryString.append(sortedParameter.getKey()).append('=').append(parameterValue);

                if(paramIt.hasNext() || valueIt.hasNext()) {
                    queryString.append('&');
                }
            }
        }
        return queryString.toString();
    }


    /**
     * * base string과 timestamp, access key, secret key를 가지고 signature 생성
     *
     * @param method
     * @param baseString
     * @param timestamp
     * @param accessKey
     * @param secretKey
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     * @throws InvalidKeyException
     */
    public String makeSignature(final String method, final String baseString, final String timestamp, final String accessKey, final String secretKey) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";                       // one space
        String newLine = "\n";                    // new line

        String message = new StringBuilder()
                                 .append(method)
                                 .append(space)
                                 .append(baseString)
                                 .append(newLine)
                                 .append(timestamp)
                                 .append(newLine)
                                 .append(accessKey)
                                 .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);
        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);
        return encodeBase64String;
    }
}