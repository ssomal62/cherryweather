import * as React from "react";
const SvgClouds = ({fill = '#FFFFFF', stroke='#FFFFFF', width='2.3em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 261.93"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".Clouds_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g id="Clouds_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
      <g id="Clouds_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          id="Clouds_svg__cloud"
          d="M275.75 61.9A100 100 0 0 0 184 122a79.6 79.6 0 1 0-51.94 139.9h143.69a100 100 0 0 0 0-200"
          className="Clouds_svg__cls-1"
        />
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M132.08 93.72a88.53 88.53 0 0 1 48.72 14.62 109.05 109.05 0 0 1 87-55.14 84.73 84.73 0 0 0-156.34-2.27 67.41 67.41 0 1 0-66.4 114.67 88.74 88.74 0 0 1 87.02-71.88"
          className="Clouds_svg__cls-1"
        />
      </g>
    </g>
  </svg>
);
export default SvgClouds;

