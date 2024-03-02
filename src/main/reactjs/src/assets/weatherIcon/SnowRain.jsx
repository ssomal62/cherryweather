import * as React from "react";
const SvgSnowRain = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 332.38"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".SnowRain_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g id="SnowRain_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
      <g id="SnowRain_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M259.51 0A116.25 116.25 0 0 0 152.9 69.89a92.51 92.51 0 1 0-60.38 162.6h167A116.25 116.25 0 1 0 259.51 0"
          className="SnowRain_svg__cls-1"
        />
        <ellipse
          cx={99.65}
          cy={298.47}
          className="SnowRain_svg__cls-1"
          rx={20.11}
          ry={33.91}
        />
        <ellipse
          cx={276.11}
          cy={298.47}
          className="SnowRain_svg__cls-1"
          rx={20.11}
          ry={33.91}
        />
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M217.07 281.62a8.95 8.95 0 0 0-12.21-3.27l-8 4.64v-9.28a8.94 8.94 0 0 0-17.88 0V283l-8-4.64a8.94 8.94 0 0 0-8.98 15.47l8 4.64-8 4.65a8.94 8.94 0 1 0 8.94 15.48l8-4.64v9.28a8.94 8.94 0 0 0 17.88 0V314l8 4.64a8.94 8.94 0 0 0 8.94-15.48l-8-4.65 8-4.64a8.94 8.94 0 0 0 3.31-12.25"
          className="SnowRain_svg__cls-1"
        />
      </g>
    </g>
  </svg>
);
export default SvgSnowRain;

