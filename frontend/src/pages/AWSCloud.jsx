import React, { useState } from 'react';
import { Cloud, Zap, Play, CheckCircle, Database, Cpu, HardDrive, ShieldCheck, Activity } from 'lucide-react';

const AWSCloud = ({ isEmbedded = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const steps = [
    { name: 'S3 Ingestion Bucket', desc: 'Recruits raw CSV data files.', icon: <HardDrive size={18} /> },
    { name: 'AWS Lambda (Trigger)', desc: 'Processes metadata serverlessly.', icon: <Zap size={18} /> },
    { name: 'SageMaker Inference', desc: 'Predicts target classification model.', icon: <Cpu size={18} /> },
    { name: 'CloudWatch Telemetry', desc: 'Tracks latencies and metrics.', icon: <Activity size={18} /> },
    { name: 'API Gateway Ingress', desc: 'Exposes secure CORS endpoint.', icon: <ShieldCheck size={18} /> }
  ];

  const startPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs([{ text: '🚀 Pipeline trigger: file "users_inference_batch_1.csv" uploaded to S3.', time: new Date().toLocaleTimeString() }]);

    const runStep = (stepIdx) => {
      if (stepIdx >= steps.length) {
        setIsRunning(false);
        setActiveStep(-1);
        setLogs((prev) => [
          { text: '✅ Pipeline execution successfully completed. Client response returned with status code 200 OK.', time: new Date().toLocaleTimeString() },
          ...prev
        ]);
        return;
      }

      setActiveStep(stepIdx);
      
      const messages = [
        `📥 S3 event handler triggered. Passing input metadata stream to AWS Lambda.`,
        `⚙️ Lambda function processing file records. Initiating boto3 client call to SageMaker Endpoint.`,
        `🧠 SageMaker executing inference. Running model tensors prediction checks.`,
        `📈 Ingesting container invocation performance metrics to CloudWatch dashboards.`,
        `🌐 Gateway returning response payloads (JSON) back to React frontend client.`
      ];

      setTimeout(() => {
        setLogs((prev) => [
          { text: messages[stepIdx], time: new Date().toLocaleTimeString() },
          ...prev
        ]);
        runStep(stepIdx + 1);
      }, 1000);
    };

    setTimeout(() => {
      runStep(1);
    }, 1000);
  };

  return (
    <div className={isEmbedded ? "relative py-20 bg-[#0A0A0A]" : "min-h-screen bg-[#0A0A0A] pt-32 pb-20 relative overflow-hidden"}>
      {/* Background gradients */}
      {!isEmbedded && (
        <>
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF9900]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-portfolio-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-20" />
        </>
      )}

      <div className={isEmbedded ? "max-w-7xl mx-auto px-6 md:px-12" : "max-w-7xl mx-auto px-6 md:px-12 relative z-10"}>
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono text-[#FF9900] tracking-widest uppercase">
            // Cloud Architecture
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            AWS Cloud Showcase
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FF9900] to-portfolio-primary mx-auto rounded-full" />
          <p className="text-sm md:text-base text-[#A1A1AA]">
            Examine our pipeline flows deployed on Amazon Web Services, illustrating serverless functions, model hosting, and metrics trackers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* AWS Services Cards */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Hosted AWS Services</h3>
            
            {[
              { name: 'AWS Lambda', desc: 'Serverless Node/Python triggers executing code in sub-100ms blocks without server upkeep costs.', color: 'border-l-4 border-l-[#FF9900]' },
              { name: 'Amazon S3', desc: 'Highly secure object store archiving application data models, training weights, and user attachments.', color: 'border-l-4 border-l-[#22C55E]' },
              { name: 'AWS SageMaker', desc: 'Builds, trains, and deploys high-performance machine learning models for low-latency batch inferences.', color: 'border-l-4 border-l-portfolio-secondary' },
              { name: 'AWS API Gateway', desc: 'Exposes secure CORS REST paths, implementing JWT payload decryption validation filters.', color: 'border-l-4 border-l-portfolio-primary' }
            ].map((service, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 space-y-1.5 bg-[#111111]/70">
                <h4 className="text-xs md:text-sm font-bold text-white">{service.name}</h4>
                <p className="text-[11px] md:text-xs text-[#A1A1AA] leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Pipeline Simulator */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] shadow-2xl space-y-6 bg-[#111111]/70">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Cloud className="text-[#FF9900]" size={20} />
                    <span>Serverless AI Pipeline Sandbox</span>
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    Simulate real-time file analytics processing through our AWS integration steps.
                  </p>
                </div>

                <button
                  onClick={startPipeline}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#FF9900] to-portfolio-primary text-white font-semibold text-xs md:text-sm shadow-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  <Play size={14} />
                  <span>{isRunning ? 'Processing...' : 'Trigger Pipeline'}</span>
                </button>
              </div>

              {/* Steps Progress Visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isCompleted = activeStep === -1 || activeStep > idx;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col items-center text-center relative transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FF9900]/20 border-[#FF9900] shadow-[0_0_15px_rgba(255,153,0,0.3)] scale-102'
                          : isCompleted
                          ? 'bg-portfolio-accent/15 border-portfolio-accent/40'
                          : 'bg-[#0A0A0A] border-white/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${
                        isActive
                          ? 'bg-[#FF9900] text-white animate-pulse'
                          : isCompleted
                          ? 'bg-portfolio-accent text-white'
                          : 'bg-white/5 text-[#A1A1AA]'
                      }`}>
                        {isCompleted ? <CheckCircle size={14} /> : step.icon}
                      </div>

                      <h4 className="text-[10px] font-bold text-white mb-1 line-clamp-1">{step.name}</h4>
                      <p className="text-[9px] text-[#A1A1AA] line-clamp-2">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Running console logging */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#A1A1AA]">Pipeline Event Logs:</div>
                <div className="bg-black/55 p-4 rounded-lg font-mono text-[10px] md:text-xs h-40 overflow-y-auto space-y-1.5 border border-white/5 text-portfolio-accent">
                  {logs.length === 0 && <span className="text-[#A1A1AA]/40">&gt; Click "Trigger Pipeline" to ingest data files...</span>}
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex space-x-2 text-[#A1A1AA]">
                      <span className="text-portfolio-primary">[{log.time}]</span>
                      <span>{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AWSCloud;
