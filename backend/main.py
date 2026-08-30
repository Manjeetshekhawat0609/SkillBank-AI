import io
import re
import hashlib
from datetime import datetime
from typing import Dict, Any, List
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # <-- 1. Yeh import add karein
from supabase import create_client, Client

app = FastAPI(title="SkillBank AI Engine")

# 2. Yeh middleware block add karein (app banne ke theek baad):
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# 1. Supabase Database Connection
# ----------------------------------------------------
SUPABASE_URL = "https://joknzcuhruemfbruxhsd.supabase.co"
SUPABASE_KEY = "sb_publishable_5zyZpiCuiXQZkJBU5Krv1A_HWFHlYMk"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ----------------------------------------------------
# 2. Comprehensive 40+ Corporate Taxonomy & Learning Map
# ----------------------------------------------------
TAXONOMY: Dict[str, Dict[str, Any]] = {
    "frontend": {
        "title": "Frontend Web Engineer",
        "aliases": ["frontend", "frontend web engineer", "react developer", "web developer"],
        "skills": {
            "html": {"synonyms": ["html5", "semantic markup"], "guide": "Semantic tags, forms and ARIA accessibility.", "webUrl": "https://developer.mozilla.org/en-US/docs/Learn/HTML", "webPlatform": "MDN Web Docs", "ytUrl": "https://www.youtube.com/watch?v=kUMe1FH4CHE", "ytPlatform": "FreeCodeCamp"},
            "css": {"synonyms": ["css3", "tailwind", "flexbox", "grid"], "guide": "Responsive layout design, Tailwind CSS and CSS Grid.", "webUrl": "https://www.freecodecamp.org/learn/responsive-web-design/", "webPlatform": "FreeCodeCamp", "ytUrl": "https://www.youtube.com/watch?v=1PnVor36_40", "ytPlatform": "Traversy Media"},
            "javascript": {"synonyms": ["js", "es6", "vanilla js"], "guide": "ES6+ syntax, Promises, DOM Manipulation and Async APIs.", "webUrl": "https://javascript.info/", "webPlatform": "Modern JS Info", "ytUrl": "https://www.youtube.com/watch?v=W6NZfCO5SIk", "ytPlatform": "Programming with Mosh"},
            "react": {"synonyms": ["reactjs", "react.js", "hooks"], "guide": "Component state, Virtual DOM, Hooks and State Management.", "webUrl": "https://react.dev/learn", "webPlatform": "React Official Docs", "ytUrl": "https://www.youtube.com/watch?v=bMknfKXIFA8", "ytPlatform": "Codevolution"},
            "typescript": {"synonyms": ["ts", "typed javascript"], "guide": "Strict static typing, interfaces and generic types.", "webUrl": "https://www.typescriptlang.org/docs/", "webPlatform": "TypeScript Docs", "ytUrl": "https://www.youtube.com/watch?v=BwuLxPH8IDs", "ytPlatform": "Academind"},
            "git": {"synonyms": ["github", "version control"], "guide": "Version control, commit hygiene, pull requests and git flow.", "webUrl": "https://git-scm.com/doc", "webPlatform": "Git SCM", "ytUrl": "https://www.youtube.com/watch?v=RGOj5yH7evk", "ytPlatform": "FreeCodeCamp"}
        }
    },
    "backend": {
        "title": "Backend API Engineer",
        "aliases": ["backend", "backend api engineer", "node developer", "python backend"],
        "skills": {
            "python": {"synonyms": ["fastapi", "django", "flask"], "guide": "REST API development, ORM, async routes and backend logic.", "webUrl": "https://fastapi.tiangolo.com/tutorial/", "webPlatform": "FastAPI Docs", "ytUrl": "https://www.youtube.com/watch?v=0sOvCWFmrtA", "ytPlatform": "freeCodeCamp"},
            "sql": {"synonyms": ["postgres", "postgresql", "mysql", "rdbms"], "guide": "Relational schema indexing, joins and ACID transactions.", "webUrl": "https://www.w3schools.com/sql/", "webPlatform": "W3Schools SQL", "ytUrl": "https://www.youtube.com/watch?v=HXV3zeRR3h4", "ytPlatform": "Programming with Mosh"},
            "docker": {"synonyms": ["containers", "dockerfile", "docker-compose"], "guide": "Containerizing services and managing environment isolation.", "webUrl": "https://docs.docker.com/get-started/", "webPlatform": "Docker Docs", "ytUrl": "https://www.youtube.com/watch?v=fqMOX6JJhGo", "ytPlatform": "TechWorld with Nana"},
            "redis": {"synonyms": ["caching", "cache", "pubsub"], "guide": "In-memory caching, pub/sub and rate limiting.", "webUrl": "https://redis.io/docs/", "webPlatform": "Redis Docs", "ytUrl": "https://www.youtube.com/watch?v=jgpVdJB2sKQ", "ytPlatform": "Web Dev Simplified"},
            "rest api": {"synonyms": ["endpoints", "http", "json", "postman"], "guide": "HTTP status codes, authentication and API architecture.", "webUrl": "https://restfulapi.net/", "webPlatform": "REST Guide", "ytUrl": "https://www.youtube.com/watch?v=-MTSQjw5DrM", "ytPlatform": "freeCodeCamp"},
            "git": {"synonyms": ["github"], "guide": "Collaborative branching, rebase and commit history.", "webUrl": "https://git-scm.com/doc", "webPlatform": "Git SCM", "ytUrl": "https://www.youtube.com/watch?v=RGOj5yH7evk", "ytPlatform": "FreeCodeCamp"}
        }
    },
    "fullstack": {
        "title": "Full-Stack Software Engineer",
        "aliases": ["fullstack", "full-stack", "full-stack software engineer", "mern"],
        "skills": {
            "html": {"synonyms": ["html5"], "guide": "Modern semantic markup.", "webUrl": "https://developer.mozilla.org/", "webPlatform": "MDN", "ytUrl": "https://www.youtube.com/watch?v=kUMe1FH4CHE", "ytPlatform": "FreeCodeCamp"},
            "css": {"synonyms": ["css3", "tailwind"], "guide": "Responsive layouts & Tailwind CSS.", "webUrl": "https://tailwindcss.com/docs", "webPlatform": "Tailwind", "ytUrl": "https://www.youtube.com/watch?v=1PnVor36_40", "ytPlatform": "Traversy"},
            "javascript": {"synonyms": ["js", "es6"], "guide": "Modern JavaScript & Node.js.", "webUrl": "https://javascript.info/", "webPlatform": "JS Info", "ytUrl": "https://www.youtube.com/watch?v=W6NZfCO5SIk", "ytPlatform": "Mosh"},
            "react": {"synonyms": ["reactjs"], "guide": "Interactive UI state management.", "webUrl": "https://react.dev/", "webPlatform": "React Dev", "ytUrl": "https://www.youtube.com/watch?v=bMknfKXIFA8", "ytPlatform": "Codevolution"},
            "node": {"synonyms": ["nodejs", "express", "expressjs"], "guide": "Server-side microservices & middleware.", "webUrl": "https://nodejs.org/en/docs", "webPlatform": "Node.js", "ytUrl": "https://www.youtube.com/watch?v=Oe421EPjeBE", "ytPlatform": "FreeCodeCamp"},
            "mongodb": {"synonyms": ["mongo", "nosql", "mongoose"], "guide": "Document collections and aggregation pipelines.", "webUrl": "https://www.mongodb.com/docs/", "webPlatform": "MongoDB Docs", "ytUrl": "https://www.youtube.com/watch?v=ofme2o29ngU", "ytPlatform": "Web Dev Simplified"},
            "git": {"synonyms": ["github"], "guide": "Version control repository workflow.", "webUrl": "https://git-scm.com/", "webPlatform": "Git SCM", "ytUrl": "https://www.youtube.com/watch?v=RGOj5yH7evk", "ytPlatform": "FreeCodeCamp"}
        }
    },
    "ai_ml": {
        "title": "Machine Learning & NLP Engineer",
        "aliases": ["ai_ml", "ml", "machine learning", "machine learning & nlp engineer", "ai engineer"],
        "skills": {
            "python": {"synonyms": ["pandas", "numpy"], "guide": "Vectorized computations and data pipelines.", "webUrl": "https://numpy.org/doc/", "webPlatform": "NumPy Docs", "ytUrl": "https://www.youtube.com/watch?v=_uQrJ0TkZlc", "ytPlatform": "Programming with Mosh"},
            "machine learning": {"synonyms": ["sklearn", "scikit-learn", "regression", "classification"], "guide": "Model training, cross validation and metrics.", "webUrl": "https://scikit-learn.org/stable/", "webPlatform": "Scikit-Learn", "ytUrl": "https://www.youtube.com/watch?v=0B5eIE_1vpU", "ytPlatform": "Edureka"},
            "deep learning": {"synonyms": ["pytorch", "tensorflow", "keras", "neural networks"], "guide": "Tensors, backpropagation and neural nets.", "webUrl": "https://pytorch.org/tutorials/", "webPlatform": "PyTorch", "ytUrl": "https://www.youtube.com/watch?v=V_xro1bcAuA", "ytPlatform": "freeCodeCamp"},
            "nlp": {"synonyms": ["transformers", "huggingface", "llm", "bert"], "guide": "Tokenization, Transformers and embeddings.", "webUrl": "https://huggingface.co/docs", "webPlatform": "HuggingFace", "ytUrl": "https://www.youtube.com/watch?v=tiZFewofSLM", "ytPlatform": "FreeCodeCamp"},
            "git": {"synonyms": ["github"], "guide": "Model and pipeline version control.", "webUrl": "https://git-scm.com/", "webPlatform": "Git SCM", "ytUrl": "https://www.youtube.com/watch?v=RGOj5yH7evk", "ytPlatform": "FreeCodeCamp"}
        }
    },
    "gen_ai": {
        "title": "Generative AI & LLM Applications Engineer",
        "aliases": ["gen_ai", "generative ai", "generative ai & llm applications engineer", "llm"],
        "skills": {
            "python": {"synonyms": ["asyncio"], "guide": "Python for LLM chaining and microservices.", "webUrl": "https://docs.python.org/3/", "webPlatform": "Python Docs", "ytUrl": "https://www.youtube.com/watch?v=_uQrJ0TkZlc", "ytPlatform": "Mosh"},
            "langchain": {"synonyms": ["llamaindex", "chains", "rag"], "guide": "RAG orchestration, agents and vector memory.", "webUrl": "https://python.langchain.com/", "webPlatform": "LangChain", "ytUrl": "https://www.youtube.com/watch?v=aywZrzNaKjs", "ytPlatform": "FreeCodeCamp"},
            "vector db": {"synonyms": ["pinecone", "chromadb", "weaviate", "qdrant"], "guide": "Embedding indexation, cosine distance and hybrid search.", "webUrl": "https://docs.pinecone.io/", "webPlatform": "Pinecone", "ytUrl": "https://www.youtube.com/watch?v=klTvEwg3oJ4", "ytPlatform": "Fireship"},
            "prompt engineering": {"synonyms": ["few-shot", "cot", "chain of thought"], "guide": "Instruction tuning, context window optimization and guardrails.", "webUrl": "https://www.promptingguide.ai/", "webPlatform": "Prompt Guide", "ytUrl": "https://www.youtube.com/watch?v=jC4v5AS4RIM", "ytPlatform": "freeCodeCamp"},
            "git": {"synonyms": ["github"], "guide": "Version control for AI agent pipelines.", "webUrl": "https://git-scm.com/", "webPlatform": "Git SCM", "ytUrl": "https://www.youtube.com/watch?v=RGOj5yH7evk", "ytPlatform": "FreeCodeCamp"}
        }
    },
    "data_analyst": {
        "title": "Data Analyst & BI Specialist",
        "aliases": ["data_analyst", "data analyst", "data analyst & bi specialist", "bi"],
        "skills": {
            "sql": {"synonyms": ["queries", "postgres", "mysql"], "guide": "Aggregations, window functions and CTE joins.", "webUrl": "https://mode.com/sql-tutorial/", "webPlatform": "Mode SQL", "ytUrl": "https://www.youtube.com/watch?v=HXV3zeRR3h4", "ytPlatform": "Mosh"},
            "python": {"synonyms": ["pandas", "matplotlib", "seaborn"], "guide": "Data wrangling, cleaning and statistical plots.", "webUrl": "https://pandas.pydata.org/docs/", "webPlatform": "Pandas", "ytUrl": "https://www.youtube.com/watch?v=r-uOLxNrNk8", "ytPlatform": "Keith Galli"},
            "power bi": {"synonyms": ["tableau", "dax", "bi dashboard"], "guide": "DAX calculations, data modeling and interactive reporting.", "webUrl": "https://learn.microsoft.com/en-us/power-bi/", "webPlatform": "MS Learn", "ytUrl": "https://www.youtube.com/watch?v=TmhQCQr_ebU", "ytPlatform": "Kevin Stratvert"},
            "excel": {"synonyms": ["vlookup", "pivot tables", "xlookup"], "guide": "Advanced formulas, pivot summaries and financial modeling.", "webUrl": "https://support.microsoft.com/en-us/excel", "webPlatform": "MS Excel", "ytUrl": "https://www.youtube.com/watch?v=Vl0H-qTclOg", "ytPlatform": "freeCodeCamp"}
        }
    },
    "devops": {
        "title": "DevOps & Cloud Infrastructure Engineer",
        "aliases": ["devops", "devops & cloud infrastructure engineer", "cloud engineer", "sre"],
        "skills": {
            "linux": {"synonyms": ["bash", "shell scripting"], "guide": "Linux CLI, file permissions and automated shell scripts.", "webUrl": "https://linuxjourney.com/", "webPlatform": "Linux Journey", "ytUrl": "https://www.youtube.com/watch?v=sWbGOq4gteA", "ytPlatform": "freeCodeCamp"},
            "docker": {"synonyms": ["containers", "dockerfile"], "guide": "Microservice containerization, layers & network isolation.", "webUrl": "https://docs.docker.com/", "webPlatform": "Docker Docs", "ytUrl": "https://www.youtube.com/watch?v=fqMOX6JJhGo", "ytPlatform": "TechWorld with Nana"},
            "kubernetes": {"synonyms": ["k8s", "helm"], "guide": "Cluster pods, deployments, statefulsets and ingress control.", "webUrl": "https://kubernetes.io/docs/", "webPlatform": "K8s Official", "ytUrl": "https://www.youtube.com/watch?v=X48VuDVv0do", "ytPlatform": "TechWorld with Nana"},
            "ci/cd": {"synonyms": ["github actions", "jenkins", "gitlab ci"], "guide": "Automated build, test and deployment pipelines.", "webUrl": "https://docs.github.com/en/actions", "webPlatform": "GitHub Actions", "ytUrl": "https://www.youtube.com/watch?v=R8_veQiYBjI", "ytPlatform": "TechWorld with Nana"},
            "aws": {"synonyms": ["cloud", "ec2", "s3", "iam"], "guide": "Cloud architecture, IAM access control and compute sizing.", "webUrl": "https://aws.amazon.com/training/", "webPlatform": "AWS Training", "ytUrl": "https://www.youtube.com/watch?v=k1RI5locZE4", "ytPlatform": "freeCodeCamp"}
        }
    },
    "cybersecurity": {
        "title": "Cyber Security & SOC Analyst",
        "aliases": ["cybersecurity", "cyber security & soc analyst", "soc", "infosec"],
        "skills": {
            "networking": {"synonyms": ["tcp/ip", "dns", "wireshark", "osi"], "guide": "Packet sniffing, subnets, ports and firewall rules.", "webUrl": "https://www.netacad.com/", "webPlatform": "Cisco Academy", "ytUrl": "https://www.youtube.com/watch?v=IPvYjXCsTg8", "ytPlatform": "NetworkChuck"},
            "linux": {"synonyms": ["kali", "bash", "shell"], "guide": "Security audits & CLI automation.", "webUrl": "https://www.kali.org/docs/", "webPlatform": "Kali Docs", "ytUrl": "https://www.youtube.com/watch?v=sWbGOq4gteA", "ytPlatform": "freeCodeCamp"},
            "vulnerability assessment": {"synonyms": ["nmap", "owasp", "burp suite"], "guide": "OWASP Top 10 web vulnerabilities & threat triage.", "webUrl": "https://owasp.org/www-project-top-ten/", "webPlatform": "OWASP", "ytUrl": "https://www.youtube.com/watch?v=2_lswM1S264", "ytPlatform": "freeCodeCamp"},
            "cryptography": {"synonyms": ["encryption", "ssl", "tls", "rsa"], "guide": "Symmetric/Asymmetric encryption and PKI infrastructure.", "webUrl": "https://www.cryptool.org/", "webPlatform": "CrypTool", "ytUrl": "https://www.youtube.com/watch?v=NmM9HA2MQGI", "ytPlatform": "Computerphile"}
        }
    }
}

def resolve_role(query: str) -> Dict[str, Any]:
    q = query.lower().strip()
    # 1. Exact Key Match
    if q in TAXONOMY:
        return TAXONOMY[q]
    
    # 2. Alias / Title Partial Match
    for key, data in TAXONOMY.items():
        if q == data["title"].lower() or any(alias in q or q in alias for alias in data.get("aliases", [])):
            return data
            
    # 3. Keyword Heuristic Match
    if "data" in q or "analyst" in q:
        return TAXONOMY["data_analyst"]
    if "devops" in q or "cloud" in q or "sre" in q:
        return TAXONOMY["devops"]
    if "ai" in q or "llm" in q or "gen" in q:
        return TAXONOMY["gen_ai"]
    if "ml" in q or "machine" in q:
        return TAXONOMY["ai_ml"]
    if "security" in q or "cyber" in q or "soc" in q:
        return TAXONOMY["cybersecurity"]
    if "back" in q or "api" in q or "node" in q:
        return TAXONOMY["backend"]
    if "full" in q:
        return TAXONOMY["fullstack"]
        
    return TAXONOMY["frontend"]

# ----------------------------------------------------
# Background Supabase Task
# ----------------------------------------------------
def sync_to_supabase(full_name: str, institution_id: str, target_role: str, title: str, score: int, acquired: list, missing: list, cert_hash: str):
    try:
        cand_res = supabase.table("candidates").insert({
            "full_name": full_name,
            "institution_id": institution_id
        }).execute()
        
        if cand_res.data:
            candidate_id = cand_res.data[0]["id"]
            supabase.table("skill_audits").insert({
                "candidate_id": candidate_id,
                "role_key": target_role,
                "role_title": title,
                "readiness_score": score,
                "acquired_skills": acquired,
                "missing_skills": missing,
                "cert_hash": cert_hash
            }).execute()
    except Exception as e:
        print(f"Background Sync Error: {e}")

# ----------------------------------------------------
# 3. Dynamic Evaluation Endpoint
# ----------------------------------------------------
@app.post("/api/v1/evaluate-resume")
async def evaluate_resume(
    background_tasks: BackgroundTasks,
    full_name: str = Form(...),
    target_role: str = Form(...),
    institution_id: str = Form("poornima"),
    resume_file: UploadFile = File(...)
):
    if not resume_file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files allowed.")

    try:
        content = await resume_file.read()
        pdf_reader = pypdf.PdfReader(io.BytesIO(content))
        text = " ".join([page.extract_text() or "" for page in pdf_reader.pages]).lower()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF extraction error: {str(e)}")

    # Intelligently resolve the exact role chosen
    benchmark = resolve_role(target_role)
    required_skills = benchmark["skills"]
    
    acquired = []
    missing_details = []
    missing_names = []

    for skill_name, meta in required_skills.items():
        tokens = [skill_name] + meta.get("synonyms", [])
        matched = any(re.search(r'\b' + re.escape(t) + r'\b', text) for t in tokens)
        
        if matched:
            acquired.append(skill_name)
        else:
            missing_names.append(skill_name)
            missing_details.append({
                "skill": skill_name,
                "guide": meta["guide"],
                "webUrl": meta["webUrl"],
                "webPlatform": meta["webPlatform"],
                "ytUrl": meta["ytUrl"],
                "ytPlatform": meta["ytPlatform"]
            })

    total_skills = len(required_skills)
    readiness_score = int((len(acquired) / total_skills) * 100) if total_skills > 0 else 0

    token_seed = f"{full_name}:{target_role}:{readiness_score}:{datetime.utcnow().isoformat()}"
    cert_hash = "SKB-2026-" + hashlib.sha256(token_seed.encode()).hexdigest()[:8].upper() + "-IN"

    background_tasks.add_task(
        sync_to_supabase,
        full_name,
        institution_id,
        target_role,
        benchmark["title"],
        readiness_score,
        acquired,
        missing_names,
        cert_hash
    )

    return {
        "candidate_name": full_name,
        "role_key": target_role,
        "role_title": benchmark["title"],
        "readiness_score": readiness_score,
        "acquired_skills": acquired,
        "missing_skills": missing_names,
        "missing_details": missing_details,
        "cert_hash": cert_hash
    }