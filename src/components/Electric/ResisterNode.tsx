import { Handle, Position } from '@xyflow/react';


 interface resistorProps {
  data:{
  label:string,
  firstBand:string,
  secondBand:string,
  thirdBand:string,
  fourthBand:string,  
  fifthBand:string,
} }



const Resistor: React.FC<resistorProps>=( {data}) => {
const  {firstBand,secondBand,thirdBand,fourthBand,fifthBand}=data;

  return (

    <div style={{ position: "relative", width: 80, height: 80 }}  >

      <svg viewBox="0 0 792 792" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <style>
          {`
            .rs0 { fill: #CB9866; stroke: #000000; stroke-miterlimit: 10; }
            .rs1 { fill: ${firstBand}; stroke: #000000; stroke-miterlimit: 10; }
            .rs2 { fill: ${fifthBand}; stroke: #000000; stroke-miterlimit: 10; }
            .rs3 { fill: #FFFFFF; stroke: #000000; stroke-miterlimit: 10; }
            .rs4 { fill: ${thirdBand}; stroke: #000000; stroke-miterlimit: 10; }
            .rs5 { fill:${secondBand} ; stroke: #000000; stroke-miterlimit: 10; }
            .rs6 { fill: none; stroke: #000000; stroke-width: 2; stroke-miterlimit: 10; }
            .rs7 { fill: ${fourthBand}; stroke: #000000; stroke-miterlimit: 10; }
          `}
        </style>
        <path
          className="rs0"
          d="M352.6,338.72v113.94h-39.71c-9.12,6.03-19.75,10.1-31.26,11.61c-2.25,0.29-4.52,0.49-6.83,0.58
          c-0.08,0.01-0.17,0.01-0.26,0.01c-0.95,0.04-1.9,0.06-2.86,0.06c-39.89,0-72.23-30.72-72.23-68.61c0-0.21,0-0.41,0.01-0.62
          c0.21-23.41,12.77-44.02,31.8-56.24c0.38-0.24,0.76-0.49,1.14-0.72c11.31-6.98,24.79-11.02,39.28-11.02c1.44,0,2.86,0.04,4.28,0.12
          H276c1.9,0.11,3.77,0.28,5.63,0.53c10.71,1.4,20.66,5.03,29.34,10.38H352.6z"
        />
        <polygon className="rs0" points="472.8,338.72 472.8,452.66 409.96,452.66 409.96,339.37 394.2,339.37 394.2,452.66 368.35,452.66 368.35,338.72" />
        <path className="rs0" d="M604.69,395.69L604.69,395.69c0,23.35-12.29,43.97-31.04,56.36c-11.68,7.72-25.88,12.25-41.19,12.25c-14.9,0-28.76-4.28-40.26-11.63h-0.86V338.72h0.87c0.32-0.21,0.64-0.41,0.96-0.61c11.31-6.98,24.8-11.02,39.29-11.02c14.48,0,27.98,4.05,39.29,11.02C591.57,350.34,604.69,371.55,604.69,395.69z" />
        <path className="rs1" d="M265.88,328.36c0,0,10.68-1.1,15.75-0.16v136.22c0,0-10.57,1.13-15.75-0.16V328.36z" />
        <rect x="472.8" y="338.72" className="rs2" width="18.54" height="113.94" />
        <rect x="394.2" y="452.66" className="rs3" width="15.76" height="0.65" />
        <rect x="352.6" y="338.72" className="rs4" width="15.75" height="113.94" />
        <rect x="311" y="338.72" className="rs5" width="15.75" height="113.94" />
        <line className="rs6" x1="737.85" y1="395.69" x2="604.69" y2="395.69" />
        <rect x="394.2" y="339.7" className="rs7" width="15.76" height="113.29" />
        <line className="rs6" x1="199.47" y1="395.69" x2="81.17" y2="395.69" />
      </svg>

      <Handle type={data.firsttype} position={Position.Left} id="positive" style={{position:"absolute", left: "10px", top: "50%", background: "red", width: "3px", height: "3px"}} />
      <Handle type={data.secondtype} position={Position.Right} id="negative" style={{position:"absolute",right: "10px", top: "50%", background: "black", width: "3px", height: "3px"}}/>
    </div>
  );
};

export default Resistor;
