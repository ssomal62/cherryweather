package com.example.demo.club.enums;

import lombok.Getter;

@Getter
public enum ClubGrade {

    /**
     * <b>ClubGrade</b>
     *     <ul>
     *         <li>산들바람: 기본등급. 산들바람처럼 가볍고 상쾌한 시작을 의미</li>
     *         <li>우레와 번개 : 매우 역동적인 클럽. 우레와 번개처럼 강렬하고 열정적인 활동</li>
     *         <li>속삭이는 눈보라: 성장 중인 클럽. 몽글몽글 솜처럼 부드럽고 편안함</li>
     *         <li>포근한 햇살 : 성장하는 클럽. 포근한 햇살처럼 따뜻하고 친근함</li>
     *         <li>빛나는 무지개 : 최고 등급. 빛나는 무지개처럼 다채롭고 화려한 성과와 경험</li>
     *     </ul>
     */

    GENTLE_BREEZE("산들 바람", 1000, 20),
    THUNDERSTORM("우레와 번개", 2000, 30),
    SNOWY_WHISPERS("속삭이는 눈보라", 3000, 30),
    WARM_SUNLIGHT("포근한 햇살", 4000, 40),
    RADIANT_RAINBOW("빛나는 무지개", 5000, 50);

    private final String grade;
    private final int maxGrowthMeter;
    private final int maxMembers;

    ClubGrade(String grade, int maxGrowthMeter, int maxMembers) {
        this.grade = grade;
        this.maxGrowthMeter = maxGrowthMeter;
        this.maxMembers = maxMembers;
    }
}
