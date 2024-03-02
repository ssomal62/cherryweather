import * as React from "react";
const SvgThunder = ({fill = '#7383A1', stroke='#7383A1', width='13em', height='13em', ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 375.76 347.29"
    width={width}
    height={height}
    fill ={fill}
    stroke ={stroke}
    {...props}
  ><defs><style>.cls-1{fill}</style></defs><path className="cls-1" d="M238.07,268.17l-62.22,76.71a6.42,6.42,0,0,1-11.21-5.62L175.14,298a6.41,6.41,0,0,0-6.21-8H142.66a6.42,6.42,0,0,1-5.87-9l16.93-39.49H198.2l-3.72,6.88a6.41,6.41,0,0,0,5.71,9.34h32.9A6.41,6.41,0,0,1,238.07,268.17Z"/><path className="cls-1" d="M259.51,0A116.25,116.25,0,0,0,152.9,69.89a92.51,92.51,0,1,0-60.38,162.6h167A116.25,116.25,0,1,0,259.51,0Z"/></svg>
);
export default SvgThunder;

