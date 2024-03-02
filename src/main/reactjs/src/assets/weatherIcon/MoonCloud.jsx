import * as React from "react";
const SvgMoonCloud = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 334.28"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".MoonCloud_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g
      id="MoonCloud_svg__\uB808\uC774\uC5B4_2"
      data-name="\uB808\uC774\uC5B4 2"
    >
      <g id="MoonCloud_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M214 100.39a126.16 126.16 0 0 0-64.62 56.18 102.34 102.34 0 0 0-122 6.13 103.1 103.1 0 0 1-16.83-33.25 8 8 0 0 1 11.6-9.17A79.08 79.08 0 0 0 130.46 12 8 8 0 0 1 139.53.33 103.93 103.93 0 0 1 214 100.39"
          className="MoonCloud_svg__cls-1"
        />
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M259.51 101.79a116.25 116.25 0 0 0-106.61 69.89 92.51 92.51 0 1 0-60.38 162.6h167a116.25 116.25 0 1 0 0-232.49Z"
          className="MoonCloud_svg__cls-1"
        />
      </g>
    </g>
  </svg>
);
export default SvgMoonCloud;

