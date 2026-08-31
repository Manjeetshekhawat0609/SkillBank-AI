// ==========================================================================
// SkillBank AI Enterprise — Universal Corporate Job Taxonomy & Resource Hub
// ==========================================================================

const REGISTRY = {
  // ----------------------------------------------------
  // 1. SOFTWARE & WEB ENGINEERING
  // ----------------------------------------------------
  frontend: {
    category: "Software Engineering",
    title: "Frontend Web Engineer",
    searchTags: ["frontend", "fe", "ui", "web dev", "react", "html", "css", "javascript", "js", "client side"],
    skills: {
      "html": {
        synonyms: ["html5", "semantic markup", "aria", "web accessibility"],
        guide: "Master semantic tags, accessibility (ARIA), and modern web layouts.",
        webUrl: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
        webPlatform: "MDN Web Docs",
        ytUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
        ytPlatform: "freeCodeCamp HTML5 Full Course"
      },
      "css": {
        synonyms: ["css3", "flexbox", "grid", "tailwind", "responsive design", "sass"],
        guide: "Learn modern Flexbox, CSS Grid layouts, and responsive CSS architecture.",
        webUrl: "https://www.freecodecamp.org/learn/responsive-web-design/",
        webPlatform: "freeCodeCamp Responsive Track",
        ytUrl: "https://www.youtube.com/watch?v=1PnVor36_40",
        ytPlatform: "CSS Flexbox & Grid Masterclass"
      },
      "javascript": {
        synonyms: ["js", "es6", "vanilla js", "ecmascript"],
        guide: "Master ES6+ syntax, Promises, Async/Await, Closures, and DOM APIs.",
        webUrl: "https://javascript.info/",
        webPlatform: "JavaScript.info Textbook",
        ytUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        ytPlatform: "JavaScript Full Course for Beginners"
      },
      "react": {
        synonyms: ["reactjs", "react.js", "hooks", "redux", "zustand"],
        guide: "Component lifecycle, modern Hooks (useState, useEffect), and state flow.",
        webUrl: "https://react.dev/learn",
        webPlatform: "React Official Documentation",
        ytUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        ytPlatform: "React Course (Beginner to Pro)"
      },
      "typescript": {
        synonyms: ["ts", "type system", "generics"],
        guide: "Static typing, Interfaces, Generics, and compile-time type safety.",
        webUrl: "https://www.typescriptlang.org/docs/",
        webPlatform: "TypeScript Official Handbook",
        ytUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
        ytPlatform: "TypeScript Tutorial for Beginners"
      },
      "tailwind": {
        synonyms: ["tailwindcss", "utility classes"],
        guide: "Rapid UI engineering with modern utility-first CSS framework.",
        webUrl: "https://tailwindcss.com/docs",
        webPlatform: "Tailwind CSS Docs",
        ytUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
        ytPlatform: "Tailwind CSS Full Course"
      },
      "git": {
        synonyms: ["github", "gitlab", "version control", "branching"],
        guide: "Git CLI, branching strategies, merge conflict resolution, and PR workflows.",
        webUrl: "https://git-scm.com/doc",
        webPlatform: "Pro Git Free Book",
        ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        ytPlatform: "Git and GitHub for Beginners"
      },
      "rest api": {
        synonyms: ["fetch", "axios", "postman", "json"],
        guide: "Handling HTTP methods (GET, POST, PUT, DELETE), JSON parsing, and error codes.",
        webUrl: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
        webPlatform: "MDN Web APIs",
        ytUrl: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
        ytPlatform: "REST API Concepts & Fetch/Axios Guide"
      }
    }
  },

  backend: {
    category: "Software Engineering",
    title: "Backend API Engineer",
    searchTags: ["backend", "be", "api", "server", "microservices", "python", "node", "fastapi", "django"],
    skills: {
      "python": {
        synonyms: ["py", "fastapi", "django", "flask"],
        guide: "High-performance REST API services with FastAPI or Django framework.",
        webUrl: "https://fastapi.tiangolo.com/",
        webPlatform: "FastAPI Interactive Docs",
        ytUrl: "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        ytPlatform: "Python API Development (FastAPI)"
      },
      "nodejs": {
        synonyms: ["node", "express", "expressjs"],
        guide: "Event-driven runtime and Express API routing architectures.",
        webUrl: "https://nodejs.org/en/learn",
        webPlatform: "Node.js Official Guide",
        ytUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        ytPlatform: "Node.js and Express.js Full Course"
      },
      "postgresql": {
        synonyms: ["postgres", "sql", "rdbms", "database"],
        guide: "Relational schema design, indexes, joins, and ACID transactions.",
        webUrl: "https://www.postgresqltutorial.com/",
        webPlatform: "PostgreSQL Tutorial",
        ytUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4",
        ytPlatform: "PostgreSQL Database Course"
      },
      "docker": {
        synonyms: ["containers", "dockerfile", "docker-compose"],
        guide: "Containerizing backend workloads for uniform runtime environments.",
        webUrl: "https://docs.docker.com/get-started/",
        webPlatform: "Docker Official Docs",
        ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        ytPlatform: "Docker & Containerization Tutorial"
      },
      "redis": {
        synonyms: ["caching", "in-memory db"],
        guide: "In-memory caching, pub/sub, and session management stores.",
        webUrl: "https://redis.io/docs/",
        webPlatform: "Redis Official Portal",
        ytUrl: "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
        ytPlatform: "Redis Crash Course"
      },
      "git": {
        synonyms: ["github"],
        guide: "Team collaboration, Git CLI workflows, and branches.",
        webUrl: "https://git-scm.com/",
        webPlatform: "Git Official Docs",
        ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        ytPlatform: "Git & GitHub Full Course"
      }
    }
  },

  fullstack: {
    category: "Software Engineering",
    title: "Full-Stack Software Engineer",
    searchTags: ["fullstack", "fs", "mern", "mean", "software engineer", "sde", "web app", "developer"],
    skills: {
      "javascript": { synonyms: ["js", "es6"], guide: "Full-stack asynchronous runtime logic.", webUrl: "https://javascript.info/", webPlatform: "JavaScript.info", ytUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk", ytPlatform: "JS Full Course" },
      "typescript": { synonyms: ["ts"], guide: "End-to-end full-stack type safety.", webUrl: "https://www.typescriptlang.org/docs/", webPlatform: "TypeScript Docs", ytUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs", ytPlatform: "TypeScript Guide" },
      "react": { synonyms: ["reactjs", "next.js", "nextjs"], guide: "Client UI & Server Side Rendering with Next.js.", webUrl: "https://nextjs.org/learn", webPlatform: "Next.js Official", ytUrl: "https://www.youtube.com/watch?v=843nec-IvW0", ytPlatform: "Next.js Full Tutorial" },
      "nodejs": { synonyms: ["node", "express"], guide: "Server routing, middleware, and controllers.", webUrl: "https://nodejs.org/", webPlatform: "Node Docs", ytUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE", ytPlatform: "Node Course" },
      "postgresql": { synonyms: ["postgres", "mysql", "sql"], guide: "Relational database modeling and queries.", webUrl: "https://www.postgresqltutorial.com/", webPlatform: "PostgreSQL Tutorial", ytUrl: "https://www.youtube.com/watch?v=HXV3zeRR3h4", ytPlatform: "SQL Tutorial" },
      "docker": { synonyms: ["containers"], guide: "Fullstack multi-container deployments.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Guide" },
      "git": { synonyms: ["github"], guide: "Version control and Git lifecycle management.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  // ----------------------------------------------------
  // 2. MOBILE APP DEVELOPMENT
  // ----------------------------------------------------
  react_native: {
    category: "Mobile Engineering",
    title: "React Native Developer",
    searchTags: ["react native", "rn", "hybrid mobile", "mobile developer", "ios android", "cross platform"],
    skills: {
      "react native": {
        synonyms: ["react native expo", "native bridge", "metro"],
        guide: "Native mobile views, layout animation, and mobile device capabilities.",
        webUrl: "https://reactnative.dev/docs/getting-started",
        webPlatform: "React Native Official Documentation",
        ytUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
        ytPlatform: "React Native Full Course"
      },
      "react": {
        synonyms: ["hooks", "state management"],
        guide: "Hooks, Context API, and modular functional components.",
        webUrl: "https://react.dev/learn",
        webPlatform: "React Official Docs",
        ytUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        ytPlatform: "React Masterclass"
      },
      "typescript": {
        synonyms: ["typed props", "navigation types"],
        guide: "Typed navigation screens, hooks, and API responses.",
        webUrl: "https://www.typescriptlang.org/docs/",
        webPlatform: "TypeScript Official Handbook",
        ytUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
        ytPlatform: "TypeScript Guide"
      },
      "redux": {
        synonyms: ["redux toolkit", "rtk", "zustand"],
        guide: "Global store management and persisted app state.",
        webUrl: "https://redux-toolkit.js.org/",
        webPlatform: "Redux Toolkit Docs",
        ytUrl: "https://www.youtube.com/watch?v=9zySeP5vH9c",
        ytPlatform: "Redux Toolkit Crash Course"
      },
      "git": {
        synonyms: ["github"],
        guide: "Mobile project repository versioning.",
        webUrl: "https://git-scm.com/",
        webPlatform: "Git Docs",
        ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        ytPlatform: "Git Guide"
      }
    }
  },

  flutter: {
    category: "Mobile Engineering",
    title: "Cross-Platform Flutter Developer",
    searchTags: ["flutter", "dart", "hybrid app", "cross platform", "mobile app", "android ios"],
    skills: {
      "dart": { synonyms: ["dart lang"], guide: "Core Dart OOP and asynchronous programming.", webUrl: "https://dart.dev/guides", webPlatform: "Dart.dev", ytUrl: "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q", ytPlatform: "Dart Programming Guide" },
      "flutter": { synonyms: ["flutter sdk", "widgets", "stateful"], guide: "Widget tree architecture and mobile layouts.", webUrl: "https://docs.flutter.dev/", webPlatform: "Flutter Docs", ytUrl: "https://www.youtube.com/watch?v=VPvVD8t02U8", ytPlatform: "Flutter Full Course" },
      "state management": { synonyms: ["bloc", "provider", "riverpod"], guide: "Predictable application state architecture.", webUrl: "https://bloclibrary.dev/", webPlatform: "Bloc Official", ytUrl: "https://www.youtube.com/watch?v=laQNms4iL0w", ytPlatform: "Flutter State Management" },
      "firebase": { synonyms: ["auth", "firestore", "push notifications"], guide: "Cloud database and mobile notifications.", webUrl: "https://firebase.google.com/docs/flutter/setup", webPlatform: "Firebase Docs", ytUrl: "https://www.youtube.com/watch?v=DqJ_KGs6XGA", ytPlatform: "Flutter Firebase Guide" },
      "git": { synonyms: ["github"], guide: "Mobile app repository management.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  android_native: {
    category: "Mobile Engineering",
    title: "Android Native Developer",
    searchTags: ["android", "app dev", "mobile", "kotlin", "java android", "play store", "apk"],
    skills: {
      "kotlin": { synonyms: ["coroutines", "android kotlin"], guide: "Modern Android language, coroutines, and null-safety.", webUrl: "https://kotlinlang.org/docs/home.html", webPlatform: "Kotlin Official", ytUrl: "https://www.youtube.com/watch?v=F9UC9DY-vIU", ytPlatform: "Kotlin Full Course" },
      "jetpack compose": { synonyms: ["compose", "declarative ui"], guide: "Declarative modern Android UI development.", webUrl: "https://developer.android.com/courses/pathways/compose", webPlatform: "Android Pathway", ytUrl: "https://www.youtube.com/watch?v=6_wKVoZ__uE", ytPlatform: "Jetpack Compose Course" },
      "rest api": { synonyms: ["retrofit", "okhttp"], guide: "Connecting Android apps to backend REST endpoints.", webUrl: "https://square.github.io/retrofit/", webPlatform: "Retrofit Docs", ytUrl: "https://www.youtube.com/watch?v=t6cx_v45w68", ytPlatform: "Retrofit API Guide" },
      "git": { synonyms: ["github"], guide: "Mobile repo versioning and release workflows.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  ios_native: {
    category: "Mobile Engineering",
    title: "iOS Native Developer",
    searchTags: ["ios", "apple", "swift", "swiftui", "iphone app", "xcode", "mobile dev"],
    skills: {
      "swift": { synonyms: ["swiftui", "ios sdk"], guide: "Native iOS programming with Swift syntax.", webUrl: "https://www.swift.org/documentation/", webPlatform: "Swift.org", ytUrl: "https://www.youtube.com/watch?v=comQ1-x2a1Q", ytPlatform: "Swift Full Course" },
      "swiftui": { synonyms: ["uikit", "views"], guide: "Building responsive Apple device view controllers.", webUrl: "https://developer.apple.com/tutorials/swiftui", webPlatform: "Apple SwiftUI", ytUrl: "https://www.youtube.com/watch?v=F2ojC6TNwws", ytPlatform: "SwiftUI Masterclass" },
      "xcode": { synonyms: ["cocoapods", "spm"], guide: "iOS IDE, build configurations, and iOS simulators.", webUrl: "https://developer.apple.com/xcode/", webPlatform: "Apple Developer", ytUrl: "https://www.youtube.com/watch?v=09TeUXjzpKs", ytPlatform: "Xcode for Beginners" },
      "git": { synonyms: ["github"], guide: "iOS source version control.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  // ----------------------------------------------------
  // 3. DATA SCIENCE & ARTIFICIAL INTELLIGENCE
  // ----------------------------------------------------
  data_analyst: {
    category: "Data & Artificial Intelligence",
    title: "Data Analyst & BI Specialist",
    searchTags: ["data analyst", "da", "bi", "business intelligence", "sql", "excel", "power bi", "tableau", "analytics"],
    skills: {
      "sql": { synonyms: ["queries", "aggregations", "joins", "subqueries"], guide: "Relational data extraction and analytics.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode SQL School", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "SQL for Data Analytics" },
      "power bi": { synonyms: ["powerbi", "dax", "tableau"], guide: "Executive dashboards and visual reporting.", webUrl: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", webPlatform: "Microsoft Learn", ytUrl: "https://www.youtube.com/watch?v=3u7MQz1EyPY", ytPlatform: "Power BI Complete Masterclass" },
      "excel": { synonyms: ["pivot tables", "vlookup", "xlookup"], guide: "Advanced Excel spreadsheet formulas.", webUrl: "https://support.microsoft.com/excel", webPlatform: "Excel Support", ytUrl: "https://www.youtube.com/watch?v=Vl0H-qTclOg", ytPlatform: "Excel for Analysts" },
      "python": { synonyms: ["pandas", "numpy"], guide: "Data cleaning and scripting in Python.", webUrl: "https://pandas.pydata.org/", webPlatform: "Pandas Docs", ytUrl: "https://www.youtube.com/watch?v=vmEHCJofslg", ytPlatform: "Pandas Full Tutorial" },
      "statistics": { synonyms: ["probability", "hypothesis testing"], guide: "Applied statistical modeling and p-values.", webUrl: "https://www.khanacademy.org/math/statistics-probability", webPlatform: "Khan Academy", ytUrl: "https://www.youtube.com/watch?v=xxpc-HPKN28", ytPlatform: "Statistics Fundamentals" }
    }
  },

  ai_ml: {
    category: "Data & Artificial Intelligence",
    title: "Machine Learning & NLP Engineer",
    searchTags: ["ml", "machine learning", "ai", "artificial intelligence", "deep learning", "nlp", "data scientist", "ds"],
    skills: {
      "python": { synonyms: ["py"], guide: "Core scientific programming.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python for ML" },
      "scikit-learn": { synonyms: ["sklearn", "machine learning", "regression"], guide: "Supervised and unsupervised ML models.", webUrl: "https://scikit-learn.org/", webPlatform: "Scikit-Learn Docs", ytUrl: "https://www.youtube.com/watch?v=0B5eIE_1vpU", ytPlatform: "Scikit-Learn ML Course" },
      "pytorch": { synonyms: ["torch", "deep learning", "neural networks"], guide: "Deep neural network architectures.", webUrl: "https://pytorch.org/tutorials/", webPlatform: "PyTorch Official", ytUrl: "https://www.youtube.com/watch?v=V_xro1bcAuA", ytPlatform: "PyTorch Course" },
      "nlp": { synonyms: ["transformers", "huggingface", "bert", "llm"], guide: "Language models, tokenization, and LLMs.", webUrl: "https://huggingface.co/learn/nlp-course/", webPlatform: "Hugging Face", ytUrl: "https://www.youtube.com/watch?v=CMrHM8a3hqw", ytPlatform: "NLP & Transformers" },
      "git": { synonyms: ["github"], guide: "Model experiment tracking.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git for AI" }
    }
  },

  gen_ai: {
    category: "Data & Artificial Intelligence",
    title: "Generative AI & LLM Applications Engineer",
    searchTags: ["genai", "gen ai", "llm", "rag", "langchain", "prompt engineering", "chatgpt", "openai", "agentic"],
    skills: {
      "langchain": { synonyms: ["llamaindex", "rag", "vector database"], guide: "Retrieval-Augmented Generation (RAG) pipelines.", webUrl: "https://python.langchain.com/docs/introduction/", webPlatform: "LangChain Official", ytUrl: "https://www.youtube.com/watch?v=aywZrzNaKjs", ytPlatform: "LangChain & RAG Course" },
      "prompt engineering": { synonyms: ["system prompts", "few-shot"], guide: "Optimizing structured LLM outputs.", webUrl: "https://www.promptingguide.ai/", webPlatform: "Prompting Guide", ytUrl: "https://www.youtube.com/watch?v=_ZvnD93Ix5I", ytPlatform: "Prompt Engineering Course" },
      "python": { synonyms: ["py"], guide: "Async LLM application development.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python Guide" },
      "git": { synonyms: ["github"], guide: "AI app repo versioning.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  data_engineer: {
    category: "Data & Artificial Intelligence",
    title: "Data Engineer (Big Data & ETL)",
    searchTags: ["data engineer", "de", "big data", "etl", "spark", "hadoop", "kafka", "pipeline"],
    skills: {
      "sql": { synonyms: ["data warehousing", "snowflake"], guide: "Warehouse architecture and analytical queries.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode Analytics", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "SQL for Data Engineering" },
      "apache spark": { synonyms: ["pyspark", "hadoop", "big data"], guide: "Distributed data compute with Apache Spark.", webUrl: "https://spark.apache.org/docs/latest/", webPlatform: "Apache Spark", ytUrl: "https://www.youtube.com/watch?v=_C8kWso4ne4", ytPlatform: "PySpark Tutorial" },
      "airflow": { synonyms: ["etl pipelines", "orchestration"], guide: "Workflow orchestration and DAG schedules.", webUrl: "https://airflow.apache.org/docs/", webPlatform: "Apache Airflow", ytUrl: "https://www.youtube.com/watch?v=K9AnJ9_ZAXE", ytPlatform: "Apache Airflow Course" },
      "kafka": { synonyms: ["streaming data", "event bus"], guide: "Real-time streaming event pipelines.", webUrl: "https://kafka.apache.org/documentation/", webPlatform: "Apache Kafka", ytUrl: "https://www.youtube.com/watch?v=R873BlBMUB4", ytPlatform: "Kafka Fundamentals" },
      "git": { synonyms: ["github"], guide: "Pipeline code control.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  // ----------------------------------------------------
  // 4. CLOUD, DEVOPS, SRE & CYBERSECURITY
  // ----------------------------------------------------
  devops: {
    category: "Cloud & Security",
    title: "DevOps & Cloud Infrastructure Engineer",
    searchTags: ["devops", "cloud", "aws", "docker", "kubernetes", "k8s", "ci cd", "infrastructure", "iac"],
    skills: {
      "docker": { synonyms: ["containers", "dockerfile"], guide: "Container builds and runtime management.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Tutorial" },
      "kubernetes": { synonyms: ["k8s", "kubectl", "helm"], guide: "Container cluster orchestration.", webUrl: "https://kubernetes.io/docs/tutorials/", webPlatform: "Kubernetes Tutorials", ytUrl: "https://www.youtube.com/watch?v=X48VuDVv0do", ytPlatform: "Kubernetes Full Course" },
      "linux": { synonyms: ["bash", "shell scripting", "ubuntu"], guide: "Linux terminal administration and shell automation.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=sWbGOq-JrIQ", ytPlatform: "Linux for Beginners" },
      "aws": { synonyms: ["cloud", "ec2", "s3", "iam"], guide: "Cloud computing fundamentals on AWS.", webUrl: "https://aws.amazon.com/training/free/", webPlatform: "AWS Skill Builder", ytUrl: "https://www.youtube.com/watch?v=SOTamWNgDKc", ytPlatform: "AWS Cloud Practitioner" },
      "ci/cd": { synonyms: ["github actions", "jenkins", "pipelines"], guide: "Automated continuous build and deployment.", webUrl: "https://docs.github.com/en/actions", webPlatform: "GitHub Actions", ytUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", ytPlatform: "CI/CD Pipelines" },
      "terraform": { synonyms: ["iac", "infrastructure as code"], guide: "Cloud resource automation.", webUrl: "https://developer.hashicorp.com/terraform", webPlatform: "Terraform Docs", ytUrl: "https://www.youtube.com/watch?v=7xngnjfIlK4", ytPlatform: "Terraform Course" },
      "git": { synonyms: ["github"], guide: "GitOps workflows.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  sre: {
    category: "Cloud & Security",
    title: "Site Reliability Engineer (SRE)",
    searchTags: ["sre", "site reliability", "monitoring", "grafana", "prometheus", "reliability", "infrastructure"],
    skills: {
      "linux": { synonyms: ["bash", "shell"], guide: "High-performance OS tuning and debugging.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=sWbGOq-JrIQ", ytPlatform: "Linux Masterclass" },
      "prometheus": { synonyms: ["grafana", "monitoring", "metrics"], guide: "Metrics observability, alerts, and SLOs.", webUrl: "https://prometheus.io/docs/introduction/overview/", webPlatform: "Prometheus Docs", ytUrl: "https://www.youtube.com/watch?v=9TJx7QTrTyo", ytPlatform: "Prometheus & Grafana" },
      "kubernetes": { synonyms: ["k8s"], guide: "Production cluster fault tolerance.", webUrl: "https://kubernetes.io/", webPlatform: "Kubernetes", ytUrl: "https://www.youtube.com/watch?v=X48VuDVv0do", ytPlatform: "K8s SRE Architecture" },
      "docker": { synonyms: ["containers"], guide: "Containerized workload troubleshooting.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Guide" }
    }
  },

  cybersecurity: {
    category: "Cloud & Security",
    title: "Cyber Security & SOC Analyst",
    searchTags: ["cyber security", "soc", "security analyst", "infosec", "splunk", "siem", "ethical hacking", "hacker"],
    skills: {
      "network security": { synonyms: ["tcp/ip", "wireshark", "dns"], guide: "Network packet inspection and routing.", webUrl: "https://www.professormesser.com/", webPlatform: "Professor Messer", ytUrl: "https://www.youtube.com/watch?v=IPvYjXCsTg8", ytPlatform: "CompTIA Network+ Course" },
      "linux": { synonyms: ["kali linux", "bash"], guide: "Security auditing and log inspection.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=lZAoFs75_cs", ytPlatform: "Kali Linux Ethical Hacking" },
      "siem": { synonyms: ["splunk", "qradar", "log analysis"], guide: "Intrusion detection and alert triaging.", webUrl: "https://www.splunk.com/en_us/training/free-courses/overview.html", webPlatform: "Splunk Free", ytUrl: "https://www.youtube.com/watch?v=q6r5g5ZpW5Y", ytPlatform: "Splunk SOC Guide" },
      "penetration testing": { synonyms: ["owasp", "nmap", "burpsuite"], guide: "Vulnerability scanning and OWASP Top 10.", webUrl: "https://owasp.org/", webPlatform: "OWASP Foundation", ytUrl: "https://www.youtube.com/watch?v=2_lwwZg80lY", ytPlatform: "OWASP Top 10 Web" },
      "cryptography": { synonyms: ["ssl", "tls", "encryption"], guide: "Encryption protocols and digital certificates.", webUrl: "https://www.khanacademy.org/computing/computer-science/cryptography", webPlatform: "Khan Academy", ytUrl: "https://www.youtube.com/watch?v=jhXCTbFnK8o", ytPlatform: "Cryptography Basics" }
    }
  },

  // ----------------------------------------------------
  // 5. PRODUCT MANAGEMENT & UI/UX DESIGN
  // ----------------------------------------------------
  ui_ux: {
    category: "Product & Design",
    title: "UI/UX & Product Designer",
    searchTags: ["ui", "ux", "ui ux", "figma", "design", "designer", "wireframing", "product design", "graphic"],
    skills: {
      "figma": { synonyms: ["auto layout", "components", "prototyping"], guide: "Figma design systems and interactive prototypes.", webUrl: "https://www.figma.com/resource-library/", webPlatform: "Figma Academy", ytUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", ytPlatform: "Figma UI/UX Tutorial" },
      "wireframing": { synonyms: ["information architecture", "user flows"], guide: "Information architecture and user journeys.", webUrl: "https://www.nngroup.com/articles/wireframing-101/", webPlatform: "Nielsen Norman Group", ytUrl: "https://www.youtube.com/watch?v=qpH_76m_3q8", ytPlatform: "Wireframing Guide" },
      "user research": { synonyms: ["usability testing", "interviews"], guide: "User personas and usability sessions.", webUrl: "https://www.interaction-design.org/", webPlatform: "IxDF Library", ytUrl: "https://www.youtube.com/watch?v=bAARmsv_o18", ytPlatform: "UX Research Methods" },
      "design systems": { synonyms: ["typography", "color theory", "spacing"], guide: "Design tokens and WCAG accessible UI.", webUrl: "https://material.io/design", webPlatform: "Google Material Design", ytUrl: "https://www.youtube.com/watch?v=1dM4qM0I1_E", ytPlatform: "Design Systems Course" }
    }
  },

  product_manager: {
    category: "Product & Design",
    title: "Product Manager (PM / APM)",
    searchTags: ["pm", "apm", "product manager", "product management", "scrum", "agile", "prd", "roadmap"],
    skills: {
      "product strategy": { synonyms: ["prd", "roadmapping", "okrs", "kpis"], guide: "Writing PRDs, feature prioritization, and roadmaps.", webUrl: "https://www.mindtheproduct.com/", webPlatform: "Mind The Product", ytUrl: "https://www.youtube.com/watch?v=uKfxVfG1_bA", ytPlatform: "Product Management 101" },
      "agile": { synonyms: ["scrum", "sprints", "jira", "kanban"], guide: "Agile rituals, sprint planning, and backlog grooming.", webUrl: "https://www.atlassian.com/agile", webPlatform: "Atlassian Agile", ytUrl: "https://www.youtube.com/watch?v=9TycLR0TqFA", ytPlatform: "Scrum & Agile Guide" },
      "data analytics": { synonyms: ["sql", "metrics", "a/b testing"], guide: "User retention curves, churn, and A/B testing.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode SQL", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "Analytics for PMs" }
    }
  },

  // ----------------------------------------------------
  // 6. GROWTH, SALES & BUSINESS OPERATIONS
  // ----------------------------------------------------
  seo_specialist: {
    category: "Marketing & Growth",
    title: "SEO Specialist & Organic Growth Strategist",
    searchTags: ["seo", "search engine optimization", "keywords", "sem", "ranking", "google ranking", "backlinks", "content strategy"],
    skills: {
      "seo": { synonyms: ["keyword research", "on-page seo", "backlinks"], guide: "Keyword intent mapping and SERP ranking strategies.", webUrl: "https://ahrefs.com/academy/seo-training-course", webPlatform: "Ahrefs Academy", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "SEO Full Course" },
      "google analytics": { synonyms: ["ga4", "search console"], guide: "Crawlability, indexing, and traffic conversion funnels.", webUrl: "https://analytics.google.com/analytics/academy/", webPlatform: "Google Analytics", ytUrl: "https://www.youtube.com/watch?v=H7bX_0u0X7E", ytPlatform: "Google Analytics Guide" }
    }
  },

  bde_sales: {
    category: "Sales & Business Development",
    title: "Business Development Executive (B2B Sales)",
    searchTags: ["sales", "bde", "b2b", "business development", "lead generation", "salesforce", "cold calling", "inside sales"],
    skills: {
      "lead generation": { synonyms: ["cold outreach", "prospecting", "linkedin sales"], guide: "Outbound prospecting and client qualification.", webUrl: "https://academy.hubspot.com/courses/inbound-sales", webPlatform: "HubSpot Sales", ytUrl: "https://www.youtube.com/watch?v=5_qR_aU3N_M", ytPlatform: "B2B Sales Prospecting" },
      "crm": { synonyms: ["salesforce", "hubspot crm", "pipeline management"], guide: "Sales pipeline tracking and deal management.", webUrl: "https://trailhead.salesforce.com/", webPlatform: "Salesforce Trailhead", ytUrl: "https://www.youtube.com/watch?v=p_O9K8j2P_Q", ytPlatform: "CRM & Salesforce Basics" }
    }
  },

  financial_analyst: {
    category: "Finance & Accounting",
    title: "Financial Analyst & Equity Research",
    searchTags: ["finance", "financial analyst", "equity", "dcf", "valuation", "investment banking", "ib"],
    skills: {
      "financial modeling": { synonyms: ["dcf", "valuation", "balance sheet"], guide: "Building 3-statement models and DCF valuations.", webUrl: "https://corporatefinanceinstitute.com/resources/knowledge/modeling/", webPlatform: "CFI Free Resources", ytUrl: "https://www.youtube.com/watch?v=kY6T5Wb0sA8", ytPlatform: "Financial Modeling Course" },
      "excel": { synonyms: ["advanced excel", "macros", "vba"], guide: "Financial formulas (NPV, IRR, XLOOKUP).", webUrl: "https://support.microsoft.com/excel", webPlatform: "Excel Support", ytUrl: "https://www.youtube.com/watch?v=Vl0H-qTclOg", ytPlatform: "Excel for Finance" }
    }
  }
};

// Diagnostic Question Banks with Technical Explanations
const QUIZZES = {
  "react native": {
    q: "In React Native, which component is the primary container for rendering text strings?",
    options: ["<p>", "<div>", "<Text>", "<Span>"],
    correct: 2,
    explanation: "React Native requires all raw string literals to be wrapped inside dedicated <Text> components."
  },
  "flutter": {
    q: "In Flutter, what is the base class for widgets that do not require mutable state?",
    options: ["StatefulWidget", "StatelessWidget", "InheritedWidget", "DynamicWidget"],
    correct: 1,
    explanation: "StatelessWidget is immutable and its configuration is initialized only once during build."
  },
  "figma": {
    q: "Which Figma feature allows UI components to automatically adapt their padding and sizing based on content changes?",
    options: ["Smart Animate", "Auto Layout", "Boolean Groups", "Constraints Grid"],
    correct: 1,
    explanation: "Auto Layout enables dynamic resizing, responsive padding, and flexbox-style directional flow."
  },
  "git": {
    q: "Which command is used to create a new branch and switch to it in a single step?",
    options: ["git branch -m", "git checkout -b <name>", "git merge --new", "git push -b"],
    correct: 1,
    explanation: "'git checkout -b <name>' creates a new branch and immediately points HEAD to it."
  },
  "sql": {
    q: "Which SQL keyword is specifically used to filter records after an aggregate GROUP BY operation?",
    options: ["WHERE", "ORDER BY", "HAVING", "DISTINCT"],
    correct: 2,
    explanation: "'WHERE' filters rows before aggregation, while 'HAVING' filters summary results after GROUP BY."
  },
  "react": {
    q: "Which React Hook is designed to execute side effects (data fetching, subscriptions)?",
    options: ["useState", "useEffect", "useMemo", "useContext"],
    correct: 1,
    explanation: "'useEffect' runs after render and handles asynchronous operations, DOM mutations, and API calls."
  },
  "docker": {
    q: "Which Dockerfile instruction specifies the base operating image for a container?",
    options: ["RUN", "FROM", "ENTRYPOINT", "WORKDIR"],
    correct: 1,
    explanation: "'FROM' initializes a new build stage and sets the Base Image for subsequent instructions."
  },
  "kubernetes": {
    q: "What is the smallest deployable computing unit that can be created and managed in Kubernetes?",
    options: ["Cluster", "Pod", "Node", "Service"],
    correct: 1,
    explanation: "A Pod encapsulates one or more containers, storage resources, and unique network IP in Kubernetes."
  },
  "seo": {
    q: "What is the primary purpose of a 'Canonical' tag in SEO?",
    options: ["Accelerate page load speed", "Prevent duplicate content penalties", "Encrypt website traffic", "Generate automatic backlinks"],
    correct: 1,
    explanation: "A canonical tag tells search engines which specific URL represents the master copy of a page to prevent duplicate content issues."
  },
  "financial modeling": {
    q: "In financial modeling and equity valuation, what does DCF stand for?",
    options: ["Dividend Capital Forecast", "Direct Current Finance", "Discounted Cash Flow", "Deferred Corporate Fund"],
    correct: 2,
    explanation: "DCF (Discounted Cash Flow) is a valuation method used to estimate the value of an investment based on its expected future cash flows."
  }
};