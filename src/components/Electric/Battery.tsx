import { Handle, Position } from '@xyflow/react';

import React from 'react';

const Batery: React.FC= ({data} ) => {
return(

  <div style={{ position: "relative", width: 80, height: 80 }}>

<svg width="200" height="200" viewBox="0 0 3168 3168">
  <style>
    {`
      .b1 { fill: #000; opacity: 0.9; stroke: #000; stroke-miterlimit: 10; }
      .b2 { fill: #eec22d; opacity: 0.71; stroke: #000; stroke-miterlimit: 10; }
      .b3 { fill: #000; stroke: #000; stroke-miterlimit: 10; }
      .b4 { stroke: #000; stroke-width: 8; stroke-miterlimit: 10; }
      .b5 { font-family: MyriadPro-Regular; font-size: 132.76px; opacity: 0.79 ;stroke: #ffffff }
    `}
  </style>
  <path className="b1" d="M1995 2335.84h-822c-25.96 0-47-21.04-47-47v-1362c0-25.96 21.04-47 47-47h822c25.96 0 47 21.04 47 47v1362c0 25.96-21.04 47-47 47z"/>
  <path className="b2" d="M2042 1243.84h-916v-311c0-29.28 23.72-53 53-53h810c29.28 0 53 23.72 53 53v311z"/>
  <rect className="b3" x="1753.88" y="832.16" width="164.96" height="47.68"/>
  <rect className="b3" x="1265.96" y="832.16" width="164.96" height="47.68"/>
  <line className="b4" x1="1318.6" y1="999.84" x2="1318.6" y2="1110.16"/>
  <line className="b4" x1="1265.96" y1="1059.08" x2="1378.28" y2="1059.08"/>
  <line className="b4" x1="1806.52" y1="1061.84" x2="1918.84" y2="1061.84"/>
  <text className="b5" x="1464.76" y="1599.8">
    <tspan x="0" y="0">12 V</tspan>
  </text>
</svg>

      {/* Positive Terminal Handle */}
      <Handle
        type={data.firsttype}
        position={Position.Top}
        id="positive"
        style={{ left: "108%", top: "49px", background: "red",width:"3px", height:"3px" }}
      />

      {/* Negative Terminal Handle */}
      <Handle
        type={data.secondtype}
        position={Position.Top}
        id="negative"
        style={{ left: "143%", top: "49px", background: "black" , width:"3px", height:"3px"}}
      />

     
    </div>
)
};

export default Batery;