"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import IntroLoader from "@/components/IntroLoader";
import BuildModes from "@/components/BuildModes";
import ProjectsCompiler from "@/components/ProjectsCompiler";
import WorkTransition from "./WorkTransition";
import FinalCTA from "./FinalCTA";

export default function PortfolioLanding() {
  const [isReady, setIsReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const forceIntro = searchParams.has("intro");
    const introSeen = sessionStorage.getItem("davud-portfolio-intro-seen");

    setShowIntro(forceIntro || !introSeen);
    setIsReady(true);
  }, []);

  const handleIntroFinish = useCallback(() => {
    sessionStorage.setItem("davud-portfolio-intro-seen", "true");
    setShowIntro(false);
  }, []);

  if (!isReady) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroLoader key="intro" onFinish={handleIntroFinish} />
      ) : (
        <motion.div
          key="site"
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Hero />
          <WorkTransition />
          <ProjectsCompiler />
          <FinalCTA />
        </motion.div>
      )}
    </AnimatePresence>
  );
}