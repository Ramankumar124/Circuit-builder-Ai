import { useState, useEffect, useRef, useMemo } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { FaMicrophone } from "react-icons/fa";
import { setCircuit } from "../../redux/features/circuitSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { speachSearch } from "@/utils/speachSearch";
import {
  useCreateCircuitMutation,
  useEhancePromptMutation,
} from "@/redux/api/circuitApi";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { loadingStates } from "@/constants/config";
import { Zap } from "lucide-react";
import { UserMenu } from "@/components/custom/user-menu";
import { SparklesCore } from "@/components/ui/sparkles";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function PromptPage() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any | null>(null);
  const [prompt, setPrompt] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createCircuit, { isLoading }] = useCreateCircuitMutation();
  const [enhancePrompt] = useEhancePromptMutation();
  const sparklesRef = useRef(null);

  // Use useMemo to prevent the SparklesCore from re-rendering
  const sparklesComponent = useMemo(
    () => (
      <SparklesCore
        id="sparkles-core"
        key="sparkles-core"
        background="transparent"
        minSize={0.4}
        maxSize={1.4}
        particleDensity={1800}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    ),
    []
  );

  useEffect(() => {
    speachSearch(setIsListening, setPrompt, setRecognition);
  }, []);

  const toggleListening = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const addToPrompt = (event: any) => {
    setPrompt(event.currentTarget.textContent);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPrompt(newValue);

    // Only update height when needed
    requestAnimationFrame(() => {
      // Reset height to auto to accurately measure the scroll height
      setTextAreaHeight("auto");

      // Set new height based on content, with a max height
      if (e.target.scrollHeight < 200) {
        setTextAreaHeight(`${e.target.scrollHeight}px`);
      } else {
        setTextAreaHeight("200px"); // Max height
      }
    });
  };

  const handleApi = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty!");
      return;
    }
    try {
      const response = await createCircuit(prompt).unwrap();
      const rawData = response?.data;
      if (typeof rawData !== "string") {
        console.error("API returned unexpected format:", rawData);
        toast.error("Invalid API response format");
        return;
      }
      // **Fix Regex to Remove Markdown Artifacts**
      const cleanedResponse = rawData.replace(/```json|```/g, "").trim();
      // **Parse the cleaned JSON string**
      const parsedData = JSON.parse(cleanedResponse);
     
      
      if (parsedData) {
        dispatch(
          setCircuit({
            prompt: prompt,
            node: parsedData?.nodes || null,
            edge: parsedData?.edges || null,
            explanation: parsedData.explanation || null,
            suggestions: parsedData.suggestions || null,
            circuitName: parsedData.circuit_name || "", // Extract circuit name
          })
        );
        navigate("/dashboard");
      } else {
        toast.error("Failed to parse circuit data");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Unable to genrate circuit t"
      );
    }
  };

  const handleEnhancePrompt = async () => {
    setPrompt("Your Prompt Is Enhancing.... ");
    try {
      const response = await enhancePrompt(prompt).unwrap();
      if (response) {
        setPrompt(response.data);
      }
    } catch (error: any) {
      setPrompt("");
      toast.error(
        error?.data?.message || error?.message || "Unable to ehance prompt"
      );
    }
  };

  return (
    <div>
      <Toaster />
      {isLoading && (
        <div className="relative w-full h-[60vh] flex items-center justify-center ">
          <Loader
            loadingStates={loadingStates}
            loading={true}
            duration={2000}
          />
        </div>
      )}
      <nav id="header" className="fixed w-full z-50 bg-black">
        <div className="flex w-full px-2 sm:px-4 py-1 sm:py-2 items-center text-bold text-lg sm:text-xl text-[#899598] justify-end">
          <UserMenu />
        </div>
      </nav>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* Logo - smaller only on mobile, original size on desktop */}
        <div className="flex items-center mb-2 z-10 mt-12 sm:mt-16">
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold flex items-center">
            <Zap className="mr-1 h-5 w-5 md:h-16 md:w-16 sm:mr-2 sm:h-8 sm:w-10 text-yellow-300" />
            <span className="text-[#6E56CF]">Circuit</span>
            <span className="text-white">Builder</span>
            <span className="text-[#6E56CF]">AI</span>
          </h1>
        </div>

        {/* Sparkles effect - smaller on mobile, original size on desktop */}
        <div className="hidden md:block">
        <div className=" relative w-full flex flex-col items-center justify-center overflow-hidden mb-2 sm:mb-5">
          <div
            ref={sparklesRef}
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[60rem] h-10 sm:h-28 relative"
          >
            {/* Static gradient elements - adjusted for mobile only */}
            <div className="absolute inset-x-[10%] sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[1px] sm:h-[2px] w-[80%] sm:w-4/5 blur-sm" />
            <div className="absolute inset-x-[10%] sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[80%] sm:w-4/5" />
            <div className="hidden sm:block absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-2/5 blur-sm" />
            <div className="hidden sm:block absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/5" />

            {/* Memoized sparkles component */}
            {sparklesComponent}

            {/* Radial Gradient - smaller on mobile, original on desktop */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(250px_100px_at_top,transparent_20%,white)] sm:[mask-image:radial-gradient(500px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        </div>
        {/* Suggestion buttons - smaller on mobile, original on desktop */}
        <div className="flex  flex-col gap-1.5 sm:gap-2 p-1 sm:p-2 justify-center items-center z-10 w-full max-w-4xl">
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 ">
            <div
              onClick={addToPrompt}
              className="bg-[#111111] border border-[#333333] text-white px-1.5 py-1 sm:p-2 rounded-md sm:rounded-lg text-[9px] md:text-sm cursor-pointer hover:bg-[#222222] hover:border-indigo-500 transition-all duration-300 text-center"
            >
              Create a circuit with 10 LEDs and a battery
            </div>
            <div
              onClick={addToPrompt}
             className="bg-[#111111] border border-[#333333] text-white px-1.5 py-1 sm:p-2 rounded-md sm:rounded-lg text-[9px] md:text-sm cursor-pointer hover:bg-[#222222] hover:border-indigo-500 transition-all duration-300 text-center"
            >
              create a circuit in which a buzzer is connected with battery
            </div>
            <div
              onClick={addToPrompt}
               className="bg-[#111111] border border-[#333333] text-white px-1.5 py-1 sm:p-2 rounded-md sm:rounded-lg text-[9px] md:text-sm cursor-pointer hover:bg-[#222222] hover:border-indigo-500 transition-all duration-300 text-center"
            >
              Create a Circuit in which Led is blinking in Every Second
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mt-1.5 sm:mt-3">
            <div
              onClick={addToPrompt}
  className="bg-[#111111] border border-[#333333] text-white px-1.5 py-1 sm:p-2 rounded-md sm:rounded-lg text-[9px] md:text-sm cursor-pointer hover:bg-[#222222] hover:border-indigo-500 transition-all duration-300 text-center"
            >
              create a LEd matrix using 9 leds
            </div>
            <div
              onClick={addToPrompt}
          className="bg-[#111111] border border-[#333333] text-white px-1.5 py-1 sm:p-2 rounded-md sm:rounded-lg text-[9px] md:text-sm cursor-pointer hover:bg-[#222222] hover:border-indigo-500 transition-all duration-300 text-center"
            >
              Buzzer beeping after every 1 second
            </div>
          </div>
        </div>

        {/* Input Box - smaller on mobile, original on desktop */}
        <div className="flex justify-center text-center w-full max-w-4xl mt-3 sm:mt-6 z-10">
          <HoverBorderGradient
            containerClassName="w-full rounded-xl sm:rounded-2xl"
            className="p-0 w-full"
          >
            <div className="p-2 sm:p-4 w-full bg-[#121212] rounded-xl sm:rounded-2xl">
              <div className="flex items-start relative">
                {/* Enhance/Magic Wand Button */}
                <button
                  onClick={handleEnhancePrompt}
                  className="mr-2 sm:mr-3 text-indigo-400 hover:text-indigo-300 p-1 sm:p-1.5 mt-1 sm:mt-1.5"
                  title="Enhance Prompt"
                >
                  <FaWandMagicSparkles className="text-base sm:text-lg" />
                </button>

                {/* Auto-resizing textarea */}
                <textarea
                  value={prompt}
                  onChange={handleTextAreaChange}
                  placeholder="Enter your circuit prompt..."
                  className="w-full py-1 sm:py-2 bg-transparent text-white border-none focus:outline-none text-sm sm:text-base resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent"
                  style={{
                    height: textAreaHeight,
                    maxHeight: "120px",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#333333 transparent",
                  }}
                ></textarea>

                {/* Action buttons container */}
                <div className="flex  items-center gap-1 sm:gap-2 ml-1 sm:ml-2 shrink-0 mt-1 sm:mt-1.5">
                  {/* Microphone Button */}
                  <button
                    onClick={toggleListening}
                    className={`p-1.5 sm:p-2 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-300 ${
                      isListening ? "bg-red-500" : "bg-transparent border"
                    }`}
                    title={isListening ? "Stop Listening" : "Start Listening"}
                  >
                    <FaMicrophone className="text-white text-[10px] sm:text-xs" />
                  </button>

                  {/* Generate Button */}
                    {/* Generate Button */}
                    <button
                      className="bg-[#9071ef] hover:bg-[#7c5bd6] text-white px-3 sm:px-5 py-1 sm:py-1.5 rounded-lg text-[10px] md:text-sm font-medium transition-colors duration-300 whitespace-nowrap flex items-center justify-center"
                      onClick={() => handleApi()}
                      disabled={isLoading}
                    >
                      <span className="hidden sm:inline">Generate</span>
                      <span className="sm:hidden">
                      <Zap className="h-5 w-5 " />
                      </span>
                      <Zap className=" ml-1 sm:ml-2 hidden sm:inline" />
                    </button>
                </div>
              </div>
            </div>
          </HoverBorderGradient>
        </div>
      </div>

     

    </div>
  );
}
