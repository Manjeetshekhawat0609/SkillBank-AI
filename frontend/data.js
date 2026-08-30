// Comprehensive Corporate Job Taxonomy with Acronyms & Short-tag Search Registry
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
      "node": {
        synonyms: ["nodejs", "express", "expressjs"],
        guide: "Event-driven runtime and Express API routing architectures.",
        webUrl: "https://nodejs.org/en/learn",
        webPlatform: "Node.js Official Guide",
        ytUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        ytPlatform: "Node.js and Express.js Full Course"
      },
      "sql": {
        synonyms: ["postgres", "postgresql", "mysql", "rdbms", "database"],
        guide: "Relational schema design, indexes, joins, and ACID transactions.",
        webUrl: "https://www.w3schools.com/sql/",
        webPlatform: "W3Schools SQL Portal",
        ytUrl: "https://www.youtube.com/watch?v=HXV3zeRR3h4",
        ytPlatform: "SQL Database Tutorial for Beginners"
      },
      "docker": {
        synonyms: ["containers", "dockerfile", "docker-compose"],
        guide: "Containerizing backend workloads for uniform runtime environments.",
        webUrl: "https://docs.docker.com/get-started/",
        webPlatform: "Docker Official Docs",
        ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        ytPlatform: "Docker & Containerization Tutorial"
      },
      "git": {
        synonyms: ["github"],
        guide: "Team collaboration, Git CLI workflows, and branches.",
        webUrl: "https://git-scm.com/",
        webPlatform: "Git Official Docs",
        ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
        ytPlatform: "Git & GitHub Full Course"
      },
      "redis": {
        synonyms: ["caching", "in-memory db"],
        guide: "In-memory caching, pub/sub, and session management stores.",
        webUrl: "https://redis.io/docs/",
        webPlatform: "Redis Official Portal",
        ytUrl: "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
        ytPlatform: "Redis Crash Course"
      }
    }
  },
  fullstack: {
    category: "Software Engineering",
    title: "Full-Stack Software Engineer",
    searchTags: ["fullstack", "fs", "mern", "mean", "software engineer", "sde", "web app", "developer"],
    skills: {
      "html": { synonyms: ["html5"], guide: "Semantic web page structure.", webUrl: "https://developer.mozilla.org/en-US/docs/Learn/HTML", webPlatform: "MDN", ytUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE", ytPlatform: "HTML5 Course" },
      "css": { synonyms: ["css3", "tailwind"], guide: "Modern UI styling with Tailwind CSS.", webUrl: "https://www.freecodecamp.org/", webPlatform: "freeCodeCamp", ytUrl: "https://www.youtube.com/watch?v=1PnVor36_40", ytPlatform: "CSS Masterclass" },
      "javascript": { synonyms: ["js", "es6"], guide: "Full-stack asynchronous runtime logic.", webUrl: "https://javascript.info/", webPlatform: "JavaScript.info", ytUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk", ytPlatform: "JS Full Course" },
      "react": { synonyms: ["reactjs", "next.js", "nextjs"], guide: "Client UI & Server Side Rendering with Next.js.", webUrl: "https://nextjs.org/learn", webPlatform: "Next.js Official", ytUrl: "https://www.youtube.com/watch?v=843nec-IvW0", ytPlatform: "Next.js Full Tutorial" },
      "node": { synonyms: ["nodejs", "express"], guide: "Server routing, middleware, and controllers.", webUrl: "https://nodejs.org/", webPlatform: "Node Docs", ytUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE", ytPlatform: "Node Course" },
      "sql": { synonyms: ["postgres", "mysql"], guide: "Relational database modeling and queries.", webUrl: "https://www.postgresqltutorial.com/", webPlatform: "PostgreSQL Tutorial", ytUrl: "https://www.youtube.com/watch?v=HXV3zeRR3h4", ytPlatform: "SQL Tutorial" },
      "git": { synonyms: ["github"], guide: "Version control and Git lifecycle management.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  android_dev: {
    category: "Software Engineering",
    title: "Android Native Developer",
    searchTags: ["android", "app dev", "mobile", "kotlin", "java android", "play store", "apk"],
    skills: {
      "kotlin": { synonyms: ["coroutines", "android kotlin"], guide: "Modern Android language, coroutines, and null-safety.", webUrl: "https://kotlinlang.org/docs/home.html", webPlatform: "Kotlin Official", ytUrl: "https://www.youtube.com/watch?v=F9UC9DY-vIU", ytPlatform: "Kotlin Full Course" },
      "android studio": { synonyms: ["gradle", "android sdk"], guide: "SDK tools, Gradle builds, and emulators.", webUrl: "https://developer.android.com/studio", webPlatform: "Android Developers", ytUrl: "https://www.youtube.com/watch?v=fis26HvvDA4", ytPlatform: "Android Studio Guide" },
      "jetpack compose": { synonyms: ["compose", "declarative ui"], guide: "Declarative modern Android UI development.", webUrl: "https://developer.android.com/courses/pathways/compose", webPlatform: "Android Pathway", ytUrl: "https://www.youtube.com/watch?v=6_wKVoZ__uE", ytPlatform: "Jetpack Compose Course" },
      "rest api": { synonyms: ["retrofit", "okhttp"], guide: "Connecting Android apps to backend REST endpoints.", webUrl: "https://square.github.io/retrofit/", webPlatform: "Retrofit Docs", ytUrl: "https://www.youtube.com/watch?v=t6cx_v45w68", ytPlatform: "Retrofit API Guide" },
      "git": { synonyms: ["github"], guide: "Mobile repo versioning and release workflows.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  ios_dev: {
    category: "Software Engineering",
    title: "iOS Native Developer",
    searchTags: ["ios", "apple", "swift", "swiftui", "iphone app", "xcode", "mobile dev"],
    skills: {
      "swift": { synonyms: ["swiftui", "ios sdk"], guide: "Native iOS programming with Swift syntax.", webUrl: "https://www.swift.org/documentation/", webPlatform: "Swift.org", ytUrl: "https://www.youtube.com/watch?v=comQ1-x2a1Q", ytPlatform: "Swift Full Course" },
      "xcode": { synonyms: ["cocoapods", "spm"], guide: "iOS IDE, build configurations, and iOS simulators.", webUrl: "https://developer.apple.com/xcode/", webPlatform: "Apple Developer", ytUrl: "https://www.youtube.com/watch?v=09TeUXjzpKs", ytPlatform: "Xcode for Beginners" },
      "uikit": { synonyms: ["swiftui views", "storyboards"], guide: "Building responsive Apple device view controllers.", webUrl: "https://developer.apple.com/tutorials/swiftui", webPlatform: "Apple SwiftUI", ytUrl: "https://www.youtube.com/watch?v=F2ojC6TNwws", ytPlatform: "SwiftUI Masterclass" },
      "rest api": { synonyms: ["urlsession", "alamofire"], guide: "Asynchronous network requests in iOS.", webUrl: "https://developer.apple.com/documentation/foundation/urlsession", webPlatform: "Apple Docs", ytUrl: "https://www.youtube.com/watch?v=sqo844saoCc", ytPlatform: "URLSession Guide" },
      "git": { synonyms: ["github"], guide: "iOS source version control.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  flutter_dev: {
    category: "Software Engineering",
    title: "Cross-Platform Flutter Developer",
    searchTags: ["flutter", "dart", "hybrid app", "cross platform", "mobile app", "android ios"],
    skills: {
      "dart": { synonyms: ["dart lang"], guide: "Core Dart OOP and asynchronous programming.", webUrl: "https://dart.dev/guides", webPlatform: "Dart.dev", ytUrl: "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q", ytPlatform: "Dart Programming Guide" },
      "flutter": { synonyms: ["flutter sdk", "widgets", "stateful"], guide: "Widget tree architecture and mobile layouts.", webUrl: "https://docs.flutter.dev/", webPlatform: "Flutter Docs", ytUrl: "https://www.youtube.com/watch?v=VPvVD8t02U8", ytPlatform: "Flutter Full Course" },
      "state management": { synonyms: ["bloc", "provider", "riverpod"], guide: "Predictable application state architecture.", webUrl: "https://bloclibrary.dev/", webPlatform: "Bloc Official", ytUrl: "https://www.youtube.com/watch?v=laQNms4iL0w", ytPlatform: "Flutter State Management" },
      "rest api": { synonyms: ["http package", "dio"], guide: "Consuming backend APIs in Flutter mobile apps.", webUrl: "https://docs.flutter.dev/data-and-backend/networking", webPlatform: "Flutter Network", ytUrl: "https://www.youtube.com/watch?v=9_Z-XF_Jg6w", ytPlatform: "Flutter REST API Guide" },
      "git": { synonyms: ["github"], guide: "Mobile app repository management.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  qa_automation: {
    category: "Software Engineering",
    title: "QA Automation Engineer (SDET)",
    searchTags: ["qa", "sdet", "testing", "automation testing", "selenium", "tester", "quality assurance"],
    skills: {
      "selenium": { synonyms: ["playwright", "cypress", "webdriver"], guide: "Automated end-to-end browser test suites.", webUrl: "https://www.selenium.dev/documentation/", webPlatform: "Selenium Docs", ytUrl: "https://www.youtube.com/watch?v=FRn5J31eGoY", ytPlatform: "Selenium Automation Guide" },
      "java": { synonyms: ["python for testing", "pytest", "testng"], guide: "Test automation framework object-oriented programming.", webUrl: "https://dev.java/learn/", webPlatform: "Oracle Java", ytUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34", ytPlatform: "Java for QA Automation" },
      "api testing": { synonyms: ["postman", "rest-assured"], guide: "Automating REST API payload & status validations.", webUrl: "https://learning.postman.com/", webPlatform: "Postman Learning", ytUrl: "https://www.youtube.com/watch?v=CLG0epmsdaY", ytPlatform: "Postman API Testing" },
      "ci/cd": { synonyms: ["jenkins", "github actions"], guide: "Integrating automated test suites in deployment pipelines.", webUrl: "https://docs.github.com/en/actions", webPlatform: "GitHub Actions", ytUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", ytPlatform: "CI/CD Test Pipelines" },
      "git": { synonyms: ["github"], guide: "Test repository maintenance.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  blockchain_dev: {
    category: "Software Engineering",
    title: "Blockchain & Smart Contract Developer",
    searchTags: ["blockchain", "web3", "crypto", "solidity", "ethereum", "smart contracts", "dapp"],
    skills: {
      "solidity": { synonyms: ["smart contracts", "evm", "erc20"], guide: "Writing secure smart contracts on EVM.", webUrl: "https://docs.soliditylang.org/", webPlatform: "Solidity Docs", ytUrl: "https://www.youtube.com/watch?v=M576WGiDBdQ", ytPlatform: "Solidity Blockchain Course" },
      "web3.js": { synonyms: ["ethers.js", "metamask", "walletconnect"], guide: "Decentralized application frontend integration.", webUrl: "https://docs.ethers.org/v6/", webPlatform: "Ethers.js", ytUrl: "https://www.youtube.com/watch?v=yk7nVp5HTCk", ytPlatform: "Ethers.js Web3 Guide" },
      "cryptography": { synonyms: ["hashes", "public key", "merkle tree"], guide: "Cryptographic signing and consensus protocols.", webUrl: "https://ethereum.org/en/developers/docs/", webPlatform: "Ethereum Docs", ytUrl: "https://www.youtube.com/watch?v=jhXCTbFnK8o", ytPlatform: "Blockchain Cryptography" },
      "git": { synonyms: ["github"], guide: "Web3 version control.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  // ----------------------------------------------------
  // 2. DATA SCIENCE, ARTIFICIAL INTELLIGENCE & ML
  // ----------------------------------------------------
  data_analyst: {
    category: "Data & Artificial Intelligence",
    title: "Data Analyst & BI Specialist",
    searchTags: ["data analyst", "da", "bi", "business intelligence", "sql", "excel", "power bi", "tableau", "analytics"],
    skills: {
      "python": { synonyms: ["py"], guide: "Data cleaning and scripting in Python.", webUrl: "https://www.python.org/about/gettingstarted/", webPlatform: "Python Official", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python for Data Analysis" },
      "sql": { synonyms: ["queries", "aggregations", "joins", "subqueries"], guide: "Relational data extraction and analytics.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode SQL School", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "SQL for Data Analytics" },
      "pandas": { synonyms: ["dataframe", "data wrangling"], guide: "Data manipulation, cleaning, and transformation.", webUrl: "https://pandas.pydata.org/", webPlatform: "Pandas Docs", ytUrl: "https://www.youtube.com/watch?v=vmEHCJofslg", ytPlatform: "Pandas Full Tutorial" },
      "power bi": { synonyms: ["powerbi", "dax", "tableau"], guide: "Executive dashboards and visual reporting.", webUrl: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", webPlatform: "Microsoft Learn", ytUrl: "https://www.youtube.com/watch?v=3u7MQz1EyPY", ytPlatform: "Power BI Complete Masterclass" },
      "excel": { synonyms: ["pivot tables", "vlookup", "xlookup"], guide: "Advanced Excel spreadsheet formulas.", webUrl: "https://support.microsoft.com/excel", webPlatform: "Excel Support", ytUrl: "https://www.youtube.com/watch?v=Vl0H-qTclOg", ytPlatform: "Excel for Analysts" },
      "statistics": { synonyms: ["probability", "hypothesis testing"], guide: "Applied statistical modeling and p-values.", webUrl: "https://www.khanacademy.org/math/statistics-probability", webPlatform: "Khan Academy", ytUrl: "https://www.youtube.com/watch?v=xxpc-HPKN28", ytPlatform: "Statistics Fundamentals" }
    }
  },
  ai_ml_engineer: {
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
  genai_engineer: {
    category: "Data & Artificial Intelligence",
    title: "Generative AI & LLM Applications Engineer",
    searchTags: ["genai", "gen ai", "llm", "rag", "langchain", "prompt engineering", "chatgpt", "openai", "agentic"],
    skills: {
      "python": { synonyms: ["py"], guide: "Async LLM application development.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python Guide" },
      "langchain": { synonyms: ["llamaindex", "rag", "vector database"], guide: "Retrieval-Augmented Generation (RAG) pipelines.", webUrl: "https://python.langchain.com/docs/introduction/", webPlatform: "LangChain Official", ytUrl: "https://www.youtube.com/watch?v=aywZrzNaKjs", ytPlatform: "LangChain & RAG Course" },
      "prompt engineering": { synonyms: ["system prompts", "few-shot"], guide: "Optimizing structured LLM outputs.", webUrl: "https://www.promptingguide.ai/", webPlatform: "Prompting Guide", ytUrl: "https://www.youtube.com/watch?v=_ZvnD93Ix5I", ytPlatform: "Prompt Engineering Course" },
      "pinecone": { synonyms: ["chromadb", "embeddings", "qdrant"], guide: "Vector embeddings and similarity search.", webUrl: "https://docs.pinecone.io/", webPlatform: "Pinecone Docs", ytUrl: "https://www.youtube.com/watch?v=0kH8s3G7PzU", ytPlatform: "Vector Databases Guide" },
      "git": { synonyms: ["github"], guide: "AI app repo versioning.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  data_engineer: {
    category: "Data & Artificial Intelligence",
    title: "Data Engineer (Big Data & ETL)",
    searchTags: ["data engineer", "de", "big data", "etl", "spark", "hadoop", "kafka", "pipeline"],
    skills: {
      "python": { synonyms: ["py"], guide: "ETL pipeline automation scripting.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python ETL Guide" },
      "sql": { synonyms: ["data warehousing", "snowflake", "bigquery"], guide: "Warehouse architecture and massive queries.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode Analytics", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "SQL for Data Engineering" },
      "spark": { synonyms: ["pyspark", "hadoop", "big data"], guide: "Distributed data compute with Apache Spark.", webUrl: "https://spark.apache.org/docs/latest/", webPlatform: "Apache Spark", ytUrl: "https://www.youtube.com/watch?v=_C8kWso4ne4", ytPlatform: "PySpark Tutorial" },
      "airflow": { synonyms: ["etl pipelines", "orchestration"], guide: "Workflow orchestration and DAG schedules.", webUrl: "https://airflow.apache.org/docs/", webPlatform: "Apache Airflow", ytUrl: "https://www.youtube.com/watch?v=K9AnJ9_ZAXE", ytPlatform: "Apache Airflow Course" },
      "kafka": { synonyms: ["streaming data", "event bus"], guide: "Real-time streaming event pipelines.", webUrl: "https://kafka.apache.org/documentation/", webPlatform: "Apache Kafka", ytUrl: "https://www.youtube.com/watch?v=R873BlBMUB4", ytPlatform: "Kafka Fundamentals" },
      "git": { synonyms: ["github"], guide: "Pipeline code control.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  // ----------------------------------------------------
  // 3. CLOUD, DEVOPS, SRE & CYBERSECURITY
  // ----------------------------------------------------
  devops_engineer: {
    category: "Cloud & Security",
    title: "DevOps & Cloud Infrastructure Engineer",
    searchTags: ["devops", "cloud", "aws", "docker", "kubernetes", "k8s", "ci cd", "infrastructure", "iac"],
    skills: {
      "linux": { synonyms: ["bash", "shell scripting", "ubuntu"], guide: "Linux terminal administration and shell automation.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=sWbGOq-JrIQ", ytPlatform: "Linux for Beginners" },
      "docker": { synonyms: ["containers", "dockerfile"], guide: "Container builds and runtime management.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Tutorial" },
      "kubernetes": { synonyms: ["k8s", "kubectl", "helm"], guide: "Container cluster orchestration.", webUrl: "https://kubernetes.io/docs/tutorials/", webPlatform: "Kubernetes Tutorials", ytUrl: "https://www.youtube.com/watch?v=X48VuDVv0do", ytPlatform: "Kubernetes Full Course" },
      "ci/cd": { synonyms: ["github actions", "jenkins", "pipelines"], guide: "Automated continuous build and deployment.", webUrl: "https://docs.github.com/en/actions", webPlatform: "GitHub Actions", ytUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", ytPlatform: "CI/CD Pipelines" },
      "terraform": { synonyms: ["iac", "infrastructure as code"], guide: "Cloud resource automation.", webUrl: "https://developer.hashicorp.com/terraform", webPlatform: "Terraform Docs", ytUrl: "https://www.youtube.com/watch?v=7xngnjfIlK4", ytPlatform: "Terraform Course" },
      "aws": { synonyms: ["cloud", "ec2", "s3", "iam"], guide: "Cloud computing fundamentals on AWS.", webUrl: "https://aws.amazon.com/training/free/", webPlatform: "AWS Skill Builder", ytUrl: "https://www.youtube.com/watch?v=SOTamWNgDKc", ytPlatform: "AWS Cloud Practitioner" },
      "git": { synonyms: ["github"], guide: "GitOps workflows.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  sre_engineer: {
    category: "Cloud & Security",
    title: "Site Reliability Engineer (SRE)",
    searchTags: ["sre", "site reliability", "monitoring", "grafana", "prometheus", "reliability", "infrastructure"],
    skills: {
      "linux": { synonyms: ["bash", "shell"], guide: "High-performance OS tuning and debugging.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=sWbGOq-JrIQ", ytPlatform: "Linux Masterclass" },
      "monitoring": { synonyms: ["prometheus", "grafana", "datadog"], guide: "Metrics observability, alerts, and SLOs.", webUrl: "https://grafana.com/tutorials/", webPlatform: "Grafana Tutorials", ytUrl: "https://www.youtube.com/watch?v=9TJx7QTrTyo", ytPlatform: "Prometheus & Grafana" },
      "kubernetes": { synonyms: ["k8s"], guide: "Production cluster fault tolerance.", webUrl: "https://kubernetes.io/", webPlatform: "Kubernetes", ytUrl: "https://www.youtube.com/watch?v=X48VuDVv0do", ytPlatform: "K8s SRE Architecture" },
      "python": { synonyms: ["automation scripting", "go", "golang"], guide: "Reliability automation scripting.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python Automation" },
      "git": { synonyms: ["github"], guide: "Infrastructure tracking.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },
  soc_analyst: {
    category: "Cloud & Security",
    title: "Cyber Security & SOC Analyst",
    searchTags: ["cyber security", "soc", "security analyst", "infosec", "splunk", "siem", "ethical hacking", "hacker"],
    skills: {
      "networking": { synonyms: ["tcp/ip", "wireshark", "dns", "osi model"], guide: "Network packet inspection and routing.", webUrl: "https://www.professormesser.com/", webPlatform: "Professor Messer", ytUrl: "https://www.youtube.com/watch?v=IPvYjXCsTg8", ytPlatform: "CompTIA Network+ Course" },
      "linux": { synonyms: ["kali linux", "bash"], guide: "Security auditing and log inspection.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=lZAoFs75_cs", ytPlatform: "Kali Linux Ethical Hacking" },
      "siem": { synonyms: ["splunk", "qradar", "log analysis"], guide: "Intrusion detection and alert triaging.", webUrl: "https://www.splunk.com/en_us/training/free-courses/overview.html", webPlatform: "Splunk Free", ytUrl: "https://www.youtube.com/watch?v=q6r5g5ZpW5Y", ytPlatform: "Splunk SOC Guide" },
      "vulnerability assessment": { synonyms: ["owasp", "nmap", "burpsuite"], guide: "Vulnerability scanning and OWASP Top 10.", webUrl: "https://owasp.org/", webPlatform: "OWASP Foundation", ytUrl: "https://www.youtube.com/watch?v=2_lwwZg80lY", ytPlatform: "OWASP Top 10 Web" },
      "cryptography": { synonyms: ["ssl", "tls", "encryption", "hashing"], guide: "Encryption protocols and digital certificates.", webUrl: "https://www.khanacademy.org/computing/computer-science/cryptography", webPlatform: "Khan Academy", ytUrl: "https://www.youtube.com/watch?v=jhXCTbFnK8o", ytPlatform: "Cryptography Basics" }
    }
  },

  // ----------------------------------------------------
  // 4. PRODUCT MANAGEMENT & UI/UX DESIGN
  // ----------------------------------------------------
  ui_ux_designer: {
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
      "data analytics": { synonyms: ["sql", "metrics", "a/b testing", "funnels"], guide: "User retention curves, churn, and A/B testing.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode SQL", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "Analytics for PMs" },
      "user empathy": { synonyms: ["customer discovery", "surveys"], guide: "Customer interviews and problem framing.", webUrl: "https://www.productplan.com/learn/", webPlatform: "ProductPlan", ytUrl: "https://www.youtube.com/watch?v=bAARmsv_o18", ytPlatform: "User Discovery" }
    }
  },

  // ----------------------------------------------------
  // 5. DIGITAL MARKETING & GROWTH
  // ----------------------------------------------------
  seo_specialist: {
    category: "Marketing & Growth",
    title: "SEO Specialist & Organic Growth Strategist",
    searchTags: ["seo", "search engine optimization", "keywords", "sem", "ranking", "google ranking", "backlinks", "content strategy"],
    skills: {
      "seo": { synonyms: ["keyword research", "on-page seo", "backlinks"], guide: "Keyword intent mapping and SERP ranking strategies.", webUrl: "https://ahrefs.com/academy/seo-training-course", webPlatform: "Ahrefs Academy", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "SEO Full Course" },
      "technical seo": { synonyms: ["core web vitals", "sitemaps", "schema"], guide: "Crawlability, indexing, and site speed optimization.", webUrl: "https://developers.google.com/search/docs", webPlatform: "Google Search Central", ytUrl: "https://www.youtube.com/watch?v=MYE6T_gd7H0", ytPlatform: "Technical SEO Masterclass" },
      "analytics": { synonyms: ["google search console", "ga4"], guide: "Search queries tracking and click-through analysis.", webUrl: "https://analytics.google.com/analytics/academy/", webPlatform: "Google Analytics", ytUrl: "https://www.youtube.com/watch?v=H7bX_0u0X7E", ytPlatform: "Google Search Console Guide" }
    }
  },
  digital_marketer: {
    category: "Marketing & Growth",
    title: "Performance & Digital Marketing Specialist",
    searchTags: ["digital marketing", "marketing", "ads", "google ads", "meta ads", "ppc", "growth", "copywriting"],
    skills: {
      "seo": { synonyms: ["search engine optimization", "keywords"], guide: "On-page, technical, and off-page SEO ranking.", webUrl: "https://moz.com/beginners-guide-to-seo", webPlatform: "Moz SEO Guide", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "SEO Full Course" },
      "google ads": { synonyms: ["sem", "ppc", "meta ads", "campaigns"], guide: "PPC campaign setup, bid optimization, and ROAS.", webUrl: "https://skillshop.withgoogle.com/", webPlatform: "Google Skillshop", ytUrl: "https://www.youtube.com/watch?v=8K_t8N_7sXw", ytPlatform: "Google Ads Tutorial" },
      "analytics": { synonyms: ["google analytics", "ga4", "conversion tracking"], guide: "Attribution modeling and conversion funnels.", webUrl: "https://analytics.google.com/analytics/academy/", webPlatform: "Google Analytics Academy", ytUrl: "https://www.youtube.com/watch?v=H7bX_0u0X7E", ytPlatform: "GA4 Masterclass" },
      "copywriting": { synonyms: ["content marketing", "email campaigns"], guide: "High-conversion copy for landing pages and funnels.", webUrl: "https://copyblogger.com/", webPlatform: "Copyblogger", ytUrl: "https://www.youtube.com/watch?v=1M0T5N_Xo7E", ytPlatform: "Copywriting Guide" }
    }
  },

  // ----------------------------------------------------
  // 6. BUSINESS DEVELOPMENT, SALES & OPERATIONS
  // ----------------------------------------------------
  bde_sales: {
    category: "Sales & Business Development",
    title: "Business Development Executive (B2B Sales)",
    searchTags: ["sales", "bde", "b2b", "business development", "lead generation", "salesforce", "cold calling", "inside sales"],
    skills: {
      "lead generation": { synonyms: ["cold outreach", "prospecting", "linkedin sales"], guide: "Outbound prospecting and client qualification.", webUrl: "https://academy.hubspot.com/courses/inbound-sales", webPlatform: "HubSpot Sales", ytUrl: "https://www.youtube.com/watch?v=5_qR_aU3N_M", ytPlatform: "B2B Sales Prospecting" },
      "crm": { synonyms: ["salesforce", "hubspot crm", "pipeline management"], guide: "Sales pipeline tracking and deal management.", webUrl: "https://trailhead.salesforce.com/", webPlatform: "Salesforce Trailhead", ytUrl: "https://www.youtube.com/watch?v=p_O9K8j2P_Q", ytPlatform: "CRM & Salesforce Basics" },
      "negotiation": { synonyms: ["pitching", "contract closing", "objection handling"], guide: "Consultative pitching and contract negotiation.", webUrl: "https://www.coursera.org/learn/negotiation-skills", webPlatform: "Coursera Negotiation", ytUrl: "https://www.youtube.com/watch?v=MXFpJWkWBf4", ytPlatform: "Sales Negotiation Skills" }
    }
  },

  // ----------------------------------------------------
  // 7. CORPORATE FINANCE & ACCOUNTING
  // ----------------------------------------------------
  financial_analyst: {
    category: "Finance & Accounting",
    title: "Financial Analyst & Equity Research",
    searchTags: ["finance", "financial analyst", "equity", "dcf", "valuation", "investment banking", "ib", "chartered accountant", "ca"],
    skills: {
      "financial modeling": { synonyms: ["dcf", "valuation", "balance sheet"], guide: "Building 3-statement models and DCF valuations.", webUrl: "https://corporatefinanceinstitute.com/resources/knowledge/modeling/", webPlatform: "CFI Free Resources", ytUrl: "https://www.youtube.com/watch?v=kY6T5Wb0sA8", ytPlatform: "Financial Modeling Course" },
      "excel": { synonyms: ["advanced excel", "macros", "vba"], guide: "Financial formulas (NPV, IRR, XLOOKUP).", webUrl: "https://support.microsoft.com/excel", webPlatform: "Excel Support", ytUrl: "https://www.youtube.com/watch?v=Vl0H-qTclOg", ytPlatform: "Excel for Finance" },
      "accounting": { synonyms: ["p&l", "cash flow", "gaap", "ifrs"], guide: "Financial statement analysis and accounting rules.", webUrl: "https://www.khanacademy.org/economics-finance-domain/core-finance", webPlatform: "Khan Academy Finance", ytUrl: "https://www.youtube.com/watch?v=yYn_E4sT5i0", ytPlatform: "Accounting Basics" }
    }
  },

  // ----------------------------------------------------
  // 8. HUMAN RESOURCES (HR) & TALENT ACQUISITION
  // ----------------------------------------------------
  hr_recruiter: {
    category: "Human Resources",
    title: "Technical Recruiter & Talent Acquisition",
    searchTags: ["hr", "recruiter", "talent acquisition", "human resources", "hiring", "ats", "interviewing", "people ops"],
    skills: {
      "talent sourcing": { synonyms: ["boolean search", "linkedin recruiter", "ats"], guide: "Boolean search and candidate sourcing pipelines.", webUrl: "https://academy.hubspot.com/", webPlatform: "HubSpot Academy", ytUrl: "https://www.youtube.com/watch?v=7u5p2o3P_A8", ytPlatform: "Talent Sourcing Mastery" },
      "interviewing": { synonyms: ["behavioral interview", "screening"], guide: "STAR methodology and salary negotiation.", webUrl: "https://www.coursera.org/learn/recruitment", webPlatform: "Coursera HR", ytUrl: "https://www.youtube.com/watch?v=aG_5G8gP_pA", ytPlatform: "Behavioral Interviewing" },
      "ats": { synonyms: ["greenhouse", "lever", "naukri rms"], guide: "Applicant Tracking System workflows.", webUrl: "https://www.shrm.org/", webPlatform: "SHRM Resources", ytUrl: "https://www.youtube.com/watch?v=p_O9K8j2P_Q", ytPlatform: "ATS Workflow Guide" }
    }
  }
};

// Diagnostic Question Banks with Explanations
const QUIZZES = {
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