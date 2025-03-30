import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "./baseQuery"
import { AxiosResponse } from "axios";

export const userApi=createApi({
 reducerPath:"userApi",
 baseQuery:axiosBaseQuery(),
 tagTypes:["User"],

 endpoints:(builder)=>({
    CreateCircuit:builder.mutation({
        query:(prompt:string)=>({
          url:"/circuit/create-circuit",
          method:"Post",
          data:prompt
        }),
        transformResponse:(response:AxiosResponse)=>response.data

 }),
 ehancePrompt:builder.mutation({
    query:(prompt:string)=>({
        url:"/circuit/enhance-prompt",
        method:"Post",
        data:prompt
      }),
      transformResponse:(response:AxiosResponse)=>response.data
  })  
})
});

export const {useCreateCircuitMutation,useEhancePromptMutation} =userApi

