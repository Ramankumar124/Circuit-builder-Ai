import { Handle, Position } from "@xyflow/react";

interface LEDNodeProps {
  data: {
    value: string;
    color: string;
    label: string;
    identifier: string;
    first: {
      type: "source" | "target";
      pintype: "positive" | "negative";
    };
    second: {
      type: "source" | "target";
      pintype: "positive" | "negative";
    };
  };
}
const LEDNode: React.FC<LEDNodeProps> = ({ data }) => {
  let color: string = data.color || "red";

  // if(color=="undefined") color="red"
  return (
    <div>
      {/* <div className='text-xs'>{data.value}</div> */}
      <div className="relative text-3xl ">
        <svg
          width="50"
          height="50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 792 792"
        >
          <style>
            {`.${data.identifier}0{opacity:0.79;fill:${color};stroke:#000000;strokeWidth:6;stroke-miterlimit:10;}
            .${data.identifier}1{fill:none;stroke:#000000;strokeWidth:6;stroke-miterlimit:10;}
            .${data.identifier}2{fill:none;stroke:#000000;strokeWidth:10;stroke-miterlimit:10;}`}
          </style>

          {/* LED Body */}
          <g>
            <path
              className={`${data.identifier}0`}
              d="M472.72,251.33v120.03H318.51V251.33C335.87,196.61,456.38,195.15,472.72,251.33z"
            />
            <path
              className={`${data.identifier}1`}
              d="M472.72,251.33v120.03H318.51V251.33C335.87,196.61,456.38,195.15,472.72,251.33z"
            />
            <path className={`${data.identifier}1`} d="M349.15,539.36" />
            <line
              className={`${data.identifier}2`}
              x1="349.15"
              y1="522"
              x2="349.15"
              y2="412.51"
            />{" "}
            {/* line 1 */}
            <line
              className={`${data.identifier}1`}
              x1="349.15"
              y1="371.36"
              x2="349.15"
              y2="291.19"
            />
            <line
              className={`${data.identifier}1`}
              x1="442.04"
              y1="373.91"
              x2="442.04"
              y2="292.73"
            />
            <line
              className={`${data.identifier}2`}
              x1="442.09"
              y1="410.17"
              x2="442.09"
              y2="582.26"
            />{" "}
            {/* line 2 */}
            <path
              className={`${data.identifier}1`}
              d="M349.2,292.59c-0.92,50.41,93.86-45.18,92.83,0.13"
            />
            <rect
              x="285.32"
              y="371.36"
              className={`${data.identifier}1`}
              width="222.12"
              height="41.15"
            />
            <rect
              x="284.56"
              y="371.87"
              className={`${data.identifier}0`}
              width="222.12"
              height="41.15"
            />
          </g>
        </svg>

        {/* Positive Terminal (Top Wire) */}

        <Handle
          type={data?.first?.type}
          position={Position.Bottom}
          id={data?.first?.pintype}
          style={{
            left: "57%",
            bottom: "30%",
            backgroundColor: "red",
            width: "3px",
            height: "3px",
          }} // Adjust to match line 2
        />
        {/* Negative Terminal (Bottom Wire) */}
        <Handle
          type={data?.second?.type}
          position={Position.Bottom}
          id={data?.second?.pintype}
          style={{
            left: "44%",
            bottom: "35%",
            backgroundColor: "black",
            width: "3px",
            height: "3px",
          }} // Adjust to match line 1
        />
      </div>
    </div>
  );
};

export default LEDNode;
