import React, { useState } from 'react';
import { Cpu, RefreshCw, Zap, Server, ShieldCheck, Database, Layout } from 'lucide-react';

const SystemDesign = ({ isEmbedded = false }) => {
  const [activeTab, setActiveTab] = useState('caching');

  // Caching Simulator State
  const [cache, setCache] = useState({ 1: 'User Profile 1', 2: 'User Profile 2' });
  const [cacheLog, setCacheLog] = useState([]);
  const [queryId, setQueryId] = useState(1);
  const [cacheAnimating, setCacheAnimating] = useState(false);

  // Load Balancer State
  const [lbRequests, setLbRequests] = useState([]);
  const [serverCounts, setServerCounts] = useState({ 'Node A': 0, 'Node B': 0, 'Node C': 0 });
  const [lbActiveNode, setLbActiveNode] = useState(null);

  // Caching simulator trigger
  const runCacheRequest = () => {
    if (cacheAnimating) return;
    setCacheAnimating(true);
    const id = parseInt(queryId);
    const hit = !!cache[id];
    
    setCacheLog((prev) => [
      { text: `📡 Ingesting GET /api/user/${id}...`, type: 'info' },
      ...prev
    ]);

    setTimeout(() => {
      if (hit) {
        setCacheLog((prev) => [
          { text: `⚡ CACHE HIT: Data fetched from Redis (Latency: 2ms). Result: ${cache[id]}`, type: 'hit' },
          ...prev
        ]);
        setCacheAnimating(false);
      } else {
        setCacheLog((prev) => [
          { text: `⚠️ CACHE MISS: ID #${id} not in Redis. Initiating COLLSCAN on MongoDB...`, type: 'miss' },
          ...prev
        ]);
        
        setTimeout(() => {
          const fetchedData = `User Profile ${id} (DB Seed)`;
          setCache((prevCache) => ({ ...prevCache, [id]: fetchedData }));
          setCacheLog((prev) => [
            { text: `✅ DB fetch completed (Latency: 112ms). Writing back to Redis cache.`, type: 'db' },
            ...prev
          ]);
          setCacheAnimating(false);
        }, 1200);
      }
    }, 600);
  };

  // Load balancer trigger
  const sendLoadBalancerTraffic = () => {
    const servers = ['Node A', 'Node B', 'Node C'];
    // Round-robin selection
    const nextNode = servers[lbRequests.length % 3];
    setLbActiveNode(nextNode);

    setServerCounts((prev) => ({ ...prev, [nextNode]: prev[nextNode] + 1 }));
    setLbRequests((prev) => [
      { id: prev.length + 1, node: nextNode, timestamp: new Date().toLocaleTimeString() },
      ...prev
    ].slice(0, 10)); // Keep last 10
  };

  return (
    <div className={isEmbedded ? "relative" : "min-h-screen bg-[#050816] pt-32 pb-20 relative overflow-hidden"}>
      {/* Background radial highlights */}
      {!isEmbedded && (
        <>
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-portfolio-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-portfolio-secondary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-40" />
        </>
      )}

      <div className={isEmbedded ? "" : "max-w-7xl mx-auto px-6 md:px-12 relative z-10"}>
        
        {/* Header */}
        {!isEmbedded && (
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h1 className="text-xs font-mono text-portfolio-primary tracking-widest uppercase">
              // Architecture Sandbox
            </h1>
            <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              System Design Playground
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary mx-auto rounded-full" />
            <p className="text-sm md:text-base text-[#8F9CAE]">
              Interact with our simulated cloud nodes to see how we distribute workloads, reduce latencies, and optimize database operations.
            </p>
          </div>
        )}

        {/* Dynamic Sandbox Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu selectors */}
          <div className="lg:col-span-3 flex flex-col space-y-2">
            {[
              { id: 'caching', title: 'Caching (Redis / DB)', desc: 'Reduce collection read bottlenecks.' },
              { id: 'load-balancing', title: 'Load Balancing', desc: 'Distribute round-robin traffic.' },
              { id: 'jwt-auth', title: 'Secure JWT Auth Flow', desc: 'Role authorization handshakes.' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  activeTab === tab.id
                    ? 'bg-portfolio-primary/10 border-portfolio-primary/50 text-[#FFFFFF]'
                    : 'bg-white/[0.02] border-white/5 text-[#8F9CAE] hover:bg-white/[0.04]'
                }`}
              >
                <div className="font-bold text-sm text-white">{tab.title}</div>
                <div className="text-xs text-[#8F9CAE]/75 mt-1">{tab.desc}</div>
              </button>
            ))}
          </div>

          {/* Sandbox workspace */}
          <div className="lg:col-span-9 glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.06] shadow-2xl min-h-[450px] flex flex-col justify-between">
            
            {/* Caching Content */}
            {activeTab === 'caching' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                    <Database className="text-portfolio-primary" size={18} />
                    <span>In-Memory Redis Cache Simulator</span>
                  </h3>
                  <p className="text-xs md:text-sm text-[#8F9CAE]">
                    Simulate API calls looking for user profiles. Profiling matches keys 1 &amp; 2 (Cache Hits, 2ms) vs new keys 3, 4, 5 (Cache Misses, triggers database COLLSCAN latency).
                  </p>
                </div>

                {/* Simulator Interface */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0c0f24] p-5 rounded-xl border border-white/5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#8F9CAE] font-bold">Query User ID:</label>
                      <select
                        value={queryId}
                        onChange={(e) => setQueryId(e.target.value)}
                        className="w-full bg-[#101530] border border-white/5 rounded-lg px-4 py-2 text-xs md:text-sm text-white focus:outline-none"
                      >
                        <option value={1}>ID #1 (Seeded in Cache)</option>
                        <option value={2}>ID #2 (Seeded in Cache)</option>
                        <option value={3}>ID #3 (Needs DB lookup)</option>
                        <option value={4}>ID #4 (Needs DB lookup)</option>
                        <option value={5}>ID #5 (Needs DB lookup)</option>
                      </select>
                    </div>

                    <button
                      onClick={runCacheRequest}
                      disabled={cacheAnimating}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-portfolio-primary text-white font-semibold text-xs md:text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                      <Zap size={14} />
                      <span>{cacheAnimating ? 'Querying Cache...' : 'Request Data Packet'}</span>
                    </button>

                    <div className="space-y-1.5">
                      <div className="text-xs font-mono font-bold text-[#8F9CAE]">Active Redis Store Cache Map:</div>
                      <pre className="text-[10px] font-mono p-3 bg-black/40 rounded-lg text-portfolio-primary border border-white/5 max-h-32 overflow-y-auto">
                        {JSON.stringify(cache, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Cache diagnostic console logs */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-bold text-[#8F9CAE]">Cache Logs Console:</div>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-[10px] md:text-xs h-60 overflow-y-auto space-y-2 border border-white/5">
                      {cacheLog.length === 0 && <span className="text-[#8F9CAE]/40">&gt; Waiting for traffic request...</span>}
                      {cacheLog.map((log, idx) => (
                        <div
                          key={idx}
                          className={
                            log.type === 'hit' ? 'text-portfolio-accent font-bold' :
                            log.type === 'miss' ? 'text-red-400 font-semibold' :
                            log.type === 'db' ? 'text-portfolio-primary' : 'text-[#8F9CAE]'
                          }
                        >
                          &gt; {log.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Load Balancing Content */}
            {activeTab === 'load-balancing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                    <Server className="text-portfolio-secondary" size={18} />
                    <span>Round-Robin Load Distribution Simulator</span>
                  </h3>
                  <p className="text-xs md:text-sm text-[#8F9CAE]">
                    Simulate an NGINX ingress traffic manager distributing incoming HTTP/WS sockets across virtual application server replicas to maintain system balance.
                  </p>
                </div>

                {/* LB Interactive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0c0f24] p-5 rounded-xl border border-white/5">
                  <div className="md:col-span-1 flex flex-col justify-center space-y-4">
                    <button
                      onClick={sendLoadBalancerTraffic}
                      className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-portfolio-secondary text-white font-semibold text-xs md:text-sm hover:opacity-90 shadow-glow-secondary cursor-pointer"
                    >
                      <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                      <span>Ingest User Traffic</span>
                    </button>

                    <div className="text-xs text-[#8F9CAE] leading-relaxed">
                      Click the button to generate automated HTTP queries. NGINX will route requests equally across Nodes A, B, and C sequentially.
                    </div>
                  </div>

                  {/* Virtual Nodes */}
                  <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
                    {['Node A', 'Node B', 'Node C'].map((node) => {
                      const isActive = lbActiveNode === node;
                      return (
                        <div
                          key={node}
                          className={`p-4 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                            isActive
                              ? 'bg-portfolio-secondary/25 border-portfolio-secondary shadow-glow-secondary scale-102'
                              : 'bg-white/[0.02] border-white/5'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-portfolio-secondary animate-ping' : 'bg-white/10'}`} />
                            <div className="text-xs md:text-sm font-bold text-white">{node} Server</div>
                          </div>
                          
                          <div className="text-xs font-mono font-bold text-[#8F9CAE]">
                            Inbound Sockets: <span className="text-white font-bold">{serverCounts[node]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Traffic log */}
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-[#8F9CAE]">Ingress Router Routing History:</div>
                  <div className="bg-black/40 p-3 rounded-lg font-mono text-[10px] md:text-xs max-h-28 overflow-y-auto flex flex-col space-y-1 text-[#8F9CAE]/70 border border-white/5">
                    {lbRequests.length === 0 && <span>Waiting for traffic loads...</span>}
                    {lbRequests.map((req) => (
                      <span key={req.id}>
                        [{req.timestamp}] Ingress Request ID #{req.id} routed successfully to Node: <strong className="text-portfolio-secondary">{req.node}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* JWT Auth Content */}
            {activeTab === 'jwt-auth' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                    <ShieldCheck className="text-portfolio-accent" size={18} />
                    <span>JWT Authorization Workflow</span>
                  </h3>
                  <p className="text-xs md:text-sm text-[#8F9CAE]">
                    See how secure sessions authenticate. Credentials sign a Cryptographic token which resides in the browser headers to validate secure operations.
                  </p>
                </div>

                {/* Visual diagram wrapper */}
                <div className="bg-[#0c0f24] p-5 rounded-xl border border-white/5 space-y-6 text-xs md:text-sm">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <Layout size={20} className="mx-auto text-portfolio-primary" />
                      <div className="font-bold text-white">1. Client Browser</div>
                      <p className="text-[10px] text-[#8F9CAE]">Signs in credentials; stores JWT token in LocalStorage.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <Cpu size={20} className="mx-auto text-portfolio-secondary" />
                      <div className="font-bold text-white">2. Bearer Header</div>
                      <p className="text-[10px] text-[#8F9CAE]">Appends token as: 'Authorization: Bearer &lt;token&gt;'.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <Database size={20} className="mx-auto text-portfolio-accent" />
                      <div className="font-bold text-white">3. API Middleware</div>
                      <p className="text-[10px] text-[#8F9CAE]">Verifies Signature via secret key; resolves user scope payload.</p>
                    </div>
                  </div>

                  <div className="bg-black/50 p-4 rounded-lg font-mono text-[10px] md:text-xs border border-white/5 text-portfolio-accent space-y-1">
                    <div>HEADER: &#123; "alg": "HS256", "typ": "JWT" &#125;</div>
                    <div className="text-portfolio-secondary">PAYLOAD: &#123; "id": "hasini_353", "role": "admin", "exp": "24h" &#125;</div>
                    <div className="text-[#8F9CAE]/70">SIGNATURE: HMACSHA256(base64Header + "." + base64Payload, JWT_SECRET)</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default SystemDesign;
