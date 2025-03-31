
import { userApi } from "./apiSlice";

export const CircuitApi=userApi.injectEndpoints({
    endpoints:(builder)=>({
         CreateCircuit:builder.mutation({
              query:(prompt:string)=>({
                url:"/circuit/create-circuit",
                method:"Post",
                data:{prompt}
              }),
         
            }),
          ehancePrompt:builder.mutation({
            query:(prompt:string)=>({
                url:"/circuit/enhance-prompt",
                method:"Post",
                data:{prompt}
              
              }),
      
          })  
    })

})

export const {useCreateCircuitMutation,useEhancePromptMutation} =CircuitApi;
