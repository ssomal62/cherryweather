import * as React from "react";
const SvgCloud = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 232.49"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
      <defs>
          <style>{".SvgCloud__cls-1{fill:${fill}}"}</style>
      </defs>
    <g data-name="\uB808\uC774\uC5B4 2">
        <path fill={fill} stroke={stroke} width={width} height={height}
        d="M259.51 0A116.25 116.25 0 0 0 152.9 69.89a92.51 92.51 0 1 0-60.38 162.6h167A116.25 116.25 0 1 0 259.51 0"
        data-name="\uF91C\u8FF9_1"
      />
    </g>
  </svg>
);
export default SvgCloud;

