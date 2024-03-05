import * as React from "react";
const SvgRain = ({fill = '#FFFFFF', stroke='#FFFFFF', width='2.3em', height='13em', ...props}) => (
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
      <style>{".Rain_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g id="Rain_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
      <g id="Rain_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M259.51 0A116.25 116.25 0 0 0 152.9 69.89a92.51 92.51 0 1 0-60.38 162.6h167A116.25 116.25 0 1 0 259.51 0"
          className="Rain_svg__cls-1"
        />
        <ellipse
          cx={99.74}
          cy={298.47}
          className="Rain_svg__cls-1"
          rx={20.11}
          ry={33.91}
        />
        <ellipse
          cx={187.88}
          cy={298.47}
          className="Rain_svg__cls-1"
          rx={20.11}
          ry={33.91}
        />
        <ellipse
          cx={276.02}
          cy={298.47}
          className="Rain_svg__cls-1"
          rx={20.11}
          ry={33.91}
        />
      </g>
    </g>
  </svg>
);
export default SvgRain;

