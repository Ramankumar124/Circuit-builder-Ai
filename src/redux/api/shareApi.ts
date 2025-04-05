import { userApi } from "./apiSlice";

export const shareApi=userApi.injectEndpoints({
    endpoints:(builder)=>({
        createShareLink:builder.mutation({
            query:(projectId:string)=>({
                url:"/share/create-share",
                method:"POST",
                data:projectId
            })

        })
    })
})