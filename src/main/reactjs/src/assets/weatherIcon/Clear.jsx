import * as React from "react";
const SvgClear = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352.12 294.93"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".Clear_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g id="Clear_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
      <g id="Clear_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M351.62 187.54a149.8 149.8 0 0 1-37.89 63.64c-58.93 58.93-156.18 58.22-214.27-1.52A150.48 150.48 0 0 1 164.75.49c10-2.93 18.43 7.92 13.14 16.85a114.57 114.57 0 0 0 156.92 156.92c8.99-5.33 19.77 3.26 16.81 13.28"
          className="Clear_svg__cls-1"
        />
        <circle cx={248.31} cy={62.84} r={23.55} className="Clear_svg__cls-1" />
        <circle
          cx={316.52}
          cy={86.39}
          r={14.4}
          className="Clear_svg__cls-1"
          transform="rotate(-45 316.524 86.391)"
        />
        <circle cx={16.59} cy={208.6} r={16.59} className="Clear_svg__cls-1" />
      </g>
    </g>
  </svg>
);
export default SvgClear;

