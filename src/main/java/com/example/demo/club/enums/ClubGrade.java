package com.example.demo.club.enums;

import lombok.Getter;

@Getter
public enum ClubGrade {

    /**
     * <b>ClubGrade</b>
     *     <ul>
     *         <li>산들바람: 기본등급. 산들바람처럼 가볍고 상쾌한 시작을 의미</li>
     *         <li>포근한 햇살 : 성장하는 클럽. 포근한 햇살처럼 따뜻하고 친근함</li>
     *         <li>시원한 소나기 : 활동적인 클럽. 시원한 소나기처럼 상쾌하고 활력을 주는 활동</li>
     *         <li>우레와 번개 : 매우 역동적인 클럽. 우레와 번개처럼 강렬하고 열정적인 활동</li>
     *         <li>빛나는 무지개 : 최고 등급. 빛나는 무지개처럼 다채롭고 화려한 성과와 경험</li>
     *     </ul>
     */


    GENTLE_BREEZE("산들 바람", 1000, 20),
    WARM_SUNLIGHT("포근한 햇살", 2000, 30),
    REFRESHING_RAIN("시원한 소나기", 3000, 40),
    THUNDERSTORM("우레와 번개", 4000, 50),
    RADIANT_RAINBOW("빛나는 무지개", 5000, 60);

    private final String grade;
    private final int maxGrowthMeter;
    private final int maxMembers;

    ClubGrade(String grade, int maxGrowthMeter, int maxMembers) {
        this.grade = grade;
        this.maxGrowthMeter = maxGrowthMeter;
        this.maxMembers = maxMembers;
    }


}
