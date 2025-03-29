
const LandingEditor = () => {
  return (
    <div>            <div className="relative animate__animated animate__fadeInRight">
    <div className="bg-neutral-800 p-5 rounded-xl shadow-2xl border border-neutral-700 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6E56CF] to-blue-500"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-neutral-400">
          CircuitBuilder.ai
        </div>
      </div>
      <div className="bg-neutral-900 rounded-lg p-4 h-[300px] md:h-[400px] overflow-hidden relative">
        <div className="grid grid-cols-12 gap-2 h-full">
          <div className="col-span-2 bg-neutral-800 rounded-lg p-2">
            <div className="space-y-3">
              <div className="h-8 w-8 rounded-lg bg-[#505050] mx-auto"></div>
              <div className="h-8 w-8 rounded-lg bg-[#505050] mx-auto"></div>
              <div className="h-8 w-8 rounded-lg bg-[#505050] mx-auto"></div>
              <div className="h-8 w-8 rounded-lg bg-[#505050] mx-auto"></div>
              <div className="h-8 w-8 rounded-lg bg-[#6E56CF] mx-auto"></div>
            </div>
          </div>
          <div className="col-span-8 bg-[#242424] rounded-lg p-3 border border-neutral-800 relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#6E56CF_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            <div className="relative h-full">
              <div className="absolute top-[30%] left-[20%] w-20 h-8 bg-neutral-700 rounded flex items-center justify-center transform rotate-45">
                <div className="text-xs text-white">Resistor</div>
              </div>
              <div className="absolute top-[60%] left-[40%] w-16 h-6 flex items-center">
                <div className="w-5 h-full bg-neutral-700 rounded-l"></div>
                <div className="w-1 h-full bg-[#6E56CF]"></div>
                <div className="w-5 h-full bg-neutral-700 rounded-r"></div>
              </div>
              <div className="absolute top-[34%] left-[38%] w-10 h-1 bg-[#6E56CF]"></div>
              <div className="absolute top-[50%] left-[40%] w-1 h-16 bg-[#6E56CF]"></div>
              <div className="absolute top-[15%] right-[20%] w-24 h-16 bg-neutral-800 rounded-md flex flex-col justify-center items-center p-1">
                <div className="w-full h-2 bg-neutral-700 mb-1 rounded-sm"></div>
                <div className="w-full h-2 bg-neutral-700 mb-1 rounded-sm"></div>
                <div className="w-full h-2 bg-neutral-700 rounded-sm"></div>
                <div className="absolute top-0 left-2 w-2 h-2 rounded-full bg-[#6E56CF]"></div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-neutral-800 rounded-lg p-2">
            <div className="space-y-3">
              <div className="h-12 w-full rounded-lg bg-[#505050] flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-[#6E56CF]"></div>
              </div>
              <div className="h-36 w-full rounded-lg bg-[#505050] p-2">
                <div className="h-3 w-full bg-neutral-700 rounded-full mb-2"></div>
                <div className="h-3 w-4/5 bg-neutral-700 rounded-full mb-2"></div>
                <div className="h-3 w-2/3 bg-neutral-700 rounded-full mb-2"></div>
                <div className="h-3 w-3/4 bg-neutral-700 rounded-full"></div>
              </div>
              <div className="h-12 w-full rounded-lg bg-[#505050]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-[#6E56CF] to-purple-900 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
    <div className="absolute -top-4 -left-4 w-40 h-40 bg-gradient-to-br from-blue-600 to-[#6E56CF] rounded-full filter blur-3xl opacity-15 animate-pulse"></div>
  </div></div>
  )
}

export default LandingEditor