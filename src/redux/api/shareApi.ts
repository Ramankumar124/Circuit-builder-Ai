import { userApi } from "./apiSlice";

export const shareApi = userApi.injectEndpoints({
  endpoints: (builder) => ({

    createShareLink: builder.query({
      query: (projectId: string) => {
        return {
          url: `/share/create-share`,
          params: { projectId },
        };
      },
    }),
      getShareData: builder.query({
        query: (shareId: string) => {
         return {
            url:`/share/${shareId}`
         }
        },
      
    }),
  }),
});

export const { useLazyCreateShareLinkQuery ,useGetShareDataQuery} = shareApi;
