"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import IntroLoader from "@/components/IntroLoader";
import ProjectsCompiler from "@/components/ProjectsCompiler";
import WorkTransition from "./WorkTransition";
import FinalCTA from "./FinalCTA";
import HeroTransition from "@/components/HeroTransition";

export default function PortfolioLanding() {
  const [isReady, setIsReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
  const timer = window.setTimeout(() => {
    const forceIntro = window.location.search.includes("intro=true");
    const introSeen = sessionStorage.getItem("davud-portfolio-intro-seen");

    setShowIntro(forceIntro || !introSeen);
    setIsReady(true);
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
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
          <HeroTransition />      
          <WorkTransition />
          <ProjectsCompiler />
          <FinalCTA />
        </motion.div>
      )}
    </AnimatePresence>
  );
}