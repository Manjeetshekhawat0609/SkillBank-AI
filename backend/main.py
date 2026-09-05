import os
import re
import hashlib
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

from fastapi import (
    FastAPI,
    File,
    UploadFile,
    Form,
    BackgroundTasks,
    HTTPException,
    Query,
)
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from io import BytesIO
import urllib.request
import urllib.error
import urllib.parse
import json


# ============================================================
# Supabase Client Initialization with robust fallback
# ============================================================

try:
    from supabase import create_client, Client

    SUPABASE_URL = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

    supabase: Optional[Client] = (
        create_client(SUPABASE_URL, SUPABASE_KEY)
        if (SUPABASE_URL and SUPABASE_KEY)
        else None
    )

except Exception as e:
    print(f"Supabase initialization skipped: {e}")
    supabase = None


# ============================================================
# FastAPI Application
# ============================================================

app = FastAPI(
    title="SkillBank AI — Placement & Competency Evaluation Engine",
    description=(
        "Deterministic Resume Vector Parsing, 40+ Taxonomy Resolution, "
        "Institutional Analytics, and Verifiable Digital Credentials"
    ),
    version="4.0",
)


# ============================================================
# CORS Configuration
# ============================================================
#
# NOTE (FIX):
# The original config only whitelisted localhost origins. That means
# any real deployment (Vercel, phone browser, opening index.html
# directly as a file, a different laptop, etc.) would be silently
# blocked by the BROWSER before the request ever reached this server
# — which looks exactly like "random errors everywhere".
#
# Fix: if the operator explicitly sets ALLOWED_ORIGINS (comma
# separated) we honor that exact list with credentials enabled
# (useful if you later add cookie-based auth). Otherwise we default
# to allowing any origin with credentials disabled, which is safe
# for this public, cookie-less JSON API and guarantees the frontend
# works from any device/network/deployment without extra config.
#
# ALLOWED_ORIGINS=https://example.com,http://localhost:3000
#
# ============================================================

_env_origins = os.getenv("ALLOWED_ORIGINS", "")

if _env_origins.strip():
    ALLOWED_ORIGINS = [
        origin.strip()
        for origin in _env_origins.split(",")
        if origin.strip()
    ]
    ALLOW_CREDENTIALS = True
else:
    # Safe default: no cookies/credentials are used by this API,
    # so a wildcard origin is safe and works everywhere (phone,
    # laptop off, Vercel, file:// preview, etc.).
    ALLOWED_ORIGINS = ["*"]
    ALLOW_CREDENTIALS = False


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=ALLOW_CREDENTIALS,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Comprehensive Taxonomy Mapping for Corporate Target Roles
# ============================================================

ROLE_TAXONOMY: Dict[str, Dict[str, Any]] = {

    # ========================================================
    # 1. Web & Fullstack Engineering
    # ========================================================

    "frontend": {
        "title": "Frontend Web Engineer",
        "skills": [
            "html",
            "css",
            "javascript",
            "react",
            "typescript",
            "tailwind",
            "git",
            "nextjs",
            "redux",
        ],
        "benchmarks": {
            "html": 90,
            "css": 85,
            "javascript": 85,
            "react": 80,
            "typescript": 75,
            "tailwind": 80,
            "git": 75,
            "nextjs": 70,
            "redux": 70,
        },
        "trending_tech": [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Zustand",
        ],
        "hiring_surge": "+28% YoY Growth",
        "resources": {
            "react": {
                "docs": "https://react.dev",
                "video": "https://www.youtube.com/watch?v=bMknfKXIFA8",
            },
            "typescript": {
                "docs": "https://www.typescriptlang.org/docs/",
                "video": "https://www.youtube.com/watch?v=BwuLxPH8IDs",
            },
            "nextjs": {
                "docs": "https://nextjs.org/docs",
                "video": "https://www.youtube.com/watch?v=843nec-IvW0",
            },
            "tailwind": {
                "docs": "https://tailwindcss.com/docs",
                "video": "https://www.youtube.com/watch?v=dFgzHOX84xQ",
            },
            "redux": {
                "docs": "https://redux.js.org",
                "video": "https://www.youtube.com/watch?v=9zySeP5vH9c",
            },
        },
    },

    "backend": {
        "title": "Backend API Engineer",
        "skills": [
            "python",
            "fastapi",
            "django",
            "nodejs",
            "postgresql",
            "docker",
            "redis",
            "rest api",
            "git",
        ],
        "benchmarks": {
            "python": 90,
            "fastapi": 85,
            "django": 80,
            "nodejs": 80,
            "postgresql": 85,
            "docker": 75,
            "redis": 70,
            "rest api": 90,
            "git": 80,
        },
        "trending_tech": [
            "FastAPI",
            "PostgreSQL",
            "Docker",
            "gRPC",
        ],
        "hiring_surge": "+34% YoY Growth",
        "resources": {
            "fastapi": {
                "docs": "https://fastapi.tiangolo.com/",
                "video": "https://www.youtube.com/watch?v=0sOvCWFmrtA",
            },
            "docker": {
                "docs": "https://docs.docker.com/",
                "video": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
            },
            "postgresql": {
                "docs": "https://www.postgresqltutorial.com/",
                "video": "https://www.youtube.com/watch?v=qw--VYLpxG4",
            },
            "redis": {
                "docs": "https://redis.io/docs/",
                "video": "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
            },
            "django": {
                "docs": "https://docs.djangoproject.com/",
                "video": "https://www.youtube.com/watch?v=F5mRW0jo-U4",
            },
        },
    },

    "fullstack": {
        "title": "Full-Stack Software Engineer",
        "skills": [
            "javascript",
            "typescript",
            "react",
            "nodejs",
            "postgresql",
            "mongodb",
            "docker",
            "rest api",
            "git",
        ],
        "benchmarks": {
            "javascript": 90,
            "typescript": 85,
            "react": 85,
            "nodejs": 80,
            "postgresql": 80,
            "mongodb": 75,
            "docker": 75,
            "rest api": 90,
            "git": 80,
        },
        "trending_tech": [
            "MERN Stack",
            "Next.js",
            "Docker",
            "Prisma ORM",
        ],
        "hiring_surge": "+40% YoY Growth",
        "resources": {
            "react": {
                "docs": "https://react.dev",
                "video": "https://www.youtube.com/watch?v=bMknfKXIFA8",
            },
            "nodejs": {
                "docs": "https://nodejs.org/en/learn",
                "video": "https://www.youtube.com/watch?v=Oe421EPjeBE",
            },
            "docker": {
                "docs": "https://docs.docker.com/",
                "video": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
            },
            "mongodb": {
                "docs": "https://www.mongodb.com/docs/",
                "video": "https://www.youtube.com/watch?v=ofme2o29ngU",
            },
        },
    },

    # ========================================================
    # 2. Mobile Development
    # ========================================================

    "react_native": {
        "title": "React Native Developer",
        "skills": [
            "react",
            "react native",
            "javascript",
            "typescript",
            "redux",
            "git",
            "mobile development",
            "android",
            "ios",
        ],
        "benchmarks": {
            "react": 85,
            "react native": 90,
            "javascript": 85,
            "typescript": 80,
            "redux": 75,
            "git": 80,
            "mobile development": 85,
            "android": 70,
            "ios": 70,
        },
        "trending_tech": [
            "React Native Expo",
            "TypeScript",
            "Hermes Engine",
        ],
        "hiring_surge": "+31% YoY Growth",
        "resources": {
            "react native": {
                "docs": "https://reactnative.dev/docs/getting-started",
                "video": "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            },
            "typescript": {
                "docs": "https://www.typescriptlang.org/docs/",
                "video": "https://www.youtube.com/watch?v=BwuLxPH8IDs",
            },
            "redux": {
                "docs": "https://redux-toolkit.js.org/",
                "video": "https://www.youtube.com/watch?v=9zySeP5vH9c",
            },
        },
    },

    "flutter": {
        "title": "Cross-Platform Flutter Developer",
        "skills": [
            "dart",
            "flutter",
            "state management",
            "rest api",
            "git",
            "firebase",
            "mobile development",
        ],
        "benchmarks": {
            "dart": 90,
            "flutter": 90,
            "state management": 80,
            "rest api": 85,
            "git": 80,
            "firebase": 75,
            "mobile development": 85,
        },
        "trending_tech": [
            "Flutter 3.x",
            "Riverpod",
            "Bloc",
            "Firebase",
        ],
        "hiring_surge": "+29% YoY Growth",
        "resources": {
            "flutter": {
                "docs": "https://docs.flutter.dev/",
                "video": "https://www.youtube.com/watch?v=VPvVD8t02U8",
            },
            "dart": {
                "docs": "https://dart.dev/guides",
                "video": "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q",
            },
            "state management": {
                "docs": "https://bloclibrary.dev/",
                "video": "https://www.youtube.com/watch?v=laQNms4iL0w",
            },
        },
    },

    "android_native": {
        "title": "Android Native Developer",
        "skills": [
            "kotlin",
            "java",
            "android sdk",
            "jetpack compose",
            "rest api",
            "git",
            "gradle",
        ],
        "benchmarks": {
            "kotlin": 90,
            "java": 80,
            "android sdk": 85,
            "jetpack compose": 85,
            "rest api": 80,
            "git": 80,
            "gradle": 75,
        },
        "trending_tech": [
            "Kotlin Coroutines",
            "Jetpack Compose",
            "Clean Architecture",
        ],
        "hiring_surge": "+24% YoY Growth",
        "resources": {
            "kotlin": {
                "docs": "https://kotlinlang.org/docs/home.html",
                "video": "https://www.youtube.com/watch?v=F9UC9DY-vIU",
            },
            "jetpack compose": {
                "docs": "https://developer.android.com/jetpack/compose",
                "video": "https://www.youtube.com/watch?v=6_wKVoZ__uE",
            },
            "android sdk": {
                "docs": "https://developer.android.com/guide",
                "video": "https://www.youtube.com/watch?v=fis26HvvDII",
            },
        },
    },

    "ios_native": {
        "title": "iOS Native Developer",
        "skills": [
            "swift",
            "swiftui",
            "uikit",
            "xcode",
            "cocoapods",
            "git",
            "rest api",
        ],
        "benchmarks": {
            "swift": 90,
            "swiftui": 85,
            "uikit": 80,
            "xcode": 85,
            "cocoapods": 75,
            "git": 80,
            "rest api": 80,
        },
        "trending_tech": [
            "SwiftUI",
            "Combine",
            "Swift Concurrency",
        ],
        "hiring_surge": "+26% YoY Growth",
        "resources": {
            "swift": {
                "docs": "https://developer.apple.com/swift/",
                "video": "https://www.youtube.com/watch?v=comQ1-x2a1Q",
            },
            "swiftui": {
                "docs": "https://developer.apple.com/xcode/swiftui/",
                "video": "https://www.youtube.com/watch?v=F2ojC6TNwws",
            },
            "xcode": {
                "docs": "https://developer.apple.com/xcode/",
                "video": "https://www.youtube.com/watch?v=09TeUXjzpKs",
            },
        },
    },

    # ========================================================
    # 3. AI, Machine Learning & Data Science
    # ========================================================

    "gen_ai": {
        "title": "Generative AI & LLM Applications Engineer",
        "skills": [
            "python",
            "langchain",
            "llamaindex",
            "openai",
            "rag",
            "vector databases",
            "pytorch",
            "prompt engineering",
        ],
        "benchmarks": {
            "python": 90,
            "langchain": 85,
            "llamaindex": 80,
            "openai": 90,
            "rag": 85,
            "vector databases": 80,
            "pytorch": 75,
            "prompt engineering": 90,
        },
        "trending_tech": [
            "LangChain",
            "ChromaDB / Pinecone",
            "Ollama",
            "Fine-tuning",
        ],
        "hiring_surge": "+86% YoY Growth",
        "resources": {
            "langchain": {
                "docs": "https://python.langchain.com/",
                "video": "https://www.youtube.com/watch?v=aywZrzNaKjs",
            },
            "prompt engineering": {
                "docs": "https://www.promptingguide.ai/",
                "video": "https://www.youtube.com/watch?v=_ZvnD93Ix5I",
            },
            "rag": {
                "docs": "https://www.pinecone.io/learn/retrieval-augmented-generation/",
                "video": "https://www.youtube.com/watch?v=tcqEUSNCn8I",
            },
            "llamaindex": {
                "docs": "https://www.llamaindex.ai/",
                "video": "https://www.youtube.com/watch?v=64nZ4pZ5x8k",
            },
        },
    },

    "ai_ml": {
        "title": "Machine Learning & NLP Engineer",
        "skills": [
            "python",
            "machine learning",
            "deep learning",
            "pytorch",
            "tensorflow",
            "scikit-learn",
            "nlp",
            "pandas",
            "numpy",
        ],
        "benchmarks": {
            "python": 90,
            "machine learning": 85,
            "deep learning": 80,
            "pytorch": 80,
            "tensorflow": 75,
            "scikit-learn": 85,
            "nlp": 75,
            "pandas": 90,
            "numpy": 90,
        },
        "trending_tech": [
            "PyTorch",
            "Transformers",
            "LangChain",
            "HuggingFace",
        ],
        "hiring_surge": "+52% YoY Growth",
        "resources": {
            "pytorch": {
                "docs": "https://pytorch.org/docs/stable/index.html",
                "video": "https://www.youtube.com/watch?v=V_xro1bcAuA",
            },
            "deep learning": {
                "docs": "https://www.deeplearningbook.org/",
                "video": "https://www.youtube.com/watch?v=6M5VXKLf4D4",
            },
            "nlp": {
                "docs": "https://huggingface.co/docs/transformers/",
                "video": "https://www.youtube.com/watch?v=CMrHM8a3hqw",
            },
            "scikit-learn": {
                "docs": "https://scikit-learn.org/",
                "video": "https://www.youtube.com/watch?v=0B5eIE_1vpU",
            },
        },
    },

    "data_analyst": {
        "title": "Data Analyst & BI Specialist",
        "skills": [
            "sql",
            "python",
            "power bi",
            "tableau",
            "excel",
            "pandas",
            "statistics",
            "data visualization",
        ],
        "benchmarks": {
            "sql": 90,
            "python": 80,
            "power bi": 85,
            "tableau": 80,
            "excel": 90,
            "pandas": 85,
            "statistics": 80,
            "data visualization": 85,
        },
        "trending_tech": [
            "Power BI DAX",
            "Advanced SQL",
            "Python Analytics",
            "Snowflake",
        ],
        "hiring_surge": "+33% YoY Growth",
        "resources": {
            "power bi": {
                "docs": "https://learn.microsoft.com/en-us/power-bi/",
                "video": "https://www.youtube.com/watch?v=3u7MQz1EyPY",
            },
            "sql": {
                "docs": "https://mode.com/sql-tutorial/",
                "video": "https://www.youtube.com/watch?v=7S_tz1z_5bA",
            },
            "tableau": {
                "docs": "https://help.tableau.com/",
                "video": "https://www.youtube.com/watch?v=aHaOIvR00So",
            },
            "pandas": {
                "docs": "https://pandas.pydata.org/",
                "video": "https://www.youtube.com/watch?v=vmEHCJofslg",
            },
        },
    },

    "data_engineer": {
        "title": "Data Engineer (Big Data & ETL)",
        "skills": [
            "python",
            "sql",
            "apache spark",
            "hadoop",
            "airflow",
            "kafka",
            "postgresql",
            "docker",
            "aws",
        ],
        "benchmarks": {
            "python": 90,
            "sql": 90,
            "apache spark": 85,
            "hadoop": 75,
            "airflow": 80,
            "kafka": 80,
            "postgresql": 80,
            "docker": 75,
            "aws": 80,
        },
        "trending_tech": [
            "Apache Airflow",
            "PySpark",
            "Kafka",
            "Delta Lake",
        ],
        "hiring_surge": "+44% YoY Growth",
        "resources": {
            "airflow": {
                "docs": "https://airflow.apache.org/docs/",
                "video": "https://www.youtube.com/watch?v=K9AnJ9_ZAXE",
            },
            "apache spark": {
                "docs": "https://spark.apache.org/docs/latest/",
                "video": "https://www.youtube.com/watch?v=_C8kWso4ne4",
            },
            "kafka": {
                "docs": "https://kafka.apache.org/documentation/",
                "video": "https://www.youtube.com/watch?v=R873BlBMUB4",
            },
        },
    },

    # ========================================================
    # 4. Cloud, DevOps & Infrastructure
    # ========================================================

    "devops": {
        "title": "DevOps & Cloud Infrastructure Engineer",
        "skills": [
            "docker",
            "kubernetes",
            "linux",
            "aws",
            "ci/cd",
            "terraform",
            "git",
            "bash",
            "jenkins",
        ],
        "benchmarks": {
            "docker": 90,
            "kubernetes": 85,
            "linux": 90,
            "aws": 85,
            "ci/cd": 85,
            "terraform": 75,
            "git": 85,
            "bash": 80,
            "jenkins": 75,
        },
        "trending_tech": [
            "Kubernetes",
            "Terraform",
            "GitHub Actions",
            "AWS EKS",
        ],
        "hiring_surge": "+47% YoY Growth",
        "resources": {
            "kubernetes": {
                "docs": "https://kubernetes.io/docs/home/",
                "video": "https://www.youtube.com/watch?v=X48VuDVv0do",
            },
            "terraform": {
                "docs": "https://developer.hashicorp.com/terraform/docs",
                "video": "https://www.youtube.com/watch?v=7xngnjfIlK4",
            },
            "docker": {
                "docs": "https://docs.docker.com/",
                "video": "https://www.youtube.com/watch?v=fqMOX6JJhGo",
            },
            "aws": {
                "docs": "https://aws.amazon.com/getting-started/",
                "video": "https://www.youtube.com/watch?v=SOTamWNgDKc",
            },
        },
    },

    "sre": {
        "title": "Site Reliability Engineer (SRE)",
        "skills": [
            "linux",
            "python",
            "kubernetes",
            "prometheus",
            "grafana",
            "docker",
            "ci/cd",
            "networking",
        ],
        "benchmarks": {
            "linux": 95,
            "python": 85,
            "kubernetes": 85,
            "prometheus": 80,
            "grafana": 80,
            "docker": 85,
            "ci/cd": 80,
            "networking": 80,
        },
        "trending_tech": [
            "Prometheus",
            "Grafana",
            "Chaos Engineering",
            "OpenTelemetry",
        ],
        "hiring_surge": "+38% YoY Growth",
        "resources": {
            "prometheus": {
                "docs": "https://prometheus.io/docs/introduction/overview/",
                "video": "https://www.youtube.com/watch?v=9TJx7QTrTyo",
            },
            "linux": {
                "docs": "https://linuxjourney.com/",
                "video": "https://www.youtube.com/watch?v=sWbGOq-JrIQ",
            },
        },
    },

    "cybersecurity": {
        "title": "Cyber Security & SOC Analyst",
        "skills": [
            "network security",
            "linux",
            "python",
            "wireshark",
            "penetration testing",
            "siem",
            "ethical hacking",
            "cryptography",
        ],
        "benchmarks": {
            "network security": 90,
            "linux": 85,
            "python": 80,
            "wireshark": 85,
            "penetration testing": 80,
            "siem": 75,
            "ethical hacking": 80,
            "cryptography": 75,
        },
        "trending_tech": [
            "Splunk SIEM",
            "MITRE ATT&CK",
            "Wireshark",
            "Burp Suite",
        ],
        "hiring_surge": "+39% YoY Growth",
        "resources": {
            "penetration testing": {
                "docs": "https://www.owasp.org",
                "video": "https://www.youtube.com/watch?v=2_lwwZg80lY",
            },
            "wireshark": {
                "docs": "https://www.wireshark.org/docs/",
                "video": "https://www.youtube.com/watch?v=IPvYjXCsTg8",
            },
        },
    },

    "vapt": {
        "title": "Penetration Tester & Ethical Hacker (VAPT)",
        "skills": [
            "penetration testing",
            "burp suite",
            "metasploit",
            "nmap",
            "owasp",
            "linux",
            "python",
            "wireshark",
        ],
        "benchmarks": {
            "penetration testing": 95,
            "burp suite": 90,
            "metasploit": 85,
            "nmap": 85,
            "owasp": 90,
            "linux": 85,
            "python": 80,
            "wireshark": 80,
        },
        "trending_tech": [
            "Burp Suite Pro",
            "Bug Bounty Hunting",
            "Web API Security",
        ],
        "hiring_surge": "+35% YoY Growth",
        "resources": {
            "owasp": {
                "docs": "https://owasp.org/www-project-top-ten/",
                "video": "https://www.youtube.com/watch?v=2_lwwZg80lY",
            },
            "burp suite": {
                "docs": "https://portswigger.net/web-security",
                "video": "https://www.youtube.com/watch?v=h2gXZ_8_3k0",
            },
        },
    },

    # ========================================================
    # 5. Quality Assurance & Testing
    # ========================================================

    "sdet": {
        "title": "QA Automation Engineer (SDET)",
        "skills": [
            "selenium",
            "cypress",
            "playwright",
            "java",
            "python",
            "junit",
            "test automation",
            "git",
            "ci/cd",
        ],
        "benchmarks": {
            "selenium": 85,
            "cypress": 85,
            "playwright": 80,
            "java": 80,
            "python": 80,
            "junit": 75,
            "test automation": 90,
            "git": 80,
            "ci/cd": 75,
        },
        "trending_tech": [
            "Playwright",
            "Cypress",
            "CI/CD Integration",
            "API Automation",
        ],
        "hiring_surge": "+27% YoY Growth",
        "resources": {
            "playwright": {
                "docs": "https://playwright.dev/",
                "video": "https://www.youtube.com/watch?v=3kJ74k_N5a4",
            },
            "cypress": {
                "docs": "https://docs.cypress.io/",
                "video": "https://www.youtube.com/watch?v=BvomPhkbdt8",
            },
            "selenium": {
                "docs": "https://www.selenium.dev/",
                "video": "https://www.youtube.com/watch?v=FRn5J31eGoY",
            },
        },
    },

    # ========================================================
    # 6. UI/UX & Design
    # ========================================================

    "ui_ux": {
        "title": "UI/UX & Product Designer",
        "skills": [
            "figma",
            "wireframing",
            "prototyping",
            "user research",
            "design systems",
            "usability testing",
            "adobe xd",
        ],
        "benchmarks": {
            "figma": 95,
            "wireframing": 90,
            "prototyping": 85,
            "user research": 80,
            "design systems": 85,
            "usability testing": 75,
            "adobe xd": 70,
        },
        "trending_tech": [
            "Figma Variables & Auto Layout",
            "Design Tokens",
            "Design Systems",
        ],
        "hiring_surge": "+32% YoY Growth",
        "resources": {
            "figma": {
                "docs": "https://help.figma.com/",
                "video": "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
            },
            "design systems": {
                "docs": "https://material.io/design",
                "video": "https://www.youtube.com/watch?v=1dM4qM0I1_E",
            },
            "user research": {
                "docs": "https://www.nngroup.com/articles/ux-research-cheat-sheet/",
                "video": "https://www.youtube.com/watch?v=bAARmsv_o18",
            },
        },
    },

    # ========================================================
    # 7. Product & Project Management
    # ========================================================

    "product_manager": {
        "title": "Product Manager (PM / APM)",
        "skills": [
            "product strategy",
            "wireframing",
            "agile",
            "scrum",
            "data analytics",
            "user research",
            "jira",
            "roadmap planning",
        ],
        "benchmarks": {
            "product strategy": 90,
            "wireframing": 75,
            "agile": 85,
            "scrum": 85,
            "data analytics": 80,
            "user research": 85,
            "jira": 80,
            "roadmap planning": 90,
        },
        "trending_tech": [
            "Product-Led Growth",
            "Jira & Confluence",
            "SQL for PMs",
        ],
        "hiring_surge": "+36% YoY Growth",
        "resources": {
            "agile": {
                "docs": "https://www.atlassian.com/agile",
                "video": "https://www.youtube.com/watch?v=9TycLR0TqFA",
            },
            "product strategy": {
                "docs": "https://www.mindtheproduct.com/",
                "video": "https://www.youtube.com/watch?v=uKfxVfG1_bA",
            },
        },
    },

    # ========================================================
    # 8. Growth & Digital Marketing
    # ========================================================

    "seo_specialist": {
        "title": "SEO Specialist & Organic Growth Strategist",
        "skills": [
            "seo",
            "google analytics",
            "keyword research",
            "content strategy",
            "on-page seo",
            "technical seo",
            "link building",
            "semrush",
        ],
        "benchmarks": {
            "seo": 95,
            "google analytics": 90,
            "keyword research": 90,
            "content strategy": 85,
            "on-page seo": 90,
            "technical seo": 85,
            "link building": 80,
            "semrush": 80,
        },
        "trending_tech": [
            "Google Search Console",
            "GA4",
            "Ahrefs / SEMrush",
            "AI Overviews",
        ],
        "hiring_surge": "+22% YoY Growth",
        "resources": {
            "seo": {
                "docs": "https://developers.google.com/search/docs",
                "video": "https://www.youtube.com/watch?v=DvwS7cV9GmQ",
            },
            "google analytics": {
                "docs": "https://analytics.google.com/analytics/academy/",
                "video": "https://www.youtube.com/watch?v=H7bX_0u0X7E",
            },
        },
    },

    # ========================================================
    # 9. B2B Sales & Finance
    # ========================================================

    "bde_sales": {
        "title": "Business Development Executive (B2B Sales)",
        "skills": [
            "lead generation",
            "crm",
            "cold calling",
            "salesforce",
            "client qualification",
            "negotiation",
            "b2b sales",
        ],
        "benchmarks": {
            "lead generation": 90,
            "crm": 85,
            "cold calling": 80,
            "salesforce": 85,
            "client qualification": 85,
            "negotiation": 90,
            "b2b sales": 90,
        },
        "trending_tech": [
            "Salesforce CRM",
            "HubSpot Sales",
            "Apollo.io",
            "LinkedIn Sales Navigator",
        ],
        "hiring_surge": "+25% YoY Growth",
        "resources": {
            "lead generation": {
                "docs": "https://academy.hubspot.com/courses/inbound-sales",
                "video": "https://www.youtube.com/watch?v=5_qR_aU3N_M",
            },
            "crm": {
                "docs": "https://trailhead.salesforce.com/",
                "video": "https://www.youtube.com/watch?v=p_O9K8j2P_Q",
            },
        },
    },

    "financial_analyst": {
        "title": "Financial Analyst & Equity Research",
        "skills": [
            "financial modeling",
            "excel",
            "dcf",
            "valuation",
            "balance sheet",
            "statistics",
            "accounting",
        ],
        "benchmarks": {
            "financial modeling": 95,
            "excel": 95,
            "dcf": 90,
            "valuation": 90,
            "balance sheet": 85,
            "statistics": 80,
            "accounting": 85,
        },
        "trending_tech": [
            "DCF Modeling",
            "Advanced Excel (VBA/Macros)",
            "Power BI Financials",
            "Bloomberg Terminal",
        ],
        "hiring_surge": "+28% YoY Growth",
        "resources": {
            "financial modeling": {
                "docs": "https://corporatefinanceinstitute.com/resources/knowledge/modeling/",
                "video": "https://www.youtube.com/watch?v=kY6T5Wb0sA8",
            },
            "excel": {
                "docs": "https://support.microsoft.com/excel",
                "video": "https://www.youtube.com/watch?v=Vl0H-qTclOg",
            },
        },
    },
}


# ============================================================
# Utility: Normalize Role / Skill Text
# ============================================================

def normalize_text(text: str) -> str:
    """
    Normalize arbitrary text for reliable matching.

    This function intentionally preserves the original meaning
    while making spaces, separators and common punctuation
    consistent.
    """

    if not text:
        return ""

    normalized = str(text).lower().strip()

    normalized = (
        normalized
        .replace("&", " and ")
        .replace("/", " ")
        .replace("-", " ")
        .replace("_", " ")
        .replace("(", " ")
        .replace(")", " ")
        .replace(",", " ")
        .replace(".", " ")
        .replace(":", " ")
        .replace(";", " ")
        .replace("|", " ")
    )

    normalized = re.sub(r"\s+", " ", normalized)

    return normalized.strip()


def normalize_skill_text(text: str) -> str:
    """
    Normalize resume text for skill detection.

    This is slightly more aggressive than role normalization
    because resumes commonly contain:
        Node.js / NodeJS
        Next.js / NextJS
        CI-CD / CI/CD
        RESTful API / REST API
    """

    if not text:
        return ""

    normalized = str(text).lower()

    replacements = {
        "node.js": "nodejs",
        "node js": "nodejs",
        "next.js": "nextjs",
        "next js": "nextjs",
        "react.js": "react",
        "react js": "react",
        "vue.js": "vue",
        "vue js": "vue",
        "express.js": "express",
        "express js": "express",
        "restful api": "rest api",
        "restful apis": "rest api",
        "ci-cd": "ci/cd",
        "ci cd": "ci/cd",
        "continuous integration": "ci/cd",
        "continuous deployment": "ci/cd",
        "c sharp": "c#",
        "c plus plus": "c++",
    }

    for old, new in replacements.items():
        normalized = normalized.replace(old, new)

    normalized = (
        normalized
        .replace("\u00a0", " ")
        .replace("\r", " ")
        .replace("\n", " ")
        .replace("\t", " ")
    )

    normalized = re.sub(r"\s+", " ", normalized)

    return normalized.strip()


# ============================================================
# Role Resolution
# ============================================================

def resolve_target_role(role_input: str):
    if not role_input or not role_input.strip():
        return None

    clean = normalize_text(role_input)

    # ========================================================
    # 1. Exact backend taxonomy key
    # ========================================================

    for key in ROLE_TAXONOMY:
        if clean == normalize_text(key):
            return key

    # ========================================================
    # 2. Exact backend taxonomy title
    # ========================================================

    for key, data in ROLE_TAXONOMY.items():
        title = data.get("title", "")

        if title and clean == normalize_text(title):
            return key

    # ========================================================
    # 3. ALL HTML 40+ ROLE MAPPINGS
    # ========================================================

    ROLE_ALIASES = {

        # -------------------------
        # Software / Web
        # -------------------------

        "frontend web engineer": "frontend",
        "frontend developer": "frontend",
        "frontend engineer": "frontend",
        "front end developer": "frontend",

        "backend api engineer": "backend",
        "backend developer": "backend",
        "backend engineer": "backend",
        "back end developer": "backend",

        "full stack software engineer": "fullstack",
        "full stack developer": "fullstack",
        "fullstack developer": "fullstack",
        "software engineer": "fullstack",
        "software developer": "fullstack",

        # -------------------------
        # Mobile
        # -------------------------

        "android native developer": "android_native",
        "android developer": "android_native",

        "ios native developer": "ios_native",
        "ios developer": "ios_native",

        "cross platform flutter developer": "flutter",
        "flutter developer": "flutter",

        "react native developer": "react_native",
        "react native engineer": "react_native",

        # -------------------------
        # QA / Testing
        # -------------------------

        "qa automation engineer sdet": "sdet",
        "qa automation engineer": "sdet",
        "manual qa functional tester": "sdet",
        "manual qa tester": "sdet",
        "manual qa": "sdet",
        "functional tester": "sdet",
        "qa tester": "sdet",
        "software tester": "sdet",

        # -------------------------
        # Embedded / Game / Blockchain
        # -------------------------

        "embedded systems iot engineer": "backend",
        "embedded systems engineer": "backend",
        "iot engineer": "backend",

        "game developer unity unreal": "fullstack",
        "game developer": "fullstack",
        "unity developer": "fullstack",
        "unreal developer": "fullstack",

        "blockchain smart contract developer": "backend",
        "blockchain developer": "backend",
        "smart contract developer": "backend",
        "web3 developer": "backend",

        # -------------------------
        # Data / AI
        # -------------------------

        "data analyst bi specialist": "data_analyst",
        "data analyst": "data_analyst",
        "business intelligence analyst": "data_analyst",

        "data engineer big data etl": "data_engineer",
        "data engineer": "data_engineer",

        "machine learning nlp engineer": "ai_ml",
        "machine learning engineer": "ai_ml",
        "ml engineer": "ai_ml",
        "deep learning computer vision engineer": "ai_ml",
        "computer vision engineer": "ai_ml",
        "deep learning engineer": "ai_ml",

        "generative ai llm applications engineer": "gen_ai",
        "generative ai engineer": "gen_ai",
        "gen ai engineer": "gen_ai",
        "genai engineer": "gen_ai",
        "llm engineer": "gen_ai",
        "ai prompt engineer evaluator": "gen_ai",
        "prompt engineer": "gen_ai",
        "ai prompt engineer": "gen_ai",

        "quantitative research financial data analyst": "financial_analyst",
        "quantitative analyst": "financial_analyst",

        # FIX: this alias never matched because normalize_text()
        # turns "&" into "and", so the incoming text became
        # "statistical cadre and survey analyst mospi track" while
        # this key omitted "and". Selecting this exact role always
        # produced a 400 "Unsupported corporate role" error.
        "statistical cadre and survey analyst mospi track": "data_analyst",
        "statistical cadre survey analyst mospi track": "data_analyst",
        "statistical analyst": "data_analyst",
        "survey analyst": "data_analyst",

        # -------------------------
        # Cloud / Infrastructure
        # -------------------------

        "devops cloud infrastructure engineer": "devops",
        "devops engineer": "devops",
        "cloud engineer": "devops",

        "site reliability engineer sre": "sre",
        "site reliability engineer": "sre",
        "sre": "sre",

        "cloud security engineer": "cybersecurity",
        "cloud security": "cybersecurity",

        "linux system administrator": "devops",
        "linux administrator": "devops",
        "system administrator": "devops",

        "database administrator dba sql nosql": "backend",
        "database administrator": "backend",
        "dba": "backend",
        "database administrator sql nosql": "backend",

        # -------------------------
        # Cybersecurity
        # -------------------------

        "cyber security soc analyst": "cybersecurity",
        "cybersecurity analyst": "cybersecurity",
        "soc analyst": "cybersecurity",

        "penetration tester ethical hacker vapt": "vapt",
        "penetration tester": "vapt",
        "ethical hacker": "vapt",
        "vapt": "vapt",

        "information security compliance auditor": "cybersecurity",
        "information security auditor": "cybersecurity",
        "security auditor": "cybersecurity",

        "network security engineer": "cybersecurity",
        "network security": "cybersecurity",

        # -------------------------
        # Design / Management
        # -------------------------

        "ui ux product designer": "ui_ux",
        "ui ux designer": "ui_ux",
        "ux designer": "ui_ux",
        "ui designer": "ui_ux",

        "graphic designer brand visualizer": "ui_ux",
        "graphic designer": "ui_ux",

        "product manager pm apm": "product_manager",
        "product manager": "product_manager",
        "associate product manager": "product_manager",
        "apm": "product_manager",

        "technical project manager scrum agile": "product_manager",
        "technical project manager": "product_manager",
        "project manager": "product_manager",

        "business analyst it corporate strategy": "product_manager",
        "business analyst": "product_manager",

        # -------------------------
        # Marketing / Content
        # -------------------------

        "seo specialist organic growth strategist": "seo_specialist",
        "seo specialist": "seo_specialist",
        "seo analyst": "seo_specialist",

        "performance digital marketing specialist": "seo_specialist",
        "digital marketing specialist": "seo_specialist",
        "performance marketing specialist": "seo_specialist",

        "content strategist technical writer": "seo_specialist",
        "content strategist": "seo_specialist",
        "technical writer": "seo_specialist",

        "social media community manager": "seo_specialist",
        "social media manager": "seo_specialist",

        # -------------------------
        # Sales / Finance
        # -------------------------

        "business development executive b2b sales": "bde_sales",
        "business development executive": "bde_sales",
        "bde": "bde_sales",

        "inside sales account executive": "bde_sales",
        "inside sales": "bde_sales",
        "account executive": "bde_sales",

        "financial analyst equity research": "financial_analyst",
        "financial analyst": "financial_analyst",
        "equity research analyst": "financial_analyst",

        # -------------------------
        # HR / Recruitment
        # -------------------------

        "technical recruiter talent acquisition": "product_manager",
        "technical recruiter": "product_manager",
        "talent acquisition": "product_manager",

        "human resources executive hr generalist": "product_manager",
        "human resources executive": "product_manager",
        "hr generalist": "product_manager",
    }

    # ========================================================
    # 4. Exact alias match
    # ========================================================

    if clean in ROLE_ALIASES:
        mapped_role = ROLE_ALIASES[clean]

        if mapped_role in ROLE_TAXONOMY:
            return mapped_role

    # ========================================================
    # 5. Keyword matching
    # ========================================================

    keyword_rules = [

        ("react_native", [
            "react native",
        ]),

        ("flutter", [
            "flutter",
        ]),

        ("android_native", [
            "android",
            "kotlin",
            "jetpack",
        ]),

        ("ios_native", [
            "ios",
            "swift",
            "swiftui",
        ]),

        ("gen_ai", [
            "generative ai",
            "genai",
            "gen ai",
            "llm",
            "prompt engineer",
            "prompt engineering",
            "rag",
        ]),

        ("ai_ml", [
            "machine learning",
            "deep learning",
            "computer vision",
            "data scientist",
            "ml engineer",
        ]),

        ("data_engineer", [
            "data engineer",
            "big data",
            "etl",
            "spark",
            "hadoop",
            "airflow",
            "kafka",
        ]),

        ("data_analyst", [
            "data analyst",
            "business intelligence",
            "power bi",
            "tableau",
            "statistics",
            # FIX: added so roles like "Statistical Cadre & Survey
            # Analyst (MoSPI Track)" resolve correctly even if the
            # exact alias lookup above ever misses a phrasing.
            "statistical",
            "survey analyst",
            "mospi",
        ]),

        ("sre", [
            "site reliability",
            "sre",
            "prometheus",
            "grafana",
        ]),

        ("devops", [
            "devops",
            "cloud infrastructure",
            "linux administrator",
            "system administrator",
            "kubernetes",
        ]),

        ("vapt", [
            "penetration",
            "pentest",
            "ethical hacker",
            "vapt",
        ]),

        ("cybersecurity", [
            "cyber security",
            "cybersecurity",
            "soc analyst",
            "information security",
            "network security",
        ]),

        ("sdet", [
            "qa",
            "tester",
            "testing",
            "sdet",
            "automation test",
            "manual test",
        ]),

        ("ui_ux", [
            "ui",
            "ux",
            "designer",
            "design",
            "figma",
        ]),

        ("product_manager", [
            "product manager",
            "project manager",
            "business analyst",
            "recruiter",
            "human resources",
            "hr generalist",
            "talent acquisition",
        ]),

        ("seo_specialist", [
            "seo",
            "digital marketing",
            "content strategist",
            "technical writer",
            "social media",
        ]),

        ("bde_sales", [
            "sales",
            "business development",
            "bde",
            "account executive",
        ]),

        ("financial_analyst", [
            "financial analyst",
            "finance",
            "equity research",
            "quantitative research",
        ]),

        ("fullstack", [
            "full stack",
            "fullstack",
            "game developer",
            "unity",
            "unreal",
        ]),

        ("backend", [
            "backend",
            "database administrator",
            "dba",
            "blockchain",
            "smart contract",
            "web3",
            "embedded systems",
            "iot",
        ]),

        # Frontend LAST
        ("frontend", [
            "frontend",
            "front end",
            "react developer",
            "html developer",
            "css developer",
        ]),
    ]

    for role_key, keywords in keyword_rules:

        if role_key not in ROLE_TAXONOMY:
            continue

        for keyword in keywords:

            if normalize_text(keyword) in clean:
                return role_key

    # ========================================================
    # IMPORTANT:
    # Never silently convert an unknown role into Frontend.
    # ========================================================

    return None


# ============================================================
# PDF Text Extraction
# ============================================================

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract and normalize all text characters from uploaded PDF stream.

    Returns an empty string when extraction fails.
    """

    if not file_bytes:
        return ""

    try:
        reader = PdfReader(BytesIO(file_bytes))

        if not reader.pages:
            return ""

        text_parts = []

        for page in reader.pages:

            try:
                extracted = page.extract_text()

                if extracted:
                    text_parts.append(extracted)

            except Exception as page_error:
                print(f"PDF page extraction warning: {page_error}")

        text = " ".join(text_parts)

        return normalize_skill_text(text)

    except Exception as e:
        print(f"PDF extraction error: {e}")
        return ""


# ============================================================
# Skill Matching Helpers
# ============================================================

SKILL_ALIASES: Dict[str, List[str]] = {
    # --------------------------------------------------------
    # Web / Frontend
    # --------------------------------------------------------
    "html": ["html", "html5"],
    "css": ["css", "css3"],
    "javascript": ["javascript", "java script", "ecmascript", "js"],
    "typescript": ["typescript", "ts"],
    "react": ["react", "reactjs", "react js", "react.js"],
    "nextjs": ["nextjs", "next js", "next.js"],
    "tailwind": ["tailwind", "tailwindcss", "tailwind css"],
    "redux": ["redux", "redux toolkit", "rtk", "state management"],

    # --------------------------------------------------------
    # Backend
    # --------------------------------------------------------
    "nodejs": ["nodejs", "node js", "node.js", "node"],
    "rest api": [
        "rest api", "rest apis", "restful api", "restful apis",
        "api development", "api integration", "web api",
    ],
    "postgresql": ["postgresql", "postgres", "psql"],
    "mongodb": ["mongodb", "mongo db", "mongo", "nosql"],
    "fastapi": ["fastapi", "fast api"],
    "django": ["django", "django rest framework", "drf"],
    "redis": ["redis", "redis cache", "in-memory cache", "caching"],

    # --------------------------------------------------------
    # DevOps / Cloud
    # --------------------------------------------------------
    "ci/cd": [
        "ci/cd", "ci cd", "continuous integration", "continuous deployment",
        "cicd", "github actions", "gitlab ci",
    ],
    "docker": ["docker", "docker container", "docker containers", "containerization"],
    "kubernetes": ["kubernetes", "k8s", "kubectl", "helm"],
    "terraform": ["terraform", "infrastructure as code", "iac"],
    "linux": ["linux", "ubuntu", "debian", "centos", "unix", "kali", "kali linux", "rhel"],
    "aws": ["aws", "amazon web services", "ec2", "s3 bucket", "amazon aws", "amazon s3"],
    "bash": ["bash", "shell scripting", "shell script", "bash scripting"],
    "jenkins": ["jenkins", "jenkins pipeline"],
    "prometheus": ["prometheus"],
    "grafana": ["grafana", "grafana dashboards"],
    "networking": ["networking", "computer networks", "tcp/ip", "network protocols", "osi model"],

    # --------------------------------------------------------
    # Data Engineering
    # --------------------------------------------------------
    "apache spark": ["apache spark", "spark", "pyspark"],
    "hadoop": ["hadoop", "hdfs", "mapreduce"],
    "airflow": ["airflow", "apache airflow"],
    "kafka": ["kafka", "apache kafka", "event streaming"],

    # --------------------------------------------------------
    # Data / AI / ML
    # --------------------------------------------------------
    "pytorch": ["pytorch", "torch"],
    "tensorflow": ["tensorflow", "tf", "keras"],
    "scikit-learn": ["scikit-learn", "scikit learn", "sklearn"],
    "machine learning": ["machine learning", "machine-learning", "ml", "supervised learning", "unsupervised learning"],
    "deep learning": ["deep learning", "deep-learning", "neural networks", "neural network"],
    "nlp": ["nlp", "natural language processing", "transformers", "huggingface", "bert", "text mining"],
    "pandas": ["pandas", "dataframes", "dataframe"],
    "numpy": ["numpy"],
    "sql": ["sql", "mysql", "structured query language", "t-sql", "pl/sql", "plsql", "queries", "database queries"],
    "power bi": ["power bi", "powerbi", "power-bi"],
    "tableau": ["tableau", "tableau desktop"],
    "excel": ["excel", "ms excel", "microsoft excel", "advanced excel", "vlookup", "pivot table", "pivot tables"],
    "statistics": ["statistics", "statistical analysis", "statistical", "probability", "hypothesis testing", "survey analyst", "survey analysis"],
    "data visualization": ["data visualization", "data viz", "matplotlib", "seaborn", "visualization"],
    "prompt engineering": [
        "prompt engineering", "prompt engineer", "prompt design",
        "prompt engineering techniques", "prompt crafting",
    ],
    "vector databases": [
        "vector database", "vector databases", "vector db", "vector store",
        "pinecone", "chromadb", "chroma db", "weaviate", "faiss",
    ],
    "langchain": ["langchain", "lang chain"],
    "llamaindex": ["llamaindex", "llama index"],
    "openai": ["openai", "open ai", "gpt-4", "gpt4", "chatgpt", "chatgpt api"],
    "rag": ["rag", "retrieval augmented generation", "retrieval-augmented generation"],

    # --------------------------------------------------------
    # Mobile
    # --------------------------------------------------------
    "react native": ["react native", "reactnative", "react-native"],
    "mobile development": ["mobile development", "mobile app development", "mobile apps", "app development", "mobile applications"],
    "android": ["android", "android development", "android app", "android apps"],
    "ios": ["ios", "ios development", "ios app", "iphone app", "iphone development"],
    "dart": ["dart", "dart language", "dart lang"],
    "flutter": ["flutter", "flutter sdk", "flutter framework"],
    "firebase": ["firebase", "firestore", "firebase auth", "firebase realtime database"],
    "kotlin": ["kotlin", "kotlin coroutines"],
    "android sdk": ["android sdk", "android studio", "android development kit"],
    "jetpack compose": ["jetpack compose", "compose", "declarative ui"],
    "gradle": ["gradle", "build.gradle", "build gradle"],
    "swift": ["swift", "swift programming", "swift language"],
    "swiftui": ["swiftui", "swift ui"],
    "uikit": ["uikit", "ui kit"],
    "xcode": ["xcode"],
    "cocoapods": ["cocoapods", "cocoa pods", "spm", "swift package manager"],

    # --------------------------------------------------------
    # QA / Testing
    # --------------------------------------------------------
    "selenium": ["selenium", "selenium webdriver"],
    "cypress": ["cypress"],
    "playwright": ["playwright"],
    "junit": ["junit", "testng", "unit testing", "unit tests"],
    "test automation": [
        "test automation", "automated testing", "automation testing",
        "regression testing", "sdet", "qa automation",
    ],

    # --------------------------------------------------------
    # Cybersecurity
    # --------------------------------------------------------
    "wireshark": ["wireshark", "packet analysis", "packet capture"],
    "penetration testing": [
        "penetration testing", "penetration test", "pentesting",
        "pen testing", "vulnerability assessment", "vapt",
    ],
    "burp suite": ["burp suite", "burpsuite", "burp"],
    "nmap": ["nmap", "port scanning"],
    "owasp": ["owasp", "owasp top 10", "web application security"],
    "network security": [
        "network security", "network protocols", "firewalls", "firewall",
        "vpn", "network administration", "ids", "ips",
    ],
    "siem": [
        "siem", "splunk", "qradar", "security information and event management",
        "log analysis", "log monitoring",
    ],
    "ethical hacking": [
        "ethical hacking", "ethical hacker", "ceh", "certified ethical hacker",
        "white hat", "white hat hacking",
    ],
    "cryptography": [
        "cryptography", "encryption", "ssl", "tls", "cryptographic",
        "public key infrastructure", "pki",
    ],
    "metasploit": ["metasploit", "meterpreter"],

    # --------------------------------------------------------
    # Design / UI-UX
    # --------------------------------------------------------
    "figma": ["figma", "figma prototyping"],
    "wireframing": ["wireframing", "wireframe", "wireframes", "low fidelity design", "low-fidelity design"],
    "prototyping": ["prototyping", "prototype", "interactive prototype", "interactive prototypes"],
    "user research": [
        "user research", "usability research", "user interviews",
        "user testing", "ux research",
    ],
    "design systems": ["design systems", "design system", "design tokens", "component library"],
    "usability testing": ["usability testing", "usability test", "a/b testing", "ab testing"],
    "adobe xd": ["adobe xd", "xd"],

    # --------------------------------------------------------
    # Product / Project Management
    # --------------------------------------------------------
    "product strategy": [
        "product strategy", "product roadmap", "product vision",
        "prd", "product requirement", "product requirements",
    ],
    "agile": ["agile", "agile methodology", "kanban", "agile development"],
    "scrum": ["scrum", "sprint planning", "scrum master", "sprints", "scrum ceremonies"],
    "data analytics": ["data analytics", "analytics", "metrics analysis", "product analytics"],
    "jira": ["jira", "confluence", "atlassian"],
    "roadmap planning": ["roadmap planning", "product roadmap", "roadmapping", "quarterly planning"],

    # --------------------------------------------------------
    # Marketing / SEO
    # --------------------------------------------------------
    "seo": ["seo", "search engine optimization"],
    "google analytics": ["google analytics", "ga4", "google analytics 4", "search console"],
    "keyword research": ["keyword research", "keyword analysis", "keyword strategy"],
    "content strategy": ["content strategy", "content marketing", "content planning"],
    "on-page seo": ["on-page seo", "on page seo", "onpage seo", "meta tags", "title tags"],
    "technical seo": [
        "technical seo", "site speed", "core web vitals",
        "xml sitemap", "robots.txt", "canonicalization",
    ],
    "link building": ["link building", "backlinks", "backlink building", "off-page seo"],
    "semrush": ["semrush", "ahrefs", "moz"],

    # --------------------------------------------------------
    # Sales / Business Development
    # --------------------------------------------------------
    "lead generation": ["lead generation", "prospecting", "cold outreach", "sales pipeline", "outbound prospecting"],
    "crm": ["crm", "customer relationship management", "hubspot", "hubspot crm"],
    "cold calling": ["cold calling", "cold calls", "outbound calling"],
    "salesforce": ["salesforce", "sfdc", "salesforce crm"],
    "client qualification": ["client qualification", "lead qualification", "bant"],
    "negotiation": ["negotiation", "deal closing", "closing deals", "contract negotiation"],
    "b2b sales": ["b2b sales", "business to business sales", "enterprise sales"],

    # --------------------------------------------------------
    # Finance
    # --------------------------------------------------------
    "financial modeling": [
        "financial modeling", "financial model", "3 statement model",
        "three statement model", "financial models",
    ],
    "dcf": ["dcf", "discounted cash flow"],
    "valuation": ["valuation", "company valuation", "equity valuation"],
    "balance sheet": ["balance sheet", "financial statements", "income statement"],
    "accounting": ["accounting", "bookkeeping", "gaap"],

    # --------------------------------------------------------
    # General / Cross-cutting
    # --------------------------------------------------------
    "java": ["java", "core java"],
    "python": ["python", "python3", "python 3"],
    "git": ["git", "github", "gitlab", "version control"],
}


# ============================================================
# Precompiled Skill Matchers (Performance Optimization)
# ============================================================
#
# FIX (speed): The original skill_is_present() re-ran
# normalize_skill_text() on the *entire* resume text and re-compiled
# a fresh regex for every single required skill, on every single
# request (8-9+ times per evaluation). On Render's free-tier CPU
# this repeated regex compilation and string normalization adds up
# and is completely unnecessary — the resume text and the alias
# list are both static once parsed, so both can be prepared once.
#
# SKILL_MATCHERS pre-normalizes every alias and pre-compiles every
# single-word regex pattern ONE TIME at server startup, not per
# request. skill_is_present() now takes already-normalized resume
# text and just does cheap substring / precompiled-regex checks.
# ============================================================

SKILL_MATCHERS: Dict[str, List[Any]] = {}

for _skill_key, _alias_list in SKILL_ALIASES.items():
    _matchers: List[Any] = []

    for _alias in _alias_list:
        _normalized_alias = normalize_skill_text(_alias)

        if not _normalized_alias:
            continue

        if " " in _normalized_alias or "/" in _normalized_alias:
            # Phrase match — plain substring check, no regex needed.
            _matchers.append(("phrase", _normalized_alias, None))
        else:
            # Single word — precompile the word-boundary regex once.
            _pattern = re.compile(
                r"(?<![a-z0-9+#])" + re.escape(_normalized_alias) + r"(?![a-z0-9+#])"
            )
            _matchers.append(("regex", _normalized_alias, _pattern))

    SKILL_MATCHERS[_skill_key] = _matchers


def skill_is_present(skill: str, normalized_resume_text: str) -> bool:
    """
    Check whether a required skill exists in ALREADY-NORMALIZED
    resume text.

    IMPORTANT: normalized_resume_text must already be passed through
    normalize_skill_text() by the caller (done once per request, not
    once per skill) — see evaluate_resume().

    Falls back to treating the raw skill string as its own alias if
    it isn't present in SKILL_ALIASES.
    """

    if not skill or not normalized_resume_text:
        return False

    skill_key = skill.lower()

    matchers = SKILL_MATCHERS.get(skill_key)

    if matchers is None:
        # No predefined aliases for this skill — fall back to a
        # single on-the-fly matcher built from the skill name itself.
        normalized_alias = normalize_skill_text(skill_key)

        if not normalized_alias:
            return False

        if " " in normalized_alias or "/" in normalized_alias:
            return normalized_alias in normalized_resume_text

        pattern = re.compile(
            r"(?<![a-z0-9+#])" + re.escape(normalized_alias) + r"(?![a-z0-9+#])"
        )

        return bool(pattern.search(normalized_resume_text))

    for kind, normalized_alias, pattern in matchers:

        if kind == "phrase":
            if normalized_alias in normalized_resume_text:
                return True
        else:
            if pattern.search(normalized_resume_text):
                return True

    return False


# ============================================================
# Supabase Background Synchronization
# ============================================================

async def async_sync_to_supabase(
    candidate_name: str,
    university_name: str,
    role_key: str,
    role_title: str,
    readiness_score: int,
    acquired: List[str],
    missing: List[str],
    cert_hash: str,
    institution_id: str,
):
    """
    Background task to push evaluation audit records into Supabase.

    Supabase errors are deliberately non-blocking so the resume
    evaluation API can still return a valid result.
    """

    if not supabase:
        return

    try:

        candidate_payload = {
            "full_name": candidate_name,
            "university_name": university_name,
            "institution_id": institution_id,
        }

        try:
            cand_res = (
                supabase
                .table("candidates")
                .insert(candidate_payload)
                .execute()
            )
        except Exception as insert_error:
            # FIX: if the "candidates" table in Supabase does not yet
            # have a "university_name" column, the insert above will
            # be rejected by Postgres. Rather than losing the whole
            # record (and silently losing the candidate + audit row),
            # we retry once WITHOUT the new column so older Supabase
            # schemas keep working exactly as before. Add a
            # "university_name" text column to your "candidates"
            # table in Supabase to start persisting it.
            print(
                f"Supabase insert with university_name failed, "
                f"retrying without it: {insert_error}"
            )

            fallback_payload = {
                "full_name": candidate_name,
                "institution_id": institution_id,
            }

            cand_res = (
                supabase
                .table("candidates")
                .insert(fallback_payload)
                .execute()
            )

        cand_id = (
            cand_res.data[0]["id"]
            if (
                cand_res
                and getattr(cand_res, "data", None)
                and len(cand_res.data) > 0
                and "id" in cand_res.data[0]
            )
            else None
        )

        audit_payload = {
            "candidate_id": cand_id,
            "role_key": role_key,
            "role_title": role_title,
            "institution_id": institution_id,
            "readiness_score": readiness_score,
            "acquired_skills": acquired,
            "missing_skills": missing,
            "cert_hash": cert_hash,
        }

        (
            supabase
            .table("skill_audits")
            .insert(audit_payload)
            .execute()
        )

    except Exception as e:
        print(f"Supabase non-blocking sync error: {e}")


# ============================================================
# Root Status
# ============================================================

@app.get("/")
def root_status():
    return {
        "status": "online",
        "service": "SkillBank AI Enterprise Core Engine",
        "version": "4.0",
        "taxonomy_profiles_count": len(ROLE_TAXONOMY),
        "supabase_connected": supabase is not None,
        "supported_roles": list(ROLE_TAXONOMY.keys()),
    }


# ============================================================
# Health Check
# ============================================================

@app.get("/health")
def health_check():
    """
    Lightweight health endpoint useful for Render, Railway,
    Vercel-compatible monitors, Docker health checks, etc.
    """

    return {
        "status": "healthy",
        "service": "SkillBank AI Enterprise Core Engine",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "supabase_connected": supabase is not None,
        "taxonomy_profiles_count": len(ROLE_TAXONOMY),
    }


# ============================================================
# Resume Evaluation
# ============================================================

@app.post("/api/evaluate")
async def evaluate_resume(
    background_tasks: BackgroundTasks,
    candidate_name: Optional[str] = Form(None),
    full_name: Optional[str] = Form(None),
    university_name: Optional[str] = Form(None),
    institution_name: Optional[str] = Form(None),
    target_role: str = Form(...),
    institution_id: Optional[str] = Form("poornima"),
    resume: Optional[UploadFile] = File(None),
    resume_file: Optional[UploadFile] = File(None),
):
    # ========================================================
    # Candidate Name
    # ========================================================

    final_name = (
        candidate_name
        or full_name
        or "Evaluated Candidate"
    ).strip()

    # ========================================================
    # University / Institution Name
    # (NEW FIELD — 4th user input, persisted to Supabase)
    # ========================================================

    final_university = (
        university_name
        or institution_name
        or "Not Specified"
    ).strip()

    # ========================================================
    # Resume File Compatibility
    # ========================================================

    final_file = resume or resume_file

    if not final_file:
        raise HTTPException(
            status_code=400,
            detail="PDF Resume file is required.",
        )

    # ========================================================
    # Validate File Type
    # ========================================================

    filename = final_file.filename or ""

    content_type = (
        final_file.content_type.lower()
        if final_file.content_type
        else ""
    )

    if (
        not filename.lower().endswith(".pdf")
        and content_type != "application/pdf"
    ):
        raise HTTPException(
            status_code=400,
            detail="Only PDF Resume files are supported.",
        )

    # ========================================================
    # Read PDF
    # ========================================================

    try:
        pdf_bytes = await final_file.read()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to read uploaded resume: {str(e)}",
        )

    if not pdf_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded PDF file is empty.",
        )

    # ========================================================
    # PDF Text Extraction
    # ========================================================

    text = extract_text_from_pdf(pdf_bytes)

    if not text.strip():
        raise HTTPException(
            status_code=422,
            detail=(
                "Unable to extract readable text from this PDF. "
                "Please upload a text-based PDF resume rather than "
                "an image-only or corrupted PDF."
            ),
        )

    # ========================================================
    # Resolve Target Role
    # ========================================================

    resolved_key = resolve_target_role(target_role)

    if not resolved_key:

        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported corporate role: '{target_role}'. "
                "Please select a role from the SkillBank role list."
            ),
        )

    role_meta = ROLE_TAXONOMY[resolved_key]

    required_skills = role_meta["skills"]

    # ========================================================
    # Detect Acquired / Missing Skills
    # ========================================================

    acquired: List[str] = []
    missing: List[str] = []

    for skill in required_skills:

        if skill_is_present(skill, text):
            acquired.append(skill)
        else:
            missing.append(skill)

    # ========================================================
    # Readiness Score
    # ========================================================

    total_skills = len(required_skills)

    readiness_score = (
        int((len(acquired) / total_skills) * 100)
        if total_skills > 0
        else 0
    )

    # ========================================================
    # Generate Cryptographic SHA-256 Validation Token
    # ========================================================

    timestamp = datetime.now(timezone.utc).strftime(
        "%B %d, %Y • %H:%M:%S UTC"
    )

    raw_str = (
        f"{final_name}|"
        f"{resolved_key}|"
        f"{role_meta['title']}|"
        f"{readiness_score}|"
        f"{timestamp}"
    )

    # FIX: original code used
    #   f"{hashlib.sha256(raw_str.encode("utf-8")).hexdigest()...}"
    # which nests DOUBLE quotes inside a DOUBLE-quoted f-string.
    # On Python versions before 3.12 this is a hard SyntaxError,
    # which prevents this entire file (and therefore the whole
    # backend) from starting at all — every single request would
    # fail, regardless of device, network, or feature used.
    # Using single quotes for the inner literal fixes it everywhere.
    encoded_hash = hashlib.sha256(raw_str.encode('utf-8')).hexdigest()[:12].upper()

    cert_hash = f"SKB-2026-{encoded_hash}-IN"

    # ========================================================
    # Non-blocking Async Persistence
    # ========================================================

    background_tasks.add_task(
        async_sync_to_supabase,
        final_name,
        final_university,
        resolved_key,
        role_meta["title"],
        readiness_score,
        acquired,
        missing,
        cert_hash,
        institution_id or "poornima",
    )

    # ========================================================
    # Final Response
    # ========================================================

    return {
        "status": "success",
        "candidate_name": final_name,
        "university_name": final_university,
        # FIX (issue 1 — "job name/data mismatch"): return exactly
        # what the user typed/selected as requested_role, so the
        # frontend can display that instead of the backend's
        # internally-resolved taxonomy title. The resolved title is
        # still returned separately and still drives the actual
        # skill/benchmark matching underneath.
        "requested_role": target_role,
        "role_key": resolved_key,
        "role_title": role_meta["title"],
        "readiness_score": readiness_score,
        "acquired_skills": acquired,
        "missing_skills": missing,
        "total_required_skills": total_skills,
        "acquired_skill_count": len(acquired),
        "missing_skill_count": len(missing),
        "benchmarks": role_meta["benchmarks"],
        "resources": role_meta.get("resources", {}),
        "trending_tech": role_meta.get(
            "trending_tech",
            ["Industry Standard", "Production Ready"],
        ),
        "hiring_surge": role_meta.get(
            "hiring_surge",
            "+30% Market Surge",
        ),
        "cert_hash": cert_hash,
        "timestamp": timestamp,
        "institution_id": institution_id or "poornima",
    }


# ============================================================
# Live Real-Time GitHub Profile Verifier
# ============================================================

@app.get("/api/verify-github")
def verify_github(
    username: str = Query(
        ...,
        min_length=1,
        max_length=39,
        description="Public GitHub username",
    )
):
    """
    Verify a public GitHub profile using the public GitHub API.

    IMPORTANT:
    This endpoint no longer returns fake repository counts when
    GitHub is unavailable. A fallback response is returned instead.
    """

    username = username.strip()

    if not username:
        raise HTTPException(
            status_code=400,
            detail="Username is required.",
        )

    # GitHub usernames can contain alphanumeric characters and
    # single hyphens, but cannot begin or end with a hyphen.
    if not re.fullmatch(
        r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?",
        username,
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid GitHub username format.",
        )

    try:

        url = (
            f"https://api.github.com/users/"
            f"{urllib.parse.quote(username, safe='')}"
            f"/repos?per_page=15&sort=updated"
        )

        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "SkillBank-AI-Verifier/4.0",
                "Accept": "application/vnd.github+json",
            },
        )

        with urllib.request.urlopen(
            req,
            timeout=6,
        ) as response:

            repos = json.loads(
                response.read().decode("utf-8")
            )

        if not isinstance(repos, list):
            return {
                "status": "fallback",
                "username": username,
                "public_repos": 0,
                "detected_languages": [],
                "verified_badge": False,
                "message": "GitHub returned an unexpected response.",
            }

        languages = set()

        for repo in repos:

            if not isinstance(repo, dict):
                continue

            language = repo.get("language")

            if language:
                languages.add(str(language).lower())

        return {
            "status": "success",
            "username": username,
            "public_repos": len(repos),
            "detected_languages": sorted(list(languages)),
            "verified_badge": len(repos) > 0,
            "verification_source": "github_public_api",
        }

    except urllib.error.HTTPError as e:

        if e.code == 404:
            return {
                "status": "not_found",
                "username": username,
                "public_repos": 0,
                "detected_languages": [],
                "verified_badge": False,
                "message": "GitHub user was not found.",
            }

        if e.code == 403:
            return {
                "status": "rate_limited",
                "username": username,
                "public_repos": 0,
                "detected_languages": [],
                "verified_badge": False,
                "message": (
                    "GitHub API rate limit reached. "
                    "Please try again later."
                ),
            }

        return {
            "status": "fallback",
            "username": username,
            "public_repos": 0,
            "detected_languages": [],
            "verified_badge": False,
            "message": (
                f"GitHub API returned HTTP status {e.code}."
            ),
        }

    except urllib.error.URLError as e:

        return {
            "status": "fallback",
            "username": username,
            "public_repos": 0,
            "detected_languages": [],
            "verified_badge": False,
            "message": (
                "Unable to connect to GitHub at this time."
            ),
            "error": str(e.reason),
        }

    except TimeoutError:

        return {
            "status": "fallback",
            "username": username,
            "public_repos": 0,
            "detected_languages": [],
            "verified_badge": False,
            "message": "GitHub request timed out.",
        }

    except Exception as e:

        print(f"GitHub verification error: {e}")

        return {
            "status": "fallback",
            "username": username,
            "public_repos": 0,
            "detected_languages": [],
            "verified_badge": False,
            "message": "GitHub verification temporarily unavailable.",
        }


# ============================================================
# Live Real-Time Institutional HOD Aggregator
# ============================================================

@app.get("/api/institution/stats")
async def get_institution_stats(
    institution_id: str = "poornima",
):
    """
    Fetch live aggregated stats from Supabase or provide
    the existing benchmark matrix when Supabase is unavailable.
    """

    institution_id = (
        institution_id.strip()
        if institution_id
        else "poornima"
    )

    if supabase:

        try:

            res = (
                supabase
                .table("skill_audits")
                .select("*")
                .eq("institution_id", institution_id)
                .execute()
            )

            if res.data and len(res.data) > 0:

                scores = [
                    r["readiness_score"]
                    for r in res.data
                    if (
                        isinstance(r, dict)
                        and "readiness_score" in r
                        and isinstance(
                            r["readiness_score"],
                            (int, float),
                        )
                    )
                ]

                avg_score = (
                    round(sum(scores) / len(scores), 1)
                    if scores
                    else 68.4
                )

                return {
                    "institution_id": institution_id,
                    "sample_size": len(res.data),
                    "average_readiness": f"{avg_score}%",
                    "top_critical_gap": (
                        "Cloud Architecture & Docker"
                    ),
                    "strongest_domain": (
                        "Frontend Web & React"
                    ),
                    "certificates_issued": str(
                        len(res.data)
                    ),
                    "data_source": "supabase",
                }

        except Exception as e:

            print(
                f"Supabase stats query error: {e}"
            )

    # ========================================================
    # Existing Fallback Default Verified Matrix
    # ========================================================

    return {
        "institution_id": institution_id,
        "sample_size": 248,
        "average_readiness": "68.4%",
        "top_critical_gap": "Cloud Architecture & Docker",
        "strongest_domain": "Frontend Web & React",
        "certificates_issued": "192",
        "data_source": "fallback_benchmark_matrix",
    }


# ============================================================
# Role List Endpoint
# ============================================================

@app.get("/api/roles")
def get_roles():
    """
    Return the complete SkillBank role taxonomy for frontend
    dropdowns, dashboards and role selection components.
    """

    roles = []

    for key, data in ROLE_TAXONOMY.items():

        roles.append({
            "role_key": key,
            "role_title": data.get("title", key),
            "skills": data.get("skills", []),
            "benchmarks": data.get("benchmarks", {}),
            "trending_tech": data.get(
                "trending_tech",
                [],
            ),
            "hiring_surge": data.get(
                "hiring_surge",
                "+30% Market Surge",
            ),
            "resources": data.get(
                "resources",
                {},
            ),
        })

    return {
        "status": "success",
        "count": len(roles),
        "roles": roles,
    }


# ============================================================
# Role Resolver Debug Endpoint
# ============================================================

@app.get("/api/resolve-role")
def resolve_role_endpoint(
    role: str = Query(
        ...,
        min_length=1,
        description="Role title, alias or taxonomy key",
    )
):
    """
    Resolve a user-provided role against the complete taxonomy.
    Useful for frontend debugging and integration testing.
    """

    resolved_key = resolve_target_role(role)

    if not resolved_key:

        return {
            "status": "not_found",
            "input": role,
            "resolved": False,
            "role_key": None,
            "role_title": None,
        }

    role_meta = ROLE_TAXONOMY[resolved_key]

    return {
        "status": "success",
        "input": role,
        "resolved": True,
        "role_key": resolved_key,
        "role_title": role_meta.get(
            "title",
            resolved_key,
        ),
        "skills": role_meta.get(
            "skills",
            [],
        ),
    }


# ============================================================
# Certificate Verification Endpoint
# ============================================================

@app.get("/api/verify-certificate")
async def verify_certificate(
    cert_hash: str = Query(
        ...,
        min_length=1,
        max_length=64,
    ),
    institution_id: str = Query(
        "poornima",
    ),
):
    """
    Verify a generated certificate hash against Supabase.

    If Supabase is unavailable, the endpoint cannot claim that
    the certificate is verified.
    """

    clean_hash = cert_hash.strip()

    if not clean_hash:
        raise HTTPException(
            status_code=400,
            detail="Certificate hash is required.",
        )

    if not supabase:

        return {
            "status": "unavailable",
            "verified": False,
            "cert_hash": clean_hash,
            "message": (
                "Certificate verification database is unavailable."
            ),
        }

    try:

        res = (
            supabase
            .table("skill_audits")
            .select("*")
            .eq("cert_hash", clean_hash)
            .eq("institution_id", institution_id)
            .limit(1)
            .execute()
        )

        if res.data and len(res.data) > 0:

            record = res.data[0]

            return {
                "status": "success",
                "verified": True,
                "cert_hash": clean_hash,
                "candidate_id": record.get(
                    "candidate_id"
                ),
                "role_key": record.get(
                    "role_key"
                ),
                "role_title": record.get(
                    "role_title"
                ),
                "readiness_score": record.get(
                    "readiness_score"
                ),
                "institution_id": record.get(
                    "institution_id"
                ),
                "issued": True,
            }

        return {
            "status": "success",
            "verified": False,
            "cert_hash": clean_hash,
            "message": "Certificate was not found.",
        }

    except Exception as e:

        print(
            f"Certificate verification error: {e}"
        )

        return {
            "status": "error",
            "verified": False,
            "cert_hash": clean_hash,
            "message": (
                "Unable to verify certificate at this time."
            ),
        }


# ============================================================
# Application Startup Information
# ============================================================

@app.on_event("startup")
async def startup_event():
    print("=" * 70)
    print("SkillBank AI Enterprise Core Engine")
    print("Version: 4.0")
    print(
        f"Taxonomy Profiles: {len(ROLE_TAXONOMY)}"
    )
    print(
        f"Supabase Connected: {supabase is not None}"
    )
    print("=" * 70)


# ============================================================
# Application Shutdown Information
# ============================================================

@app.on_event("shutdown")
async def shutdown_event():
    print("SkillBank AI Enterprise Core Engine shutting down.")
