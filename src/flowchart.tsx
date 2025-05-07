import React, {useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCircuitContext } from "./context/circuitContext";
import { nodeTypes } from "./properties/nodeTypes";
import { RootState } from "./redux/Store";
import { useSelector } from "react-redux";

const FlowChart: React.FC = () => {
  
 const  {flowRef}=useCircuitContext()
  const node = useSelector((state:RootState) => state?.circuit?.node);
  const edge = useSelector((state:RootState) => state?.circuit?.edge);

  const allData = useSelector((state:RootState) => state?.circuit);
  
  useEffect(() => {
console.log("All data",JSON.stringify(allData));

  }, [allData])
  

//@ts-ignore
  const [nodes, , onNodesChange] = useNodesState(node );
  //@ts-ignore
  const [edges, setEdges, onEdgesChange] = useEdgesState(edge );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  return (
    <div ref={flowRef} className="w-full h-full relative rounded-4xl left-0 bg-white">
      <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap  />
        {/* <CustomControls/> */}
        <Controls />
        <Background color="#2b2a2a" variant={BackgroundVariant.Dots} />

      </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowChart;
