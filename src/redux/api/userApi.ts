import { userApi } from "./apiSlice";

export const authApi = userApi.injectEndpoints({
    endpoints: (builder) => ({
        logoutUser: builder.mutation({
            query: (_arg) => ({
                url: "/auth/logout",
                method: "Post",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});


export const  {useLogoutUserMutation} =authApi;