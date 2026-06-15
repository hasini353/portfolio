import React, { useState } from 'react';
import { Brain, Play, RotateCcw, Cpu, Database, Award, Sliders } from 'lucide-react';

const AIMLLab = ({ isEmbedded = false }) => {
  const [epochs, setEpochs] = useState(10);
  const [learningRate, setLearningRate] = useState(0.01);
  const [batchSize, setBatchSize] = useState(32);
  const [trainingLogs, setTrainingLogs] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);

  // Model statistics to display after training
  const [modelStats, setModelStats] = useState(null);

  const startTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setTrainingLogs([]);
    setModelStats(null);
    setProgress(0);

    let currentEpoch = 1;
    let accuracy = 0.5;
    let loss = 0.8;

    const interval = setInterval(() => {
      if (currentEpoch > epochs) {
        clearInterval(interval);
        setIsTraining(false);
        setProgress(100);
        
        // Final Model stats
        setModelStats({
          accuracy: (accuracy * 100).toFixed(2),
          loss: loss.toFixed(4),
          recordsProcessed: '10,240'
        });
        return;
      }

      // Simulate learning curve (loss drops, accuracy rises)
      loss = loss * (1 - learningRate * 2) - Math.random() * 0.02;
      if (loss < 0.05) loss = 0.05 + Math.random() * 0.01;

      accuracy = accuracy + (1 - accuracy) * learningRate * 1.5 + Math.random() * 0.01;
      if (accuracy > 0.98) accuracy = 0.97 + Math.random() * 0.01;

      const logEntry = {
        epoch: currentEpoch,
        loss: loss.toFixed(4),
        accuracy: (accuracy * 100).toFixed(2)
      };

      setTrainingLogs((prev) => [...prev, logEntry]);
      setProgress(Math.floor((currentEpoch / epochs) * 100));
      currentEpoch++;
    }, 400); // Trigger training cycle fast
  };

  return (
    <div className={isEmbedded ? "relative py-20 bg-[#0A0A0A]" : "min-h-screen bg-[#0A0A0A] pt-32 pb-20 relative overflow-hidden"}>
      {/* Background gradients */}
      {!isEmbedded && (
        <>
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-portfolio-secondary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-portfolio-accent/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-20" />
        </>
      )}

      <div className={isEmbedded ? "max-w-7xl mx-auto px-6 md:px-12" : "max-w-7xl mx-auto px-6 md:px-12 relative z-10"}>
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono text-portfolio-secondary tracking-widest uppercase">
            // Neural Sandbox
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            AI &amp; ML Showcase
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-portfolio-secondary to-portfolio-primary mx-auto rounded-full" />
          <p className="text-sm md:text-base text-[#A1A1AA]">
            Tune training rates, adjust epochs, and observe live validation accuracies within our simulated neural training console.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hyperparameter Controllers */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] shadow-2xl space-y-6 bg-[#111111]/70">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sliders className="text-portfolio-secondary" size={18} />
                <span>Hyperparameters</span>
              </h3>

              <div className="space-y-4">
                {/* Epochs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#A1A1AA]">Epochs:</span>
                    <span className="text-white font-bold">{epochs}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={epochs}
                    disabled={isTraining}
                    onChange={(e) => setEpochs(parseInt(e.target.value))}
                    className="w-full h-1 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Learning Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#A1A1AA]">Learning Rate (α):</span>
                    <span className="text-white font-bold">{learningRate}</span>
                  </div>
                  <input
                    type="range"
                    min={0.001}
                    max={0.1}
                    step={0.005}
                    value={learningRate}
                    disabled={isTraining}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#0A0A0A] rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Batch Size */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#A1A1AA]">Batch Size:</span>
                    <span className="text-white font-bold">{batchSize}</span>
                  </div>
                  <select
                    value={batchSize}
                    disabled={isTraining}
                    onChange={(e) => setBatchSize(parseInt(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/5 rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:outline-none"
                  >
                    <option value={16}>16</option>
                    <option value={32}>32</option>
                    <option value={64}>64</option>
                    <option value={128}>128</option>
                  </select>
                </div>
              </div>

              <button
                onClick={startTraining}
                disabled={isTraining}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-portfolio-secondary to-portfolio-primary text-white font-semibold text-xs md:text-sm shadow-glow-secondary hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                <Play size={14} />
                <span>{isTraining ? 'Training Neural Net...' : 'Run Model Training'}</span>
              </button>
            </div>

            {/* Model Evaluation Metrics Card */}
            {modelStats && (
              <div className="glass-panel p-6 rounded-2xl border border-portfolio-accent/30 bg-portfolio-accent/5 animate-pulse space-y-4">
                <h3 className="text-sm font-bold text-portfolio-accent flex items-center space-x-2">
                  <Award size={16} />
                  <span>Evaluation Metrics Resolved</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Accuracy</span>
                    <div className="text-xl font-extrabold text-white font-mono">{modelStats.accuracy}%</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Log Loss</span>
                    <div className="text-xl font-extrabold text-white font-mono">{modelStats.loss}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Training Logs Console terminal */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] shadow-2xl space-y-6 bg-[#111111]/70">
              
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Brain className="text-portfolio-secondary" size={18} />
                  <span>Training Logs Terminal</span>
                </h3>
                <div className="text-xs font-mono text-[#A1A1AA]">Epoch Process: {progress}%</div>
              </div>

              {/* Console window */}
              <div className="bg-black/55 p-5 rounded-xl font-mono text-[10px] md:text-xs h-80 overflow-y-auto space-y-1.5 border border-white/5">
                {trainingLogs.length === 0 && <span className="text-[#A1A1AA]/40">&gt; Configure parameters and click "Run Model Training" to compile...</span>}
                {trainingLogs.map((log) => (
                  <div key={log.epoch} className="text-[#A1A1AA] flex justify-between">
                    <span>
                      &gt; Epoch {log.epoch}/{epochs} — loss: <strong className="text-red-400">{log.loss}</strong> — accuracy: <strong className="text-portfolio-accent">{log.accuracy}%</strong>
                    </span>
                    <span className="text-portfolio-primary">[OK]</span>
                  </div>
                ))}
                {isTraining && (
                  <div className="text-white animate-pulse">
                    &gt; Compiling network layers weights...
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#0A0A0A] h-[2px] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-portfolio-secondary to-portfolio-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AIMLLab;
