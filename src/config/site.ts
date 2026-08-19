export const siteConfig = {
  name: "Vaisag J",
  role: "Computer Science Engineer",
  title: "AI Portfolio & Resume",
  description:
    "An interactive AI-narrated portfolio showcasing my experience in systems programming, backend engineering, distributed systems, security, and machine learning.",
  url: "https://ai-resume.vercel.app", // Update with your actual deployment URL
  resume: "/resume.pdf", // Place your resume PDF in the public folder named resume.pdf

  hero: {
    badge: "AI Portfolio",
    headlinePrefix: "Meet the AI version of",
    subtitle:
      "I am a Computer Science undergraduate at IIIT Kottayam focused on backend engineering, distributed systems, cybersecurity, and machine learning. Explore my projects, technical experience, and engineering approach through my AI portfolio.",
  },

  chat: {
    assistantGreeting:
      "Hi! I'm the AI version of Vaisag. Ask me anything about my projects, technical skills, education, or engineering experience.",

    suggestedQuestions: [
      "Tell me about your Mini XDR project",
      "How does your distributed job scheduler work?",
      "What are your strongest technical skills?",
      "Tell me about your audio filtering pipeline",
      "What is your experience with machine learning?",
      "How do you approach backend system design?",
    ],
  },

  profile: {
    email: "jvaisag@gmail.com",
    phone: "+91 9061378010",
    linkedin: "https://linkedin.com/in/vaisag-j",
    github: "https://github.com/jvaisag",

    education: {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Indian Institute of Information Technology, Kottayam",
      location: "Kerala, India",
      period: "Sep 2023 – May 2027",
    },

    summary:
      "Computer Science undergraduate skilled in data structures, algorithms, and full-stack, distributed, and systems-level development — from Rust/C systems programming to REST APIs, real-time streaming, and cloud-deployed microservices. Quick learner seeking to apply strong engineering fundamentals to real-world software projects.",
  },

  skills: {
    languages: ["C", "C++", "Rust", "Python", "JavaScript", "SQL"],

    coreCS: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "OOP",
      "DBMS",
      "Computer Networks",
    ],

    backendAndData: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
      "Redis Streams",
      "MongoDB",
      "scikit-learn",
      "Ray",
    ],

    frontend: ["Next.js", "React.js", "Angular", "Socket.io"],

    devOpsAndCloud: [
      "Docker",
      "Docker Compose",
      "AWS EC2",
      "CI/CD",
      "Git",
      "Linux",
      "Nginx",
    ],

    security: [
      "IDS/Anomaly Detection",
      "JWT",
      "OAuth",
      "AES Encryption",
      "API Security",
      "Rate Limiting",
    ],
  },

  projects: [
    {
      name: "Mini XDR",
      description:
        "Real-Time Security Event Correlation & Anomaly Detection Platform",
      technologies: [
        "Node.js",
        "Python",
        "FastAPI",
        "scikit-learn",
        "Redis Streams",
        "MongoDB",
        "Next.js",
        "Socket.io",
        "Docker",
        "AWS EC2",
      ],
      highlights: [
        "Designed and built a 5-service pipeline consisting of an ingestion API, rules-based correlation engine, ML anomaly scorer, broadcast server, and live dashboard.",
        "Implemented sliding time-window correlation per source IP to escalate alerts when multiple distinct attack types are detected from the same host.",
        "Built an online anomaly-scoring service using FastAPI and scikit-learn IsolationForest.",
        "Created a real-time Next.js and Socket.io dashboard with scored alerts and per-IP drill-down history.",
        "Deployed the complete pipeline to AWS EC2 with Redis, MongoDB, security groups, port configuration, and process orchestration.",
      ],
    },

    {
      name: "PgFlow",
      description: "Postgres-Backed Distributed Job Scheduler",
      technologies: [
        "Python",
        "asyncio",
        "PostgreSQL",
        "asyncpg",
        "Docker Compose",
      ],
      github: "https://github.com/jvaisag/pgflow",
      highlights: [
        "Built a Celery/Airflow-style distributed job scheduler using PostgreSQL as the sole coordination layer.",
        "Implemented DAG-based job dependencies across concurrent worker processes.",
        "Used SELECT ... FOR UPDATE SKIP LOCKED for concurrency-safe job claiming and verified the system with 10+ parallel workers.",
        "Implemented dependency resolution and cycle detection using recursive CTEs.",
        "Added exponential-backoff retries, a dead-letter queue, leader election using PostgreSQL advisory locks, and failed-worker recovery.",
        "Built a CLI for job submission, DAG inspection, dead-letter queue visibility, and live worker/leader status.",
      ],
    },

    {
      name: "Audio Filtering Pipeline",
      description: "Data Quality Filtering for TTS Training",
      technologies: [
        "Python",
        "Ray",
        "SpeechBrain",
        "Whisper",
        "HuggingFace Datasets",
      ],
      github: "https://github.com/jvaisag/Audio-filtering-pipeline",
      highlights: [
        "Built a distributed audio data-quality pipeline for TTS training using the IndicVoices dataset covering 18 Indian languages.",
        "Designed parallel quality checks based on clipping ratio, SNR, duration, and speech ratio.",
        "Used Ray remote tasks to parallelize individual quality checks.",
        "Integrated SpeechBrain ECAPA-TDNN to automatically detect and discard language mismatches.",
        "Built a resumable JSONL manifest pipeline carrying metadata and quality metrics throughout processing.",
        "Tagged every processed sample as KEEP or DISCARD for downstream model training.",
      ],
    },
  ],

  coursework: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems",
    "Cloud Computing",
    "Software Engineering",
    "Web Development",
  ],

  certifications: [
    {
      name: "Machine Learning Specialization",
      issuer: "Coursera — DeepLearning.AI",
      year: 2024,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
