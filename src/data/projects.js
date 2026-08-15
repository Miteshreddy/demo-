/**
 * Central Project Data System
 * 
 * To add a new project:
 * Add an object to the PROJECTS array below. The UI will automatically
 * render the new project card, status badge, modal details, and filters.
 */

export const PROJECTS = [
  {
    id: 'agroxai',
    num: '01',
    title: 'AGROXAI',
    subtitle: 'Crop Recommendation System',
    category: 'MACHINE LEARNING / FULL-STACK AI',
    status: 'Completed', // 'Completed' | 'In Progress' | 'Experimenting'
    year: '2025',
    featured: true,
    shortDescription: 'Takes agricultural parameters through a web interface and sends them through an ML pipeline to generate crop recommendations.',
    description: 'Built a crop recommendation application that takes agricultural inputs through a web interface and sends them through an ML pipeline to generate crop recommendations. Worked on preprocessing, model evaluation and integrating the model with the web application.',
    whyBuilt: 'Agricultural decision-making depends heavily on soil chemistry and regional weather metrics. I wanted to build a simple, accessible tool where someone can input Nitrogen, Phosphorus, Potassium (NPK) ratios along with temperature, humidity, and rainfall to get fast, data-backed crop suggestions.',
    howItWorks: [
      { step: 'Input', desc: 'User inputs soil NPK ratios, rainfall, humidity, and temperature values via web form.' },
      { step: 'Preprocessing', desc: 'Values are normalized and transformed into numerical feature vectors using Scikit-learn.' },
      { step: 'Model', desc: 'Evaluated Decision Trees and XGBoost multi-class classifiers on soil and crop datasets.' },
      { step: 'Inference', desc: 'FastAPI / Flask endpoint runs model prediction and returns top recommendation probabilities.' },
      { step: 'Frontend', desc: 'Interactive React dashboard displays recommended crops with confidence breakdown.' }
    ],
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'XGBoost',
      'Decision Trees',
      'React',
      'Flask/FastAPI',
      'MongoDB'
    ],
    whatIWorkedOn: [
      'Cleaned agricultural dataset, handled missing values, and performed exploratory data analysis with Pandas.',
      'Trained and compared Decision Tree and XGBoost classifiers with cross-validation.',
      'Constructed a REST API wrapper with FastAPI to serve model predictions in real time.',
      'Designed and built a clean React interface to input parameters and visualize recommendation outputs.'
    ],
    role: 'ML Pipeline & Full-Stack Integration',
    image: '/projects/agroxai/thumbnail.svg',
    screenshots: [
      { title: 'Crop Prediction UI', src: '/projects/agroxai/screenshot-1.svg', desc: 'Web form and prediction dashboard showing recommended crops and confidence levels' },
      { title: 'Pipeline Architecture', src: '/projects/agroxai/architecture.svg', desc: 'End-to-end data pipeline from user input to feature preprocessing, XGBoost inference, and UI rendering' }
    ],
    github: 'https://github.com/Miteshreddy',
    liveDemo: null,
    visualType: 2,
  },
  {
    id: 'object-detection',
    num: '02',
    title: 'REAL-TIME OBJECT DETECTION & TRACKING',
    subtitle: 'Computer Vision Video Pipeline',
    category: 'COMPUTER VISION / DEEP LEARNING',
    status: 'In Progress',
    year: '2025',
    featured: true,
    shortDescription: 'Real-time computer-vision pipeline that detects objects from video streams and tracks them across frames using PyTorch and OpenCV.',
    description: 'Built a real-time computer-vision pipeline that detects objects from video and tracks them across frames. Worked with model inference, bounding boxes, confidence scores and video processing using OpenCV.',
    whyBuilt: 'I wanted to understand how deep-learning object detectors behave under real-time video constraints, how frame rates affect tracking stability, and how to properly process bounding box coordinates with OpenCV.',
    howItWorks: [
      { step: 'Video Stream', desc: 'OpenCV captures continuous video frames from camera or video files.' },
      { step: 'Frame Processing', desc: 'Frames are resized, normalized, and converted into tensor batches.' },
      { step: 'YOLO Inference', desc: 'PyTorch model outputs bounding box coordinates, class labels, and confidence scores.' },
      { step: 'Tracking & NMS', desc: 'Non-maximum suppression filters overlapping boxes; object IDs are tracked frame-to-frame.' },
      { step: 'Visual Display', desc: 'Overlays bounding boxes, labels, and real-time FPS counter onto output frame.' }
    ],
    technologies: [
      'Python',
      'PyTorch',
      'YOLO',
      'OpenCV',
      'NumPy'
    ],
    whatIWorkedOn: [
      'Configured PyTorch video capture pipeline with OpenCV for live frame extraction.',
      'Implemented non-maximum suppression (NMS) and confidence threshold filtering for clean detection outputs.',
      'Added multi-object tracking across sequential video frames with persistent bounding box IDs.',
      'Optimized frame inference loop to maintain smooth playback performance.'
    ],
    role: 'Computer Vision Developer',
    image: '/projects/object-detection/thumbnail.svg',
    screenshots: [
      { title: 'Detection Output Frame', src: '/projects/object-detection/screenshot-1.svg', desc: 'Live video feed with predicted bounding boxes, object labels, and detection confidence scores' },
      { title: 'Inference Pipeline', src: '/projects/object-detection/architecture.svg', desc: 'Frame extraction, tensor transformation, YOLO inference, and OpenCV rendering pipeline' }
    ],
    github: 'https://github.com/Miteshreddy',
    liveDemo: null,
    visualType: 3,
  },
  {
    id: 'rag-assistant',
    num: '03',
    title: 'DOCUMENT INTELLIGENCE / RAG ASSISTANT',
    subtitle: 'Vector Retrieval & Question Answering',
    category: 'GENERATIVE AI / VECTOR SEARCH',
    status: 'In Progress',
    year: '2025',
    featured: true,
    shortDescription: 'Document QA system where users upload PDFs or text files, extract embeddings into vector storage, and query them using LLMs.',
    description: 'Built a document-question answering system where users can upload documents and ask questions about their content. The pipeline extracts the text, creates searchable embeddings, retrieves relevant sections and uses an LLM to generate the final answer.',
    whyBuilt: 'Large PDFs and technical documents are tedious to scan manually. I built this to experiment with Retrieval-Augmented Generation (RAG), chunking strategies, vector embeddings, and similarity search in a practical interface.',
    howItWorks: [
      { step: 'Document Ingestion', desc: 'Extracts and cleans raw text from uploaded PDF and text documents.' },
      { step: 'Text Chunking', desc: 'Splits text into overlapping chunks with character/token boundary awareness.' },
      { step: 'Embedding Generation', desc: 'Generates high-dimensional vector embeddings for each chunk.' },
      { step: 'Vector Retrieval', desc: 'Performs cosine similarity search against user query to find top-k relevant passages.' },
      { step: 'Contextual Generation', desc: 'Passes retrieved context alongside prompt to LLM API to generate grounded answers with citations.' }
    ],
    technologies: [
      'Python',
      'LLM API',
      'Embeddings',
      'Vector Search',
      'LangChain',
      'FastAPI'
    ],
    whatIWorkedOn: [
      'Implemented document parsing and chunking pipeline with configurable chunk size and overlap.',
      'Integrated vector search to index and retrieve document chunks based on cosine similarity.',
      'Constructed prompt templates that supply context directly to LLM endpoints to minimize hallucinations.',
      'Created a FastAPI backend to manage document uploads and stream question-answering responses.'
    ],
    role: 'AI / Backend Developer',
    image: '/projects/rag-assistant/thumbnail.svg',
    screenshots: [
      { title: 'Document Chat Interface', src: '/projects/rag-assistant/screenshot-1.svg', desc: 'Interface showing document upload, chunk retrieval inspector, and grounded answer stream' },
      { title: 'RAG Architecture Diagram', src: '/projects/rag-assistant/architecture.svg', desc: 'Ingestion, embedding storage, semantic similarity search, and context-augmented prompting' }
    ],
    github: 'https://github.com/Miteshreddy',
    liveDemo: null,
    visualType: 1,
  },
  {
    id: 'cnn-classifier',
    num: '04',
    title: 'CNN IMAGE CLASSIFICATION',
    subtitle: 'Deep Learning Model & Prediction UI',
    category: 'DEEP LEARNING / COMPUTER VISION',
    status: 'Completed',
    year: '2024',
    featured: true,
    shortDescription: 'Convolutional neural network trained in PyTorch and connected to an interface for image uploads and predicted class probabilities.',
    description: 'Trained a CNN-based image classification model and connected it to a small prediction interface where users can upload an image and see the predicted class.',
    whyBuilt: 'To understand convolutional layer mechanics, feature maps, backpropagation, and loss curves firsthand rather than treating neural networks as black boxes.',
    howItWorks: [
      { step: 'Data Preparation', desc: 'Image augmentation, normalization, and train/val/test dataset split.' },
      { step: 'CNN Architecture', desc: 'Convolutional layers with ReLU activation, max pooling, and fully connected classification head.' },
      { step: 'Training Loop', desc: 'Cross-entropy loss calculation, Adam optimizer, and learning rate scheduling over epochs.' },
      { step: 'Evaluation', desc: 'Validation accuracy tracking, loss curves, and confusion matrix calculation.' },
      { step: 'Prediction Interface', desc: 'Lightweight web interface for image upload and top-k class probability display.' }
    ],
    technologies: [
      'Python',
      'PyTorch',
      'CNN',
      'OpenCV',
      'NumPy'
    ],
    whatIWorkedOn: [
      'Built custom PyTorch Dataset classes and applied torchvision transforms for image preprocessing.',
      'Designed and tuned CNN convolutional layers, filter counts, and dropout rates to prevent overfitting.',
      'Tracked training and validation loss curves across epochs to determine optimal stopping points.',
      'Connected saved model weights to a Python inference script to classify uploaded test images.'
    ],
    role: 'Deep Learning Developer',
    image: '/projects/cnn-classifier/thumbnail.svg',
    screenshots: [
      { title: 'Prediction & Class Probabilities', src: '/projects/cnn-classifier/screenshot-1.svg', desc: 'Uploaded image preview alongside Softmax predicted class distribution' },
      { title: 'Training Metrics & Loss Curve', src: '/projects/cnn-classifier/architecture.svg', desc: 'Confusion matrix and epoch-by-epoch training/validation loss curves' }
    ],
    github: 'https://github.com/Miteshreddy',
    liveDemo: null,
    visualType: 3,
  },
  {
    id: 'face-recognition',
    num: '05',
    title: 'AI FACE RECOGNITION / ATTENDANCE SYSTEM',
    subtitle: 'Face Embeddings & Verification Workflow',
    category: 'COMPUTER VISION / FULL-STACK',
    status: 'Experimenting',
    year: '2025',
    featured: true,
    shortDescription: 'Computer vision pipeline that detects faces from a camera feed, computes face embeddings, and matches against registered records.',
    description: 'Built a face-recognition workflow that detects faces from a camera, generates face embeddings and compares them with registered users before recording attendance.',
    whyBuilt: 'To build a functional computer vision application that bridges face detection, metric learning / vector embeddings, and database persistence into an automated workflow.',
    howItWorks: [
      { step: 'Camera Capture', desc: 'OpenCV accesses webcam or RTSP video feed in real time.' },
      { step: 'Face Detection', desc: 'Detects face bounding box and crops facial region with alignment.' },
      { step: 'Embedding Extraction', desc: 'Deep learning model maps facial features into a 128-d or 512-d embedding vector.' },
      { step: 'Distance Matching', desc: 'Calculates Euclidean distance / cosine similarity against stored user embeddings.' },
      { step: 'Attendance Log', desc: 'When match distance is below threshold, attendance timestamp is saved to MongoDB.' }
    ],
    technologies: [
      'Python',
      'OpenCV',
      'DeepFace / Face Embeddings',
      'Flask',
      'MongoDB'
    ],
    whatIWorkedOn: [
      'Configured face detection and cropping pipeline using OpenCV.',
      'Generated and stored baseline face vector embeddings for authorized users.',
      'Implemented distance threshold logic to distinguish recognized users from unknown visitors.',
      'Connected recognition events to a Flask API with MongoDB for timestamped attendance logging.'
    ],
    role: 'Computer Vision & Backend',
    image: '/projects/face-recognition/thumbnail.svg',
    screenshots: [
      { title: 'Live Recognition Feed', src: '/projects/face-recognition/screenshot-1.svg', desc: 'Camera feed with detected face bounding box, identity match name, and distance metric' },
      { title: 'Workflow Architecture', src: '/projects/face-recognition/architecture.svg', desc: 'Face detection, feature embedding generation, database similarity matching, and attendance logging' }
    ],
    github: 'https://github.com/Miteshreddy',
    liveDemo: null,
    visualType: 2,
  },
  {
    id: 'kaiz-studio',
    num: '06',
    title: 'KAIZ STUDIO — AI-ASSISTED VIDEO EDITING',
    subtitle: 'Creative Post-Production & Automation Workflow',
    category: 'CREATIVE TECHNOLOGY / VIDEO PRODUCTION',
    status: 'Completed',
    year: '2024',
    featured: true,
    shortDescription: 'AI-assisted creative workflow to reduce repetitive editing work such as captions, visual preparation, and content processing alongside Adobe Creative Suite.',
    description: 'Built an AI-assisted creative workflow to reduce repetitive editing work such as captions, visual preparation and content processing. I also use Adobe tools heavily for editing, motion graphics and visual production.',
    whyBuilt: 'Video post-production involves significant repetitive overhead (transcribing, rough cut assembly, asset preparation). I created a streamlined workflow combining AI automation with professional Adobe software to keep human creative storytelling at the center.',
    howItWorks: [
      { step: 'Footage Ingest', desc: 'Raw footage organized and tagged across project bins in Premiere Pro.' },
      { step: 'AI Transcription & Captions', desc: 'Automated speech-to-text generates timed subtitles and identifies filler pauses.' },
      { step: 'Rough Assembly', desc: 'Pacing and narrative structure assembled along multi-track sequence timeline.' },
      { step: 'Motion & Visual Polish', desc: 'After Effects motion graphics, Photoshop assets, and Illustrator vectors integrated.' },
      { step: 'Audio Mix & Export', desc: 'Audition audio cleanup, dynamic range leveling, and final master rendering.' }
    ],
    technologies: [
      'Premiere Pro',
      'After Effects',
      'Photoshop',
      'Illustrator',
      'Audition',
      'AI Audio/Caption Tools'
    ],
    whatIWorkedOn: [
      'Structured end-to-end video production workflows from raw footage to final color-graded delivery.',
      'Integrated AI-assisted transcription and caption generation into Premiere Pro sequences.',
      'Designed custom motion graphic templates and visual overlays in After Effects.',
      'Conducted audio restoration, noise removal, and dialogue mastering using Adobe Audition.'
    ],
    role: 'Video Editor & Workflow Designer',
    image: '/projects/kaiz-studio/thumbnail.svg',
    screenshots: [
      { title: 'Editing Timeline & Visual Composition', src: '/projects/kaiz-studio/screenshot-1.svg', desc: 'Multi-track timeline with video cuts, synchronized audio tracks, and motion title overlays' },
      { title: 'Production Pipeline', src: '/projects/kaiz-studio/architecture.svg', desc: 'Creative pipeline combining Adobe Premiere Pro, After Effects, Photoshop, and AI transcription' }
    ],
    github: 'https://github.com/Miteshreddy',
    liveDemo: null,
    visualType: 4,
  }
];

export const PROJECT_STATUSES = ['All', 'Completed', 'In Progress', 'Experimenting'];
