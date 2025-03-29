import React from 'react';
import { Handle, Position } from '@xyflow/react';


const Capacitor: React.FC = ({data}) => {
  return (
    <>
    <svg width="100" height="100" viewBox="0 0 792 792">
      <style>
        {`
          .cp0 { fill: #C69C8A; stroke: #000; stroke-miterlimit: 10; }
          .cp1 { fill: none; stroke: #000; stroke-miterlimit: 10; }
          .cp2 { font-family: 'MyriadPro-Regular'; }
          .cp3 { font-size: 19.8916px; }
        `}
      </style>
      <path
        className="cp0"
        d="M440.5 450h-120c-9.66 0-17.5-7.84-17.5-17.5v-218c0-9.66 7.84-17.5 17.5-17.5h120c9.66 0 17.5 7.84 17.5 17.5v218C458 442.16 450.16 450 440.5 450z"
      />
      <path
        className="cp0"
        d="M445 493H316c-7.18 0-13-5.82-13-13v-17c0-7.18 5.82-13 13-13h129c7.18 0 13 5.82 13 13v17c0 7.18-5.82 13-13 13z"
      />
      <line className="cp1 w-2" x1="336" y1="493" x2="336" y2="597" />
      <line className="cp1" x1="426" y1="493" x2="426" y2="657" />
      <text
        transform="matrix(2.832769e-16 1.57 -1 4.447324e-16 419.3945 202.1211)"
        className="cp3"
      >
      this is a capacitor
      </text>
    </svg>
  <Handle  type={data.firsttype} position={Position.Right} id='positive' style={{left:"48%" , top:"82%",  background:"red"}} />
  <Handle  type={data.secondtype} position={Position.Left} id='negative' style={{left:"41.5%" , top:"75%",  background:"black"}} />
    </>
  );
};

export default Capacitor;
