export type NodeType = {
    type: string;
    data: {
      label: string;
    };
  };
export interface CircuitData {
    node?: NodeType[] | null;
    prompt?: string;
    explanation?: string;
    circuitName?: string;
  }

export interface Node {
  id: string;
  type: string;
  data: Record<string, any>;
  position: { x: number; y: number };
}

export interface Edge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  type: string;
  label?: string;
}
export interface CircuitState {
  prompt: string | null;
  node: Node | null;
  edge: Edge | null;
  circuitName: string | null;
  explanation: string | null;
  suggestions: string[] | null;
}