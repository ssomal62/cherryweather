import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from "styled-components";
import FloatingAnimation from "../../../utils/animations/FloatingAnimation";
import {Chip, Image} from "@nextui-org/react";

const GrowthMeter = ({clubDetail}) => {

    const currentGrowth = clubDetail.currentGrowthMeter;
    const maxGrowth = clubDetail.maxGrowthMeter;

    const growthPercentage = (currentGrowth / maxGrowth) * 100;

    const chartOptions = {
        chart      : {
            type      : 'radialBar',
            animations: {
                enabled         : true, // 애니메이션 활성화
                easing          : 'easeinout', // 애니메이션 효과 (easeinout, linear 등)
                speed           : 800, // 애니메이션 지속 시간 (밀리초 단위)
                animateGradually: {
                    enabled: true, // 점진적 애니메이션 활성화
                    delay  : 150 // 애니메이션 시작 전 지연 시간
                },
                dynamicAnimation: {
                    enabled: true, // 동적 애니메이션 활성화
                    speed  : 350 // 동적 애니메이션 속도
                }
            },
            grid   : {
                margin:  {
                    bottom: 20,
                },
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle  : 135,
                hollow    : {
                    size      : '55%',
                    background: 'transparent',
                },
                track     : {
                    background : '#f2f2f2',
                    strokeWidth: '30%',
                    margin     : 5,
                    // dropShadow: {
                    //     enabled: true,
                    //     top: 2,
                    //     left: 0,
                    //     color: '#999',
                    //     opacity: 0.5,
                    //     blur: 5
                    // }
                },
                offsetY   : -60, // 차트를 상단으로 이동시킴
                dataLabels: {
                    show: true,
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                        fontSize: '30px',
                        fontWeight: 600,
                        offsetY: 110, // 값의 위치를 조정하여 게이지 끝 부근에 표시
                        formatter: function (val) {
                            return val + '%';
                        }
                    }
                }
            }
        },
        fill       : {
            type    : 'gradient',
            gradient: {
                shade           : 'dark',
                type            : 'vertical',
                shadeIntensity  : 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors   : true,
                opacityFrom     : 1,
                opacityTo       : 1,
                stops           : [0, 100]
            }
        },
        stroke     : {
            width  : 5,
            lineCap: 'round'
        },
        labels     : ['Growth'],
    };

    const gradeDescriptions = {
        GENTLE_BREEZE: "산들 바람",
        WARM_SUNLIGHT: "포근한 햇살",
        SNOWY_WHISPERS:"속삭이는 눈보라",
        THUNDERSTORM: "우레와 번개",
        RADIANT_RAINBOW: "빛나는 무지개"
    };


    const chartSeries = [growthPercentage];

    return (
        <Section>
            <div className="flex flex-col items-center justify-center">
                <Chip size="lg" variant="shadow" color="primary" className="mb-5">등급</Chip>

                <p style={styles.grade}>{gradeDescriptions[clubDetail.grade]}</p>
                <p className="text-small text-stone-400">
                    {clubDetail.currentGrowthMeter}
                    &nbsp; / &nbsp;
                    {clubDetail.maxGrowthMeter}
                </p>

            </div>

            <ChartArea className='flex flex-col justify-center items-center'>
                <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="radialBar"
                    width='200%'
                />
                <ImageContainer>
                    <FloatingAnimation>
                        <Image src={`https://kr.object.ncloudstorage.com/cherry-weather/grade/${clubDetail.grade}.png`}/>
                    </FloatingAnimation>
                </ImageContainer>
            </ChartArea>

        </Section>
    );
};

export default GrowthMeter;

const styles={
    grade:{
        fontSize: '1.8em',
        fontWeight:800,
        color:'#5FBFC9',
    }
}

const Section = styled.div`
  display: block;
  width: 100%;
  padding: 5%;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(65%, 35%); // 중앙 정렬
  z-index: 10; // 차트 위에 오도록 z-index 설정
  width: 45%;


  @media (max-width: 320px) {
    width: 70%;
    transform: translate(25%, 35%);
  }

  @media (min-width: 375px) {
    width: 65%;
    transform: translate(32%, 40%);
  }

  @media (min-width: 425px) {
    width: 60%;
    transform: translate(37%, 35%);
  }

  @media (min-width: 600px) {
    width: 45%;
    transform: translate(65%, 35%);
  }

`;

const ChartArea = styled.div`
  padding: 5%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px; /* Adjust based on your preference */
  margin-top: 20px; /* Spacing after the chart */
`;
