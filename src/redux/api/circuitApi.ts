
import { AxiosResponse } from "axios";
import { userApi } from "./apiSlice";

export const CircuitApi=userApi.injectEndpoints({
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

})

export const {useCreateCircuitMutation,useEhancePromptMutation} =CircuitApi;
