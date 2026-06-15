import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  { text: 'Initializing Portfolio Database...', duration: 600 },
  { text: 'Loading MERN Projects & Case Studies...', duration: 700 },
  { text: 'Mounting Interactive Systems Design Diagrams...', duration: 600 },
  { text: 'Connecting AWS Cloud Pipeline Metrics...', duration: 800 },
  { text: 'Loading AI/ML Lab Diagnostics...', duration: 600 },
  { text: 'System Check Completed. Portfolios ready.', duration: 500 }
];

const LoadingScreen = ({ onFinished }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Handle step printing
  useEffect(() => {
    if (currentStep >= LOADING_STEPS.length) {
      setTimeout(() => {
        onFinished();
      }, 500);
      return;
    }

    const step = LOADING_STEPS[currentStep];
    setTypedText('');
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < step.text.length) {
        setTypedText((prev) => prev + step.text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, step.text]);
          setCurrentStep((prev) => prev + 1);
        }, step.duration);
      }
    }, 15); // Fast character typing

    return () => clearInterval(interval);
  }, [currentStep, onFinished]);

  // Handle progress percentage
  useEffect(() => {
    const totalDuration = LOADING_STEPS.reduce((acc, s) => acc + s.duration + (s.text.length * 15), 0);
    const intervalTime = totalDuration / 100;
    
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime * 0.95); // Ensure it finishes slightly ahead of steps

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -100,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-[#050816] z-50 flex flex-col justify-between p-8 font-mono text-[#8F9CAE]"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none cosmic-grid" />

      {/* Header Info */}
      <div className="flex justify-between items-center text-xs tracking-wider z-10">
        <div>SYS_OPERATOR: HASINI_GUNDUBOGULA</div>
        <div>LOC: VISAKHAPATNAM, IN</div>
      </div>

      {/* Terminal log output */}
      <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center text-sm md:text-base z-10">
        <div className="space-y-2 mb-6">
          {completedSteps.map((stepText, idx) => (
            <div key={idx} className="flex items-center text-portfolio-accent">
              <span className="mr-2">✔</span>
              <span>{stepText}</span>
            </div>
          ))}
          {currentStep < LOADING_STEPS.length && (
            <div className="flex items-center text-[#FFFFFF] font-semibold">
              <span className="animate-pulse mr-2 text-portfolio-primary">⚡</span>
              <span>{typedText}</span>
              <span className="w-1.5 h-4 bg-portfolio-primary ml-1 animate-ping" />
            </div>
          )}
        </div>
      </div>

      {/* Footer loading progress bar */}
      <div className="max-w-2xl mx-auto w-full space-y-4 z-10">
        <div className="flex justify-between items-center text-xs font-semibold tracking-wider">
          <span className="text-portfolio-primary font-bold">PORTFOLIO BOOTSTRAP PROGRESS</span>
          <span className="text-[#FFFFFF] font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-[#161b3d] h-[3px] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ ease: 'linear' }}
            className="h-full bg-gradient-to-r from-portfolio-secondary to-portfolio-primary shadow-glow-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
