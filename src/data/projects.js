/**
 * Central Project Data System
 * 
 * Featured Projects:
 * 01 — AgroXAI (Crop Recommendation System)
 * 02 — VisionAttendance (AI Face Recognition Attendance System)
 * 03 — VisionTrack (Real-Time Object Detection & Tracking)
 * 04 — DocMind (Document Intelligence / RAG Assistant)
 * 05 — JOBSHIELDXAI (AI Job Scam & Fraud Detection)
 * 06 — AIVoiceStudio (AI Voice Studio)
 * 07 — NEXA (Business Intelligence & Operations Demo)
 */

export const PROJECTS = [
  {
    id: 'agroxai',
    number: '01',
    num: '01',
    title: 'AgroXAI',
    subtitle: 'Crop Recommendation System',
    category: 'MACHINE LEARNING / FULL-STACK AI',
    status: 'Completed',
    year: '2025',
    featured: true,
    shortDescription: 'A machine-learning application that recommends suitable crops from agricultural inputs through a web interface.',
    description: 'A machine-learning application that recommends suitable crops from agricultural inputs through a web interface.',
    problem: 'Agricultural decision-making and crop selection depend heavily on complex soil chemistry and environmental metrics (NPK ratios, pH, rainfall, humidity, temperature). Without accessible data-driven tools, farmers risk sub-optimal crop selection and lower yields.',
    whatIBuilt: 'Built an end-to-end crop recommendation platform integrating data cleaning, XGBoost model training and evaluation, FastAPI inference backend, and an interactive React web dashboard.',
    technologies: [
      'Python',
      'XGBoost',
      'React',
      'MongoDB'
    ],
    architecture: 'Web Form Input → Feature Normalization & Preprocessing (Scikit-Learn) → XGBoost Multi-Class Classifier → FastAPI REST Endpoint → React Dashboard',
    howItWorks: [
      { step: 'Input', desc: 'User inputs soil NPK ratios, rainfall, humidity, and temperature values via web form.' },
      { step: 'Preprocessing', desc: 'Values are normalized and transformed into numerical feature vectors.' },
      { step: 'Model', desc: 'Trained and evaluated XGBoost and Decision Tree multi-class classifiers on agricultural datasets.' },
      { step: 'Inference', desc: 'FastAPI endpoint serves model predictions and returns top recommendation probabilities.' },
      { step: 'Dashboard', desc: 'Interactive React dashboard visualizes recommended crops with confidence breakdown.' }
    ],
    keyFeatures: [
      'Multi-parameter crop recommendation based on NPK, pH, rainfall, and temperature',
      'Explainable prediction confidence breakdown for top crops',
      'FastAPI real-time inference API for low-latency predictions',
      'Modern, responsive web dashboard for agricultural decision support'
    ],
    whatIWorkedOn: [
      'Cleaned agricultural dataset, handled missing values, and performed exploratory data analysis with Pandas.',
      'Trained and compared Decision Tree and XGBoost classifiers with cross-validation.',
      'Constructed a REST API wrapper with FastAPI to serve model predictions in real time.',
      'Designed and built a clean React interface to input parameters and visualize recommendation outputs.'
    ],
    whatILearned: 'How to properly clean and balance multi-class agricultural data, handle feature normalization across disparate scales, tune gradient-boosted trees for high accuracy, and connect backend ML inference pipelines to responsive frontends.',
    role: 'ML Pipeline & Full-Stack Developer',
    image: '/projects/agroxai/screenshot.png',
    screenshots: [
      { title: 'AgroXAI Command Center', src: '/projects/agroxai/screenshot.png', desc: 'Satellite intelligence and predictive crop modeling command center' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/1kKUJbGNKbfJcaVCcpRtVDRy-BYaUGSj_/view?usp=sharing',
    liveDemo: 'https://drive.google.com/file/d/1kKUJbGNKbfJcaVCcpRtVDRy-BYaUGSj_/view?usp=sharing',
    visualType: 2,
  },
  {
    id: 'vision-attendance',
    number: '02',
    num: '02',
    title: 'VisionAttendance',
    subtitle: 'AI Face Recognition Attendance System',
    category: 'COMPUTER VISION / BIOMETRIC AI',
    status: 'Completed',
    year: '2025',
    featured: true,
    shortDescription: 'A face-recognition attendance system that identifies registered people from live camera or image input and records attendance.',
    description: 'A face-recognition attendance system that identifies registered people from live camera or image input and records attendance.',
    problem: 'Manual attendance logging and physical card swiping are prone to proxy attendance, bottleneck queues, and administrative overhead. Automated biometric recognition provides fast, reliable, contactless verification.',
    whatIBuilt: 'Built a real-time biometric attendance pipeline using FaceNet512 face embeddings, Euclidean distance thresholding, anti-duplicate debouncing, and SQLite vector persistence.',
    technologies: [
      'Python',
      'OpenCV',
      'DeepFace',
      'SQLite'
    ],
    architecture: 'Live Camera / Photo Upload → Face Detection & Alignment → DeepFace (FaceNet512 512-dim Embedding) → Euclidean Distance Matcher → SQLite / Vector Storage',
    howItWorks: [
      { step: 'Capture', desc: 'OpenCV captures live webcam streams or processes uploaded identity photos.' },
      { step: 'Face Detection', desc: 'Detects facial landmarks, crops facial bounding boxes, and normalizes alignment.' },
      { step: 'Embedding', desc: 'DeepFace extracts 512-dimensional biometric feature embeddings using FaceNet512.' },
      { step: 'Matching', desc: 'Calculates Euclidean distance against stored user embeddings with calibrated thresholding.' },
      { step: 'Logging', desc: 'Anti-duplicate debounce buffer ensures single verified attendance record logged to SQLite.' }
    ],
    keyFeatures: [
      'Live camera and batch photo attendance recognition',
      'FaceNet512 512-dimensional biometric embedding extraction',
      'Anti-duplicate cooldown buffer to prevent repeated logging',
      'Admin dashboard with live metrics, attendance history, and profile management'
    ],
    whatIWorkedOn: [
      'Configured face detection and cropping pipeline using OpenCV and DeepFace.',
      'Generated and stored baseline FaceNet512 vector embeddings for registered profiles.',
      'Implemented distance threshold logic to distinguish recognized users from unknown visitors.',
      'Built a full management dashboard for live attendance monitoring, enrollment, and attendance records.'
    ],
    whatILearned: 'How to extract and compare facial vector embeddings with metric learning, calibrate distance thresholds to minimize false positive matches, and manage real-time camera inference queues.',
    role: 'Computer Vision & Biometric Systems',
    image: '/projects/vision-attendance/screenshot.png',
    screenshots: [
      { title: 'VisionAttendance Operations Dashboard', src: '/projects/vision-attendance/screenshot.png', desc: 'Biometric operations dashboard with recognition engine telemetry and attendance tracking' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/1F-nq894FtYgjyMdOm3dO3IAc49kkxV1A/view?usp=drive_link',
    liveDemo: 'https://drive.google.com/file/d/1F-nq894FtYgjyMdOm3dO3IAc49kkxV1A/view?usp=drive_link',
    visualType: 1,
  },
  {
    id: 'visiontrack',
    number: '03',
    num: '03',
    title: 'VisionTrack',
    subtitle: 'Real-Time Object Detection & Tracking',
    category: 'COMPUTER VISION / DEEP LEARNING',
    status: 'In Progress',
    year: '2025',
    featured: true,
    shortDescription: 'A computer-vision application that detects and tracks objects in video using YOLO and multi-object tracking.',
    description: 'A computer-vision application that detects and tracks objects in video using YOLO and multi-object tracking.',
    problem: 'Monitoring multi-stream video feeds for real-time security and traffic intelligence requires high-throughput object detection and reliable identity association across frames without dropped tracks.',
    whatIBuilt: 'Built a high-performance computer vision platform that streams video feeds, runs YOLOv8s inference for multi-class object detection, tracks object trajectories via ByteTrack, and aggregates telemetry on a live dashboard.',
    technologies: [
      'Python',
      'YOLO',
      'OpenCV',
      'ByteTrack'
    ],
    architecture: 'Video Stream Ingest → Frame Preprocessing & Tensor Batching → YOLOv8s Inference → Non-Maximum Suppression (NMS) & ByteTrack Association → Live Telemetry Dashboard',
    howItWorks: [
      { step: 'Video Stream', desc: 'OpenCV captures continuous video frames from camera feeds or video sources.' },
      { step: 'Frame Processing', desc: 'Frames are resized, normalized, and converted into tensor batches.' },
      { step: 'YOLO Inference', desc: 'YOLOv8s model outputs bounding box coordinates, class labels, and confidence scores.' },
      { step: 'Tracking & NMS', desc: 'Non-maximum suppression filters overlapping boxes; ByteTrack associates IDs across frames.' },
      { step: 'Analytics UI', desc: 'Live dashboard renders detection volume, FPS trend, and class distribution analytics.' }
    ],
    keyFeatures: [
      'Real-time multi-class object detection (person, vehicle, truck, bicycle, etc.)',
      'Multi-object tracking across video frames with persistent track IDs',
      'Live FPS trend monitoring, detection volume analytics, and session logs',
      'Zone entry/exit detection and anomaly event alerts'
    ],
    whatIWorkedOn: [
      'Configured PyTorch video capture pipeline with OpenCV for live frame extraction.',
      'Implemented non-maximum suppression (NMS) and confidence threshold filtering for clean detection outputs.',
      'Added multi-object tracking across sequential video frames with persistent bounding box IDs.',
      'Designed a full analytics dashboard displaying detection throughput, class breakdowns, and camera status.'
    ],
    whatILearned: 'Balancing model inference latency and frame processing rates, optimizing non-maximum suppression (NMS) thresholds, and managing multi-object track association across occlusions.',
    role: 'Computer Vision Developer',
    image: '/projects/visiontrack/screenshot.png',
    screenshots: [
      { title: 'VisionTrack Platform Dashboard', src: '/projects/visiontrack/screenshot.png', desc: 'Real-time AI vision dashboard showing detection volume, class distribution, and session metrics' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/1uu4gfR0aQpXZOBG-b84h5ZYw20nJRPau/view?usp=drive_link',
    liveDemo: 'https://drive.google.com/file/d/1uu4gfR0aQpXZOBG-b84h5ZYw20nJRPau/view?usp=drive_link',
    visualType: 3,
  },
  {
    id: 'docmind',
    number: '04',
    num: '04',
    title: 'DocMind',
    subtitle: 'Document Intelligence / RAG Assistant',
    category: 'GENERATIVE AI / VECTOR RETRIEVAL',
    status: 'In Progress',
    year: '2025',
    featured: true,
    shortDescription: 'A document question-answering application that extracts content, retrieves relevant passages and generates grounded responses.',
    description: 'A document question-answering application that extracts content, retrieves relevant passages and generates grounded responses.',
    problem: 'Searching across lengthy unstructured research papers and technical documents manually is slow and inefficient. Generic LLMs lack private document context and frequently hallucinate without strict grounding.',
    whatIBuilt: 'Built a document intelligence application that ingests PDFs and text files, extracts text, chunks content with token boundaries, computes dense embeddings, retrieves top-k passages via vector search, and streams grounded answers.',
    technologies: [
      'Python',
      'RAG',
      'Embeddings',
      'FastAPI'
    ],
    architecture: 'Document Upload & Ingestion → Semantic Text Chunking → Dense Embedding Generation → Cosine Similarity Vector Retrieval → Grounded Prompt Synthesis & FastAPI Streaming',
    howItWorks: [
      { step: 'Ingestion', desc: 'Extracts and parses raw text from uploaded research papers, PDFs, and text documents.' },
      { step: 'Chunking', desc: 'Splits text into overlapping semantic chunks with character and token boundary awareness.' },
      { step: 'Embedding', desc: 'Generates high-dimensional vector embeddings for each document chunk.' },
      { step: 'Retrieval', desc: 'Performs cosine similarity search against user queries to retrieve top-k relevant passages.' },
      { step: 'Grounded QA', desc: 'Supplies retrieved passages directly into LLM prompts for factual, cited question answering.' }
    ],
    keyFeatures: [
      'Multi-document parsing and automated chunking with vector indexation',
      'Semantic passage retrieval with similarity scoring',
      'Grounded contextual QA with document source attribution',
      'Clean document management interface with chunk inspector and metrics'
    ],
    whatIWorkedOn: [
      'Implemented document parsing and chunking pipeline with configurable chunk size and overlap.',
      'Integrated vector search to index and retrieve document chunks based on cosine similarity.',
      'Constructed prompt templates that supply context directly to LLM endpoints to minimize hallucinations.',
      'Created a FastAPI backend to manage document uploads and stream question-answering responses.'
    ],
    whatILearned: 'Strategies for optimal chunk sizing and overlap, embedding model selection for technical text retrieval, and constructing strict grounding prompt templates to eliminate hallucination.',
    role: 'AI / Backend Developer',
    image: '/projects/docmind/screenshot.png',
    screenshots: [
      { title: 'DocMind Research Overview', src: '/projects/docmind/screenshot.png', desc: 'Document collection metrics, vector store chunk count, and indexed research files' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/1_4hfxE6lrzwuCUVkdfw6cejS4Py4Ugcd/view?usp=drive_link',
    liveDemo: 'https://drive.google.com/file/d/1_4hfxE6lrzwuCUVkdfw6cejS4Py4Ugcd/view?usp=drive_link',
    visualType: 1,
  },
  {
    id: 'jobshieldxai',
    number: '05',
    num: '05',
    title: 'JOBSHIELDXAI',
    subtitle: 'AI Job Scam & Fraud Detection',
    category: 'NLP / AI / FRAUD DETECTION',
    status: 'Completed',
    year: '2025',
    featured: true,
    shortDescription: 'An NLP-based application for identifying suspicious job listings and potential recruitment scams using transformer-based text classification.',
    description: 'An AI-based system for identifying suspicious job listings and potential recruitment scams using natural-language processing and transformer-based classification.',
    problem: 'Online recruitment fraud and scam job postings are surging, targeting job seekers with deceptive offers, phishing schemes, and financial advance-fee requests that traditional keyword filters fail to catch.',
    whatIBuilt: 'Built an explainable AI framework that scans job posting descriptions, evaluates linguistic patterns and risk indicators using fine-tuned BERT transformers, and produces a trust score, risk category, and transparent reasoning.',
    technologies: [
      'Python',
      'BERT',
      'NLP',
      'Transformers'
    ],
    architecture: 'Job Post Text Ingest → Tokenization & Contextual Encoding (BERT) → Transformer Classification Head → Explainability & Risk Scoring Engine → Web Prediction Interface',
    howItWorks: [
      { step: 'Text Ingest', desc: 'Accepts job posting text or URL content through the web interface.' },
      { step: 'Tokenization', desc: 'Applies BERT subword tokenization with positional and attention encodings.' },
      { step: 'Transformer Head', desc: 'Fine-tuned BERT classifier processes context to determine fraud probability.' },
      { step: 'Explainable AI', desc: 'Calculates feature attribution to highlight suspicious phrasing and salary red flags.' },
      { step: 'Trust Breakdown', desc: 'Outputs human-readable risk tier, trust score, and safety recommendations.' }
    ],
    keyFeatures: [
      'Transformer-based classification for fake vs legitimate job advertisements',
      'Transparent trust score and risk tier categorization',
      'Human-readable explanation highlighting suspicious phrasing and fraud signals',
      'Interactive web analyzer for one-pass job posting verification'
    ],
    whatIWorkedOn: [
      'Preprocessed and labeled recruitment scam dataset with linguistic feature extraction.',
      'Fine-tuned BERT transformer classifier for binary and multi-tier fraud classification.',
      'Built feature attribution logic to generate explainable AI reasoning for end users.',
      'Designed a clean web interface for instant job posting analysis and risk assessment.'
    ],
    whatILearned: 'Fine-tuning transformer architectures on imbalanced fraud datasets, extracting attention-based token importance for model explainability, and architecting low-latency NLP inference endpoints.',
    role: 'NLP & Explainable AI Developer',
    image: '/projects/jobshieldxai/screenshot.png',
    screenshots: [
      { title: 'JobShield-XAI Interface', src: '/projects/jobshieldxai/screenshot.png', desc: 'JobShield landing interface showing one-pass job analysis and explainable AI framework' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/1VwTNo7yZGFJKM2PIB07sTCe3MnJluedX/view?usp=drive_link',
    liveDemo: 'https://drive.google.com/file/d/1VwTNo7yZGFJKM2PIB07sTCe3MnJluedX/view?usp=drive_link',
    visualType: 1,
  },
  {
    id: 'aivoicestudio',
    number: '06',
    num: '06',
    title: 'AIVoiceStudio',
    subtitle: 'AI Voice Studio',
    category: 'CREATIVE AI / SPEECH SYNTHESIS',
    status: 'Completed',
    year: '2024',
    featured: true,
    shortDescription: 'An AI voice application focused on speech generation and creative content workflows.',
    description: 'An AI voice application focused on speech generation and creative content workflows.',
    problem: 'Content creators and video editors spend excessive time manually recording voiceovers, generating timed subtitles, and aligning speech pacing across video timelines.',
    whatIBuilt: 'Built an AI voice and speech synthesis studio that enables automated voiceover generation, timed subtitle alignment, speech-to-text transcription, and seamless integration into creative video post-production workflows.',
    technologies: [
      'Python',
      'PyTorch',
      'Audio Processing',
      'FastAPI'
    ],
    architecture: 'Text / Audio Ingest → Neural Speech Synthesis & Acoustic Feature Extraction → Subtitle Timing & Audio Normalization → Export & Timeline Integration',
    howItWorks: [
      { step: 'Text / Audio Ingest', desc: 'Accepts script text or raw spoken audio inputs into the studio workspace.' },
      { step: 'Acoustic Processing', desc: 'Generates mel-spectrograms and processes acoustic representations with PyTorch.' },
      { step: 'Voice Synthesis', desc: 'Neural synthesis models generate natural voiceover with controllable cadence.' },
      { step: 'Timed Captions', desc: 'Automated speech-to-text generates accurate, word-timed subtitles.' },
      { step: 'Export', desc: 'Clean audio masters and subtitle tracks are exported directly for video timelines.' }
    ],
    keyFeatures: [
      'AI voice generation with customizable tone, pace, and pitch',
      'Automated transcription and timed caption generation',
      'Audio waveform visualization and dynamic leveling',
      'Creative workflow integration for video post-production'
    ],
    whatIWorkedOn: [
      'Implemented speech synthesis and transcription pipelines using Python and PyTorch.',
      'Developed timed subtitle generation algorithms with word-level timestamp alignment.',
      'Created audio normalization and noise reduction filters for studio-quality playback.',
      'Integrated AI voice outputs with creative editing timelines and media sequences.'
    ],
    whatILearned: 'Neural audio feature processing (spectrograms, mel-frequency cepstral coefficients), audio waveform manipulation in Python, and streamlining creative workflows with AI assistance.',
    role: 'Creative AI & Audio Engineer',
    image: '/projects/aivoicestudio/screenshot.png',
    screenshots: [
      { title: 'Voice Studio AI Dashboard', src: '/projects/aivoicestudio/screenshot.png', desc: 'Voice Studio AI dashboard showing voice library, speech generation, voice cloning, and audio cleanup workflows' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/12DE4K70TVcnjjP-nRjQxADX3smJFUZbh/view?usp=drive_link',
    liveDemo: 'https://drive.google.com/file/d/12DE4K70TVcnjjP-nRjQxADX3smJFUZbh/view?usp=drive_link',
    visualType: 4,
  },
  {
    id: 'nexa',
    number: '07',
    num: '07',
    title: 'NEXA',
    subtitle: 'Business Intelligence & Operations',
    category: 'UI/UX DESIGN / BUSINESS INTELLIGENCE',
    status: 'Completed',
    year: '2026',
    featured: true,
    shortDescription: 'A UI/UX demo project for business intelligence and operations to track performance, investigate activity, and turn operational data into clear decisions.',
    description: 'A UI/UX demo project for business intelligence and operations to track performance, investigate activity, and turn operational data into clear decisions.',
    problem: 'Modern businesses require intuitive dashboards that consolidate complex multi-source telemetry and operational analytics into clear, actionable decision workflows without visual clutter.',
    whatIBuilt: 'Designed and built an executive business intelligence UI/UX demo with sleek dark-mode aesthetic, interactive metric breakdowns, activity investigation feeds, and performance tracking.',
    technologies: [
      'UI/UX Design',
      'Figma',
      'React',
      'CSS',
      'Data Visualization'
    ],
    architecture: 'Operations Ingest → Telemetry Normalization → Real-Time Analytics Engine → Executive KPI Dashboard → Decision Workflows',
    howItWorks: [
      { step: 'Ingest', desc: 'Aggregates enterprise activity logs and business metrics across operational systems.' },
      { step: 'Processing', desc: 'Normalizes telemetry streams into high-level KPI indicators and performance indexes.' },
      { step: 'Visualization', desc: 'Renders high-contrast dark-mode charts, active logs, and status breakdowns.' },
      { step: 'Decisions', desc: 'Empowers stakeholders to investigate activity anomalies and execute informed decisions.' }
    ],
    keyFeatures: [
      'Sleek dark-mode executive UI with minimalist modern aesthetics',
      'Real-time business performance tracking and operational activity analytics',
      'Interactive demo data environment with preconfigured metrics and zero setup',
      'Clean typography hierarchy and responsive dashboard components'
    ],
    whatIWorkedOn: [
      'Designed the complete UI/UX layout, typography system, and dark-mode aesthetic.',
      'Structured business operations tracking, activity investigation views, and interactive CTA flows.',
      'Built responsive frontend components and visual mockups for executive decision-making.'
    ],
    whatILearned: 'Mastered modern dark-mode SaaS UI design principles, high-contrast typography hierarchies, data density balance, and creating clear UX flows for complex business analytics.',
    role: 'UI/UX Designer & Frontend Developer',
    image: '/projects/nexa/screenshot.png',
    screenshots: [
      { title: 'NEXA Operations Dashboard', src: '/projects/nexa/screenshot.png', desc: 'Business intelligence and operations platform hero interface and activity dashboard' }
    ],
    github: 'https://github.com/Miteshreddy',
    driveLink: 'https://drive.google.com/file/d/1BkIJnz5iVgO3v5G8vjGIdlgAu_9jtnmO/view?usp=drive_link',
    liveDemo: 'https://drive.google.com/file/d/1BkIJnz5iVgO3v5G8vjGIdlgAu_9jtnmO/view?usp=drive_link',
    visualType: 1,
  }
];

export const PROJECT_STATUSES = ['All', 'Completed', 'In Progress'];
