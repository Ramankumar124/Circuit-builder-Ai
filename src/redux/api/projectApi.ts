import { userApi } from "./apiSlice";

interface Node {
  id: string;
  type: string;
  data: Record<string, any>;
  position: { x: number; y: number };
}

interface Edge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  type: string;
  label?: string;
}
interface CircuitState {
  prompt: string | null;
  node: Node | null;
  edge: Edge | null;
  circuitName: string | null;
  explanation: string | null;
  suggestions: string[] | null;
}
export const projectApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    SavedProject: builder.mutation({
      query: (data: {
        projectName: string;
        prompt: string | null;
        circuit: CircuitState;
      }) => ({
        url: "/project/create-project",
        method: "Post",
        data,
      }),
    }),
    getAllProjects:builder.query({
      query:(id:string)=>({
        url:"project/get-All-project",
        params:id,
      }),
      
    })
  }),
});

export const { useSavedProjectMutation ,useGetAllProjectsQuery} = projectApi;
