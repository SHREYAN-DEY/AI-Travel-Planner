import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Cpu,
  Fingerprint, 
  Globe, 
  Play, 
  ShieldCheck, 
  Zap,
  Lock,
  Layers,
  ActivityIcon,
  Activity,
  Star,
  CloudSun,
  Radar,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 }, 
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function Home() {
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <section className="relative pt-44 pb-32 px-6 border border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
             >
              <h1 className="text-7xl md:text-[110px] font-black tracking-tighter leading-[0.85] text-white uppercase italic mb-10 ">
                Future of <br/>{" "}
                <span className="text-blue-600 not-italic">Exploration</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-xl mb-12 font-medium">
                  The world's first autonomous travel architect.We don't just
                  book trips; we synthesize experiences using real-time
                  global intelligence.
                </p>
                <div className="flex flex-wrap gap-6">
                  <a
                    href="#"
                    className="px-12 py-6 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.2)] flex items-center gap-3"
                  >
                    Initialize Mission <ArrowRight size={18} />
                    </a>
                    <button className="px-12 py-6 border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all flex items-center gap-3">
                    <Play size={16} />
                    System Demo
                  </button>
                </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[40px] overflow-hidden border-white/10 bg-[#0a0a0b] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021" 
            alt=" " 
            className="w-full h-[600px] object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
            />
            <div className="absolute bottom-8 left-8 right-8 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest">
                Operation Sector
              </span>
            </div>
            <p className="text-2xl font-black italic text-white uppercase">
              Patagonia Ride Expedition
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

    {/* Tactical modules Updates */}
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div
        {...fadeInUp}
        className="md:col-span-8 bg-[#08080a] border border-white/5 rounded-[3rem] p-12 group overflow-hidden relative"
        >
        <div className="flex justify-between items-start mb-20">
          <div className="p-5 bg-blue-600/10 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-all duration-500">
          <Cpu size={40} className="text-blue-50" />
          </div>
          <div className="text-right">
            <span
            className="block text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]"
            >
              process Node
            </span>
            <span className="block text-[9px] font-mono text-gray-700 uppercase tracking-widest">
              Latency: 0.82ms
            </span>
          </div>
        </div>
        <h3 
          className="text-5xl font-black text-white italic uppercase mb-6 tracking-tighter
        "
        >
          Neural <br /> <span>Synthesis</span>
        </h3>
        <p className="text-gray-500 text-xl max-w-md font-medium leading-relaxed">
          Autonomous multi-vector routing. Our engine generates 14-day
          itineraries across global nodes in under 800ms.
        </p>
        <div className="absolute -right-16 -bottom-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          <Zap size={500} />
        </div>
        </motion.div>

        {/* Vibe Check */}
        <motion.div 
        {...fadeInUp} 
        className="md:col-span-4 bg-[#0a0505] border border-red-900/10 rounded-[3rem] p-12 flex flex-col justify-between group hover:border-red-600/30 transition-all"
        >
        <div className="relative">
          <ActivityIcon className="text-red-600 animate-pulse" size={48} />
        </div>
        <div>
          <h3 className= "text-2xl font-black text-white uppercase italic mb-2">
            Vibe-Check
          </h3>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
            Sentiment analysis of local hotspots and urban density.
          </p>
        </div>
        </motion.div>
      </div>
    </section>
    <section className="py-22 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
      {/* Vertical Highlight */}
      <motion.div
        {...fadeInUp}
        className="md:col-span-4 bg-blue-600 rounded-[3rem] p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(37,99,235,0.15)]"
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <ShieldCheck
          size={64}
          className="text-white group-hover:rotate-12 transition-transform duration-500"
          />
          <div>
            <h3 className="text-4xl font-black text-white italic uppercase mb-4 tracking-tighter">
              safeNode <br />
              Protocol
            </h3>
            <p className="text-blue-100 text-sm font-bold uppercase tracking-widest opacity-80">
              {" "}
              Tracking 4k+ nodes for maximum environmental stability.
            </p>
          </div>
        </div>
        <Globe 
          size={350}
          className="absolute -bottom-20 -right-20 text-white/10 animate-spin-slow pointer-events-none"
        />
    </motion.div>

    {/* Encryption */}
    <motion.div 
      {...fadeInUp} 
      className="md:col-span-8 bg-[#08080a] border border-white/5 rounded-[3rem] p-12 flex items-center justify-between group relative overflow-hidden"
    >
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-[1px] bg-blue-600"/>
          <span className=" text-[10px] font-black uppercase text-blue-500 tracking-[0.3em]">
              Security Uplink
          </span>
          </div>
          <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
            256-bit AES <br />
            <span className="text-gray-700">Encrypted Cloud</span>
          </h3>
          <div className="flex gap-4">
            <Fingerprint className="text-blue-600/40" size={24} />
            <Lock className="text-blue-600/40" size={24} />
          </div>
        </div>
        <Layers 
        size={200}
        className="text-blue-600/5 group-hover:rotate-90 transition-all duration-1000 mr-10"
        />
      </motion.div>

        {/* Curation */}
        <motion.div className="md:col-span-12 bg-[#0a0a05] border border-yellow-900/10 rounded-[3rem] p-10 flex items-center justify-between group hover:bg-yellow-950/5 transition-all">
            <div className="flex items-center gap-8">
              <Star 
                size={48} 
                className="text-yellow-600 group-hover:rotate-[144deg] transition-all duration-700"
              />
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-widest">
                  Curated Excellence
                  </h3>
                  <p className="text-[9px] text-yellow-600/50 font-mono mt-1 font-bold uppercase tracking-[0.2em]">
                  Verified Excellence v-4
                </p>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              {[1,2,3,4,5].map((i) => (
                <div className="w-8 h-1 bg-yellow-600/20 rounded-full overflow-hidden">
                <div 
                  className="w-8 h-1 bg-yellow-600 -translate-x-full group-hover:translate-x-0 transition-all duration-500"
                  style={{ transitionDelay: `${i * 100}ms`}}
                />
              </div>
            ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Autonomous Logistic */}
      <section className="py-32 px-6 bg-[#050507] border-y border-white/5">
      <div className="max-w-7xl mz-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div {...fadeInUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg mb-10">
            <Cpu size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Logic Engine
            </span>
          </div>
          <h2 className="text-6xl font-black text-white italic uppercase mb-12 leading-none">
            Autonomous
            <br /> Logistics
          </h2>{" "}
          <div className="space-y-10">
            {[
              {
                s: "01",
                t: "Constraint Ingestion",
                d: "Specify budget, duration, and sensory preferences.",
              },
              {
                s: "02",
                t: "Vector Synthesis",
                d: "AI cross-refernces millions of data points for optimal paths.",
              },
              {
                s: "03",
                t: "Live Deployement",
                d: "Dynamic updates sent to your device every 60 seconds."
              },
            ].map((step, i)=> (
              <div className="flex gap-8 group">
                <span 
                  className="text-blue-600 font-black text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {step.s}
                </span>
                <div>
                  <h4 className="text-2xl font-black text-white italic uppercase mb-2 tracking-tighter">
                    {step.t}
                  </h4>
                  <p className="text-grey-500 text-lg">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
            alt=""
            className="rounded-[3rem] grayscale opacity-40 border border-white/10"
          />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-10 bg-blue-600/10 backdrop-blur-3xl rounded-full border border-blue-500/20 shadow-2xl animate-pulse">
              <Activity size={64} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric */}
      <section className="py-48 relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent" />
        <motion.div {...fadeInUp} className="relative z-10">
          <CloudSun size={100} className="text-blue-500 mx-auto mb-10" />
          <h2 className="text-7xl font-black text-white italic uppercase tracking-tighter mb-10 leading-none">
            Atmospheric <br /> Awareness
          </h2>
          <p className="text-gray-500 text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
            We track real-time weather and political tides, rerouting your
            journey if conditions become sub-optimal. Your mission is never
            static.
          </p>
        </motion.div>
      </section>

      {/* Global Deployments */}
      <section className="py-32 px-6 bg-[#050507]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl font-black text-white italic uppercase leading-none tracking-tighter">
              Global <br />{" "}
              <span className="text-blue-600 not-italic">Deployments.</span>
            </h2>
            <div className="bg-white/5 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3 text-blue-500 text-[10px] font-black tracking-widest uppercase">
              <Radar size={16} className="animate-spin-slow" /> Live
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-c0ls-3 gap-8">
            {[
            {
              img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
              title: "Shibuya Crossing",
              loc: "Tokyo, JP",
            },
            {
              img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
              title: "Montmartre Cafe",
              loc: "Paris, FR",
            },
            {
              img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
              title: "Venice Canal",
              loc: "Venice, IT",
            },
          ].map((node, i) => (
            <motion.div key={i} 
            {...fadeInUp} 
            className="group-relative h-[600px] rounded-[3rem] overflow-hidden border border-white/5"
            >
              <img 
              src={node.img} 
              alt=""
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-88" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                    {node.loc}
                  </p>
                  <h4 className="text-4xl text-white font-black italic uppercase">
                    {node.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Satellite Network */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
                alt=""
                className="rounded-[3rem] border border-white/10 mix-blend-screen opacity-50"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                   Global Linkage Protocol
              </h2>
            <p className="text-gray-500 text-lg mb-10 font-medium">
                  {" "}
                  WanderAI connects to a mesh network of 400+ orbital satellites to
                  ensure your itinerary is updated even in zero-connectivity
                  deadzones.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl">
                <h4 className="text-white font-black upeercase text-xs mb-2 trackinng-widest">
                  Uptime
                </h4>
                <p className="text-3xl font-black text-blue-600 uppercase italic">
                  99.99%
                  </p>
              </div>
              <div className="p-8 bg-white/5 border border-white/5 rounded-3xl">
                <h4 className="text-white font-black upeercase text-xs mb-2 trackinng-widest">
                  Latency
                </h4>
                <p className="text-3xl font-black text-blue-600 uppercase italic">
                  12ms
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal */}
      <section className="py-32 px-6 bg-[#030305]"> 
        <div className="max-w-5xl mx-auto bg-black rounded-[2.5rem] border border-white/10 p-10 font-mono shadow-2xl relative">
          <div className="flex gap-2 mb-8 border-b border-white/5 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          <div className="space-y-4 text-sm">
            <p className="text-blue-500">
              [{">"}] Initializing Global Routing Table...
            </p>
            <p className="text-gray-600">
              {"[>"} Fetching Real-Time Pricing (Flight_ID: AX-902)...
            </p>
            <p className="text-emerald-500">
              {"[>"} OPTIMAL PATH DISCOVERED: 0.82s Total Processing Time
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="pt-60 pb-40 px-6 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-8xl md:text-[140px] font-black text-white uppercase italic tracking-tighter mb-16 leading-[0.8]">
            Plan Less <br />{" "}
            <span className="text-blue-600 not-italic">Explore more</span>
          </h2>
          <a
            href="#"
            className="px-20 py-10 bg-white text-black rounded-2xl text-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-4 shadow-[0_40px_80px_rgba(255,255,255,0.1)]"
          >
            Initialize Mission
          </a>
        </motion.div>
      </section>

      {/* Footer Final */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Wander <span className="text-blue-600">AI</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Safety
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
             Network
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy
            </a>
          </div>
          <p>&copy; // Distributed Architecture // Encrypted Mission Data</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
