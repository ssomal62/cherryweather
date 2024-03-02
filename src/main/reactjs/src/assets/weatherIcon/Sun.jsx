import * as React from "react";
const SvgSun = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 321.79 321.79"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
    <defs>
      <style>{".Sun_svg__cls-1{fill:${fill}}"}</style>
    </defs>
    <g id="Sun_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
      <g id="Sun_svg___\u8FF9_1" data-name="\uF91C\u8FF9_1">
        <circle cx={160.89} cy={160.89} r={92.68} className="Sun_svg__cls-1" />
          <path fill={fill} stroke={stroke} width={width} height={height}
          d="m313 144.53-32.25-21.42a19.66 19.66 0 0 1-8.38-20.26L280 64.91a19.65 19.65 0 0 0-23.15-23.15l-38 7.65A19.63 19.63 0 0 1 198.68 41L177.26 8.77a19.65 19.65 0 0 0-32.73 0L123.11 41a19.65 19.65 0 0 1-20.26 8.39l-37.94-7.63a19.65 19.65 0 0 0-23.15 23.15l7.65 37.94A19.66 19.66 0 0 1 41 123.11L8.78 144.53a19.65 19.65 0 0 0 0 32.73L41 198.68a19.65 19.65 0 0 1 8.39 20.25l-7.65 38A19.64 19.64 0 0 0 64.91 280l37.94-7.65a19.66 19.66 0 0 1 20.26 8.38L144.53 313a19.64 19.64 0 0 0 32.73 0l21.42-32.25a19.64 19.64 0 0 1 20.25-8.38l38 7.65A19.64 19.64 0 0 0 280 256.89l-7.66-38a19.65 19.65 0 0 1 8.38-20.25L313 177.26a19.64 19.64 0 0 0 0-32.73m-152.12 118a101.68 101.68 0 1 1 101.7-101.64 101.8 101.8 0 0 1-101.69 101.68Z"
          className="Sun_svg__cls-1"
        />
      </g>
    </g>
  </svg>
);
export default SvgSun;

