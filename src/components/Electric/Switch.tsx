import { Handle, Position } from '@xyflow/react';

import React from 'react';

const Switch: React.FC= ({data}) => {
return(

  <div style={{ position: "relative", width: 80, height: 80 }}>


<svg width="200" height="200" viewBox="0 0 8920 7920">
  <style>
    {`
      .Sw0 { fill: #D1D3D4; stroke: #000; stroke-width: 2.5; stroke-miterlimit: 10; }
      .Sw1 { fill: #414042; stroke: #000; stroke-width: 2.5; stroke-miterlimit: 10; }
      .Sw2 { fill: #58595B; stroke: #000; stroke-width: 2.5; stroke-miterlimit: 10; }
      .Sw3 { fill: #B11116; stroke: #000; stroke-width: 2.5; stroke-miterlimit: 10; }
    `}
  </style>

  <g>
    <rect x="3442.4" y="3805.3" className="Sw0" width="101.1" height="806.8" />
    <rect x="4408.3" y="3805.3" className="Sw0" width="101.1" height="806.8" />
  </g>

  <rect x="3110" y="2940" className="Sw1" width="1875" height="1365.3" />
  <rect x="2920.9" y="2940" className="Sw2" width="2255.1" height="520" />
  <path
    className="Sw3"
    d="M4520.4,2940h-1343c3-116.8-2.7-233.7-0.3-350.5c0.1-4.9,5.7-7.6,9.6-4.7c105.6,80,339.6,228,663.8,273.7
        c300,42.3,540.2-23.4,661.9-66.2c3.9-1.4,7.9,1.5,7.9,5.7V2940z"
  />
</svg>
      {/* Positive Terminal Handle */}
      <Handle
        type={data.firsttype}
        position={Position.Left}
        id="positive"
        style={{ left: "98%", top: "115px", background: "red",width:"3px", height:"3px" }}
      />

      {/* Negative Terminal Handle */}
      <Handle
        type={data.secondtype}
        position={Position.Right}
        id="negative"
        style={{ left: "125%", top: "115px", background: "black" , width:"3px", height:"3px"}}
      />

     
    </div>
)
};

export default Switch;
