package com.example.demo.common.geoLocation;

import com.example.demo.weather.dto.GeoLocationDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class GeoLocationClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    // @Value("")
    private String geoLocationApiUrl = "https://geolocation.apigw.ntruss.com";

    @Value("${ncp.storage.accessKey}")
    private String accessKey;

    @Value("${ncp.storage.secretKey}")
    private String secretKey;

    public GeoLocationClient(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public GeoLocationDto getGeoLocation(String ip) {
        String timestamp = generateTimestamp();
        String signature = makeSignature("GET", "/geolocation/v2/geoLocation", timestamp, accessKey, secretKey);

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-ncp-apigw-timestamp", timestamp);
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", signature);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // return restTemplate.exchange(
        //         geoLocationApiUrl + "/geolocation/v2/geoLocation?ip={ip}&ext=t&responseFormatType=json",
        //         HttpMethod.GET, entity, GeoLocationDto.class, ip).getBody();

        ResponseEntity<String> response = restTemplate.exchange(
                geoLocationApiUrl + "/geolocation/v2/geoLocation?ip={ip}&ext=t&responseFormatType=json", HttpMethod.GET, entity, String.class, ip);

        try{
            JsonNode root =  objectMapper.readTree(response.getBody());
            JsonNode geoLocationNode = root.get("geoLocation");
            return objectMapper.treeToValue(geoLocationNode, GeoLocationDto.class);
        }catch (Exception e){
            //예외 처리 필요
            throw new RuntimeException("Failed to parse GeoLocation JSON", e);
        }

    }

    private String generateTimestamp() {
        return Long.toString(System.currentTimeMillis());
    }

    // API의 보안 요구사항을 충족하기 위해 HmacSHA256 알고리즘으로 암호화 하는 메소드
    private String makeSignature(String method, String uri, String timestamp, String accessKey, String secretKey) {
        try {
            String space = " ";                       // 한 칸 띄어쓰기
            String newLine = "\n";                    // 개행 문자
            String message = method + space + uri + newLine + timestamp + newLine + accessKey;

            SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);

            byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
            return Base64.encodeBase64String(rawHmac);
        } catch(Exception e) {
            throw new RuntimeException("Failed to generate HMAC signature", e);
        }
    }

    // public String makeSignature(final String method, final String baseString, final String timestamp, final String accessKey, final String secretKey) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
    //     String space = " ";                       // one space
    //     String newLine = "\n";                    // new line
    //
    //     String message = new StringBuilder()
    //                              .append(method)
    //                              .append(space)
    //                              .append(baseString)
    //                              .append(newLine)
    //                              .append(timestamp)
    //                              .append(newLine)
    //                              .append(accessKey)
    //                              .toString();
    //
    //     SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
    //     Mac mac = Mac.getInstance("HmacSHA256");
    //     mac.init(signingKey);
    //     byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
    //     String encodeBase64String = Base64.encodeBase64String(rawHmac);
    //     return encodeBase64String;
    // }
}
