import LandingNavbar from "../../components/custom/LandingNavbar";
import LandingEditor from "../../components/custom/LandingEditor";
import LandingFeature from "../../components/custom/LandingFeature";
import templateData from "../../properties/landingTemplatesData";
import CircuitTemplateCard from "./CircuitTemplateCard";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import Footer from "./LandingFooter";
const LandingPage = () => {
  return (
    <>
      <div>
        <LandingNavbar />
        <section
          id="hero"
          className="bg-gradient-to-br from-neutral-900 to-[#242424] min-h-screen flex items-center pt-20"
        >
          <div className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="animate__animated animate__fadeInLeft">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  <span className="text-[#6E56CF]">AI-Powered</span> Circuit
                  Builder
                </h1>
                <p className="text-neutral-300 text-lg md:text-xl mb-8">
                  Design, and analyze electrical circuits with the power of
                  artificial intelligence. Build complex systems with intuitive
                  controls.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/login"
                    className="px-8 py-3 bg-[#6E56CF] hover:bg-[#7d66dc] text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-[#6E56CF]/40 hover:scale-105"
                  >
                    Try Editor Now
                  </a>
                  <a
                    href="#features"
                    className="px-8 py-3 bg-transparent border-2 border-[#505050] text-white font-medium rounded-full hover:border-[#6E56CF] transition-all duration-300 hover:shadow-lg hover:shadow-[#6E56CF]/20"
                  >
                    Explore Features
                  </a>
                </div>
                <div className="mt-8 flex items-center text-neutral-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  <span>Secure cloud storage for all your designs</span>
                </div>
              </div>
              <LandingEditor />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
              <div className="bg-neutral-800 bg-opacity-40 backdrop-blur-sm p-4 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-[#6E56CF] mb-1">
                  All Basics
                </div>
                <div className="text-neutral-400">Components</div>
              </div>
              <div className="bg-neutral-800 bg-opacity-40 backdrop-blur-sm p-4 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-[#6E56CF] mb-1">
                  75%
                </div>
                <div className="text-neutral-400">Accuracy</div>
              </div>
              <div className="bg-neutral-800 bg-opacity-40 backdrop-blur-sm p-4 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-[#6E56CF] mb-1">5x</div>
                <div className="text-neutral-400">Faster Design</div>
              </div>
              <div className="bg-neutral-800 bg-opacity-40 backdrop-blur-sm p-4 rounded-xl border border-neutral-700">
                <div className="text-3xl font-bold text-[#6E56CF] mb-1">
                  24/7
                </div>
                <div className="text-neutral-400">Cloud Access</div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-neutral-800 py-24">
          <LandingFeature />
        </section>
        <section id="templates" className="bg-neutral-900 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Example {"  "}
                <span className="text-[#6E56CF]">Circuit Templates</span>
              </h2>

            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {templateData.map((card) => (
                <CircuitTemplateCard
                  key={card.title}
                  type={card.type}
                  title={card.title}
                  description={card.description}
                  components={card.components}
                  circuitImage={card.circuitImage!}
                  url={card.url}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-col overflow-hidden bg-neutral-900 ">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold  text-white dark:text-white mb-10 ">
                  Unleash the power of <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none ">
                    Intuitive{"  "}
                    <span className="text-[#6E56CF]">Circuit Editor</span>
                  </span>
                </h1>
              </>
            }
          >
            <img
              src="/editorimage.png"
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto  rounded-2xl object-cover h-full object-left-top"
            />
          </ContainerScroll>
        </div>
<Footer/>
      </div>
    </>
  );
};
export default LandingPage;
