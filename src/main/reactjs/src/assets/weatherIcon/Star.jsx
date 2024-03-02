import * as React from "react";
const SvgStar = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 283.14 271.45"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  >
      <defs>
          <style>{".SvgStar__cls-1{fill:${fill}}"}</style>
      </defs>
    <g data-name="\uB808\uC774\uC5B4 2">
        <path fill={fill} stroke={stroke} width={width} height={height}
        d="M131.29 240.85 78 268.86a22.09 22.09 0 0 1-32-23.28l10.18-59.32a22.1 22.1 0 0 0-6.36-19.55l-43.1-42C-6.41 111.92.82 89.65 18.94 87l59.56-8.63a22.12 22.12 0 0 0 16.63-12.09l26.63-54a22.1 22.1 0 0 1 39.62 0l26.63 54a22.12 22.12 0 0 0 16.63 12.09L264.21 87c18.11 2.63 25.35 24.9 12.24 37.68l-43.1 42a22.1 22.1 0 0 0-6.35 19.58l10.18 59.32a22.09 22.09 0 0 1-32 23.28l-53.27-28a22.11 22.11 0 0 0-20.62-.01"
        data-name="\uF91C\u8FF9_1"

      />
    </g>
  </svg>
);
export default SvgStar;

