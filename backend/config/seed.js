const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const Achievement = require('../models/Achievement');
const Analytics = require('../models/Analytics');

// High-end Inline SVGs for Diagrams
const diagramsData = {
  digiDiary: {
    system: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <style>
    .node { fill: #0d1127; stroke: url(#cyan-purple); stroke-width: 2; rx: 8; transition: all 0.3s ease; }
    .node:hover { filter: url(#glow); fill: #171d3d; }
    .label { fill: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-anchor: middle; }
    .sub-label { fill: #8F9CAE; font-family: 'Inter', sans-serif; font-size: 11px; text-anchor: middle; }
    .arrow { fill: none; stroke: #7C3AED; stroke-width: 2; stroke-dasharray: 4, 4; animation: dash 10s linear infinite; }
    @keyframes dash { to { stroke-dashoffset: -100; } }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <g transform="translate(40, 160)">
    <rect class="node" width="120" height="80" />
    <text x="60" y="40" class="label">Client App</text>
    <text x="60" y="58" class="sub-label">React / CSS</text>
  </g>
  <g transform="translate(240, 160)">
    <rect class="node" width="140" height="80" />
    <text x="70" y="40" class="label">NGINX / Gateway</text>
    <text x="70" y="58" class="sub-label">Load Balancer</text>
  </g>
  <g transform="translate(460, 100)">
    <rect class="node" width="140" height="70" />
    <text x="70" y="35" class="label">Express Instance A</text>
    <text x="70" y="50" class="sub-label">Role auth / Router</text>
  </g>
  <g transform="translate(460, 210)">
    <rect class="node" width="140" height="70" />
    <text x="70" y="35" class="label">Express Instance B</text>
    <text x="70" y="50" class="sub-label">HW Processing</text>
  </g>
  <g transform="translate(680, 160)">
    <rect class="node" width="90" height="80" stroke="#22C55E" />
    <text x="45" y="40" class="label" fill="#22C55E">MongoDB</text>
    <text x="45" y="58" class="sub-label">Atlas Cloud</text>
  </g>
  <path d="M 160 200 L 240 200" class="arrow" stroke="#00E5FF" />
  <path d="M 380 200 L 420 200 L 420 135 L 460 135" class="arrow" />
  <path d="M 380 200 L 420 200 L 420 245 L 460 245" class="arrow" />
  <path d="M 600 135 L 640 135 L 640 200 L 680 200" class="arrow" />
  <path d="M 600 245 L 640 245 L 640 200 L 680 200" class="arrow" />
</svg>`,
    schema: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: #0a0e22; stroke: #7C3AED; stroke-width: 1.5; rx: 8; }
    .header-box { fill: #171d3d; stroke: #7C3AED; stroke-width: 1.5; rx: 8; }
    .text-title { fill: #00E5FF; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; }
    .text-field { fill: #FFFFFF; font-family: 'Consolas', monospace; font-size: 11px; }
    .text-type { fill: #8F9CAE; font-family: 'Consolas', monospace; font-size: 11px; }
    .link-line { stroke: #00E5FF; stroke-width: 1.5; stroke-dasharray: 3, 3; fill: none; }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <!-- User Schema -->
  <g transform="translate(40, 50)">
    <rect class="box" width="200" height="150" />
    <rect class="header-box" width="200" height="30" />
    <text x="15" y="20" class="text-title">User Collection</text>
    <text x="15" y="55" class="text-field">_id: <tspan class="text-type">ObjectId</tspan></text>
    <text x="15" y="75" class="text-field">username: <tspan class="text-type">String</tspan></text>
    <text x="15" y="95" class="text-field">email: <tspan class="text-type">String (Unique)</tspan></text>
    <text x="15" y="115" class="text-field">password: <tspan class="text-type">String (Hash)</tspan></text>
    <text x="15" y="135" class="text-field">role: <tspan class="text-type">Enum [Student, Teacher]</tspan></text>
  </g>
  <!-- Homework Schema -->
  <g transform="translate(300, 120)">
    <rect class="box" width="200" height="170" />
    <rect class="header-box" width="200" height="30" />
    <text x="15" y="20" class="text-title">Homework Collection</text>
    <text x="15" y="55" class="text-field">_id: <tspan class="text-type">ObjectId</tspan></text>
    <text x="15" y="75" class="text-field">creatorId: <tspan class="text-type">ObjectId (Ref User)</tspan></text>
    <text x="15" y="95" class="text-field">title: <tspan class="text-type">String</tspan></text>
    <text x="15" y="115" class="text-field">description: <tspan class="text-type">String</tspan></text>
    <text x="15" y="135" class="text-field">dueDate: <tspan class="text-type">Date</tspan></text>
    <text x="15" y="155" class="text-field">attachments: <tspan class="text-type">Array [String]</tspan></text>
  </g>
  <!-- Submission Schema -->
  <g transform="translate(560, 50)">
    <rect class="box" width="200" height="150" />
    <rect class="header-box" width="200" height="30" />
    <text x="15" y="20" class="text-title">Submission Collection</text>
    <text x="15" y="55" class="text-field">_id: <tspan class="text-type">ObjectId</tspan></text>
    <text x="15" y="75" class="text-field">homeworkId: <tspan class="text-type">ObjectId (Ref HW)</tspan></text>
    <text x="15" y="95" class="text-field">studentId: <tspan class="text-type">ObjectId (Ref User)</tspan></text>
    <text x="15" y="115" class="text-field">fileUrl: <tspan class="text-type">String</tspan></text>
    <text x="15" y="135" class="text-field">graded: <tspan class="text-type">Boolean</tspan></text>
  </g>
  <!-- Relationships -->
  <path d="M 240 120 L 300 155" class="link-line" />
  <path d="M 500 200 L 560 125" class="link-line" />
</svg>`,
    apiFlow: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bubble { fill: #0d1127; stroke: #00E5FF; stroke-width: 2; rx: 6; }
    .label { fill: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-anchor: middle; }
    .desc { fill: #8F9CAE; font-family: 'Inter', sans-serif; font-size: 11px; text-anchor: middle; }
    .line { stroke: #7C3AED; stroke-width: 2; fill: none; }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <g transform="translate(30, 160)">
    <rect class="bubble" width="110" height="60" />
    <text x="55" y="27" class="label">POST Homework</text>
    <text x="55" y="44" class="desc">Client Request</text>
  </g>
  <g transform="translate(180, 160)">
    <rect class="bubble" width="110" height="60" stroke="#7C3AED" />
    <text x="55" y="27" class="label">Auth JWT</text>
    <text x="55" y="44" class="desc">Middleware Check</text>
  </g>
  <g transform="translate(330, 160)">
    <rect class="bubble" width="120" height="60" />
    <text x="60" y="27" class="label">Role Verification</text>
    <text x="60" y="44" class="desc">Teacher Role Check</text>
  </g>
  <g transform="translate(490, 160)">
    <rect class="bubble" width="120" height="60" stroke="#22C55E" />
    <text x="60" y="27" class="label">DB Operation</text>
    <text x="60" y="44" class="desc">Create Document</text>
  </g>
  <g transform="translate(650, 160)">
    <rect class="bubble" width="110" height="60" />
    <text x="55" y="27" class="label">JSON Response</text>
    <text x="55" y="44" class="desc">Status 201 Created</text>
  </g>
  <path d="M 140 190 H 180" class="line" />
  <path d="M 290 190 H 330" class="line" />
  <path d="M 450 190 H 490" class="line" />
  <path d="M 610 190 H 650" class="line" />
</svg>`,
    deployment: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <style>
    .cloud { fill: #0e122b; stroke: #7C3AED; stroke-width: 2; rx: 12; }
    .box { fill: #161b3d; stroke: #00E5FF; stroke-width: 1.5; rx: 6; }
    .lbl { fill: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-anchor: middle; }
    .lbl-sec { fill: #8F9CAE; font-family: 'Inter', sans-serif; font-size: 11px; text-anchor: middle; }
    .conn { stroke: #00E5FF; stroke-width: 1.5; stroke-dasharray: 4, 4; fill: none; }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <!-- Vercel -->
  <g transform="translate(40, 100)">
    <rect class="cloud" width="200" height="180" />
    <text x="100" y="30" class="lbl" fill="#00E5FF">Vercel (Frontend)</text>
    <rect class="box" x="25" y="60" width="150" height="40" />
    <text x="100" y="85" class="lbl">Static Assets hosting</text>
    <rect class="box" x="25" y="115" width="150" height="40" />
    <text x="100" y="140" class="lbl">Vite React Build</text>
  </g>
  <!-- Render -->
  <g transform="translate(290, 100)">
    <rect class="cloud" width="220" height="180" />
    <text x="110" y="30" class="lbl" fill="#7C3AED">Render (Backend)</text>
    <rect class="box" x="25" y="60" width="170" height="45" />
    <text x="110" y="87" class="lbl">Node/Express Web Service</text>
    <rect class="box" x="25" y="115" width="170" height="45" />
    <text x="110" y="142" class="lbl">Auto deployment from Git</text>
  </g>
  <!-- Mongo Atlas -->
  <g transform="translate(560, 100)">
    <rect class="cloud" width="200" height="180" stroke="#22C55E" />
    <text x="100" y="30" class="lbl" fill="#22C55E">MongoDB Atlas (DB)</text>
    <rect class="box" x="25" y="80" width="150" height="50" stroke="#22C55E" />
    <text x="100" y="110" class="lbl">Fully Scalable Shards</text>
  </g>
  <path d="M 240 190 H 290" class="conn" />
  <path d="M 510 190 H 560" class="conn" stroke="#22C55E" />
</svg>`
  },
  careerAdvisor: {
    system: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purp-green" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED" />
      <stop offset="100%" stop-color="#22C55E" />
    </linearGradient>
  </defs>
  <style>
    .b-node { fill: #0d1127; stroke: url(#purp-green); stroke-width: 2; rx: 8; }
    .lbl { fill: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; text-anchor: middle; }
    .desc { fill: #8F9CAE; font-family: 'Inter', sans-serif; font-size: 11px; text-anchor: middle; }
    .flow-line { fill: none; stroke: #00E5FF; stroke-width: 2; }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <g transform="translate(40, 160)">
    <rect class="b-node" width="120" height="80" />
    <text x="60" y="40" class="lbl">React Client</text>
    <text x="60" y="58" class="desc">UI & Chat window</text>
  </g>
  <g transform="translate(240, 160)">
    <rect class="b-node" width="140" height="80" />
    <text x="70" y="35" class="lbl">Express Backend</text>
    <text x="70" y="53" class="desc">Node / HTTP Server</text>
    <text x="70" y="68" class="desc">&amp; WS connection</text>
  </g>
  <g transform="translate(460, 100)">
    <rect class="b-node" width="150" height="80" />
    <text x="75" y="40" class="lbl">AI Recommendation</text>
    <text x="75" y="58" class="desc">Model Inference API</text>
  </g>
  <g transform="translate(460, 220)">
    <rect class="b-node" width="150" height="80" />
    <text x="75" y="40" class="lbl">WebSocket Service</text>
    <text x="75" y="58" class="desc">WS Engine</text>
  </g>
  <g transform="translate(680, 160)">
    <rect class="b-node" width="90" height="80" stroke="#00E5FF" />
    <text x="45" y="40" class="lbl">MongoDB</text>
    <text x="45" y="58" class="desc">User Profiles</text>
  </g>
  <path d="M 160 200 H 240" class="flow-line" />
  <path d="M 380 200 L 420 200 L 420 140 L 460 140" class="flow-line" stroke="#7C3AED" />
  <path d="M 380 200 L 420 200 L 420 260 L 460 260" class="flow-line" stroke="#7C3AED" />
  <path d="M 610 140 L 650 140 L 650 200 L 680 200" class="flow-line" />
  <path d="M 610 260 L 650 260 L 650 200 L 680 200" class="flow-line" />
</svg>`,
    schema: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <style>
    .tbl { fill: #0b0f24; stroke: #00E5FF; stroke-width: 1.5; rx: 6; }
    .lbl { fill: #FFFFFF; font-family: 'Consolas', monospace; font-size: 11px; }
    .lbl-title { fill: #7C3AED; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; }
    .lbl-type { fill: #8F9CAE; font-family: 'Consolas', monospace; font-size: 11px; }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <g transform="translate(60, 80)">
    <rect class="tbl" width="220" height="240" />
    <rect fill="#171d3d" width="220" height="30" rx="6" />
    <text x="15" y="20" class="lbl-title" fill="#00E5FF">UserProfile Collection</text>
    <text x="15" y="55" class="lbl">_id: <tspan class="lbl-type">ObjectId</tspan></text>
    <text x="15" y="75" class="lbl">interests: <tspan class="lbl-type">Array [String]</tspan></text>
    <text x="15" y="95" class="lbl">skills: <tspan class="lbl-type">Array [String]</tspan></text>
    <text x="15" y="115" class="lbl">cgpa: <tspan class="lbl-type">Number</tspan></text>
    <text x="15" y="135" class="lbl">goals: <tspan class="lbl-type">Array [String]</tspan></text>
    <text x="15" y="155" class="lbl">recommendations: <tspan class="lbl-type">Array [Object]</tspan></text>
    <text x="15" y="175" class="lbl">chatHistory: <tspan class="lbl-type">Array [ObjectId]</tspan></text>
    <text x="15" y="195" class="lbl">createdAt: <tspan class="lbl-type">Date</tspan></text>
  </g>
  <g transform="translate(480, 100)">
    <rect class="tbl" width="220" height="200" stroke="#7C3AED" />
    <rect fill="#171d3d" width="220" height="30" rx="6" />
    <text x="15" y="20" class="lbl-title" fill="#7C3AED">ChatMessage Collection</text>
    <text x="15" y="55" class="lbl">_id: <tspan class="lbl-type">ObjectId</tspan></text>
    <text x="15" y="75" class="lbl">userId: <tspan class="lbl-type">ObjectId (Ref User)</tspan></text>
    <text x="15" y="95" class="lbl">sender: <tspan class="lbl-type">Enum [User, AI]</tspan></text>
    <text x="15" y="115" class="lbl">text: <tspan class="lbl-type">String</tspan></text>
    <text x="15" y="135" class="lbl">timestamp: <tspan class="lbl-type">Date</tspan></text>
  </g>
  <path d="M 280 200 L 480 200" stroke="#22C55E" stroke-dasharray="4,4" stroke-width="2" fill="none" />
</svg>`,
    apiFlow: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <style>
    .act { fill: #0c0f2b; stroke: #22C55E; stroke-width: 2; rx: 12; }
    .txt { fill: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600; text-anchor: middle; }
    .txt-lbl { fill: #8F9CAE; font-family: 'Inter', sans-serif; font-size: 11px; text-anchor: middle; }
  </style>
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <g transform="translate(40, 160)">
    <rect class="act" width="130" height="80" />
    <text x="65" y="35" class="txt">User Sends Msg</text>
    <text x="65" y="53" class="txt-lbl">WebSocket Frame</text>
    <text x="65" y="68" class="txt-lbl">Payload: JSON</text>
  </g>
  <g transform="translate(250, 160)">
    <rect class="act" width="130" height="80" stroke="#7C3AED" />
    <text x="65" y="35" class="txt">Node.js Server</text>
    <text x="65" y="53" class="txt-lbl">Receives WS frame</text>
    <text x="65" y="68" class="txt-lbl">Fires Chat Handler</text>
  </g>
  <g transform="translate(460, 160)">
    <rect class="act" width="130" height="80" stroke="#00E5FF" />
    <text x="65" y="35" class="txt">AI Engine Call</text>
    <text x="65" y="53" class="txt-lbl">Processes data</text>
    <text x="65" y="68" class="txt-lbl">Fetches response</text>
  </g>
  <g transform="translate(650, 160)">
    <rect class="act" width="120" height="80" />
    <text x="60" y="35" class="txt">WS Broadcast</text>
    <text x="60" y="53" class="txt-lbl">Real-time stream</text>
    <text x="60" y="68" class="txt-lbl">to Client screen</text>
  </g>
  <path d="M 170 200 H 250" stroke="#7C3AED" stroke-width="2" fill="none"/>
  <path d="M 380 200 H 460" stroke="#7C3AED" stroke-width="2" fill="none"/>
  <path d="M 590 200 H 650" stroke="#7C3AED" stroke-width="2" fill="none"/>
</svg>`,
    deployment: `<svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#050816" rx="12"/>
  <style>
    .tier { fill: #0e122b; stroke: #00E5FF; stroke-width: 1.5; rx: 8; }
    .title { fill: #00E5FF; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; text-anchor: middle; }
    .box { fill: #161b3d; stroke: #7C3AED; stroke-width: 1.5; rx: 6; }
    .lbl { fill: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 12px; text-anchor: middle; }
  </style>
  <g transform="translate(60, 90)">
    <rect class="tier" width="200" height="220" />
    <text x="100" y="30" class="title">Frontend (Vercel)</text>
    <rect class="box" x="20" y="60" width="160" height="40" />
    <text x="100" y="85" class="lbl">Client application</text>
    <rect class="box" x="20" y="120" width="160" height="40" />
    <text x="100" y="145" class="lbl">WS Event Listener</text>
  </g>
  <g transform="translate(300, 90)">
    <rect class="tier" width="200" height="220" stroke="#7C3AED" />
    <text x="100" y="30" class="title" fill="#7C3AED">Backend (Render)</text>
    <rect class="box" x="20" y="60" width="160" height="40" stroke="#00E5FF" />
    <text x="100" y="85" class="lbl">WebSocket Server</text>
    <rect class="box" x="20" y="120" width="160" height="40" stroke="#00E5FF" />
    <text x="100" y="145" class="lbl">Express API Server</text>
  </g>
  <g transform="translate(540, 90)">
    <rect class="tier" width="200" height="220" stroke="#22C55E" />
    <text x="100" y="30" class="title" fill="#22C55E">Database (Atlas)</text>
    <rect class="box" x="20" y="80" width="160" height="50" stroke="#22C55E" />
    <text x="100" y="110" class="lbl">MongoDB Database</text>
  </g>
  <path d="M 260 200 H 300" stroke="#00E5FF" stroke-width="2" stroke-dasharray="4,4" fill="none" />
  <path d="M 500 200 H 540" stroke="#7C3AED" stroke-width="2" stroke-dasharray="4,4" fill="none" />
</svg>`
  }
};

exports.checkAndSeed = async () => {
  try {
    // 1. Seed Admin User if missing
    const userCount = await User.countDocuments({});
    if (userCount === 0) {
      console.log('🌱 No users found. Seeding default Admin user...');
      const hashedPassword = await bcrypt.hash('admin12345', 10);
      await User.create({
        username: 'Hasini',
        email: 'admin@hasini.dev',
        password: hashedPassword
      });
      console.log('✅ Admin user created: admin@hasini.dev / admin12345');
    }

    // 2. Seed Skills if missing
    const skillCount = await Skill.countDocuments({});
    if (skillCount === 0) {
      console.log('🌱 Seeding skills universe database...');
      const skillsList = [
        // Languages
        { name: 'Java', category: 'Programming Languages', level: 'Expert', icon: 'Code', glowColor: '#00E5FF' },
        { name: 'C++', category: 'Programming Languages', level: 'Expert', icon: 'Code', glowColor: '#7C3AED' },
        { name: 'Python', category: 'Programming Languages', level: 'Advanced', icon: 'Code', glowColor: '#22C55E' },
        { name: 'JavaScript', category: 'Programming Languages', level: 'Expert', icon: 'Code', glowColor: '#EF4444' },
        // Frontend
        { name: 'React.js', category: 'Frontend Development', level: 'Expert', icon: 'Layout', glowColor: '#00E5FF' },
        { name: 'HTML5/CSS3', category: 'Frontend Development', level: 'Expert', icon: 'Layout', glowColor: '#EF4444' },
        { name: 'Tailwind CSS', category: 'Frontend Development', level: 'Expert', icon: 'Layout', glowColor: '#3B82F6' },
        // Backend
        { name: 'Node.js', category: 'Backend Development', level: 'Expert', icon: 'Server', glowColor: '#22C55E' },
        { name: 'Express.js', category: 'Backend Development', level: 'Expert', icon: 'Server', glowColor: '#FFFFFF' },
        { name: 'REST APIs', category: 'Backend Development', level: 'Expert', icon: 'Server', glowColor: '#00E5FF' },
        { name: 'Microservices', category: 'Backend Development', level: 'Advanced', icon: 'Server', glowColor: '#7C3AED' },
        // Databases
        { name: 'MongoDB', category: 'Databases', level: 'Expert', icon: 'Database', glowColor: '#22C55E' },
        { name: 'SQL/DBMS', category: 'Databases', level: 'Advanced', icon: 'Database', glowColor: '#3B82F6' },
        // Cloud
        { name: 'AWS (S3, Lambda, API Gateway)', category: 'Cloud Computing', level: 'Advanced', icon: 'Cloud', glowColor: '#FF9900' },
        { name: 'AWS SageMaker', category: 'Cloud Computing', level: 'Advanced', icon: 'Cloud', glowColor: '#FF9900' },
        { name: 'Oracle Cloud', category: 'Cloud Computing', level: 'Intermediate', icon: 'Cloud', glowColor: '#EF4444' },
        // AI/ML
        { name: 'Machine Learning Pipelines', category: 'AI/ML', level: 'Advanced', icon: 'Cpu', glowColor: '#7C3AED' },
        { name: 'AI Agents & Automation', category: 'AI/ML', level: 'Learning', icon: 'Cpu', glowColor: '#00E5FF' },
        // Tools
        { name: 'Git & GitHub', category: 'Tools', level: 'Expert', icon: 'Terminal', glowColor: '#FFFFFF' },
        { name: 'VS Code', category: 'Tools', level: 'Expert', icon: 'Terminal', glowColor: '#00E5FF' },
        { name: 'WebSockets', category: 'Tools', level: 'Advanced', icon: 'Terminal', glowColor: '#7C3AED' },
        // System Design
        { name: 'System Design & Scalability', category: 'System Design', level: 'Advanced', icon: 'Cpu', glowColor: '#00E5FF' },
        { name: 'Distributed Systems', category: 'System Design', level: 'Advanced', icon: 'Cpu', glowColor: '#7C3AED' }
      ];

      for (const skill of skillsList) {
        await Skill.create(skill);
      }
      console.log(`✅ Successfully seeded ${skillsList.length} skills.`);
    }

    // 3. Seed Projects if missing
    const projectCount = await Project.countDocuments({});
    if (projectCount === 0) {
      console.log('🌱 Seeding sample resume projects and diagrams...');
      
      const digiDiaryProj = {
        title: 'DigiDiary — Scalable Homework Management System',
        description: 'Engineered a secure, full-stack homework management application supporting multi-user roles, custom APIs, query latency optimizations, and high scalability.',
        category: 'Full Stack',
        githubLink: 'https://github.com/hasini353/DigiDiary',
        demoLink: 'https://github.com/hasini353/DigiDiary',
        metrics: { latencyReduction: '20-25%', concurrentUsers: '100+', queriesOptimized: 'Mongoose Indexed' },
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
        featured: true,
        caseStudy: {
          overview: 'DigiDiary solves the challenge of administrative friction in schools and colleges. It offers customized dashboards for teachers to create, assign, and grade homework, while allowing students to submit homework and review grades cleanly.',
          problem: 'Existing homework management portals are bloated, slow, and lack role-based access control, leading to grading overlaps and slow response times during deadline rushes.',
          solution: 'Built a lightweight MERN web app with secure JWT-based role authorization (Student/Teacher). Added indexing to MongoDB, resulting in a latency drop of 20-25% for heavy queries.',
          features: [
            'Secure JWT Authentication and session management.',
            'Role-based views (dashboards) custom-tailored for Teachers and Students.',
            'Dynamic homework creation, attachment links, and submission uploads.',
            'Grading system with instant score feedback.'
          ],
          challenges: 'Handling concurrent student submissions right before a deadline was stalling queries due to full collection scans.',
          learnings: 'Learned query indexing optimization in MongoDB and how to design clean RESTful routes around user roles.',
          futureImprovements: [
            'Integrate AWS S3 directly for secure document upload and file versioning.',
            'Add automated grading suggestions using lightweight AI classification models.'
          ]
        },
        diagrams: diagramsData.digiDiary
      };

      const careerAdvisorProj = {
        title: 'Career & Education Advisor Web App with AI Chatbot',
        description: 'Developed a personalized career advisor dashboard featuring real-time interactive AI chatbot powered by WebSockets and structured recommendation data pipelines.',
        category: 'AI/ML',
        githubLink: 'https://github.com/hasini353',
        demoLink: 'https://one-stop-personalized-career-and-ed-two.vercel.app/login',
        metrics: { socketLatency: 'Low Latency', dataRecords: '10K+', responseTime: '< 100ms' },
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'AI Models'],
        featured: true,
        caseStudy: {
          overview: 'This personalized web app helps students find appropriate academic paths, colleges, and careers based on their performance, interests, and profile parameters.',
          problem: 'Students find career advice inaccessible, expensive, or generic, failing to reflect individual course interests or coding proficiencies.',
          solution: 'Created an intelligent recommendation dashboard incorporating a WebSocket chatbot. It streams personalized academic guidance data back to the client interactively and dynamically.',
          features: [
            'Interactive real-time chatbot chat interface with WebSocket streams.',
            'Aggregated recommendations engine reading user profiles and interests.',
            'Personalized career paths and college matching widgets.',
            'User profile manager saving goals, CGPA, and resume parameters.'
          ],
          challenges: 'Managing real-time messaging updates without database blockages during multi-user sessions.',
          learnings: 'Gained hands-on expertise in WebSockets (Socket.io) server events, asynchronous recommendation engines, and chatbot state structures.',
          futureImprovements: [
            'Integrate AWS SageMaker directly for real-time model inferences.',
            'Build full timeline visualizations showing student skill pathways.'
          ]
        },
        diagrams: diagramsData.careerAdvisor
      };

      await Project.create(digiDiaryProj);
      await Project.create(careerAdvisorProj);
      console.log('✅ Successfully seeded portfolio projects and case studies.');
    }

    // 4. Seed Certifications if missing
    const certCount = await Certification.countDocuments({});
    if (certCount === 0) {
      console.log('🌱 Seeding resume credentials...');
      const certs = [
        { name: 'AWS Cloud Foundations', issuer: 'Amazon Web Services (AWS)', date: 'June 2025', credentialLink: '#', skillsLearned: ['Cloud Infrastructure', 'EC2', 'S3', 'IAM', 'VPC'] },
        { name: 'Machine Learning Foundations', issuer: 'EduSkills / AWS Academy', date: 'July 2025', credentialLink: '#', skillsLearned: ['Model Training', 'SageMaker', 'Supervised Learning', 'Feature Engineering'] },
        { name: 'Oracle Cloud Infrastructure Certified Foundations', issuer: 'Oracle', date: 'May 2025', credentialLink: '#', skillsLearned: ['OCI Compute', 'Cloud Security', 'Autonomous Database', 'Virtual Networks'] }
      ];
      for (const c of certs) {
        await Certification.create(c);
      }
      console.log(`✅ Seeded ${certs.length} certifications.`);
    }

    // 5. Seed Achievements if missing
    const achCount = await Achievement.countDocuments({});
    if (achCount === 0) {
      console.log('🌱 Seeding coding achievements...');
      const achs = [
        { title: 'Solved 400+ DSA Problems', description: 'Solved over 400+ algorithmic problems across LeetCode and Codeforces, demonstrating strong problem-solving proficiency.', category: 'Coding', date: 'Ongoing' },
        { title: 'LeetCode Contest Rating: 1544', description: 'Participated in weekly coding contests, achieving a peak contest rating of 1544.', category: 'Coding', date: 'Ongoing' },
        { title: 'Gayatri Vidya Parishad Tech Hackathon Winner', description: 'Led our team to 1st place in the college-level web application hackathon.', category: 'Hackathon', date: 'April 2025' }
      ];
      for (const a of achs) {
        await Achievement.create(a);
      }
      console.log(`✅ Seeded ${achs.length} achievements.`);
    }

    // 6. Seed Blogs if missing
    const blogCount = await Blog.countDocuments({});
    if (blogCount === 0) {
      console.log('🌱 Seeding engineering blog articles...');
      const blogs = [
        {
          title: 'Designing Low-Latency Real-Time Systems using WebSockets',
          excerpt: 'A deep-dive analysis on building persistent bidirectional client-server channels, managing connection spikes, and WebSocket frame structures.',
          content: `Real-time interactivity has shifted from a premium feature to a core expectation. Whether it is a messaging app, live collaborative documents, or financial tickers, users expect zero lag.

In this article, we examine the mechanics of **WebSockets**, why they outperform traditional polling techniques, and how to scale them within a Node.js ecosystem.

## Why HTTP Polling Fails
Under HTTP/1.1, clients check for updates using short polling (repeated requests) or long polling (hanging requests). This creates massive overhead:
1. **Header Bloat:** Every HTTP call contains headers, adding 500-1000 bytes per frame.
2. **Socket Exhaustion:** Establishing new TCP handshakes constantly exhausts OS ports.
3. **CPU Overhead:** Parsing headers repeatedly spikes server CPU usage.

## The WebSocket Handshake
WebSockets use a single TCP handshake. The client upgrades the HTTP/1.1 connection to a bidirectional tunnel:

\`\`\`http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
\`\`\`

The server acknowledges, establishing a persistent TCP connection:
\`\`\`http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
\`\`\`

## Handling Concurrency in Node.js
Node.js's event-driven nature makes it perfect for WebSocket connections. Using the \`ws\` or \`socket.io\` library, we can manage thousands of concurrent open tunnels.

Here is a simple example showing how to scale connections using a Pub/Sub adapter (like Redis) for multi-node distribution:

\`\`\`javascript
const http = require('http');
const socketIO = require('socket.io');
const redisAdapter = require('socket.io-redis');

const server = http.createServer();
const io = socketIO(server);

// Bind Redis adapter to share state across server replicas
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('message', (data) => {
    // Broadcast message to all instances
    io.emit('broadcast', data);
  });
});

server.listen(5000);
\`\`\`

By incorporating a Redis backplane, any message received on a specific node will automatically sync with all other nodes, maintaining low-latency state.`,
          category: 'System Design',
          tags: ['Node.js', 'WebSockets', 'Redis', 'Scalability'],
          slug: 'designing-low-latency-real-time-systems-websockets'
        },
        {
          title: 'Building Scalable ML Pipelines with AWS SageMaker and Lambda',
          excerpt: 'How to automate datasets preprocessing, model trigger sequences, and expose serverless prediction APIs using AWS Lambda and API Gateway.',
          content: `Deploying Machine Learning models to production requires scalable, reliable, and low-latency infrastructure.

This guide outlines our architectural approach during my **AWS AI/ML Virtual Internship**, detailing how we structured datasets pipeline triggers, SageMaker training jobs, and built serverless endpoints using AWS Lambda and API Gateway.

## Architectural Overview
Our pipeline comprises four modular tiers:
1. **Ingestion & Storage (S3):** Datasets are loaded as CSV/Parquet files into structured buckets.
2. **Preprocessing & Training (SageMaker):** Triggered on data ingestion to train/tune models.
3. **Serverless Inference (Lambda):** Loads trained models to perform sub-100ms forecasts.
4. **API Gateway:** Exposes RESTful endpoints for frontend application consumption.

## Automating Inference via Lambda
To avoid hosting active EC2 clusters 24/7, we use AWS Lambda to load model packages serverlessly. Here is the implementation pattern for the serverless inference function:

\`\`\`python
import json
import boto3
import os

# Initialize client
sagemaker_runtime = boto3.client('runtime.sagemaker')
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']

def lambda_handler(event, context):
    try:
        # Extract payload from incoming API Gateway request
        body = json.loads(event['body'])
        data_records = body['data']
        
        # Invoke SageMaker Endpoint
        response = sagemaker_runtime.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType='text/csv',
            Body=','.join(map(str, data_records))
        )
        
        # Decode prediction results
        predictions = response['Body'].read().decode('utf-8')
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'prediction': predictions})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
\`\`\`

## Key Takeaways
- **Cost Reduction:** Serverless hosting lowered our test environment expenses by 75% compared to active instances.
- **Micro-batch Processing:** Lambda successfully ingested 10K+ batch records, parsing and piping inputs cleanly without timeout failures.`,
          category: 'Cloud Computing',
          tags: ['AWS Lambda', 'SageMaker', 'Python', 'Serverless'],
          slug: 'building-scalable-ml-pipelines-sagemaker-lambda'
        },
        {
          title: 'Optimizing MongoDB Indexes for Distributed MERN Applications',
          excerpt: 'Why collection scans destroy performance and how index structures like compound indexes and TTL indexes reduce query response latency.',
          content: `In MERN applications, database access is often the primary bottleneck. As data grows, generic queries start executing "Collection Scans" (COLLSCAN), iterating over every document in a collection.

This article details how to profile queries and implement MongoDB index patterns to speed up query execution by **20% to 25%**.

## Understanding COLLSCAN vs IXSCAN
Suppose you run this query in Express:
\`\`\`javascript
const submissions = await Submission.find({ studentId, graded: false });
\`\`\`
If you have 100,000 documents, MongoDB will search all 100,000 sequentially unless an index is found.

By using MongoDB's \`explain()\` parameter, we can verify this:
\`\`\`javascript
const explanation = await Submission.find({ studentId, graded: false }).explain("executionStats");
console.log(explanation.queryPlanner.winningPlan.stage); // Outputs "COLLSCAN"
\`\`\`

## The Remedy: Compound Indexes
To optimize this query, we create a **Compound Index** covering both fields. The order of fields matters: put equality fields first, then range/sort fields:

\`\`\`javascript
// Create compound index on studentId (equality) and graded (equality)
submissionSchema.index({ studentId: 1, graded: 1 });
\`\`\`

Now, running the query uses an **Index Scan** (IXSCAN):
1. MongoDB navigates the index B-tree instantly using \`studentId\`.
2. It pinpoints the documents matching \`graded\`.
3. It fetches only the targeted documents.

Query execution time drops from 120ms to 2ms.

## Performance Comparison
Here is the performance latency profile during our indexing stress tests:

| Dataset Size | COLLSCAN Query Time | IXSCAN Query Time | Latency Saved |
|--------------|---------------------|-------------------|---------------|
| 10,000 docs  | 14ms                | 1.1ms             | ~92%          |
| 100,000 docs | 118ms               | 2.4ms             | ~98%          |

By building compound indexes on query fields, you insulate your Express backend from database latency spikes.`,
          category: 'Databases',
          tags: ['MongoDB', 'Indexing', 'Mongoose', 'Database Optimization'],
          slug: 'optimizing-mongodb-indexes-distributed-mern'
        }
      ];

      for (const b of blogs) {
        await Blog.create(b);
      }
      console.log(`✅ Seeded ${blogs.length} blog posts.`);
    }

    // 7. Seed Initial Analytics if missing
    const analyticsCount = await Analytics.countDocuments({});
    if (analyticsCount === 0) {
      console.log('🌱 Seeding initial dummy analytics hit entries...');
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];
      
      await Analytics.create({
        pageViews: 450,
        uniqueVisitors: 125,
        dailyHits: [
          { date: twoDaysAgo, count: 90 },
          { date: yesterday, count: 110 },
          { date: today, count: 25 }
        ]
      });
      console.log('✅ Seeded initial analytics stats.');
    }
  } catch (err) {
    console.error('❌ Error during database seeding:', err.message);
  }
};
