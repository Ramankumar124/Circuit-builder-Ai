
import { useReactFlow } from '@xyflow/react';

const CustomControls = () => {
  const { zoomIn, zoomOut, fitView ,getZoom} = useReactFlow();

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 10 }}>
      <button
        onClick={() => zoomIn({ duration: 300 })}
        style={{
          padding: '5px 10px',
          margin: '5px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
      {/* {getZoom} */}
      </button>
      <button
        onClick={() => zoomOut({ duration: 300 })}
        style={{
          padding: '5px 10px',
          margin: '5px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Zoom Out
      </button>
      <button
        onClick={() => fitView({ duration: 300, padding: 0.5 })}
        style={{
          padding: '5px 10px',
          margin: '5px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Fit View
      </button>
    </div>
  );
};

export default CustomControls;