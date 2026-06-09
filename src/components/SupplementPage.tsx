import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface SupplementPageProps {
  onBack: () => void;
}

const SupplementPage: React.FC<SupplementPageProps> = ({ onBack }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-canvas-bg p-6 md:p-16">
      {/* ════════ LAYER 0: Grid Pattern ════════ */}
      <div className="fixed inset-0 bg-grid-pattern opacity-100" />

      {/* ════════ LAYER 1: Radial Glow Bloom ════════ */}
      <div
        className="pointer-events-none fixed inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at center, var(--color-glow-indigo), transparent 70%)",
        }}
      />

      {/* ════════ LAYER 2: Vignette ════════ */}
      <div className="pointer-events-none fixed inset-0 bg-vignette" />

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 font-mono text-sm uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Showcase
          </button>
        </motion.div>

        {/* Supplement Document */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel mx-auto rounded-2xl p-2 shadow-2xl sm:p-4"
          style={{
            boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 80px -10px var(--color-glow-indigo)`,
          }}
        >
          <img
            src="/images/Supplement.png"
            alt="Official Course Supplement"
            className="block w-full rounded-xl"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SupplementPage;
