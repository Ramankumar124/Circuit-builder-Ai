interface cardProps{
  type:string
  title:string,
    description:string,
    components:Array<string>
}
const CircuitTemplateCard = ({type,title,description,components}:cardProps)=> {
  return (
    <div>
        <div className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__animated animate__fadeInUp">
                <div className="relative">
                  <div className="h-48 bg-neutral-700 overflow-hidden">
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-[#6E56CF] text-white text-xs px-2 py-1 rounded-full">
                      {type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#6E56CF] transition-colors">
             
                    {title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-3">
                    {description}
                  
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                 { components.map((comp:string) => (
                   <span key={comp} className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-400">
                   {comp}
               
                 </span>
                 ))   }
                    </div>
                    <button className="text-[#6E56CF] hover:text-white transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default CircuitTemplateCard