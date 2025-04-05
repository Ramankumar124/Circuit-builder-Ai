import { CircuitState } from "@/interfaces/circuit";
import { userApi } from "./apiSlice";

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
