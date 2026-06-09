import { useEffect, useState } from "react";
import {
  motion,
  type Variants,
} from "framer-motion";
import { FileText } from "lucide-react";

/* ───────────────────────────────────────────────────────
   Constants
   ─────────────────────────────────────────────────────── */
const SYSTEM_LOG =
  "[SYSTEM_LOG // CREDENTIAL_VERIFIED: EXAM_ID_UJ_AI_2026]";
const TITLE_TEXT = "UMIEJĘTNOŚCI JUTRA AI";
const CERTIFICATE_SRC = "/images/certificate.png";
const TECH_TOOLS = ["Lovable", "Miro", "ElevenLabs", "NotebookLM", "Gemini Pro"];

/* ───────────────────────────────────────────────────────
   Typewriter Hook
   ─────────────────────────────────────────────────────── */
function useTypewriter(text: string, startDelay: number, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, done: displayed.length === text.length && started };
}

/* ───────────────────────────────────────────────────────
   MainPage Component
   ─────────────────────────────────────────────────────── */
interface MainPageProps {
  onViewSupplement?: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onViewSupplement }) => {
  /* ── Timings ────────────────────────────────────────── */
  const T_BOOT_START = 0.4;
  const T_TITLE_START = 2.2;
  const T_IMAGE_START = 3.4;
  const T_EFFECTS_START = 4.8;
  const T_INTERACTIVE = 6.0;

  /* ── Interactivity Lock & Hover State ───────────────── */
  const [isInteractive, setIsInteractive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsInteractive(true), T_INTERACTIVE * 1000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Typewriter ─────────────────────────────────────── */
  const { displayed: logText, done: logDone } = useTypewriter(
    SYSTEM_LOG,
    T_BOOT_START * 1000,
    30
  );

  /* ── Title Words ────────────────────────────────────── */
  const titleWords = TITLE_TEXT.split(" ");
  
  const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: T_TITLE_START,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, rotateX: 90, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  /* ── Badge Variants ─────────────────────────────────── */
  const badgeContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: T_INTERACTIVE,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /* ── Render ─────────────────────────────────────────── */
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas-bg">
      {/* ════════ LAYER 0: Grid Pattern ════════ */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* ════════ LAYER 1: Radial Glow Bloom ════════ */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at center, var(--color-glow-indigo), transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ 
          delay: T_EFFECTS_START, // Blooms when certificate ignites
          duration: 1.5, 
          ease: "easeOut" 
        }}
      />

      {/* ════════ LAYER 2: Vignette ════════ */}
      <div className="pointer-events-none absolute inset-0 bg-vignette" />

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 md:p-16">
        
        {/* ── System Boot Log ──────────────────── */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: T_BOOT_START }}
        >
          <span
            className="font-mono text-xs tracking-widest sm:text-sm"
            style={{ color: "var(--color-glow-cyan)" }}
          >
            {logText}
            {!logDone && (
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  times: [0, 0.5, 0.5, 1],
                  ease: "linear",
                }}
              >
                ▌
              </motion.span>
            )}
          </span>
        </motion.div>

        {/* ── Impact Title (Monolith Reveal) ───── */}
        <motion.h1
          className="mb-10 flex flex-wrap justify-center gap-x-2 sm:gap-x-4 text-center text-4xl font-medium uppercase tracking-tight sm:text-5xl md:text-7xl bg-linear-to-br from-glow-indigo via-glow-white to-glow-indigo bg-clip-text text-transparent pb-2"
          style={{ lineHeight: 1.1, perspective: 1000 }}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {titleWords.map((word, wIdx) => (
            <span key={wIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, cIdx) => (
                <motion.span 
                  key={cIdx} 
                  variants={letterVariants}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* ── Levitating Artifact ──────────────── */}
        <motion.div
          className="w-full max-w-2xl"
          style={{ perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.8, y: 120, z: -500 }}
          animate={{ opacity: 1, scale: 1, y: 0, z: 0 }}
          transition={{
            delay: T_IMAGE_START,
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Breathing Float Wrapper */}
          <motion.div
            animate={isInteractive && !isHovered ? { y: [0, -8, 0] } : { y: 0 }}
            transition={
              isInteractive && !isHovered
                ? { repeat: Infinity, duration: 5, ease: "easeInOut" }
                : { duration: 0.5, ease: "easeOut" }
            }
          >
            {/* Interactive Card (No 3D) */}
            <motion.div
              className="relative mx-auto rounded-2xl glass-panel shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Certificate Image */}
              <motion.img
                src={CERTIFICATE_SRC}
                alt="Umiejętności Jutra AI Certificate"
                className="block w-full rounded-2xl"
                draggable={false}
              />

              {/* ── Diagonal Sheen Sweep ────── */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "150%", opacity: [0, 0.7, 0.7, 0] }}
                transition={{
                  delay: T_EFFECTS_START,
                  duration: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.9, 1],
                }}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 55%, transparent 70%)",
                }}
              />

              {/* ── Outer Border Bloom ───────── */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                initial={{
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02), 0 0 10px -10px var(--color-glow-indigo)`,
                }}
                animate={{
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 80px -10px var(--color-glow-indigo)`,
                }}
                transition={{
                  delay: T_EFFECTS_START,
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Hint after handover ──────────────── */}
        <motion.div
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInteractive ? 1 : 0, y: isInteractive ? 0 : 10 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="hidden font-mono text-xs tracking-wider text-zinc-500 md:block opacity-40">
            hover the certificate to interact
          </p>
          <span className="hidden text-zinc-700 md:block opacity-40">|</span>
          <button 
            onClick={onViewSupplement}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-glow-cyan hover:text-white transition-colors cursor-pointer"
          >
            <FileText size={14} /> View Official Supplement
          </button>
        </motion.div>

        {/* ── Tech Stack Badges ────────────────── */}
        <motion.div
          className="mt-8 flex max-w-2xl flex-wrap justify-center gap-3 px-4"
          initial="hidden"
          animate="visible"
          variants={badgeContainerVariants}
        >
          {TECH_TOOLS.map((tool, idx) => (
            <motion.div
              key={idx}
              variants={badgeVariants}
              className="glass-panel animate-pulse-slow cursor-default rounded-full px-5 py-2 font-mono text-xs text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-[0_0_15px_var(--color-glow-cyan)] sm:text-sm"
              style={{
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              {tool}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;
