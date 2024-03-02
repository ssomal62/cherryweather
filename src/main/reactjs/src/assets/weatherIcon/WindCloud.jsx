import * as React from "react";
const SvgWindCloud = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 374.59"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".WindCloud_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g
      id="WindCloud_svg__\uB808\uC774\uC5B4_2"
      data-name="\uB808\uC774\uC5B4 2"
    >
      <g id="WindCloud_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M259.51 0A116.25 116.25 0 0 0 152.9 69.89a92.51 92.51 0 1 0-60.38 162.6h167A116.25 116.25 0 1 0 259.51 0M217 294.76H69.93a7.21 7.21 0 1 0 0 14.41H217a25.51 25.51 0 1 1-17.42 44.15 7.2 7.2 0 1 0-9.84 10.52A39.92 39.92 0 1 0 217 294.76"
          className="WindCloud_svg__cls-1"
        />
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="M315 256.78H167.91a7.21 7.21 0 0 0 0 14.41H315a25.51 25.51 0 1 1-17.42 44.15 7.2 7.2 0 1 0-9.84 10.52A39.92 39.92 0 1 0 315 256.78"
          className="WindCloud_svg__cls-1"
        />
      </g>
    </g>
  </svg>
);
export default SvgWindCloud;

