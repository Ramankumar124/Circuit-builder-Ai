
import Avatar from '@mui/material/Avatar';
import { LiaHamburgerSolid } from 'react-icons/lia';
import { useEffect } from 'react';
import { RootState } from '../../redux/Store';
import { useSelector } from 'react-redux';

function SavedProject() {
  const id = useSelector((state:RootState) => state?.auth?.user?._id)
  // const getAllProjects = async() => {
  //   try {
  //     const response = await getAllProject(id);
  //     console.log("response", response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  // useEffect(() => {

  // }, [])
  // function getAllProject(){
    

  return (
    <div className="w-full h-screen bg-[#282626]">
         <nav id="header" className=" w-full z-50 bg-[#191919]">
             <div className="container mx-auto px-4 py-3 flex justify-between items-center ">
               <div className="flex items-center text-5xl text-[#899598] -ml-10">
               {/* <LiaHamburgerSolid /> */}
               {/* <RxHamburgerMenu /> */}
               <a className='text-white text-bold' href="/home">Home</a>
               </div>

               <h1 className='text-white text-3xl font-bold'>My Projects</h1>
               <div></div>
             </div>
           </nav>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate__animated animate__fadeInUp"
    //  style="animation-delay: 0.1s;"
     >
        {/* <!-- Tool Card 1 --> */}
        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
          <div className="p-6">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Waveform Analyzer</h3>
            <p className="text-neutral-400 mb-4">Visualize and analyze signal waveforms in your circuit with powerful tools for frequency analysis, noise measurement, and signal integrity verification.</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Signal</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Analysis</span>
              </div>
              <button className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium">
                Open Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
        </div>

        {/* <!-- Tool Card 2 --> */}
        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
          <div className="p-6">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Component Optimizer</h3>
            <p className="text-neutral-400 mb-4">AI-powered tool that suggests optimal component values and replacements to improve performance, reduce cost, and increase reliability.</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">AI</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Optimization</span>
              </div>
              <button className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium">
                Open Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
        </div>

        {/* <!-- Tool Card 3 --> */}
        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
          <div className="p-6">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Schematic Auto-Router</h3>
            <p className="text-neutral-400 mb-4">Automatically routes connections between components with intelligent path finding algorithms that minimize crossings and optimize signal flow.</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Routing</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Auto</span>
              </div>
              <button className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium">
                Open Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
        </div>

        {/* <!-- Tool Card 4 --> */}
        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
          <div className="p-6">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">BOM Generator</h3>
            <p className="text-neutral-400 mb-4">Automatically generates detailed bill of materials with real-time pricing from multiple suppliers, stock availability, and alternative component suggestions.</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">BOM</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Cost</span>
              </div>
              <button className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium">
                Open Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
        </div>

        {/* <!-- Tool Card 5 --> */}
        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
          <div className="p-6">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3D Visualizer</h3>
            <p className="text-neutral-400 mb-4">Preview your circuit board design in 3D with realistic component models, helping you identify spacing issues and visualize the final product.</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">3D</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Visualization</span>
              </div>
              <button className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium">
                Open Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
        </div>


        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
          <div className="p-6">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Security Analyzer</h3>
            <p className="text-neutral-400 mb-4">Analyzes your circuit for potential security vulnerabilities, providing recommendations to protect against physical and electronic attacks.</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Security</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400">Protection</span>
              </div>
              <button className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium">
                Open Tool
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
        </div>
      </div>
    </div>
  )
}

export default SavedProject
