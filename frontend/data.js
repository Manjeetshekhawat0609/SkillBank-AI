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
      "nextjs": {
        synonyms: ["next.js", "ssr", "server side rendering", "app router"],
        guide: "Server-side rendering, App Router architecture, and SEO-optimized web apps.",
        webUrl: "https://nextjs.org/docs",
        webPlatform: "Next.js Official Documentation",
        ytUrl: "https://www.youtube.com/watch?v=843nec-IvW0",
        ytPlatform: "Next.js Full Tutorial"
      },
      "redux": {
        synonyms: ["redux toolkit", "rtk", "state management"],
        guide: "Global store management, slices, and asynchronous thunk actions.",
        webUrl: "https://redux-toolkit.js.org/",
        webPlatform: "Redux Toolkit Docs",
        ytUrl: "https://www.youtube.com/watch?v=9zySeP5vH9c",
        ytPlatform: "Redux Toolkit Crash Course"
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
      "fastapi": {
        synonyms: ["pydantic", "starlette", "async python"],
        guide: "High-speed asynchronous Python microservices with automatic OpenAPI Swagger docs.",
        webUrl: "https://fastapi.tiangolo.com/",
        webPlatform: "FastAPI Official Documentation",
        ytUrl: "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        ytPlatform: "FastAPI Full Tutorial"
      },
      "django": {
        synonyms: ["django rest framework", "drf", "orm"],
        guide: "Robust enterprise monolithic and API web applications with Django ORM.",
        webUrl: "https://docs.djangoproject.com/",
        webPlatform: "Django Official Documentation",
        ytUrl: "https://www.youtube.com/watch?v=F5mRW0jo-U4",
        ytPlatform: "Django Full Course"
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
      "rest api": {
        synonyms: ["microservices", "json api", "http status"],
        guide: "RESTful architecture, status codes, JWT token authentication, and rate limiting.",
        webUrl: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
        webPlatform: "MDN APIs",
        ytUrl: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
        ytPlatform: "REST API Concepts"
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
      "mongodb": { synonyms: ["nosql", "mongoose"], guide: "Document schema modeling and aggregations.", webUrl: "https://www.mongodb.com/docs/", webPlatform: "MongoDB Docs", ytUrl: "https://www.youtube.com/watch?v=ofme2o29ngU", ytPlatform: "MongoDB Full Course" },
      "docker": { synonyms: ["containers"], guide: "Fullstack multi-container deployments.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Guide" },
      "rest api": { synonyms: ["api integration"], guide: "Connecting backend endpoints with client state.", webUrl: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction", webPlatform: "MDN APIs", ytUrl: "https://www.youtube.com/watch?v=-MTSQjw5DrM", ytPlatform: "REST API Guide" },
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
      "javascript": {
        synonyms: ["js", "es6"],
        guide: "Asynchronous JavaScript logic, arrays, and event handlers.",
        webUrl: "https://javascript.info/",
        webPlatform: "JavaScript.info",
        ytUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        ytPlatform: "JavaScript Full Course"
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
      "mobile development": {
        synonyms: ["mobile app", "app store", "play store"],
        guide: "App lifecycle, splash screens, responsive mobile layouts, and permissions.",
        webUrl: "https://reactnative.dev/",
        webPlatform: "React Native Portal",
        ytUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
        ytPlatform: "Mobile Dev Masterclass"
      },
      "android": {
        synonyms: ["android studio", "gradle", "apk"],
        guide: "Android Studio emulator configuration, Gradle builds, and Android Manifest.",
        webUrl: "https://developer.android.com/",
        webPlatform: "Android Developers",
        ytUrl: "https://www.youtube.com/watch?v=fis26HvvDII",
        ytPlatform: "Android Studio Crash Course"
      },
      "ios": {
        synonyms: ["xcode", "cocoapods", "ipa"],
        guide: "Xcode workspace setup, CocoaPods installation, and iOS simulator tests.",
        webUrl: "https://developer.apple.com/ios/",
        webPlatform: "Apple Developer",
        ytUrl: "https://www.youtube.com/watch?v=09TeUXjzpKs",
        ytPlatform: "Xcode for iOS Beginners"
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
      "rest api": { synonyms: ["http", "dio"], guide: "HTTP requests, JSON serialization, and API caching in Flutter.", webUrl: "https://docs.flutter.dev/cookbook/networking/fetch-data", webPlatform: "Flutter Docs", ytUrl: "https://www.youtube.com/watch?v=t6cx_v45w68", ytPlatform: "Flutter API Guide" },
      "mobile development": { synonyms: ["mobile app"], guide: "Cross-platform mobile UX design principles.", webUrl: "https://flutter.dev/", webPlatform: "Flutter.dev", ytUrl: "https://www.youtube.com/watch?v=VPvVD8t02U8", ytPlatform: "Mobile Development Course" },
      "git": { synonyms: ["github"], guide: "Mobile app repository management.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  android_native: {
    category: "Mobile Engineering",
    title: "Android Native Developer",
    searchTags: ["android", "app dev", "mobile", "kotlin", "java android", "play store", "apk"],
    skills: {
      "kotlin": { synonyms: ["coroutines", "android kotlin"], guide: "Modern Android language, coroutines, and null-safety.", webUrl: "https://kotlinlang.org/docs/home.html", webPlatform: "Kotlin Official", ytUrl: "https://www.youtube.com/watch?v=F9UC9DY-vIU", ytPlatform: "Kotlin Full Course" },
      "java": { synonyms: ["core java"], guide: "Object-oriented design patterns, collections, and multi-threading in Java.", webUrl: "https://dev.java/", webPlatform: "Java Portal", ytUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34", ytPlatform: "Java Programming Masterclass" },
      "android sdk": { synonyms: ["android runtime", "activities"], guide: "Android lifecycle, services, broadcast receivers, and fragments.", webUrl: "https://developer.android.com/guide", webPlatform: "Android Guide", ytUrl: "https://www.youtube.com/watch?v=fis26HvvDII", ytPlatform: "Android SDK Guide" },
      "jetpack compose": { synonyms: ["compose", "declarative ui"], guide: "Declarative modern Android UI development.", webUrl: "https://developer.android.com/courses/pathways/compose", webPlatform: "Android Pathway", ytUrl: "https://www.youtube.com/watch?v=6_wKVoZ__uE", ytPlatform: "Jetpack Compose Course" },
      "rest api": { synonyms: ["retrofit", "okhttp"], guide: "Connecting Android apps to backend REST endpoints.", webUrl: "https://square.github.io/retrofit/", webPlatform: "Retrofit Docs", ytUrl: "https://www.youtube.com/watch?v=t6cx_v45w68", ytPlatform: "Retrofit API Guide" },
      "gradle": { synonyms: ["build.gradle", "dependencies"], guide: "Gradle build automation, flavors, and obfuscation with ProGuard.", webUrl: "https://docs.gradle.org/", webPlatform: "Gradle Docs", ytUrl: "https://www.youtube.com/watch?v=-gCqV7_kR7A", ytPlatform: "Gradle Tutorial" },
      "git": { synonyms: ["github"], guide: "Mobile repo versioning and release workflows.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  ios_native: {
    category: "Mobile Engineering",
    title: "iOS Native Developer",
    searchTags: ["ios", "apple", "swift", "swiftui", "iphone app", "xcode", "mobile dev"],
    skills: {
      "swift": { synonyms: ["swiftui", "ios sdk"], guide: "Native iOS programming with Swift syntax.", webUrl: "https://www.swift.org/documentation/", webPlatform: "Swift.org", ytUrl: "https://www.youtube.com/watch?v=comQ1-x2a1Q", ytPlatform: "Swift Full Course" },
      "swiftui": { synonyms: ["declarative ios", "views"], guide: "Building responsive Apple device view controllers.", webUrl: "https://developer.apple.com/tutorials/swiftui", webPlatform: "Apple SwiftUI", ytUrl: "https://www.youtube.com/watch?v=F2ojC6TNwws", ytPlatform: "SwiftUI Masterclass" },
      "uikit": { synonyms: ["storyboards", "viewcontrollers"], guide: "Imperative iOS UI views, AutoLayout constraints, and table views.", webUrl: "https://developer.apple.com/documentation/uikit", webPlatform: "UIKit Docs", ytUrl: "https://www.youtube.com/watch?v=comQ1-x2a1Q", ytPlatform: "UIKit Tutorial" },
      "xcode": { synonyms: ["instruments", "spm"], guide: "iOS IDE, build configurations, memory leak testing, and iOS simulators.", webUrl: "https://developer.apple.com/xcode/", webPlatform: "Apple Developer", ytUrl: "https://www.youtube.com/watch?v=09TeUXjzpKs", ytPlatform: "Xcode for Beginners" },
      "cocoapods": { synonyms: ["spm", "swift package manager"], guide: "iOS dependency package managers.", webUrl: "https://cocoapods.org/", webPlatform: "CocoaPods Docs", ytUrl: "https://www.youtube.com/watch?v=09TeUXjzpKs", ytPlatform: "iOS Dependencies" },
      "rest api": { synonyms: ["urlsession"], guide: "Async/await URLSession network fetching in iOS.", webUrl: "https://developer.apple.com/documentation/foundation/urlsession", webPlatform: "Apple URLSession", ytUrl: "https://www.youtube.com/watch?v=comQ1-x2a1Q", ytPlatform: "iOS Networking" },
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
      "power bi": { synonyms: ["powerbi", "dax", "power query"], guide: "Executive dashboards, DAX queries, and visual reporting.", webUrl: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", webPlatform: "Microsoft Learn", ytUrl: "https://www.youtube.com/watch?v=3u7MQz1EyPY", ytPlatform: "Power BI Complete Masterclass" },
      "tableau": { synonyms: ["tableau desktop", "workbooks"], guide: "Enterprise data visualization workbooks and calculated fields.", webUrl: "https://help.tableau.com/", webPlatform: "Tableau Help", ytUrl: "https://www.youtube.com/watch?v=aHaOIvR00So", ytPlatform: "Tableau Course" },
      "excel": { synonyms: ["pivot tables", "vlookup", "xlookup"], guide: "Advanced Excel spreadsheet formulas.", webUrl: "https://support.microsoft.com/excel", webPlatform: "Excel Support", ytUrl: "https://www.youtube.com/watch?v=Vl0H-qTclOg", ytPlatform: "Excel for Analysts" },
      "pandas": { synonyms: ["numpy", "dataframes"], guide: "Tabular data cleaning and transformation in Python.", webUrl: "https://pandas.pydata.org/docs/", webPlatform: "Pandas Docs", ytUrl: "https://www.youtube.com/watch?v=vmEHCJofslg", ytPlatform: "Pandas Tutorial" },
      "python": { synonyms: ["pandas", "numpy"], guide: "Data cleaning and scripting in Python.", webUrl: "https://pandas.pydata.org/", webPlatform: "Pandas Docs", ytUrl: "https://www.youtube.com/watch?v=vmEHCJofslg", ytPlatform: "Pandas Full Tutorial" },
      "statistics": { synonyms: ["probability", "hypothesis testing"], guide: "Applied statistical modeling and p-values.", webUrl: "https://www.khanacademy.org/math/statistics-probability", webPlatform: "Khan Academy", ytUrl: "https://www.youtube.com/watch?v=xxpc-HPKN28", ytPlatform: "Statistics Fundamentals" },
      "data visualization": { synonyms: ["matplotlib", "seaborn"], guide: "Communicating business metrics through visual charting.", webUrl: "https://seaborn.pydata.org/", webPlatform: "Seaborn Docs", ytUrl: "https://www.youtube.com/watch?v=6GUZXDef2U0", ytPlatform: "Data Visualization Masterclass" }
    }
  },

  ai_ml: {
    category: "Data & Artificial Intelligence",
    title: "Machine Learning & NLP Engineer",
    searchTags: ["ml", "machine learning", "ai", "artificial intelligence", "deep learning", "nlp", "data scientist", "ds"],
    skills: {
      "python": { synonyms: ["py"], guide: "Core scientific programming.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python for ML" },
      "machine learning": { synonyms: ["supervised", "unsupervised"], guide: "Supervised and unsupervised statistical machine learning workflows.", webUrl: "https://developers.google.com/machine-learning/crash-course", webPlatform: "Google ML Course", ytUrl: "https://www.youtube.com/watch?v=i_LwzRVP7bg", ytPlatform: "ML Full Course" },
      "deep learning": { synonyms: ["neural networks", "backpropagation"], guide: "Deep neural network architectures and gradient descent.", webUrl: "https://www.deeplearningbook.org/", webPlatform: "Deep Learning Textbook", ytUrl: "https://www.youtube.com/watch?v=6M5VXKLf4D4", ytPlatform: "Deep Learning Crash Course" },
      "scikit-learn": { synonyms: ["sklearn", "regression"], guide: "Supervised and unsupervised ML models.", webUrl: "https://scikit-learn.org/", webPlatform: "Scikit-Learn Docs", ytUrl: "https://www.youtube.com/watch?v=0B5eIE_1vpU", ytPlatform: "Scikit-Learn ML Course" },
      "pytorch": { synonyms: ["torch", "neural networks"], guide: "Deep neural network architectures.", webUrl: "https://pytorch.org/tutorials/", webPlatform: "PyTorch Official", ytUrl: "https://www.youtube.com/watch?v=V_xro1bcAuA", ytPlatform: "PyTorch Course" },
      "tensorflow": { synonyms: ["keras", "tf"], guide: "Production machine learning pipelines and graph execution.", webUrl: "https://www.tensorflow.org/tutorials", webPlatform: "TensorFlow Docs", ytUrl: "https://www.youtube.com/watch?v=tPYj3fFJGjk", ytPlatform: "TensorFlow 2.0 Course" },
      "nlp": { synonyms: ["transformers", "huggingface", "bert", "llm"], guide: "Language models, tokenization, and LLMs.", webUrl: "https://huggingface.co/learn/nlp-course/", webPlatform: "Hugging Face", ytUrl: "https://www.youtube.com/watch?v=CMrHM8a3hqw", ytPlatform: "NLP & Transformers" },
      "pandas": { synonyms: ["numpy"], guide: "Feature engineering and data manipulation.", webUrl: "https://pandas.pydata.org/", webPlatform: "Pandas", ytUrl: "https://www.youtube.com/watch?v=vmEHCJofslg", ytPlatform: "Pandas Tutorial" },
      "numpy": { synonyms: ["matrices", "linear algebra"], guide: "Vectorized array calculations and matrix operations.", webUrl: "https://numpy.org/doc/", webPlatform: "NumPy Docs", ytUrl: "https://www.youtube.com/watch?v=QUT1VHiLmmI", ytPlatform: "NumPy Course" }
    }
  },

  gen_ai: {
    category: "Data & Artificial Intelligence",
    title: "Generative AI & LLM Applications Engineer",
    searchTags: ["genai", "gen ai", "llm", "rag", "langchain", "prompt engineering", "chatgpt", "openai", "agentic"],
    skills: {
      "langchain": { synonyms: ["llamaindex", "rag", "vector database"], guide: "Retrieval-Augmented Generation (RAG) pipelines.", webUrl: "https://python.langchain.com/docs/introduction/", webPlatform: "LangChain Official", ytUrl: "https://www.youtube.com/watch?v=aywZrzNaKjs", ytPlatform: "LangChain & RAG Course" },
      "llamaindex": { synonyms: ["data connectors"], guide: "Connecting private knowledge stores directly into LLM agent workflows.", webUrl: "https://www.llamaindex.ai/", webPlatform: "LlamaIndex Docs", ytUrl: "https://www.youtube.com/watch?v=64nZ4pZ5x8k", ytPlatform: "LlamaIndex Course" },
      "prompt engineering": { synonyms: ["system prompts", "few-shot"], guide: "Optimizing structured LLM outputs.", webUrl: "https://www.promptingguide.ai/", webPlatform: "Prompting Guide", ytUrl: "https://www.youtube.com/watch?v=_ZvnD93Ix5I", ytPlatform: "Prompt Engineering Course" },
      "rag": { synonyms: ["retrieval augmented generation", "embeddings"], guide: "Vector chunking, cosine distance retrieval, and synthesis.", webUrl: "https://www.pinecone.io/learn/retrieval-augmented-generation/", webPlatform: "Pinecone Learn", ytUrl: "https://www.youtube.com/watch?v=tcqEUSNCn8I", ytPlatform: "RAG Deep Dive" },
      "vector databases": { synonyms: ["pinecone", "chromadb", "weaviate"], guide: "Storing and querying semantic vector embeddings.", webUrl: "https://docs.trychroma.com/", webPlatform: "Chroma Docs", ytUrl: "https://www.youtube.com/watch?v=klTvEwg3oJ4", ytPlatform: "Vector Database Guide" },
      "openai": { synonyms: ["gpt-4", "function calling"], guide: "OpenAI API endpoints, structured JSON mode, and function calling.", webUrl: "https://platform.openai.com/docs", webPlatform: "OpenAI Docs", ytUrl: "https://www.youtube.com/watch?v=U8f_v4h4hW0", ytPlatform: "OpenAI API Tutorial" },
      "pytorch": { synonyms: ["torch"], guide: "Fine-tuning base models using LoRA and QLoRA techniques.", webUrl: "https://pytorch.org/", webPlatform: "PyTorch Official", ytUrl: "https://www.youtube.com/watch?v=V_xro1bcAuA", ytPlatform: "PyTorch Course" },
      "python": { synonyms: ["py"], guide: "Async LLM application development.", webUrl: "https://www.python.org/", webPlatform: "Python.org", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python Guide" }
    }
  },

  data_engineer: {
    category: "Data & Artificial Intelligence",
    title: "Data Engineer (Big Data & ETL)",
    searchTags: ["data engineer", "de", "big data", "etl", "spark", "hadoop", "kafka", "pipeline"],
    skills: {
      "sql": { synonyms: ["data warehousing", "snowflake"], guide: "Warehouse architecture and analytical queries.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode Analytics", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "SQL for Data Engineering" },
      "python": { synonyms: ["pyspark"], guide: "ETL pipeline development and data cleaning scripts.", webUrl: "https://www.python.org/", webPlatform: "Python Docs", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python ETL Guide" },
      "apache spark": { synonyms: ["pyspark", "hadoop", "big data"], guide: "Distributed data compute with Apache Spark.", webUrl: "https://spark.apache.org/docs/latest/", webPlatform: "Apache Spark", ytUrl: "https://www.youtube.com/watch?v=_C8kWso4ne4", ytPlatform: "PySpark Tutorial" },
      "hadoop": { synonyms: ["hdfs", "mapreduce"], guide: "Distributed file system storage and map-reduce processing.", webUrl: "https://hadoop.apache.org/", webPlatform: "Apache Hadoop", ytUrl: "https://www.youtube.com/watch?v=aReuLtY0YMI", ytPlatform: "Hadoop Course" },
      "airflow": { synonyms: ["etl pipelines", "orchestration"], guide: "Workflow orchestration and DAG schedules.", webUrl: "https://airflow.apache.org/docs/", webPlatform: "Apache Airflow", ytUrl: "https://www.youtube.com/watch?v=K9AnJ9_ZAXE", ytPlatform: "Apache Airflow Course" },
      "kafka": { synonyms: ["streaming data", "event bus"], guide: "Real-time streaming event pipelines.", webUrl: "https://kafka.apache.org/documentation/", webPlatform: "Apache Kafka", ytUrl: "https://www.youtube.com/watch?v=R873BlBMUB4", ytPlatform: "Kafka Fundamentals" },
      "postgresql": { synonyms: ["postgres"], guide: "Relational database staging and query optimization.", webUrl: "https://www.postgresqltutorial.com/", webPlatform: "PostgreSQL", ytUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4", ytPlatform: "Postgres Tutorial" },
      "docker": { synonyms: ["containers"], guide: "Containerizing data pipelines for automated deployments.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Guide" },
      "aws": { synonyms: ["s3", "redshift", "glue"], guide: "Cloud data lake architectures on AWS S3 and Redshift.", webUrl: "https://aws.amazon.com/big-data/", webPlatform: "AWS Big Data", ytUrl: "https://www.youtube.com/watch?v=SOTamWNgDKc", ytPlatform: "AWS Data Engineering" }
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
      "bash": { synonyms: ["shell scripting"], guide: "Linux shell scripting and cron task automation.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=sWbGOq-JrIQ", ytPlatform: "Bash Scripting Guide" },
      "jenkins": { synonyms: ["build server"], guide: "Enterprise CI/CD automation pipelines and master-slave nodes.", webUrl: "https://www.jenkins.io/doc/", webPlatform: "Jenkins Docs", ytUrl: "https://www.youtube.com/watch?v=6YZvp2GwT0A", ytPlatform: "Jenkins Tutorial" },
      "git": { synonyms: ["github"], guide: "GitOps workflows.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" }
    }
  },

  sre: {
    category: "Cloud & Security",
    title: "Site Reliability Engineer (SRE)",
    searchTags: ["sre", "site reliability", "monitoring", "grafana", "prometheus", "reliability", "infrastructure"],
    skills: {
      "linux": { synonyms: ["bash", "shell"], guide: "High-performance OS tuning and debugging.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=sWbGOq-JrIQ", ytPlatform: "Linux Masterclass" },
      "python": { synonyms: ["automation scripts"], guide: "Systems automation and reliability scripting.", webUrl: "https://www.python.org/", webPlatform: "Python Docs", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python for SRE" },
      "kubernetes": { synonyms: ["k8s"], guide: "Production cluster fault tolerance.", webUrl: "https://kubernetes.io/", webPlatform: "Kubernetes", ytUrl: "https://www.youtube.com/watch?v=X48VuDVv0do", ytPlatform: "K8s SRE Architecture" },
      "prometheus": { synonyms: ["grafana", "monitoring", "metrics"], guide: "Metrics observability, alerts, and SLOs.", webUrl: "https://prometheus.io/docs/introduction/overview/", webPlatform: "Prometheus Docs", ytUrl: "https://www.youtube.com/watch?v=9TJx7QTrTyo", ytPlatform: "Prometheus & Grafana" },
      "grafana": { synonyms: ["dashboards", "alerting"], guide: "Real-time metrics visual boards and incident alerting.", webUrl: "https://grafana.com/docs/", webPlatform: "Grafana Docs", ytUrl: "https://www.youtube.com/watch?v=9TJx7QTrTyo", ytPlatform: "Grafana Dashboards" },
      "docker": { synonyms: ["containers"], guide: "Containerized workload troubleshooting.", webUrl: "https://docs.docker.com/", webPlatform: "Docker Docs", ytUrl: "https://www.youtube.com/watch?v=fqMOX6JJhGo", ytPlatform: "Docker Guide" },
      "ci/cd": { synonyms: ["canary", "blue green"], guide: "Zero-downtime deployment strategies.", webUrl: "https://docs.github.com/en/actions", webPlatform: "GitHub Actions", ytUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", ytPlatform: "CI/CD Deployment" },
      "networking": { synonyms: ["tcp/ip", "dns", "load balancers"], guide: "OSI model, latency analysis, and reverse proxy routing.", webUrl: "https://www.professormesser.com/", webPlatform: "Professor Messer", ytUrl: "https://www.youtube.com/watch?v=IPvYjXCsTg8", ytPlatform: "Networking Fundamentals" }
    }
  },

  cybersecurity: {
    category: "Cloud & Security",
    title: "Cyber Security & SOC Analyst",
    searchTags: ["cyber security", "soc", "security analyst", "infosec", "splunk", "siem", "ethical hacking", "hacker"],
    skills: {
      "network security": { synonyms: ["tcp/ip", "wireshark", "dns"], guide: "Network packet inspection and routing.", webUrl: "https://www.professormesser.com/", webPlatform: "Professor Messer", ytUrl: "https://www.youtube.com/watch?v=IPvYjXCsTg8", ytPlatform: "CompTIA Network+ Course" },
      "linux": { synonyms: ["kali linux", "bash"], guide: "Security auditing and log inspection.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=lZAoFs75_cs", ytPlatform: "Kali Linux Ethical Hacking" },
      "python": { synonyms: ["socket programming"], guide: "Security scripting, port scanners, and automation.", webUrl: "https://www.python.org/", webPlatform: "Python", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python for Hackers" },
      "wireshark": { synonyms: ["packet analysis", "pcap"], guide: "Deep packet analysis and protocol dissection.", webUrl: "https://www.wireshark.org/docs/", webPlatform: "Wireshark Docs", ytUrl: "https://www.youtube.com/watch?v=IPvYjXCsTg8", ytPlatform: "Wireshark Tutorial" },
      "penetration testing": { synonyms: ["owasp", "nmap", "burpsuite"], guide: "Vulnerability scanning and OWASP Top 10.", webUrl: "https://owasp.org/", webPlatform: "OWASP Foundation", ytUrl: "https://www.youtube.com/watch?v=2_lwwZg80lY", ytPlatform: "OWASP Top 10 Web" },
      "siem": { synonyms: ["splunk", "qradar", "log analysis"], guide: "Intrusion detection and alert triaging.", webUrl: "https://www.splunk.com/en_us/training/free-courses/overview.html", webPlatform: "Splunk Free", ytUrl: "https://www.youtube.com/watch?v=q6r5g5ZpW5Y", ytPlatform: "Splunk SOC Guide" },
      "ethical hacking": { synonyms: ["reconnaissance", "metasploit"], guide: "Certified Ethical Hacker methodology and defense.", webUrl: "https://www.owasp.org", webPlatform: "OWASP", ytUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", ytPlatform: "Ethical Hacking Course" },
      "cryptography": { synonyms: ["ssl", "tls", "encryption"], guide: "Encryption protocols and digital certificates.", webUrl: "https://www.khanacademy.org/computing/computer-science/cryptography", webPlatform: "Khan Academy", ytUrl: "https://www.youtube.com/watch?v=jhXCTbFnK8o", ytPlatform: "Cryptography Basics" }
    }
  },

  vapt: {
    category: "Cloud & Security",
    title: "Penetration Tester & Ethical Hacker (VAPT)",
    searchTags: ["vapt", "penetration testing", "ethical hacker", "burp suite", "bug bounty", "metasploit"],
    skills: {
      "penetration testing": { synonyms: ["vulnerability assessment"], guide: "Vulnerability discovery and proof-of-concept exploits.", webUrl: "https://owasp.org/", webPlatform: "OWASP", ytUrl: "https://www.youtube.com/watch?v=2_lwwZg80lY", ytPlatform: "Penetration Testing Guide" },
      "burp suite": { synonyms: ["burp proxy", "web security"], guide: "Intercepting HTTP traffic and web application testing.", webUrl: "https://portswigger.net/web-security", webPlatform: "PortSwigger Web Security", ytUrl: "https://www.youtube.com/watch?v=h2gXZ_8_3k0", ytPlatform: "Burp Suite Masterclass" },
      "metasploit": { synonyms: ["exploit framework"], guide: "Exploit execution and post-exploitation modules.", webUrl: "https://docs.metasploit.com/", webPlatform: "Metasploit Docs", ytUrl: "https://www.youtube.com/watch?v=8lR27r84vYg", ytPlatform: "Metasploit Crash Course" },
      "nmap": { synonyms: ["port scan", "zenmap"], guide: "Network discovery and vulnerability scanning.", webUrl: "https://nmap.org/book/man.html", webPlatform: "Nmap Book", ytUrl: "https://www.youtube.com/watch?v=4t4kBkMsDbQ", ytPlatform: "Nmap Course" },
      "owasp": { synonyms: ["owasp top 10", "xss", "sql injection"], guide: "Identifying and mitigating the top 10 web application vulnerabilities.", webUrl: "https://owasp.org/www-project-top-ten/", webPlatform: "OWASP Top Ten", ytUrl: "https://www.youtube.com/watch?v=2_lwwZg80lY", ytPlatform: "OWASP Course" },
      "linux": { synonyms: ["kali"], guide: "Kali Linux penetration testing tool suite.", webUrl: "https://linuxjourney.com/", webPlatform: "Linux Journey", ytUrl: "https://www.youtube.com/watch?v=lZAoFs75_cs", ytPlatform: "Kali Linux Course" },
      "python": { synonyms: ["exploit dev"], guide: "Writing custom exploit scripts in Python.", webUrl: "https://www.python.org/", webPlatform: "Python", ytUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", ytPlatform: "Python for Hackers" },
      "wireshark": { synonyms: ["packet capture"], guide: "Analyzing network capture PCAPs for cleartext credentials.", webUrl: "https://www.wireshark.org/docs/", webPlatform: "Wireshark", ytUrl: "https://www.youtube.com/watch?v=IPvYjXCsTg8", ytPlatform: "Wireshark Guide" }
    }
  },

  sdet: {
    category: "Software Engineering",
    title: "QA Automation Engineer (SDET)",
    searchTags: ["sdet", "qa", "qa automation", "selenium", "cypress", "playwright", "tester"],
    skills: {
      "selenium": { synonyms: ["webdriver", "selenium grid"], guide: "Automating browser actions across Chrome, Firefox, and Safari.", webUrl: "https://www.selenium.dev/documentation/", webPlatform: "Selenium Docs", ytUrl: "https://www.youtube.com/watch?v=FRn5J31eGoY", ytPlatform: "Selenium Full Course" },
      "cypress": { synonyms: ["e2e testing"], guide: "Modern JavaScript end-to-end testing for web applications.", webUrl: "https://docs.cypress.io/", webPlatform: "Cypress Docs", ytUrl: "https://www.youtube.com/watch?v=BvomPhkbdt8", ytPlatform: "Cypress Tutorial" },
      "playwright": { synonyms: ["cross browser test"], guide: "High-speed multi-browser end-to-end automation.", webUrl: "https://playwright.dev/", webPlatform: "Playwright Docs", ytUrl: "https://www.youtube.com/watch?v=3kJ74k_N5a4", ytPlatform: "Playwright Course" },
      "java": { synonyms: ["junit", "testng"], guide: "Core Java test automation frameworks.", webUrl: "https://dev.java/", webPlatform: "Java Portal", ytUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34", ytPlatform: "Java Course" },
      "python": { synonyms: ["pytest"], guide: "Automated API and UI test suites using pytest.", webUrl: "https://docs.pytest.org/", webPlatform: "PyTest Docs", ytUrl: "https://www.youtube.com/watch?v=byaxg00Gf9I", ytPlatform: "Pytest Crash Course" },
      "junit": { synonyms: ["test framework"], guide: "Unit testing, assertions, and test suites.", webUrl: "https://junit.org/junit5/docs/current/user-guide/", webPlatform: "JUnit 5 Docs", ytUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34", ytPlatform: "JUnit Tutorial" },
      "test automation": { synonyms: ["regression", "test plans"], guide: "Designing robust automated test suites.", webUrl: "https://testautomationu.applitools.com/", webPlatform: "Test Automation University", ytUrl: "https://www.youtube.com/watch?v=3kJ74k_N5a4", ytPlatform: "Automation Principles" },
      "git": { synonyms: ["github"], guide: "Test repository management.", webUrl: "https://git-scm.com/", webPlatform: "Git Docs", ytUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk", ytPlatform: "Git Guide" },
      "ci/cd": { synonyms: ["jenkins", "github actions"], guide: "Executing automated tests inside continuous integration pipelines.", webUrl: "https://docs.github.com/en/actions", webPlatform: "GitHub Actions", ytUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI", ytPlatform: "CI/CD Testing" }
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
      "design systems": { synonyms: ["typography", "color theory", "spacing"], guide: "Design tokens and WCAG accessible UI.", webUrl: "https://material.io/design", webPlatform: "Google Material Design", ytUrl: "https://www.youtube.com/watch?v=1dM4qM0I1_E", ytPlatform: "Design Systems Course" },
      "prototyping": { synonyms: ["interactive prototypes"], guide: "Clickable wireframes and micro-interactions.", webUrl: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma", webPlatform: "Figma Docs", ytUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", ytPlatform: "Prototyping Video" },
      "usability testing": { synonyms: ["friction logs"], guide: "Conducting moderated usability tests to discover user friction.", webUrl: "https://www.usability.gov/", webPlatform: "Usability.gov", ytUrl: "https://www.youtube.com/watch?v=bAARmsv_o18", ytPlatform: "Testing Video" },
      "adobe xd": { synonyms: ["xd"], guide: "Vector-based UX UI tool for web and mobile apps.", webUrl: "https://helpx.adobe.com/xd/user-guide.html", webPlatform: "Adobe XD", ytUrl: "https://www.youtube.com/watch?v=68w2VwalD5w", ytPlatform: "Adobe XD Course" }
    }
  },

  product_manager: {
    category: "Product & Design",
    title: "Product Manager (PM / APM)",
    searchTags: ["pm", "apm", "product manager", "product management", "scrum", "agile", "prd", "roadmap"],
    skills: {
      "product strategy": { synonyms: ["prd", "roadmapping", "okrs", "kpis"], guide: "Writing PRDs, feature prioritization, and roadmaps.", webUrl: "https://www.mindtheproduct.com/", webPlatform: "Mind The Product", ytUrl: "https://www.youtube.com/watch?v=uKfxVfG1_bA", ytPlatform: "Product Management 101" },
      "wireframing": { synonyms: ["low-fi"], guide: "Communicating product vision with low-fidelity wireframes.", webUrl: "https://www.nngroup.com/articles/wireframing-101/", webPlatform: "NN/g", ytUrl: "https://www.youtube.com/watch?v=qpH_76m_3q8", ytPlatform: "Wireframing Guide" },
      "agile": { synonyms: ["scrum", "sprints", "jira", "kanban"], guide: "Agile rituals, sprint planning, and backlog grooming.", webUrl: "https://www.atlassian.com/agile", webPlatform: "Atlassian Agile", ytUrl: "https://www.youtube.com/watch?v=9TycLR0TqFA", ytPlatform: "Scrum & Agile Guide" },
      "scrum": { synonyms: ["standups", "sprints"], guide: "Scrum ceremonies, sprint retrospectives, and velocity tracking.", webUrl: "https://www.scrum.org/", webPlatform: "Scrum.org", ytUrl: "https://www.youtube.com/watch?v=9TycLR0TqFA", ytPlatform: "Scrum Masterclass" },
      "data analytics": { synonyms: ["sql", "metrics", "a/b testing"], guide: "User retention curves, churn, and A/B testing.", webUrl: "https://mode.com/sql-tutorial/", webPlatform: "Mode SQL", ytUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA", ytPlatform: "Analytics for PMs" },
      "user research": { synonyms: ["user feedback"], guide: "Customer interviews, satisfaction metrics (NPS), and surveys.", webUrl: "https://www.interaction-design.org/", webPlatform: "IxDF", ytUrl: "https://www.youtube.com/watch?v=bAARmsv_o18", ytPlatform: "User Research" },
      "jira": { synonyms: ["confluence", "ticketing"], guide: "Epics, stories, acceptance criteria, and burndown charts.", webUrl: "https://www.atlassian.com/software/jira/guides", webPlatform: "Atlassian Jira", ytUrl: "https://www.youtube.com/watch?v=9TycLR0TqFA", ytPlatform: "Jira for Beginners" },
      "roadmap planning": { synonyms: ["quarterly planning"], guide: "Aligning cross-functional teams with milestone roadmaps.", webUrl: "https://www.productplan.com/learn/", webPlatform: "ProductPlan", ytUrl: "https://www.youtube.com/watch?v=uKfxVfG1_bA", ytPlatform: "Roadmapping Guide" }
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
      "google analytics": { synonyms: ["ga4", "search console"], guide: "Crawlability, indexing, and traffic conversion funnels.", webUrl: "https://analytics.google.com/analytics/academy/", webPlatform: "Google Analytics", ytUrl: "https://www.youtube.com/watch?v=H7bX_0u0X7E", ytPlatform: "Google Analytics Guide" },
      "keyword research": { synonyms: ["search volume", "ahrefs"], guide: "Identifying high-intent, low-difficulty search queries.", webUrl: "https://ahrefs.com/blog/keyword-research/", webPlatform: "Ahrefs Blog", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "Keyword Strategy" },
      "content strategy": { synonyms: ["content marketing"], guide: "Structuring pillar pages and cluster topics for search authority.", webUrl: "https://moz.com/beginners-guide-to-content-marketing", webPlatform: "Moz Guide", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "Content Strategy" },
      "on-page seo": { synonyms: ["meta tags", "h1", "alt text"], guide: "Title tags, meta descriptions, semantic headings, and internal linking.", webUrl: "https://moz.com/learn/seo/on-page-factors", webPlatform: "Moz On-Page", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "On-Page SEO" },
      "technical seo": { synonyms: ["sitemaps", "robots.txt", "core web vitals"], guide: "XML sitemaps, robots.txt, canonicalization, and Core Web Vitals.", webUrl: "https://developers.google.com/search/docs", webPlatform: "Google Search Central", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "Technical SEO" },
      "link building": { synonyms: ["backlinks", "outreach"], guide: "High-domain authority backlink acquisition strategies.", webUrl: "https://ahrefs.com/blog/link-building/", webPlatform: "Ahrefs", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "Backlink Outreach" },
      "semrush": { synonyms: ["competitor analysis"], guide: "Auditing domain backlinks, keywords, and competitor gaps.", webUrl: "https://www.semrush.com/academy/", webPlatform: "SEMrush Academy", ytUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ", ytPlatform: "SEMrush Guide" }
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
  },
  "langchain": {
    q: "What is the primary role of a Vector Store in a LangChain RAG pipeline?",
    options: ["Compile Python code", "Store and perform cosine similarity search on document embeddings", "Host web servers", "Render user interface"],
    correct: 1,
    explanation: "Vector stores (like Pinecone/Chroma) index high-dimensional embeddings to retrieve semantically relevant context for LLMs."
  },
  "python": {
    q: "In Python, which built-in data type is mutable and maintains insertion order (Python 3.7+)?",
    options: ["tuple", "dict", "frozenset", "int"],
    correct: 1,
    explanation: "In Python 3.7+, dictionaries maintain insertion order while being fully mutable key-value stores."
  }
};