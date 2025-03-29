import { Handle, Position } from '@xyflow/react';

import React from 'react';


const Buzzer: React.FC = ({data}) => {
  return (<>
  <svg width="200" height="200" viewBox="100 100 800 800">
      <style>
        {`
          .a { fill: #48484A; stroke: #000; stroke-miterlimit: 10; }
          .b { fill: #67686B; stroke: #000; stroke-miterlimit: 10; }
          .c { fill: none; stroke: #000; stroke-miterlimit: 10; }
        `}
      </style>
      <ellipse className="a" cx="386" cy="297.5" rx="121" ry="54.5" />
      <path
        className="a"
        d="M507 297.5v115c0 30.1-54.17 54.5-121 54.5s-121-24.4-121-54.5v-115c0 30.1 54.17 54.5 121 54.5S507 327.6 507 297.5z"
      />
      <ellipse className="b" cx="386" cy="297.5" rx="22" ry="10.5" />
      <line className="c" x1="459" y1="455.77" x2="459" y2="598" />
      <line className="c" x1="318" y1="455.77" x2="318" y2="547" />
    </svg>
  <Handle  type={data.firsttype} position={Position.Right} id='positive' style={{left:"42%" , top:"62%",  background:"red"}} />
  <Handle  type={data.secondtype} position={Position.Left} id='negative' style={{left:"27%" , top:"55%",  background:"black"}} />
  </>

  );
};

export default Buzzer;


