import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface TransistorNodeProps {
  first:{
    type:"source" | "target",
    pintype:"collector" | "base" | "emitter";
  } 
  second: {
    type:"source" | "target",
    pintype:"collector" | "base" | "emitter";
  } 
  third: {
    type:"source" | "target",
    pintype:"collector" | "base" | "emitter";
  } 
}



const TransistorNode: React.FC<NodeProps<TransistorNodeProps>> = ({ data }) => {
  console.log(data);
  
  return (
    <div className="relative ">
      {/* Transistor SVG */}
      {/* <div className="text-3xl text-bold">{data.first +data.second +data.third}</div> */}
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="64pt" height="50pt" viewBox="0 0 640 1280"
    preserveAspectRatio="xMidYMid meet">
  <g transform="translate(0,1280) scale(0.08,-0.08)"
     fill="" stroke="none">
    <path d="M1415 12785 c-272 -60 -487 -270 -568 -552 l-22 -78 -3 -1941 -2
    -1941 105 -91 c308 -266 648 -502 924 -641 l81 -41 2 -3267 3 -3266 132 205
    133 205 0 3002 c0 1650 1 3001 3 3001 2 0 41 -14 86 -30 173 -63 452 -125 654
    -146 l67 -6 -2 -3594 c-2 -1977 0 -3594 3 -3594 3 0 11 11 17 24 5 13 62 115
    126 226 l116 203 0 3364 c0 3010 2 3363 15 3363 9 0 82 7 163 15 184 20 359
    54 530 105 73 22 135 40 137 40 3 0 6 -1435 7 -3190 l3 -3190 133 205 132 205
    0 3043 0 3043 88 43 c312 153 658 388 976 661 l111 95 7 175 c5 96 7 976 5
    1955 -2 1685 -3 1783 -21 1840 -45 148 -116 265 -223 365 -84 79 -171 131
    -278 168 l-80 27 -1750 2 c-1425 1 -1761 -1 -1810 -12z"/>
  </g>
</svg>

      {/* Handles for Collector, Base, and Emitter */}  
      <Handle
        type={data.first.type}
        position={Position.Left}
        id={data.first.pintype}
        style={{ left: "40%",top: "90%" }}
       
      />
      <Handle
        type={data.second.type}
        position={Position.Bottom}
        id={data.second.pintype}
        style={{ top: "90%",left:"47%"}}
      />
      <Handle
        type={data.third.type}
        position={Position.Right}
        id={data.third.pintype}
        style={{ top: "90%",right:"47%"}}
       
      />
    </div>
  );
};

export default TransistorNode;
