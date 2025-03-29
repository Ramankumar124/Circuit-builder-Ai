import { Handle, Position } from '@xyflow/react';

import React from 'react';

const Diode: React.FC= ({data} ) => {
return(

  <div style={{ position: "relative", width: 80, height: 80}}>
  

  <svg viewBox="0 0 792 792" xmlns="http://www.w3.org/2000/svg">
    <style>
      {`
        .d0 {fill:  #000000 ;stroke: #000000; stroke-miterlimit: 10; }
        .d1 { fill: #6D6E71; stroke: #000; stroke-miterlimit: 10; }
        .d2 { fill: #FFF; stroke: #000; stroke-miterlimit: 10; }
        .d3 { fill: none; stroke: #000; stroke-width: 4; stroke-miterlimit: 10; }
        .d4 { fill: none; stroke: #000; stroke-miterlimit: 10; }
      `}
    </style>
    <g>
      <ellipse
        transform="matrix(0.9999 -0.0162 0.0162 0.9999 -5.8149 3.6278)"
        className="d0"
        cx="221.15"
        cy="360.95"
        rx="29.92"
        ry="89"
      />
      <path
        className="d0"
        d="M222.51 445.66l0.07 4.28 333.78-5.41 10.64-0.17-1.3-80.19s0.01-0.01 0-0.02l-0.14-8.78 0-0.01-0.15-8.76c0.01-0.05 0-0.09 0-0.13l-1.3-80.09 0-0.01-344.42 5.59 0.07 4.27"
      />
      <path
        className="d0"
        d="M668.17 353.71c0.8 49.15-12.34 89.21-29.33 89.49l-82.47 1.34c6.31-24.31 9.83-55.37 9.29-89.16-0.55-33.79-5.07-64.72-12.17-88.81l82.47-1.34C652.95 264.94 667.37 304.56 668.17 353.71z"
      />
      <ellipse
        transform="matrix(0.9999 -0.0162 0.0162 0.9999 -5.8143 3.6559)"
        className="d1"
        cx="222.88"
        cy="360.92"
        rx="28.18"
        ry="84.89"
      />
      <path
        className="d2"
        d="M608.4 354.87c0.55 33.79-6.59 64.91-12.9 89.22l-54.7 0.89c6.31-24.31 13.45-55.43 12.9-89.22-0.55-33.79-8.69-64.66-15.78-88.76l54.7-0.89C599.72 290.21 607.86 321.08 608.4 354.87z"
      />
      <line className="d3" x1="765.32" y1="352.13" x2="668.17" y2="353.71" />
      <polyline className="d4" points="565.65,355.37 565.56,355.36 565.56,355.37" />
      <polyline className="d3" points="221.14,360.95 194.71,361.38 191.23,361.43 47.41,363.76" />
    </g>
  </svg>

      {/* Positive Terminal Handle */}
      <Handle
        type={data.firsttype}
        position={Position.Top}
        id="positive"
        style={{ left: "8%", top: "37px",  background: "red",  width:"3px", height:"3px"}}
      />

      {/* Negative Terminal Handle */}
      <Handle
        type={data.secondtype}
        position={Position.Top}
        id="negative"
        style={{ left: "100%", top: "36px", background: "black" , width:"3px", height:"3px"}}
      />

     
    </div>
)
};

export default Diode;

