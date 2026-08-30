# 🏛️ SkillBank AI Engine

> **AI-Powered Corporate Competency Benchmarking, Dynamic Skill Gap Diagnostics, and Institutional Placement Analytics Platform.**

---

## 📌 Overview

**SkillBank** bridges the gap between academic curricula and evolving corporate tech demands. Using vector-based skill taxonomy mapping, the engine parses candidate resumes in real time, benchmarks their technical depth against corporate role requirements, delivers targeted multi-modal learning roadmaps (Web Docs + Video Masterclasses), and issues tamper-proof cryptographic competency certificates.

---

## ✨ Key Features

- ⚡ **Real-Time Vector Resume Audit**: High-speed parsing of PDF resumes using sub-second background task queues.
- 🎯 **40+ Corporate Industry Roles**: Full taxonomy coverage across Full-Stack, Backend, AI/ML, Generative AI, DevOps, Cloud, Cybersecurity, and Data Analytics.
- 📊 **Dynamic Radar Gap Analytics**: Interactive Chart.js radar vectors visualizing candidate competency scores against target industry standards.
- 🗺️ **Dual-Channel Learning Roadmaps**: Curated documentation (MDN, Official Docs) and full-length video courses for identified missing skills.
- 🧪 **In-House Diagnostic Verification**: Embedded interactive technical MCQs with real-time scoring boost.
- 📜 **Cryptographic Credential Generation**: Unique SHA-256 verified tokens with downloadable executive certificates.
- 🏛️ **Institutional Placement Intelligence**: Macro-level dashboards for universities and state directorates tracking batch readiness and curriculum gaps.

---

## 🏗️ System Architecture


                   ┌─────────────────────────┐
                   │   Client Web Frontend   │
                   │ (HTML5, Tailwind, JS)   │
                   └────────────┬────────────┘
                                │ (Multipart POST)
                                ▼
                   ┌─────────────────────────┐
                   │   FastAPI Vector Engine │
                   │    (Python 3.11+)       │
                   └─────┬──────────────┬────┘
                         │              │
    (Async Background)   │              |  (SkillExtraction)
                         ▼              ▼
               ┌───────────────┐  ┌───────────────────┐
               │  Supabase DB  │  │ Corporate Taxonomy│
               │ (PostgreSQL)  │  │   40+ Benchmarks  │
               └───────────────┘  └───────────────────┘

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), Tailwind CSS, Lucide Icons, Chart.js, PDF.js |
| **Backend** | Python 3, FastAPI, Uvicorn, PyPDF, Pydantic |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **Deployment** | Vercel (Frontend SPA) + Render (Backend API) |

---

## 📂 Project Structure

```bash
SkillGapApp/
├── backend/
│   ├── main.py              # FastAPI core service & matching engine
│   └── requirements.txt     # Python backend dependencies
├── frontend/
│   ├── index.html           # Main user interface & institutional analytics
│   ├── style.css            # Custom UI aesthetics & animations
│   ├── app.js               # API integrations, chart renders & modal engine
│   └── data.js              # Comprehensive roles & diagnostic quiz datasets
└── README.md                # Project documentation    

🚀 Local Development Setup
1. Backend Service
Bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
2. Frontend Client
Open frontend/index.html directly in your browser or run via Live Server.

🔒 Security & Verification
Row Level Security (RLS) configured on all PostgreSQL tables.

SHA-256 Tokenization guaranteeing tamper-proof institutional credentials.

Non-blocking Background Task Queues ensuring sub-second response times.

👨‍💻 Author
SkillBank Team

Built for Corporate Skilling & NEP 2020 Academic Credit Alignment.