import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Heart, 
  ArrowRight, 
  Layers, 
  CheckCircle, 
  Volume2, 
  Maximize2, 
  Minimize2, 
  Eye, 
  Copy, 
  Lightbulb, 
  Compass, 
  ShieldCheck, 
  FileCheck,
  RotateCcw
} from "lucide-react";
import { classRecords, founders, coreValues, quizQuestions } from "./data";
import { ClassRecord } from "./types";
import { AnimatedGradientDemo } from "@/components/ui/demo";

export default function App() {
  // State variables
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [newHireName, setNewHireName] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showBrandKit, setShowBrandKit] = useState<boolean>(false);
  const [chartMode, setChartMode] = useState<"visual" | "table" | "bento">("visual");
  const [hoveredDataPoint, setHoveredDataPoint] = useState<ClassRecord | null>(null);
  
  // Quiz state
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  
  // Certificate pledge signed state
  const [isPledgeSigned, setIsPledgeSigned] = useState<boolean>(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState<string | null>(null);

  // Constants
  const totalSlides = 8;
  const todayStr = "26 June 2026"; // Exact mock current date from prompt metadata
  
  // Compute totals for up-to-today class metrics
  const totalStudentsTrained = classRecords.reduce((acc, curr) => acc + curr.studentCount, 0);
  const maxClassRecord = [...classRecords].sort((a, b) => b.studentCount - a.studentCount)[0];

  // Auto-play slide timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setShowCopiedAlert(hex);
    setTimeout(() => setShowCopiedAlert(null), 2000);
  };

  // SVG rendering constants for the Class Analytics chart
  const svgWidth = 800;
  const svgHeight = 350;
  const chartPadding = { top: 30, right: 50, bottom: 60, left: 50 };
  const graphWidth = svgWidth - chartPadding.left - chartPadding.right;
  const graphHeight = svgHeight - chartPadding.top - chartPadding.bottom;

  // Max value for Y-axis (student count)
  const maxY = 40; 

  const getX = (index: number) => {
    return chartPadding.left + (index * (graphWidth / (classRecords.length - 1 || 1)));
  };

  const getY = (value: number) => {
    return chartPadding.top + graphHeight - (value / maxY) * graphHeight;
  };

  // Helper name string
  const resolvedName = newHireName.trim() || "Our Newest Team Member";

  return (
    <div id="app-container" className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative selection:bg-blue-500/10 selection:text-blue-900 overflow-x-hidden">
      
      {/* Sleek Interface Noisy Gradient Background */}
      <div className="absolute inset-0 noisy-bg opacity-100 z-0 transition-opacity duration-700" />

      {/* HEADER SECTION */}
      <header id="app-header" className="relative z-10 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Left Side: Controls & Live Date */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              id="brand-kit-toggle"
              onClick={() => setShowBrandKit(!showBrandKit)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                showBrandKit 
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" 
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Brand Kit Inspector</span>
            </button>

            <button
              id="play-slideshow-toggle"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isPlaying 
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" 
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {isPlaying ? "Pause Autoplay" : "Autoplay"}
            </button>

            <button
              id="fullscreen-toggle"
              onClick={toggleFullscreen}
              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-full transition-colors cursor-pointer"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Live Date / Header Label */}
          <div className="hidden sm:flex items-center space-x-2 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-slate-700 uppercase">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Onboarding Ledger • {todayStr}</span>
          </div>
        </div>

        {/* Right Side: A22A Geometric SVG Logo (No Word Mark, No AI Transformation Malaysia text) */}
        <div 
          id="brand-logo-container" 
          className="cursor-pointer group flex items-center justify-center p-1 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200/50 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
          onClick={() => setCurrentSlide(0)}
          title="A22A Home"
        >
          <svg
            className="w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:scale-105 animate-pulse"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant futuristic outer glow ring */}
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" className="opacity-40" />
            {/* Outer Hexagon frame / dynamic element */}
            <path d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="opacity-20" />
            
            {/* Double angled lines representing 'A' and '22' */}
            {/* Left 'A' leg */}
            <path d="M35 70 L47 30 L50 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right 'A' leg */}
            <path d="M65 70 L53 30 L50 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Crossbar forming modern 'A' / '2' connections */}
            <path d="M41 53 L59 53" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Twin core points representing 22 */}
            <circle cx="44" cy="40" r="2.5" fill="#f59e0b" />
            <circle cx="56" cy="40" r="2.5" fill="#f59e0b" />
          </svg>
        </div>
      </header>

      {/* BRAND KIT FLOATING DRAWER */}
      <AnimatePresence>
        {showBrandKit && (
          <motion.div
            id="brand-kit-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-6 right-6 md:left-12 md:right-12 mt-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-2xl z-50 text-slate-800"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="font-extrabold text-xl font-sans text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>A22A Visual Identity Guidelines</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Direct inspection of colors and typography imported from the A22A brand sheets.
                </p>
              </div>
              <button 
                onClick={() => setShowBrandKit(false)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold hover:bg-slate-100 px-2.5 py-1 rounded-md transition-all cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Swatch Panel */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
                  Primary Theme Swatches
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hex: "#0f172a", name: "Sleek Black" },
                    { hex: "#1e293b", name: "Slate Navy" },
                    { hex: "#1e3a8a", name: "Deep Blue" },
                    { hex: "#2563eb", name: "Sleek Blue" },
                    { hex: "#3b82f6", name: "Sky Blue" },
                    { hex: "#cbd5e1", name: "Slate Ice" },
                    { hex: "#f8fafc", name: "Soft White" },
                    { hex: "#ffffff", name: "Pure White" },
                  ].map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => handleCopyHex(color.hex)}
                      className="group relative flex flex-col items-center p-1 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-500 transition-all cursor-pointer"
                    >
                      <div className="w-full h-8 rounded border border-slate-200" style={{ backgroundColor: color.hex }} />
                      <span className="text-[9px] font-mono font-medium mt-1 text-slate-700">{color.hex}</span>
                      <span className="text-[8px] text-slate-500 font-sans truncate w-full text-center">{color.name}</span>
                      <span className="absolute -top-6 bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Copy
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accents Panel */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
                  Brand Accents
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hex: "#ef4444", name: "Sleek Red" },
                    { hex: "#f97316", name: "Sleek Orange" },
                    { hex: "#b45309", name: "Sleek Gold" },
                    { hex: "#10b981", name: "Sleek Green" },
                  ].map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => handleCopyHex(color.hex)}
                      className="group relative flex flex-col items-center p-1 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-500 transition-all cursor-pointer"
                    >
                      <div className="w-full h-8 rounded border border-slate-200" style={{ backgroundColor: color.hex }} />
                      <span className="text-[9px] font-mono font-medium mt-1 text-slate-700">{color.hex}</span>
                      <span className="text-[8px] text-slate-500 font-sans truncate w-full text-center">{color.name}</span>
                      <span className="absolute -top-6 bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Copy
                      </span>
                    </button>
                  ))}
                </div>
                {showCopiedAlert && (
                  <p className="text-[10px] text-blue-600 mt-2 font-semibold">
                    Copied {showCopiedAlert} to clipboard!
                  </p>
                )}
              </div>

              {/* Typography info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
                  Typography Pairing Rules
                </h4>
                <div className="space-y-2 border border-slate-200 bg-slate-50 p-3 rounded-lg text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900 font-sans">Primary Display Heading:</span>
                    <p className="font-mono text-[10px] text-blue-600 italic">"Space Grotesk" or "Inter" (Extra Bold)</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 font-sans">Secondary Alternative:</span>
                    <p className="font-mono text-[10px] text-slate-600">"JetBrains Mono" (Regular, Medium)</p>
                  </div>
                  <div className="pt-1 text-[10px] text-slate-400 border-t border-slate-200">
                    "Malaysia's brands deserve world-class content—styled beautifully with high-contrast displays."
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE PRESENTATION BODY */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-14 flex flex-col justify-center min-h-[calc(100vh-140px)]">
        
        {/* PROGRESS INDICATOR */}
        <div id="slide-progress" className="w-full max-w-xl mx-auto mb-6 flex items-center justify-between gap-1 px-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-8 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
                  : index < currentSlide 
                    ? "w-2 bg-blue-300" 
                    : "w-2 bg-slate-200"
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* SLIDE CARD CONTAINER WITH ANIMATIONS */}
        <div className="w-full min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-100/60 relative overflow-hidden flex flex-col justify-between"
            >
              
              {/* SLIDE DECORATIVE WATERMARK */}
              <div className="absolute right-6 top-6 opacity-3 pointer-events-none select-none font-extrabold text-9xl text-slate-300 font-mono">
                0{currentSlide + 1}
              </div>

              {/* SLIDE INTERFACE RENDERING */}

              {/* SLIDE 0: TITLE & WELCOME DECK COVER */}
              {currentSlide === 0 && (
                <div id="slide-content-0" className="flex flex-col lg:flex-row items-center gap-8 py-4">
                  <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs text-blue-700 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Company Onboarding & Ledger</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 font-sans">
                      Welcome to the <span className="text-blue-600 underline decoration-4 underline-offset-4">A22A</span> Vanguard
                    </h1>

                    <p className="text-slate-600 max-w-lg italic">
                      "Empowering Malaysian brands with world-class AI capabilities to compete globally."
                    </p>

                    {/* Interactive Input for Personalized Greeting */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-600">
                        Personalize this onboarding deck
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newHireName}
                          onChange={(e) => setNewHireName(e.target.value)}
                          placeholder="Type your name..."
                          maxLength={30}
                          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
                        />
                        {newHireName && (
                          <button
                            onClick={() => setNewHireName("")}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded text-slate-800 cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 italic">
                        Type your name to see it customized on timelines, certificates, and interactive cards!
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 w-full bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-center">
                    <div className="text-center py-4 border-b border-slate-200">
                      <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest">
                        A22A Welcomes
                      </p>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                        {resolvedName}
                      </h2>
                      <p className="text-xs text-brand-gold font-mono mt-1 font-semibold">
                        6th Core Pillar • Starting 1 July 2026
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Target by 2030</p>
                        <p className="text-lg font-extrabold text-blue-600">5,000</p>
                        <p className="text-[8px] text-slate-500">Professionals Trained</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Company Start</p>
                        <p className="text-lg font-extrabold text-brand-gold">12 Dec 2025</p>
                        <p className="text-[8px] text-slate-500">3 Co-Founders</p>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600 text-center italic">
                      "Malaysia's local brands have the power. We supply the capabilities."
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: ORIGINS & FOUNDERS */}
              {currentSlide === 1 && (
                <div id="slide-content-1" className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                        Our Beginnings • 12 December 2025
                      </span>
                      <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                        The Three Co-Founders
                      </h2>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 px-4 py-1 rounded-full text-xs text-slate-700">
                      Founded in Malaysia
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    A22A was launched on <span className="text-blue-600 font-bold">12 December 2025</span> with three visionaries who saw that local Malaysian brands deserve world-class AI content and tools.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {founders.map((founder) => (
                      <div 
                        key={founder.name}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-500 hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 transition-all hover:-translate-y-1 duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-600 text-white font-black text-sm rounded-full flex items-center justify-center shadow-md">
                            {founder.initials}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900">{founder.name}</h4>
                            <p className="text-[10px] uppercase tracking-wider text-blue-600 font-mono font-bold">{founder.role}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {founder.bio}
                        </p>
                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex justify-between items-center">
                          <span className="text-[9px] text-brand-gold uppercase tracking-widest font-mono font-bold">Status: Founder</span>
                          <span className="text-[10px] text-slate-400 italic">Est. Dec 2025</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-xs text-blue-800 text-center italic">
                    "Our goal: Helping Malaysian brands compete with international giants like Nike and Red Bull, without the million-dollar budgets."
                  </div>
                </div>
              )}

              {/* SLIDE 2: THE FIRST MILESTONE */}
              {currentSlide === 2 && (
                <div id="slide-content-2" className="flex flex-col md:flex-row items-center gap-8 py-2">
                  <div className="flex-1 space-y-5">
                    <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                      First Milestone • 28 February 2026
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 animate-fade-in">
                      The First Public Class
                    </h2>
                    
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      On <span className="text-blue-600 font-bold">28 February 2026</span>, we launched our very first public training curriculum. This was the inception of our practical instruction syllabus designed for professionals.
                    </p>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
                      <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-lg font-extrabold text-slate-900">7 Brave Students</p>
                        <p className="text-xs text-slate-500">Joined our first class, placing their trust in the A22A methodology.</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 italic leading-normal">
                      Note: These 7 students set off a massive wave. Within months, our classes attracted many more professionals eager to deploy generative models in business pipelines.
                    </p>
                  </div>

                  <div className="flex-1 w-full bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-center space-y-4 shadow-sm">
                    <div className="border-l-4 border-blue-600 pl-4 space-y-2">
                      <p className="text-blue-600 text-xs uppercase tracking-widest font-mono font-bold">The Curriculum Focus</p>
                      <h4 className="text-slate-900 font-extrabold text-sm">Enterprise Prompt Engineering & Audio/Video Automation</h4>
                      <p className="text-xs text-slate-600">Creating scalable visual assets and marketing material with generative frameworks.</p>
                    </div>

                    <div className="border-l-4 border-brand-gold pl-4 space-y-2">
                      <p className="text-brand-gold text-xs uppercase tracking-widest font-mono font-bold">Student Demographics</p>
                      <h4 className="text-slate-900 font-extrabold text-sm">Malaysian Brand Marketers & Content Managers</h4>
                      <p className="text-xs text-slate-600">From local independent creative studios to established local enterprises.</p>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Class Feedback Rating</span>
                        <span className="text-blue-600 font-semibold">100% Recommended</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full w-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

                    {/* SLIDE 3: HISTORIC CHART UP TO TODAY (JUNE 26, 2026) */}
              {currentSlide === 3 && (
                <div id="slide-content-3" className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                        Historical Analytics Ledger (Up to {todayStr})
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                        Class Dates & Student Enrollment Growth
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-normal">
                    This data maps the progress of class dates and student count. To comply with guidelines, <span className="text-brand-gold font-semibold">this ledger strictly stops on {todayStr}</span> and excludes any forward scheduling (July 1st onwards).
                  </p>

                  <div className="relative bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center shadow-inner">
                    
                    {/* SVG Rendered Interactive Chart */}
                    <svg 
                      viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                      className="w-full h-auto"
                    >
                      {/* Grid lines */}
                      {Array.from({ length: 5 }).map((_, i) => {
                        const val = Math.round((maxY / 4) * i);
                        const yPos = getY(val);
                        return (
                          <g key={i}>
                            <line
                              x1={chartPadding.left}
                              y1={yPos}
                              x2={svgWidth - chartPadding.right}
                              y2={yPos}
                              stroke="rgba(15,23,42,0.06)"
                              strokeDasharray="4 4"
                            />
                            <text
                              x={chartPadding.left - 10}
                              y={yPos + 4}
                              fill="rgba(15,23,42,0.4)"
                              fontSize="10"
                              fontFamily="monospace"
                              textAnchor="end"
                            >
                              {val}
                            </text>
                          </g>
                        );
                      })}

                      {/* Chart Bars (Student Count) */}
                      {classRecords.map((item, index) => {
                        const x = getX(index);
                        const barWidth = 24;
                        const barHeight = graphHeight - (getY(item.studentCount) - chartPadding.top);
                        const y = getY(item.studentCount);

                        return (
                          <g 
                            key={item.date}
                            onMouseEnter={() => setHoveredDataPoint(item)}
                            onMouseLeave={() => setHoveredDataPoint(null)}
                            className="cursor-pointer group"
                          >
                            <rect
                              x={x - barWidth / 2}
                              y={y}
                              width={barWidth}
                              height={Math.max(barHeight, 2)}
                              fill={item.highlighted ? "#2563eb" : "#3b82f6"}
                              rx="3"
                              className="transition-all duration-200 hover:fill-blue-600"
                            />
                            
                            {/* Highlight effect for launch or peak */}
                            {item.highlighted && (
                              <rect
                                x={x - barWidth / 2 - 2}
                                y={y - 2}
                                width={barWidth + 4}
                                height={Math.max(barHeight + 4, 2)}
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="1.5"
                                strokeDasharray="2 2"
                                rx="4"
                              />
                            )}
                          </g>
                        );
                      })}

                      {/* X-axis dates with 45-deg rotation */}
                      {classRecords.map((item, index) => {
                        const x = getX(index);
                        return (
                          <g key={`lbl-${item.date}`} transform={`translate(${x}, ${svgHeight - chartPadding.bottom + 12})`}>
                            <text
                              transform="rotate(-35)"
                              fill="rgba(15,23,42,0.6)"
                              fontSize="9"
                              fontFamily="monospace"
                              textAnchor="end"
                            >
                              {item.date}
                            </text>
                          </g>
                        );
                      })}

                      {/* Chart Legend */}
                      <g transform={`translate(${svgWidth / 2 - 50}, ${svgHeight - 15})`}>
                        <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
                        <text x="18" y="10" fill="#0f172a" fontSize="10" fontFamily="sans-serif">Student Count</text>
                      </g>
                    </svg>

                    {/* Floating tooltip simulation */}
                    <div className="mt-2 min-h-[44px] bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-800 shadow-sm">
                      {hoveredDataPoint ? (
                        <>
                          <div>
                            <span className="text-blue-600 font-bold">Class Date:</span> {hoveredDataPoint.date}
                          </div>
                          <div className="flex gap-4">
                            <span><strong className="text-blue-600">Students:</strong> {hoveredDataPoint.studentCount}</span>
                            {hoveredDataPoint.studentCount === 40 && <span className="text-brand-gold font-bold">★ All-Time Peak!</span>}
                          </div>
                        </>
                      ) : (
                        <div className="text-slate-400 text-center w-full italic">
                          Hover over any bar to inspect individual class session analytics.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MINI DASHBOARD STATS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center shadow-sm">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Total Trained</p>
                      <p className="text-lg font-extrabold text-blue-600">{totalStudentsTrained} Students</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center shadow-sm">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Completed Classes</p>
                      <p className="text-lg font-extrabold text-slate-900">11 Sessions</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center shadow-sm">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Peak Student count</p>
                      <p className="text-lg font-extrabold text-brand-gold">{maxClassRecord.studentCount} Students</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center shadow-sm">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Current Run Rate</p>
                      <p className="text-lg font-extrabold text-blue-600">19.5 avg / class</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4 (Index 4): LIVE BENTO BOARD */}
              {currentSlide === 4 && (
                <div id="slide-content-bento" className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                        Interactive Metrics Hub • Live State
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                        A22A Operational Board
                      </h2>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Feed Active
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-normal">
                    This interactive board combines our dynamic SVG-based animated color gradients with performance analytics to monitor corporate training outreach.
                  </p>

                  <div className="w-full">
                    <AnimatedGradientDemo />
                  </div>
                </div>
              )}

              {/* SLIDE 5: RECENT MILESTONES & TEAM WELCOME */}
              {currentSlide === 5 && (
                <div id="slide-content-5" className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                        Expansion Ledger • June & July 2026
                      </span>
                      <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                        Recent Milestones & Growth
                      </h2>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs text-blue-700 font-semibold">
                      New Pillars Added
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    Our accelerated schedule during June 2026 catalyzed massive visibility. In the past few days, we transitioned from closed classes to expansive community gatherings.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Event card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-500 hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold border border-blue-100">
                          19 June 2026
                        </span>
                        <span className="text-[10px] text-slate-400">7 days ago</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                        First Ever Public Event
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        We launched our first public seminar and live networking session. We welcomed <strong className="text-blue-600">100+ attendees</strong>, setting a precedent for massive enterprise AI awareness assemblies in Kuala Lumpur.
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[10px] text-blue-600 font-mono">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>Completed Successfully</span>
                      </div>
                    </div>

                    {/* Team Member onboarding card */}
                    <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-5 hover:border-blue-500 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 shadow-md relative">
                      <div className="absolute -top-3 -right-3 bg-blue-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow">
                        Welcome!
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold border border-blue-100">
                          1 July 2026
                        </span>
                        <span className="text-[10px] text-blue-600 font-bold font-mono">Upcoming in 5 days!</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-1">
                        Welcoming Our 6th Member
                      </h4>
                      <p className="text-xs text-blue-600 font-mono mb-2 font-semibold">
                        Role Position: {resolvedName}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        A22A welcomes our crucial 6th member! Your arrival marks the completion of our primary team formulation, empowering us to scale our curriculum pipelines to target 5,000 professionals.
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-[10px] text-amber-600 font-mono font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                        <span>Prepared & Onboarding Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 6: CORE VALUES EXPLORATION */}
              {currentSlide === 6 && (
                <div id="slide-content-6" className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                        How We Do Things
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                        Our Core Values
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 italic max-w-md md:text-right">
                      "The things we believe in that help make this company extraordinary. Remember them, practise them, and share them."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                    {coreValues.map((val) => (
                      <div 
                        key={val.id}
                        className="bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 transition-all rounded-xl p-5 flex flex-col justify-between shadow-sm"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="w-7 h-7 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center text-xs font-mono text-blue-700 font-bold">
                              0{val.id}
                            </span>
                            {val.jpTitle && (
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border border-blue-100">
                                {val.jpTitle}
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{val.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {val.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-blue-600 font-mono font-bold block">
                            How you practice this:
                          </span>
                          <p className="text-[10px] text-slate-500 italic leading-relaxed">
                            {val.impact}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center text-xs text-blue-700">
                    {resolvedName}, you are holding the trust! Protect our values as you help build our legacy.
                  </div>
                </div>
              )}

              {/* SLIDE 7: INTERACTIVE WELCOME QUIZ */}
              {currentSlide === 7 && (
                <div id="slide-content-7" className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 tracking-widest font-bold">
                        Interactive Orientation Check
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                        A22A History & Culture Quiz
                      </h2>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 px-4 py-1 rounded-full text-xs text-blue-700 font-semibold font-mono">
                      Quiz Score: {quizScore} / {quizQuestions.length}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    Let's review what you've learned on your onboarding slides so far! Submit your answers below to verify your alignment with A22A's history.
                  </p>

                  <div className="space-y-4 pt-1 max-h-[280px] overflow-y-auto pr-2">
                    {quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black shadow-sm">
                            {qIdx + 1}
                          </span>
                          <span>{q.question}</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                          {q.options.map((option, oIdx) => {
                            const isSelected = quizAnswers[qIdx] === oIdx;
                            const isCorrect = oIdx === q.correctAnswerIndex;
                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => {
                                  setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                                }}
                                className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer ${
                                  quizSubmitted
                                    ? isCorrect 
                                      ? "bg-green-50 border-green-200 text-green-700 font-semibold" 
                                      : isSelected 
                                        ? "bg-red-50 border-red-200 text-red-700 font-semibold" 
                                        : "bg-slate-100 border-slate-200 text-slate-400"
                                    : isSelected
                                      ? "bg-blue-50 border-blue-300 text-blue-700 font-bold"
                                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <p className="text-[10px] text-slate-500 pl-6 italic font-mono">
                            ↳ {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Submission and Reset Controls */}
                  <div className="pt-2 flex justify-end gap-3">
                    {!quizSubmitted ? (
                      <button
                        onClick={() => {
                          let score = 0;
                          quizQuestions.forEach((q, idx) => {
                            if (quizAnswers[idx] === q.correctAnswerIndex) {
                              score += 1;
                            }
                          });
                          setQuizScore(score);
                          setQuizSubmitted(true);
                        }}
                        disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                        className="bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/10"
                      >
                        Submit Answers
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                          setQuizScore(0);
                        }}
                        className="flex items-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Quiz</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE NAVIGATION CONTROL FOOTER */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  id="prev-slide-btn"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-blue-600 font-mono font-bold tracking-widest uppercase">
                  Slide {currentSlide + 1} of {totalSlides}
                </div>

                {currentSlide === totalSlides - 1 ? (
                  <button
                    id="finish-btn"
                    onClick={() => {
                      setCurrentSlide(0);
                      setIsPledgeSigned(false);
                      setNewHireName("");
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <span>Restart Orientation</span>
                    <RotateCcw className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="next-slide-btn"
                    onClick={nextSlide}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-500/25"
                  >
                    <span>Next Slide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM QUICK INDEX BUTTONS */}
        <div id="quick-indices" className="mt-6 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {[
            "Welcome",
            "3 Co-Founders",
            "Public Class Launch",
            "Growth Analytics Ledger",
            "Live Bento Board",
            "Milestones",
            "Our Values",
            "Onboarding Quiz"
          ].map((title, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-tight transition-all border cursor-pointer ${
                i === currentSlide 
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 font-bold" 
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {i + 1}. {title}
            </button>
          ))}
        </div>

      </main>

      {/* FOOTER BAR */}
      <footer id="app-footer" className="relative z-10 w-full py-8 mt-12 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 A22A • AI Transformation Malaysia. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 font-bold font-mono">5,000 Trained by 2030 Goal</span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-600 font-bold">Ver 2.4.0 Live Ledger</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
