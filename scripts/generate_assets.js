import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicProjects = path.join(__dirname, '..', 'public', 'projects');

const projectDirs = [
  'agroxai',
  'object-detection',
  'rag-assistant',
  'cnn-classifier',
  'face-recognition',
  'kaiz-studio'
];

for (const dir of projectDirs) {
  const fullPath = path.join(publicProjects, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

// 1. AGROXAI - Crop Recommendation System
const agroxaiThumbnail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <rect width="1200" height="675" fill="#0E1217"/>
  <!-- Top Bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#161B22" border-bottom="1px solid #30363D"/>
  <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
  <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
  <circle cx="68" cy="24" r="6" fill="#27C93F"/>
  <text x="100" y="29" fill="#8B949E" font-family="monospace" font-size="14">AgroxAI &bull; ML Crop Recommendation Dashboard</text>
  <rect x="1050" y="14" width="120" height="22" rx="4" fill="#238636"/>
  <text x="1065" y="29" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">MODEL READY</text>

  <!-- Left Input Form Panel -->
  <rect x="40" y="75" width="460" height="560" rx="8" fill="#161B22" stroke="#30363D" stroke-width="1"/>
  <text x="65" y="115" fill="#58A6FF" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="bold">SOIL &amp; CLIMATE PARAMETERS</text>
  <text x="65" y="138" fill="#8B949E" font-family="monospace" font-size="12">Enter NPK and environmental values</text>
  
  <!-- NPK inputs -->
  <rect x="65" y="165" width="125" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="77" y="185" fill="#8B949E" font-family="monospace" font-size="11">Nitrogen (N)</text>
  <text x="77" y="210" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">88 mg/kg</text>

  <rect x="205" y="165" width="125" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="217" y="185" fill="#8B949E" font-family="monospace" font-size="11">Phosphorus (P)</text>
  <text x="217" y="210" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">42 mg/kg</text>

  <rect x="345" y="165" width="125" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="357" y="185" fill="#8B949E" font-family="monospace" font-size="11">Potassium (K)</text>
  <text x="357" y="210" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">43 mg/kg</text>

  <!-- Climate inputs -->
  <rect x="65" y="235" width="195" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="77" y="255" fill="#8B949E" font-family="monospace" font-size="11">Temperature</text>
  <text x="77" y="280" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">24.8 &deg;C</text>

  <rect x="275" y="235" width="195" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="287" y="255" fill="#8B949E" font-family="monospace" font-size="11">Humidity</text>
  <text x="287" y="280" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">82.4 %</text>

  <rect x="65" y="305" width="195" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="77" y="325" fill="#8B949E" font-family="monospace" font-size="11">Soil pH</text>
  <text x="77" y="350" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">6.50 pH</text>

  <rect x="275" y="305" width="195" height="55" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="287" y="325" fill="#8B949E" font-family="monospace" font-size="11">Rainfall</text>
  <text x="287" y="350" fill="#E6EDF3" font-family="monospace" font-size="16" font-weight="bold">202.9 mm</text>

  <!-- Submit Button -->
  <rect x="65" y="380" width="405" height="48" rx="6" fill="#1F6FEB"/>
  <text x="180" y="410" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="bold">RUN ML PREDICTION &rarr;</text>

  <!-- Pipeline status in panel -->
  <rect x="65" y="445" width="405" height="165" rx="6" fill="#0D1117" stroke="#21262D"/>
  <text x="80" y="475" fill="#8B949E" font-family="monospace" font-size="12">PIPELINE LOGS</text>
  <text x="80" y="500" fill="#7EE787" font-family="monospace" font-size="11">&bull; Loaded XGBoost &amp; DecisionTree weights</text>
  <text x="80" y="525" fill="#7EE787" font-family="monospace" font-size="11">&bull; Feature vector: [88, 42, 43, 24.8, 82.4, 6.5, 202.9]</text>
  <text x="80" y="550" fill="#7EE787" font-family="monospace" font-size="11">&bull; Normalization complete (StandardScaler)</text>
  <text x="80" y="575" fill="#58A6FF" font-family="monospace" font-size="11">&bull; Inference latency: 18.4ms (FastAPI backend)</text>

  <!-- Right Results Panel -->
  <rect x="530" y="75" width="630" height="560" rx="8" fill="#161B22" stroke="#30363D" stroke-width="1"/>
  <text x="560" y="115" fill="#7EE787" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="bold">PREDICTED RECOMMENDATION</text>
  <text x="560" y="138" fill="#8B949E" font-family="monospace" font-size="12">Multi-class classification probability distribution</text>

  <!-- Highlight Box: Rice -->
  <rect x="560" y="165" width="570" height="120" rx="6" fill="#0D1117" stroke="#238636" stroke-width="1.5"/>
  <text x="585" y="205" fill="#E6EDF3" font-family="'Syne', sans-serif" font-size="28" font-weight="bold">RICE (Oryza sativa)</text>
  <rect x="990" y="185" width="115" height="28" rx="4" fill="#238636"/>
  <text x="1005" y="204" fill="#FFFFFF" font-family="monospace" font-size="13" font-weight="bold">94.2% MATCH</text>
  <text x="585" y="240" fill="#8B949E" font-family="'Space Grotesk', sans-serif" font-size="13">Optimal conditions satisfied: high rainfall (202.9mm), high humidity (82.4%), suitable NPK ratios.</text>
  <rect x="585" y="260" width="520" height="8" rx="4" fill="#21262D"/>
  <rect x="585" y="260" width="490" height="8" rx="4" fill="#2EA043"/>

  <!-- Secondary recommendations -->
  <text x="560" y="325" fill="#8B949E" font-family="monospace" font-size="13" font-weight="bold">OTHER CANDIDATES</text>
  
  <rect x="560" y="345" width="570" height="55" rx="6" fill="#0D1117" stroke="#30363D"/>
  <text x="580" y="378" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="bold">JUTE</text>
  <text x="1050" y="378" fill="#8B949E" font-family="monospace" font-size="14">3.8%</text>
  <rect x="700" y="370" width="320" height="6" rx="3" fill="#21262D"/>
  <rect x="700" y="370" width="25" height="6" rx="3" fill="#58A6FF"/>

  <rect x="560" y="415" width="570" height="55" rx="6" fill="#0D1117" stroke="#30363D"/>
  <text x="580" y="448" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="bold">MAIZE</text>
  <text x="1050" y="448" fill="#8B949E" font-family="monospace" font-size="14">1.4%</text>
  <rect x="700" y="440" width="320" height="6" rx="3" fill="#21262D"/>
  <rect x="700" y="440" width="12" height="6" rx="3" fill="#58A6FF"/>

  <!-- Model evaluation summary -->
  <rect x="560" y="490" width="570" height="120" rx="6" fill="#0D1117" stroke="#30363D"/>
  <text x="580" y="520" fill="#E6EDF3" font-family="monospace" font-size="13" font-weight="bold">MODEL EVALUATION SUMMARY</text>
  <text x="580" y="550" fill="#8B949E" font-family="monospace" font-size="12">&bull; Architecture: XGBoost Classifier + Decision Tree Ensembles</text>
  <text x="580" y="575" fill="#8B949E" font-family="monospace" font-size="12">&bull; Cross-validation: 5-Fold Stratified K-Fold on 22 Crop Classes</text>
</svg>`;

// 2. OBJECT DETECTION & TRACKING
const objectDetectionThumbnail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <rect width="1200" height="675" fill="#0B0F14"/>
  <!-- Top Bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#141A22" border-bottom="1px solid #232B36"/>
  <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
  <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
  <circle cx="68" cy="24" r="6" fill="#27C93F"/>
  <text x="100" y="29" fill="#8B949E" font-family="monospace" font-size="14">OpenCV + PyTorch YOLO Video Tracking Pipeline</text>
  <text x="1040" y="29" fill="#00E5FF" font-family="monospace" font-size="13" font-weight="bold">FPS: 38.4 | GPU</text>

  <!-- Video Stream Canvas Simulator -->
  <rect x="40" y="70" width="820" height="565" rx="6" fill="#101720" stroke="#232B36"/>
  
  <!-- Street & Environment wireframe -->
  <path d="M 40 450 L 380 260 L 520 260 L 860 450 Z" fill="#172230" opacity="0.6"/>
  <line x1="450" y1="260" x2="450" y2="635" stroke="#2E4057" stroke-width="2" stroke-dasharray="8,8"/>

  <!-- Bounding Box 1: Car -->
  <rect x="180" y="320" width="220" height="150" fill="rgba(0, 229, 255, 0.08)" stroke="#00E5FF" stroke-width="2"/>
  <rect x="180" y="296" width="110" height="24" fill="#00E5FF"/>
  <text x="186" y="313" fill="#0B0F14" font-family="monospace" font-size="12" font-weight="bold">car: 0.94 #01</text>
  <circle cx="290" cy="395" r="4" fill="#00E5FF"/>

  <!-- Bounding Box 2: Person / Pedestrian -->
  <rect x="520" y="280" width="90" height="190" fill="rgba(255, 61, 113, 0.08)" stroke="#FF3D71" stroke-width="2"/>
  <rect x="520" y="256" width="130" height="24" fill="#FF3D71"/>
  <text x="526" y="273" fill="#FFFFFF" font-family="monospace" font-size="12" font-weight="bold">person: 0.89 #02</text>
  <circle cx="565" cy="375" r="4" fill="#FF3D71"/>

  <!-- Bounding Box 3: Traffic Light / Object -->
  <rect x="680" y="210" width="60" height="110" fill="rgba(0, 230, 118, 0.08)" stroke="#00E676" stroke-width="2"/>
  <rect x="680" y="186" width="145" height="24" fill="#00E676"/>
  <text x="686" y="203" fill="#0B0F14" font-family="monospace" font-size="11" font-weight="bold">traffic light: 0.91</text>

  <!-- HUD Telemetry on video -->
  <rect x="60" y="90" width="260" height="75" rx="4" fill="rgba(11, 15, 20, 0.8)" stroke="#232B36"/>
  <text x="75" y="112" fill="#8B949E" font-family="monospace" font-size="11">INFERENCE LATENCY: 26.0 ms</text>
  <text x="75" y="132" fill="#8B949E" font-family="monospace" font-size="11">ACTIVE TRACKS: 3 OBJECTS</text>
  <text x="75" y="152" fill="#00E5FF" font-family="monospace" font-size="11">MODEL: PyTorch YOLOv8n</text>

  <!-- Right Inspector Sidebar -->
  <rect x="880" y="70" width="280" height="565" rx="6" fill="#141A22" stroke="#232B36"/>
  <text x="900" y="105" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="bold">OBJECT TRACKER</text>
  <text x="900" y="125" fill="#8B949E" font-family="monospace" font-size="11">OpenCV DeepSORT / ByteTrack</text>

  <!-- Track item 1 -->
  <rect x="900" y="150" width="240" height="70" rx="4" fill="#0D1117" stroke="#232B36"/>
  <text x="912" y="172" fill="#00E5FF" font-family="monospace" font-size="12" font-weight="bold">Track ID #01: car</text>
  <text x="912" y="192" fill="#8B949E" font-family="monospace" font-size="10">BBox: [180, 320, 220, 150]</text>
  <text x="912" y="208" fill="#8B949E" font-family="monospace" font-size="10">Conf: 94.2% | State: Active</text>

  <!-- Track item 2 -->
  <rect x="900" y="230" width="240" height="70" rx="4" fill="#0D1117" stroke="#232B36"/>
  <text x="912" y="252" fill="#FF3D71" font-family="monospace" font-size="12" font-weight="bold">Track ID #02: person</text>
  <text x="912" y="272" fill="#8B949E" font-family="monospace" font-size="10">BBox: [520, 280, 90, 190]</text>
  <text x="912" y="288" fill="#8B949E" font-family="monospace" font-size="10">Conf: 89.1% | State: Active</text>

  <!-- Pipeline metrics -->
  <rect x="900" y="320" width="240" height="295" rx="4" fill="#0D1117" stroke="#232B36"/>
  <text x="912" y="345" fill="#E6EDF3" font-family="monospace" font-size="11" font-weight="bold">PIPELINE SETTINGS</text>
  <text x="912" y="375" fill="#8B949E" font-family="monospace" font-size="11">&bull; Conf Threshold: 0.45</text>
  <text x="912" y="405" fill="#8B949E" font-family="monospace" font-size="11">&bull; NMS IoU: 0.50</text>
  <text x="912" y="435" fill="#8B949E" font-family="monospace" font-size="11">&bull; Max Age: 30 frames</text>
  <text x="912" y="465" fill="#8B949E" font-family="monospace" font-size="11">&bull; Backend: OpenCV cv2</text>
  <text x="912" y="495" fill="#8B949E" font-family="monospace" font-size="11">&bull; Device: CUDA / GPU</text>
  <rect x="912" y="530" width="216" height="60" rx="4" fill="#1F2937"/>
  <text x="922" y="555" fill="#00E5FF" font-family="monospace" font-size="11">Real-time Frame Loop</text>
  <text x="922" y="575" fill="#9CA3AF" font-family="monospace" font-size="10">VideoCapture &rarr; Infer &rarr; Draw</text>
</svg>`;

// 3. RAG ASSISTANT
const ragAssistantThumbnail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <rect width="1200" height="675" fill="#0D1117"/>
  <!-- Top Bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#161B22" border-bottom="1px solid #30363D"/>
  <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
  <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
  <circle cx="68" cy="24" r="6" fill="#27C93F"/>
  <text x="100" y="29" fill="#8B949E" font-family="monospace" font-size="14">RAG Assistant &bull; Vector Document Question Answering</text>
  <rect x="1030" y="14" width="140" height="22" rx="4" fill="#1F6FEB"/>
  <text x="1042" y="29" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">LANGCHAIN + FASTAPI</text>

  <!-- Left: Ingestion & Vector Chunks -->
  <rect x="40" y="75" width="360" height="560" rx="8" fill="#161B22" stroke="#30363D" stroke-width="1"/>
  <text x="65" y="115" fill="#58A6FF" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="bold">INDEXED DOCUMENTS</text>
  
  <rect x="65" y="135" width="310" height="60" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="80" y="160" fill="#E6EDF3" font-family="monospace" font-size="12" font-weight="bold">&#128196; technical_manual.pdf</text>
  <text x="80" y="180" fill="#8B949E" font-family="monospace" font-size="10">14 pages &bull; 48 text chunks embedded</text>

  <text x="65" y="225" fill="#8B949E" font-family="monospace" font-size="12" font-weight="bold">TOP RETRIEVED CHUNKS</text>
  
  <rect x="65" y="245" width="310" height="110" rx="4" fill="#0D1117" stroke="#238636"/>
  <text x="77" y="268" fill="#7EE787" font-family="monospace" font-size="11" font-weight="bold">Chunk #12 (Cosine Sim: 0.892)</text>
  <text x="77" y="290" fill="#C9D1D9" font-family="'Space Grotesk', sans-serif" font-size="11">"...the maximum operational voltage must not exceed 48V DC during normal step-down operation..."</text>
  <text x="77" y="340" fill="#8B949E" font-family="monospace" font-size="10">Source: Page 4, Paragraph 2</text>

  <rect x="65" y="365" width="310" height="110" rx="4" fill="#0D1117" stroke="#30363D"/>
  <text x="77" y="388" fill="#58A6FF" font-family="monospace" font-size="11" font-weight="bold">Chunk #18 (Cosine Sim: 0.764)</text>
  <text x="77" y="410" fill="#C9D1D9" font-family="'Space Grotesk', sans-serif" font-size="11">"...thermal dissipation thresholds engage safety shutoff if temperature exceeds 85&deg;C..."</text>
  <text x="77" y="460" fill="#8B949E" font-family="monospace" font-size="10">Source: Page 7, Table 1</text>

  <!-- Right: Chat QA Stream Interface -->
  <rect x="430" y="75" width="730" height="560" rx="8" fill="#161B22" stroke="#30363D" stroke-width="1"/>
  
  <!-- User message -->
  <rect x="560" y="105" width="570" height="60" rx="6" fill="#1F6FEB"/>
  <text x="580" y="132" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="500">What is the maximum allowed voltage and what happens when it overheats?</text>
  <text x="580" y="152" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="10">User Query &bull; 10:42 AM</text>

  <!-- LLM Assistant Response -->
  <rect x="460" y="185" width="670" height="340" rx="6" fill="#0D1117" stroke="#30363D"/>
  <text x="485" y="218" fill="#58A6FF" font-family="monospace" font-size="12" font-weight="bold">&#129302; RAG ASSISTANT (Grounded Context)</text>
  
  <text x="485" y="255" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="14" line-height="1.6">Based on the retrieved document sections:</text>
  <text x="485" y="290" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="14">1. <tspan font-weight="bold">Maximum Voltage:</tspan> The operating voltage must not exceed <tspan fill="#7EE787" font-weight="bold">48V DC</tspan> during normal step-down operation [Chunk #12].</text>
  <text x="485" y="330" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="14">2. <tspan font-weight="bold">Thermal Protection:</tspan> If temperatures cross <tspan fill="#7EE787" font-weight="bold">85&deg;C</tspan>, the safety shutoff is automatically triggered [Chunk #18].</text>
  
  <!-- Citation Badges -->
  <rect x="485" y="380" width="220" height="28" rx="4" fill="#161B22" stroke="#238636"/>
  <text x="498" y="398" fill="#7EE787" font-family="monospace" font-size="11">&#10003; Grounded in 2 Document Chunks</text>

  <rect x="720" y="380" width="160" height="28" rx="4" fill="#161B22" stroke="#30363D"/>
  <text x="733" y="398" fill="#8B949E" font-family="monospace" font-size="11">Hallucination Risk: Low</text>

  <!-- Query input box -->
  <rect x="460" y="550" width="670" height="55" rx="6" fill="#0D1117" stroke="#30363D"/>
  <text x="480" y="583" fill="#8B949E" font-family="'Space Grotesk', sans-serif" font-size="13">Ask a follow up question about technical_manual.pdf...</text>
  <rect x="1050" y="560" width="65" height="35" rx="4" fill="#1F6FEB"/>
  <text x="1065" y="582" fill="#FFFFFF" font-family="monospace" font-size="12">SEND</text>
</svg>`;

// 4. CNN CLASSIFIER
const cnnClassifierThumbnail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <rect width="1200" height="675" fill="#0F141C"/>
  <!-- Top Bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#161E2E" border-bottom="1px solid #273449"/>
  <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
  <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
  <circle cx="68" cy="24" r="6" fill="#27C93F"/>
  <text x="100" y="29" fill="#8B949E" font-family="monospace" font-size="14">PyTorch CNN Image Classification &bull; Training &amp; Inference</text>
  <text x="1010" y="29" fill="#A78BFA" font-family="monospace" font-size="13" font-weight="bold">EPOCH 30/30 &bull; 91.4% ACC</text>

  <!-- Left: Uploaded Image & Prediction Breakdown -->
  <rect x="40" y="75" width="500" height="560" rx="8" fill="#161E2E" stroke="#273449" stroke-width="1"/>
  <text x="65" y="115" fill="#A78BFA" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="bold">INPUT PREDICTION VIEW</text>
  
  <!-- Image container -->
  <rect x="65" y="140" width="450" height="240" rx="6" fill="#0B0E14" stroke="#273449"/>
  <rect x="180" y="170" width="220" height="180" rx="4" fill="#1E293B" stroke="#6366F1" stroke-width="1.5"/>
  <text x="215" y="265" fill="#818CF8" font-family="monospace" font-size="14">[ 224 x 224 x 3 Tensor ]</text>
  <text x="235" y="285" fill="#94A3B8" font-family="monospace" font-size="11">Normalized RGB</text>

  <!-- Class probabilities -->
  <text x="65" y="415" fill="#E2E8F0" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="bold">SOFTMAX PROBABILITIES</text>
  
  <text x="65" y="450" fill="#E2E8F0" font-family="monospace" font-size="13">Class 01: [Golden Retriever]</text>
  <text x="460" y="450" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">92.4%</text>
  <rect x="65" y="460" width="450" height="8" rx="4" fill="#1E293B"/>
  <rect x="65" y="460" width="415" height="8" rx="4" fill="#10B981"/>

  <text x="65" y="500" fill="#94A3B8" font-family="monospace" font-size="13">Class 02: [Labrador]</text>
  <text x="475" y="500" fill="#94A3B8" font-family="monospace" font-size="13">5.1%</text>
  <rect x="65" y="510" width="450" height="8" rx="4" fill="#1E293B"/>
  <rect x="65" y="510" width="23" height="8" rx="4" fill="#6366F1"/>

  <text x="65" y="550" fill="#94A3B8" font-family="monospace" font-size="13">Class 03: [Beagle]</text>
  <text x="475" y="550" fill="#94A3B8" font-family="monospace" font-size="13">1.8%</text>
  <rect x="65" y="560" width="450" height="8" rx="4" fill="#1E293B"/>
  <rect x="65" y="560" width="8" height="8" rx="4" fill="#6366F1"/>

  <!-- Right: Training Curves & Confusion Matrix -->
  <rect x="570" y="75" width="590" height="560" rx="8" fill="#161E2E" stroke="#273449" stroke-width="1"/>
  <text x="595" y="115" fill="#38BDF8" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="bold">TRAINING LOSS &amp; ACCURACY</text>
  
  <!-- Loss curve chart simulation -->
  <rect x="595" y="140" width="540" height="200" rx="6" fill="#0B0E14" stroke="#273449"/>
  <line x1="635" y1="300" x2="1100" y2="300" stroke="#334155" stroke-width="1"/>
  <line x1="635" y1="160" x2="635" y2="300" stroke="#334155" stroke-width="1"/>
  
  <!-- Loss path -->
  <path d="M 645 170 Q 720 250 820 270 T 1090 285" fill="none" stroke="#F43F5E" stroke-width="2.5"/>
  <!-- Val Accuracy path -->
  <path d="M 645 290 Q 720 210 820 185 T 1090 170" fill="none" stroke="#10B981" stroke-width="2.5"/>
  <text x="660" y="180" fill="#F43F5E" font-family="monospace" font-size="11">&bull; Train Loss</text>
  <text x="760" y="180" fill="#10B981" font-family="monospace" font-size="11">&bull; Val Accuracy (91.4%)</text>

  <!-- Confusion Matrix grid -->
  <text x="595" y="375" fill="#E2E8F0" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="bold">CONFUSION MATRIX (4x4 SAMPLE)</text>
  <rect x="595" y="395" width="540" height="210" rx="6" fill="#0B0E14" stroke="#273449"/>
  
  <!-- 4x4 squares -->
  <rect x="680" y="420" width="45" height="35" fill="#1E3A8A"/><text x="693" y="442" fill="#93C5FD" font-family="monospace" font-size="12">142</text>
  <rect x="730" y="420" width="45" height="35" fill="#0F172A"/><text x="748" y="442" fill="#64748B" font-family="monospace" font-size="12">6</text>
  <rect x="780" y="420" width="45" height="35" fill="#0F172A"/><text x="798" y="442" fill="#64748B" font-family="monospace" font-size="12">2</text>
  <rect x="830" y="420" width="45" height="35" fill="#0F172A"/><text x="848" y="442" fill="#64748B" font-family="monospace" font-size="12">0</text>

  <rect x="680" y="460" width="45" height="35" fill="#0F172A"/><text x="698" y="482" fill="#64748B" font-family="monospace" font-size="12">8</text>
  <rect x="730" y="460" width="45" height="35" fill="#1E3A8A"/><text x="743" y="482" fill="#93C5FD" font-family="monospace" font-size="12">138</text>
  <rect x="780" y="460" width="45" height="35" fill="#0F172A"/><text x="798" y="482" fill="#64748B" font-family="monospace" font-size="12">4</text>
  <rect x="830" y="460" width="45" height="35" fill="#0F172A"/><text x="848" y="482" fill="#64748B" font-family="monospace" font-size="12">1</text>

  <text x="910" y="450" fill="#94A3B8" font-family="monospace" font-size="11">Diagonal: True Positives</text>
  <text x="910" y="475" fill="#94A3B8" font-family="monospace" font-size="11">Optimizer: Adam (lr=0.001)</text>
  <text x="910" y="500" fill="#94A3B8" font-family="monospace" font-size="11">Loss: CrossEntropyLoss</text>
</svg>`;

// 5. FACE RECOGNITION
const faceRecognitionThumbnail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <rect width="1200" height="675" fill="#0B1319"/>
  <!-- Top Bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#111F2B" border-bottom="1px solid #1F364B"/>
  <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
  <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
  <circle cx="68" cy="24" r="6" fill="#27C93F"/>
  <text x="100" y="29" fill="#8B949E" font-family="monospace" font-size="14">OpenCV + Face Embeddings Attendance Verification</text>
  <rect x="1020" y="14" width="150" height="22" rx="4" fill="#00B0FF"/>
  <text x="1035" y="29" fill="#000000" font-family="monospace" font-size="11" font-weight="bold">DATABASE CONNECTED</text>

  <!-- Left: Live Camera View -->
  <rect x="40" y="75" width="700" height="560" rx="8" fill="#111F2B" stroke="#1F364B" stroke-width="1"/>
  
  <!-- Camera Frame Visual -->
  <rect x="65" y="105" width="650" height="420" rx="6" fill="#070C10" stroke="#1F364B"/>
  
  <!-- Detected Face Bounding Box -->
  <rect x="270" y="170" width="220" height="260" rx="4" fill="rgba(0, 176, 255, 0.05)" stroke="#00B0FF" stroke-width="2" stroke-dasharray="10,4"/>
  <!-- Landmark points -->
  <circle cx="330" cy="250" r="4" fill="#00B0FF"/>
  <circle cx="430" cy="250" r="4" fill="#00B0FF"/>
  <circle cx="380" cy="300" r="4" fill="#00B0FF"/>
  <circle cx="350" cy="350" r="3" fill="#00B0FF"/>
  <circle cx="410" cy="350" r="3" fill="#00B0FF"/>

  <rect x="270" y="138" width="180" height="28" fill="#00B0FF"/>
  <text x="280" y="157" fill="#000000" font-family="monospace" font-size="12" font-weight="bold">G. MITESH &bull; ID: 1042</text>
  
  <rect x="270" y="435" width="220" height="24" fill="rgba(0, 176, 255, 0.2)"/>
  <text x="280" y="451" fill="#00B0FF" font-family="monospace" font-size="11">Embedding Dist: 0.28 (&lt; 0.60)</text>

  <rect x="65" y="540" width="650" height="70" rx="4" fill="#070C10" stroke="#1F364B"/>
  <text x="85" y="568" fill="#00E676" font-family="monospace" font-size="13" font-weight="bold">&#10003; ATTENDANCE LOGGED TO MONGODB</text>
  <text x="85" y="590" fill="#8B949E" font-family="monospace" font-size="11">Timestamp: 2025-08-15 09:30:14 IST &bull; Status: Present &bull; Camera: CAM_01</text>

  <!-- Right: Registered User Embedding Match Inspector -->
  <rect x="770" y="75" width="390" height="560" rx="8" fill="#111F2B" stroke="#1F364B" stroke-width="1"/>
  <text x="795" y="115" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="bold">FACE EMBEDDING MATCHER</text>
  <text x="795" y="135" fill="#8B949E" font-family="monospace" font-size="11">128-d / 512-d Metric Learning Vector</text>

  <rect x="795" y="160" width="340" height="140" rx="6" fill="#070C10" stroke="#1F364B"/>
  <text x="810" y="190" fill="#00B0FF" font-family="monospace" font-size="11">EXTRACTED VECTOR (SAMPLE):</text>
  <text x="810" y="215" fill="#8B949E" font-family="monospace" font-size="10">[-0.142, 0.884, -0.012, 0.419, -0.771,</text>
  <text x="810" y="235" fill="#8B949E" font-family="monospace" font-size="10"> 0.204, 0.518, -0.329, 0.118, -0.094,</text>
  <text x="810" y="255" fill="#8B949E" font-family="monospace" font-size="10"> 0.631, -0.442, 0.291, 0.778, ... +114]</text>

  <text x="795" y="330" fill="#E6EDF3" font-family="monospace" font-size="12" font-weight="bold">RECENT ATTENDANCE LOG</text>
  <rect x="795" y="350" width="340" height="50" rx="4" fill="#070C10" stroke="#1F364B"/>
  <text x="810" y="375" fill="#E6EDF3" font-family="monospace" font-size="11">G. Mitesh - 09:30:14 AM - Verified</text>
  <rect x="795" y="410" width="340" height="50" rx="4" fill="#070C10" stroke="#1F364B"/>
  <text x="810" y="435" fill="#E6EDF3" font-family="monospace" font-size="11">User_204 - 09:28:40 AM - Verified</text>
  <rect x="795" y="470" width="340" height="50" rx="4" fill="#070C10" stroke="#1F364B"/>
  <text x="810" y="495" fill="#EF4444" font-family="monospace" font-size="11">Unknown Face - 09:24:11 AM - Rejected</text>
</svg>`;

// 6. KAIZ STUDIO
const kaizStudioThumbnail = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
  <rect width="1200" height="675" fill="#121217"/>
  <!-- Top Bar -->
  <rect x="0" y="0" width="1200" height="48" fill="#1C1C24" border-bottom="1px solid #2D2D3A"/>
  <circle cx="28" cy="24" r="6" fill="#FF5F56"/>
  <circle cx="48" cy="24" r="6" fill="#FFBD2E"/>
  <circle cx="68" cy="24" r="6" fill="#27C93F"/>
  <text x="100" y="29" fill="#9D9DAF" font-family="monospace" font-size="14">KAIZ Studio &bull; Adobe Premiere Pro + AI Post-Production Timeline</text>
  <rect x="1040" y="14" width="130" height="22" rx="4" fill="#9945FF"/>
  <text x="1055" y="29" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">4K SEQUENCE</text>

  <!-- Program Monitor (Video Preview) -->
  <rect x="40" y="75" width="600" height="340" rx="6" fill="#0A0A0E" stroke="#2D2D3A"/>
  
  <!-- Composition Mockup in monitor -->
  <rect x="70" y="95" width="540" height="300" fill="#181822"/>
  <text x="100" y="230" fill="#FFFFFF" font-family="'Syne', sans-serif" font-size="32" font-weight="800">KAIZ STUDIO</text>
  <text x="100" y="260" fill="#00E5FF" font-family="monospace" font-size="14">AI-ASSISTED MOTION &amp; EDITING</text>
  <rect x="100" y="280" width="160" height="4" fill="#9945FF"/>

  <!-- Audio Inspector & Tool Panels -->
  <rect x="670" y="75" width="490" height="340" rx="6" fill="#1C1C24" stroke="#2D2D3A"/>
  <text x="695" y="110" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="bold">CREATIVE TOOL STACK</text>
  
  <rect x="695" y="130" width="100" height="36" rx="4" fill="#4FC3F7" fill-opacity="0.2" stroke="#4FC3F7"/>
  <text x="730" y="153" fill="#4FC3F7" font-family="monospace" font-size="13" font-weight="bold">Pr</text>

  <rect x="810" y="130" width="100" height="36" rx="4" fill="#9FA8DA" fill-opacity="0.2" stroke="#9FA8DA"/>
  <text x="845" y="153" fill="#9FA8DA" font-family="monospace" font-size="13" font-weight="bold">Ae</text>

  <rect x="925" y="130" width="100" height="36" rx="4" fill="#31A8FF" fill-opacity="0.2" stroke="#31A8FF"/>
  <text x="960" y="153" fill="#31A8FF" font-family="monospace" font-size="13" font-weight="bold">Ps</text>

  <rect x="1040" y="130" width="100" height="36" rx="4" fill="#FF9A00" fill-opacity="0.2" stroke="#FF9A00"/>
  <text x="1075" y="153" fill="#FF9A00" font-family="monospace" font-size="13" font-weight="bold">Ai</text>

  <text x="695" y="200" fill="#9D9DAF" font-family="monospace" font-size="12">AI AUTOMATION FEATURES</text>
  <text x="695" y="230" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="13">&bull; Automated speech transcription &amp; dynamic subtitle generation</text>
  <text x="695" y="260" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="13">&bull; Audio dynamic leveling &amp; noise suppression in Audition</text>
  <text x="695" y="290" fill="#E6EDF3" font-family="'Space Grotesk', sans-serif" font-size="13">&bull; Color grade LUT matching &amp; asset pre-generation</text>

  <!-- Multi-track Editing Timeline at Bottom -->
  <rect x="40" y="440" width="1120" height="195" rx="6" fill="#1C1C24" stroke="#2D2D3A"/>
  
  <!-- Timeline header -->
  <rect x="40" y="440" width="1120" height="32" fill="#14141A"/>
  <text x="60" y="462" fill="#9D9DAF" font-family="monospace" font-size="11">TIMELINE &bull; Sequence 01 &bull; 00:01:24:18</text>
  <line x1="480" y1="440" x2="480" y2="635" stroke="#FF3D71" stroke-width="2"/>

  <!-- Video Track V3 (Graphics) -->
  <text x="60" y="495" fill="#9D9DAF" font-family="monospace" font-size="10">V3</text>
  <rect x="120" y="480" width="220" height="24" rx="2" fill="#9FA8DA" opacity="0.8"/>
  <rect x="360" y="480" width="310" height="24" rx="2" fill="#9FA8DA" opacity="0.8"/>
  <text x="130" y="496" fill="#121217" font-family="monospace" font-size="10" font-weight="bold">Title_LowerThird.mogrt</text>

  <!-- Video Track V2 (Overlays / B-Roll) -->
  <text x="60" y="530" fill="#9D9DAF" font-family="monospace" font-size="10">V2</text>
  <rect x="200" y="515" width="180" height="24" rx="2" fill="#4FC3F7" opacity="0.8"/>
  <rect x="420" y="515" width="280" height="24" rx="2" fill="#4FC3F7" opacity="0.8"/>
  <text x="210" y="531" fill="#121217" font-family="monospace" font-size="10" font-weight="bold">B-Roll_A04.mp4</text>

  <!-- Video Track V1 (Main Footage) -->
  <text x="60" y="565" fill="#9D9DAF" font-family="monospace" font-size="10">V1</text>
  <rect x="100" y="550" width="340" height="24" rx="2" fill="#3B82F6"/>
  <rect x="450" y="550" width="400" height="24" rx="2" fill="#3B82F6"/>
  <text x="110" y="566" fill="#FFFFFF" font-family="monospace" font-size="10" font-weight="bold">Main_Cam_A01.mov</text>

  <!-- Audio Tracks A1 / A2 -->
  <text x="60" y="605" fill="#9D9DAF" font-family="monospace" font-size="10">A1</text>
  <rect x="100" y="590" width="750" height="24" rx="2" fill="#00E676" opacity="0.7"/>
  <text x="110" y="606" fill="#121217" font-family="monospace" font-size="10" font-weight="bold">Voice_Dialogue_Mastered.wav (Audition Cleanup)</text>
</svg>`;

const assets = [
  { dir: 'agroxai', file: 'thumbnail.svg', content: agroxaiThumbnail },
  { dir: 'agroxai', file: 'screenshot-1.svg', content: agroxaiThumbnail },
  { dir: 'agroxai', file: 'architecture.svg', content: agroxaiThumbnail },

  { dir: 'object-detection', file: 'thumbnail.svg', content: objectDetectionThumbnail },
  { dir: 'object-detection', file: 'screenshot-1.svg', content: objectDetectionThumbnail },
  { dir: 'object-detection', file: 'architecture.svg', content: objectDetectionThumbnail },

  { dir: 'rag-assistant', file: 'thumbnail.svg', content: ragAssistantThumbnail },
  { dir: 'rag-assistant', file: 'screenshot-1.svg', content: ragAssistantThumbnail },
  { dir: 'rag-assistant', file: 'architecture.svg', content: ragAssistantThumbnail },

  { dir: 'cnn-classifier', file: 'thumbnail.svg', content: cnnClassifierThumbnail },
  { dir: 'cnn-classifier', file: 'screenshot-1.svg', content: cnnClassifierThumbnail },
  { dir: 'cnn-classifier', file: 'architecture.svg', content: cnnClassifierThumbnail },

  { dir: 'face-recognition', file: 'thumbnail.svg', content: faceRecognitionThumbnail },
  { dir: 'face-recognition', file: 'screenshot-1.svg', content: faceRecognitionThumbnail },
  { dir: 'face-recognition', file: 'architecture.svg', content: faceRecognitionThumbnail },

  { dir: 'kaiz-studio', file: 'thumbnail.svg', content: kaizStudioThumbnail },
  { dir: 'kaiz-studio', file: 'screenshot-1.svg', content: kaizStudioThumbnail },
  { dir: 'kaiz-studio', file: 'architecture.svg', content: kaizStudioThumbnail }
];

for (const asset of assets) {
  const filePath = path.join(publicProjects, asset.dir, asset.file);
  fs.writeFileSync(filePath, asset.content, 'utf8');
  console.log('Created asset:', filePath);
}

console.log('All project assets generated successfully!');
