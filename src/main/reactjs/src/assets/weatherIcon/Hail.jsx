import * as React from "react";
const SvgHail = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 315.41"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".Hail_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g id="Hail_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
      <g id="Hail_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M259.51 0A116.25 116.25 0 0 0 152.9 69.89a92.51 92.51 0 1 0-60.38 162.6h167A116.25 116.25 0 1 0 259.51 0"
          className="Hail_svg__cls-1"
        />
        <circle
          cx={99.74}
          cy={289.99}
          r={25.42}
          className="Hail_svg__cls-1"
          transform="rotate(-67.68 99.752 289.996)"
        />
        <circle
          cx={187.88}
          cy={289.99}
          r={25.42}
          className="Hail_svg__cls-1"
          transform="rotate(-56.44 187.88 289.986)"
        />
        <circle
          cx={276.02}
          cy={289.99}
          r={25.42}
          className="Hail_svg__cls-1"
          transform="rotate(-67.68 276.034 289.989)"
        />
      </g>
    </g>
  </svg>
);
export default SvgHail;

