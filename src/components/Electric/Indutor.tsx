import { Handle, Position } from '@xyflow/react';

import React from 'react';

const Inductor: React.FC= ({data} ) => {
return(

  <div style={{ position: "relative", width: 80, height: 80 }}>

<svg width="200" height="200" viewBox="0 0 1584 1584" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`.In0 { fill: #6D6E71; stroke: #000; stroke-miterlimit: 10; }
          .In1 { fill: #8B5E3C; stroke: #000; stroke-miterlimit: 10; }
          .In2 { fill: #F19227; stroke: #000; stroke-miterlimit: 10; }
          .In3 { fill: #A7A9AC; stroke: #000; stroke-miterlimit: 10; }`}
      </style>
      <rect x="362.62" y="606.18" width="858.76" height="196" className="In0" />
      <rect x="425.84" y="538.18" width="50.34" height="346" className="In1" />
      <rect x="1108.84" y="538.18" width="50.34" height="346" className="In1" />
      
      <g className="In2">
        <rect x="478.9" y="802.18" width="42" height="196" />
        <rect x="1067" y="802.18" width="42" height="196" />
        <rect x="478.99" y="606.18" width="637" height="196" />
        <rect x="478.99" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="521.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="521.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="563.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="606.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="648.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="691.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="733.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="776.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="818.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="861.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="903.45" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="946.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="989.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="1031.97" y="606.18" className="In2" width="42.467" height="196"/>
        <rect x="1074.97" y="606.18" className="In2" width="42.467" height="196"/>
      </g>
      
      <rect x="484.32" y="998.16" width="31.14" height="47.66" className="In3" rx="13.22" ry="13.22" />
      <rect x="1072.42" y="998.16" width="31.14" height="47.66" className="In3" rx="13.22" ry="13.22" />
    </svg>

      {/* Positive Terminal Handle */}
      <Handle
        type={data.firsttype}
        position={Position.Top}
        id="positive"
        style={{ left: "79.4%", top: "130px", background: "red",width:"3px", height:"3px" }}
      />

      {/* Negative Terminal Handle */}
      <Handle
        type={data.secondtype}
        position={Position.Top}
        id="negative"
        style={{ left: "171%", top: "130px", background: "black" , width:"3px", height:"3px"}}
      />

     
    </div>
)
};

export default Inductor;
