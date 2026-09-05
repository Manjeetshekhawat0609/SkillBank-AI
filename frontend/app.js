/* ==========================================================================
   SkillBank AI Enterprise
   Universal Client Controller & Evaluation Engine
   Production-ready Vercel → Render frontend integration
   ========================================================================== */

/* --------------------------------------------------------------------------
   PDF.js Worker
   -------------------------------------------------------------------------- */

if (typeof pdfjsLib !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

/* --------------------------------------------------------------------------
   Production Backend Configuration
   -------------------------------------------------------------------------- */

/*
   FIX: This was previously "https://skillgapapp-backend.onrender.com",
   a URL that does not exist (confirmed 404 from Render itself). The
   actual deployed Render service is "skillbank-ai". Using the wrong
   URL caused every request to fail with 404 + a CORS error (browsers
   report a missing-CORS-header error whenever a request fails before
   getting a real response, which is exactly what a 404-from-Render,
   not-from-your-app looks like).
*/

const BACKEND_URL = "https://skillbank-ai.onrender.com";

const EVALUATE_ENDPOINT = `${BACKEND_URL}/api/evaluate`;

const HEALTH_ENDPOINT = `${BACKEND_URL}/health`;

/*
   IMPORTANT:
   Do NOT use localhost in production.

   Vercel frontend must communicate directly with the Render backend.
   Therefore your laptop can be completely OFF and the website can still work.
*/

/* --------------------------------------------------------------------------
   State Variables
   -------------------------------------------------------------------------- */

let computedScore = 0;

let activeRoleTitle = "Frontend Web Engineer";

let activeCertHash = "SKB-2026-X8839-IN";

let activeTimestamp = "";

let radarChartInstance = null;


/* --------------------------------------------------------------------------
   Safe Lucide Icon Renderer
   -------------------------------------------------------------------------- */

function safeCreateIcons() {
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    try {
      lucide.createIcons();
    } catch (error) {
      console.warn("Lucide icon generation skipped:", error);
    }
  }
}


/* --------------------------------------------------------------------------
   Application Initialization
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  updateInstitutionData();

  safeCreateIcons();

  const form = document.getElementById("evaluationForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      runAnalysis();
    });
  }

  /*
     FIX (issue 2 & 3 — "server not awake" / slow first load):

     Render's free tier puts the backend to sleep after ~15 minutes
     of no traffic. The very first request after that has to wait
     for the server to "wake up" (cold start), which is the 10-20
     second delay being seen.

     We can't force Render to never sleep from client-side code, but
     we CAN start waking it up the instant the page loads instead of
     waiting until the user clicks "Evaluate". By the time someone
     fills in their name, university, role and picks a resume file
     (usually 15-30+ seconds), the backend has often already finished
     waking up in the background — so the actual Evaluate click feels
     instant instead of timing out.

     This is a silent, fire-and-forget ping — failures are ignored,
     since the real evaluate request has its own retry logic anyway.
  */
  fetch(HEALTH_ENDPOINT, { method: "GET" }).catch(() => {
    /* Ignore — this is just a background warm-up ping. */
  });
});


/* ==========================================================================
   1. VIEW CONTROLLER
   Student vs Institutional / B2G
   ========================================================================== */

function switchView(view) {
  const studentView = document.getElementById("studentViewContainer");
  const hodView = document.getElementById("hodViewContainer");

  const btnStudent = document.getElementById("btnStudentView");
  const btnHod = document.getElementById("btnHodView");

  if (!studentView || !hodView) {
    return;
  }

  if (view === "student") {
    studentView.classList.remove("hidden");
    hodView.classList.add("hidden");

    if (btnStudent) {
      btnStudent.className =
        "px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold transition flex items-center gap-1.5";
    }

    if (btnHod) {
      btnHod.className =
        "px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
    }
  } else {
    studentView.classList.add("hidden");
    hodView.classList.remove("hidden");

    if (btnHod) {
      btnHod.className =
        "px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold transition flex items-center gap-1.5";
    }

    if (btnStudent) {
      btnStudent.className =
        "px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
    }
  }

  safeCreateIcons();
}


/* ==========================================================================
   2. INSTITUTIONAL ANALYTICS DATASET
   ========================================================================== */

const INSTITUTION_REGISTRY = {
  poornima: {
    heading:
      "Poornima University, Jaipur • Department of Computer Science & AI",

    sub:
      "Continuous Internal Evaluation (CIE) & Placement Readiness Matrix",

    avgMatch: "68.4%",

    avgDiff: "↑ 12% vs CIE-I Benchmark",

    topGap: "Docker / Cloud",

    gapPercent: "71% Students Missing",

    strongDomain: "Frontend / React",

    strongPercent: "84% Students Certified",

    certs: "192",

    recommendations: [
      "Schedule a 3-Day hands-on bootcamp on <strong>Docker & CI/CD Pipelines</strong> to bridge the 71% student gap.",

      "Integrate <strong>SQL Subqueries & Relational Database Indexing</strong> into internal lab evaluations."
    ]
  },

  rtu: {
    heading:
      "Rajasthan Technical University (RTU), Kota • State Engineering Faculty",

    sub:
      "Affiliated Colleges Technical Skilling Audit & Curriculum Feedback",

    avgMatch: "62.5%",

    avgDiff: "↑ 9.2% Post Technical Seminars",

    topGap: "Cloud Native & DevOps",

    gapPercent: "74% Candidates Missing",

    strongDomain: "Data Structures & Java",

    strongPercent: "80% Proficiency Verified",

    certs: "1,450",

    recommendations: [
      "Align 7th Semester Elective Curriculums with <strong>Kubernetes & Cloud Native Architectures</strong>.",

      "Conduct statewide hackathons to evaluate real-time problem solving in distributed systems."
    ]
  },

  iit_delhi: {
    heading:
      "IIT Delhi / Premier Institutes • Advanced Research & Skilling Hub",

    sub:
      "Deep Tech, GenAI & Advanced Systems Employment Alignment",

    avgMatch: "86.2%",

    avgDiff: "Top Tier Performance",

    topGap: "RAG & Agentic AI",

    gapPercent: "38% Students Exploring",

    strongDomain: "Algorithms & Machine Learning",

    strongPercent: "94% Candidates Certified",

    certs: "580",

    recommendations: [
      "Establish industry partnerships for <strong>Multi-Agent LLM Orchestration & Distributed AI Systems</strong>.",

      "Facilitate direct research-to-corporate incubation pipelines for high-scoring candidates."
    ]
  },

  mu: {
    heading:
      "University of Mumbai • Faculty of Technology & Engineering",

    sub:
      "Corporate Financial Tech & Software Development Readiness Index",

    avgMatch: "69.1%",

    avgDiff: "↑ 14% vs Regional Baseline",

    topGap: "Microservices & Cloud",

    gapPercent: "66% Students Missing",

    strongDomain: "Fintech Tools & Full-Stack",

    strongPercent: "83% Proficiency",

    certs: "2,180",

    recommendations: [
      "Partner with Mumbai BFSI corporate hubs for <strong>FastAPI, Microservices & Redis Caching</strong> training.",

      "Introduce structured certifications for cloud security and PCI-DSS financial compliances."
    ]
  },

  anna: {
    heading:
      "Anna University, Chennai • Technical Education Directorate",

    sub:
      "Automotive Embedded Systems & Software Engineering Matrix",

    avgMatch: "67.8%",

    avgDiff: "↑ 11% Post Industrial Visits",

    topGap: "DevOps & CI/CD",

    gapPercent: "69% Students Missing",

    strongDomain: "Core Backend & Python",

    strongPercent: "86% Certified",

    certs: "1,890",

    recommendations: [
      "Launch specialized workshops on <strong>Automated Testing & GitHub Actions Pipelines</strong>.",

      "Enhance cloud computing infrastructure across constituent colleges."
    ]
  },

  du: {
    heading:
      "Delhi University (DU) • Faculty of Applied Sciences & Informatics",

    sub:
      "Data Science, Analytics & Software Readiness Index",

    avgMatch: "70.4%",

    avgDiff: "↑ 13.5% vs Pre-Evaluation",

    topGap: "Power BI & Big Data",

    gapPercent: "61% Students Missing",

    strongDomain: "Python & Statistical Analysis",

    strongPercent: "88% Certified",

    certs: "1,120",

    recommendations: [
      "Incorporate <strong>Enterprise Power BI & Apache Spark</strong> hands-on projects in final year coursework.",

      "Facilitate corporate mentorship tracks for analytics and quantitative research."
    ]
  },

  mospi: {
    heading:
      "Ministry of Statistics & PI (MoSPI) • Official Statistical Cadre",

    sub:
      "National Statistical Capacity Building & iGOT Ecosystem Alignment",

    avgMatch: "61.2%",

    avgDiff: "↑ 8.5% vs National Baseline",

    topGap: "Python & Automated ETL",

    gapPercent: "64% Officers Need Skilling",

    strongDomain: "Descriptive Stats & Excel",

    strongPercent: "91% Proficiency Verified",

    certs: "418",

    recommendations: [
      "Deploy mandatory <strong>Python Data Processing & Automated ETL</strong> modules on iGOT Karmayogi.",

      "Initiate automated weekly diagnostic MCQ tests for field survey statistical officers."
    ]
  },

  maharashtra: {
    heading:
      "Govt of Maharashtra • State Technical Skilling Directorate",

    sub:
      "District Skilling Initiatives & Employment Outcome Tracking",

    avgMatch: "57.8%",

    avgDiff: "↑ 15% Post-Skilling Drive",

    topGap: "Cloud & Linux CLI",

    gapPercent: "76% Youth Need Skilling",

    strongDomain: "Web Basics & Scripting",

    strongPercent: "79% Certified",

    certs: "3,240",

    recommendations: [
      "Align state IT polytechnic curriculums with <strong>AWS Cloud & Linux CLI</strong> corporate standards.",

      "Connect certified high-readiness candidates directly to Pune & Mumbai corporate hiring pipelines."
    ]
  },

  nsdc: {
    heading:
      "National Skill Development Corporation (NSDC) • All-India Portal",

    sub:
      "National Qualification Framework (NQF) & Industry Alignment",

    avgMatch: "64.0%",

    avgDiff: "National Aggregate",

    topGap: "Cloud Infrastructure",

    gapPercent: "70% National Gap",

    strongDomain: "Core Programming",

    strongPercent: "82% Baseline Met",

    certs: "14,500",

    recommendations: [
      "Integrate SkillBank competency assessments into the <strong>Academic Bank of Credits (ABC)</strong> under NEP 2020.",

      "Scale corporate apprenticeship tie-ups for verified 75%+ score holders."
    ]
  }
};


/* ==========================================================================
   Institution Change
   ========================================================================== */

function handleInstitutionChange() {
  const select = document.getElementById("institutionSelect");

  const customInput = document.getElementById("customUnivInput");

  if (!select) {
    return;
  }

  if (select.value === "custom") {
    if (customInput) {
      customInput.classList.remove("hidden");
      customInput.focus();
    }

    applyCustomUniversity();
  } else {
    if (customInput) {
      customInput.classList.add("hidden");
    }

    updateInstitutionData();
  }
}


/* ==========================================================================
   Custom University
   ========================================================================== */

function applyCustomUniversity() {
  const customInput = document.getElementById("customUnivInput");

  const name =
    customInput && customInput.value.trim()
      ? customInput.value.trim()
      : "Custom University / Institute";

  const heading = document.getElementById("institutionHeading");
  const sub = document.getElementById("institutionSub");

  if (heading) {
    heading.textContent = `${name} • Skill Gap & Readiness Audit`;
  }

  if (sub) {
    sub.textContent =
      "Live Custom Evaluation & Institutional Placement Matrix";
  }

  const statAvgMatch = document.getElementById("statAvgMatch");
  const statAvgDiff = document.getElementById("statAvgDiff");
  const statTopGap = document.getElementById("statTopGap");
  const statGapPercent = document.getElementById("statGapPercent");
  const statStrongDomain = document.getElementById("statStrongDomain");
  const statStrongPercent = document.getElementById("statStrongPercent");
  const statCerts = document.getElementById("statCerts");

  if (statAvgMatch) statAvgMatch.textContent = "65.0%";
  if (statAvgDiff) statAvgDiff.textContent = "Evaluated Live";
  if (statTopGap) statTopGap.textContent = "Cloud & DevOps";
  if (statGapPercent) statGapPercent.textContent = "68% Candidates Missing";
  if (statStrongDomain) statStrongDomain.textContent = "Core Web / Python";
  if (statStrongPercent) statStrongPercent.textContent = "81% Proficiency";
  if (statCerts) statCerts.textContent = "85";

  const recContainer = document.getElementById("recommendationList");

  if (recContainer) {
    recContainer.innerHTML = `
      <li class="flex items-center gap-2">
        <i
          data-lucide="arrow-right-circle"
          class="w-4 h-4 text-emerald-400 flex-shrink-0"
        ></i>

        <span>
          Schedule customized technical workshops based on candidate resume gap analytics.
        </span>
      </li>

      <li class="flex items-center gap-2">
        <i
          data-lucide="arrow-right-circle"
          class="w-4 h-4 text-emerald-400 flex-shrink-0"
        ></i>

        <span>
          Track verified skill badges to bridge corporate recruitment gaps for ${sanitize(name)}.
        </span>
      </li>
    `;
  }

  safeCreateIcons();
}


/* ==========================================================================
   Institution Data Update
   ========================================================================== */

function updateInstitutionData() {
  const select = document.getElementById("institutionSelect");

  if (!select) {
    return;
  }

  const data =
    INSTITUTION_REGISTRY[select.value] ||
    INSTITUTION_REGISTRY.poornima;

  const heading = document.getElementById("institutionHeading");
  const sub = document.getElementById("institutionSub");

  if (heading) heading.textContent = data.heading;
  if (sub) sub.textContent = data.sub;

  const statAvgMatch = document.getElementById("statAvgMatch");
  const statAvgDiff = document.getElementById("statAvgDiff");
  const statTopGap = document.getElementById("statTopGap");
  const statGapPercent = document.getElementById("statGapPercent");
  const statStrongDomain = document.getElementById("statStrongDomain");
  const statStrongPercent = document.getElementById("statStrongPercent");
  const statCerts = document.getElementById("statCerts");

  if (statAvgMatch) statAvgMatch.textContent = data.avgMatch;
  if (statAvgDiff) statAvgDiff.textContent = data.avgDiff;
  if (statTopGap) statTopGap.textContent = data.topGap;
  if (statGapPercent) statGapPercent.textContent = data.gapPercent;
  if (statStrongDomain) statStrongDomain.textContent = data.strongDomain;
  if (statStrongPercent) statStrongPercent.textContent = data.strongPercent;
  if (statCerts) statCerts.textContent = data.certs;

  const recContainer = document.getElementById("recommendationList");

  if (recContainer) {
    recContainer.innerHTML = data.recommendations
      .map(
        (recommendation) => `
          <li class="flex items-center gap-2">
            <i
              data-lucide="arrow-right-circle"
              class="w-4 h-4 text-emerald-400 flex-shrink-0"
            ></i>

            <span>${recommendation}</span>
          </li>
        `
      )
      .join("");
  }

  safeCreateIcons();
}


/* ==========================================================================
   3. UI HELPERS
   ========================================================================== */

function sanitize(text) {
  const div = document.createElement("div");

  div.textContent = text || "";

  return div.innerHTML;
}


function showAlert(message) {
  const box = document.getElementById("alertBox");

  const messageElement = document.getElementById("alertMsg");

  if (messageElement) {
    messageElement.textContent = message;
  }

  if (box) {
    box.classList.remove("hidden");
  }

  safeCreateIcons();
}


/* ==========================================================================
   API ERROR PARSER
   ========================================================================== */

async function getResponsePayload(response) {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();

    return {
      detail: text || `Server returned HTTP ${response.status}.`
    };
  } catch (error) {
    return {
      detail: `Server returned HTTP ${response.status}.`
    };
  }
}


/* ==========================================================================
   FETCH WITH TIMEOUT
   ========================================================================== */

async function fetchWithTimeout(url, options = {}, timeoutMs = 90000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
}


/* ==========================================================================
   WAIT HELPER
   ========================================================================== */

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


/* ==========================================================================
   RENDER BACKEND WAKE-UP / RETRY
   ========================================================================== */

async function requestEvaluation(formData) {
  let lastError = null;

  /*
     Render free instances can sleep.

     We give Render enough time to wake up and retry if necessary.
  */

  const attempts = 3;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetchWithTimeout(
        EVALUATE_ENDPOINT,
        {
          method: "POST",
          body: formData
        },
        90000
      );

      const payload = await getResponsePayload(response);

      if (response.ok) {
        return {
          success: true,
          data: payload
        };
      }

      lastError =
        payload.detail ||
        payload.message ||
        `Evaluation failed with HTTP ${response.status}.`;

      /*
         Retry server-side failures.
      */

      if (response.status >= 500 && attempt < attempts) {
        await wait(2500);
        continue;
      }

      return {
        success: false,
        error: lastError
      };
    } catch (error) {
      lastError = error;

      /*
         Retry Render wake-up/network errors.
      */

      if (attempt < attempts) {
        await wait(2500);
        continue;
      }
    }
  }

  if (lastError && lastError.name === "AbortError") {
    return {
      success: false,
      error:
        "The evaluation engine took too long to respond. Please try again in a few seconds."
    };
  }

  return {
    success: false,
    error:
      "The evaluation engine is taking longer than usual to wake up. Please wait a few seconds and click Evaluate again."
  };
}


/* ==========================================================================
   4. API EVALUATION EXECUTION
   ========================================================================== */

async function runAnalysis() {
  const fileInput = document.getElementById("resumeFile");

  const roleInput = document.getElementById("targetRoleInput");

  const nameInput = document.getElementById("candidateName");

  const universityInput = document.getElementById("universityName");

  const analyzeBtn = document.getElementById("analyzeBtn");

  const btnText = document.getElementById("btnText");

  const alertBox = document.getElementById("alertBox");

  if (alertBox) {
    alertBox.classList.add("hidden");
  }


  /* ------------------------------------------------------------------------
     Validation
     ------------------------------------------------------------------------ */

  if (!nameInput || !nameInput.value.trim()) {
    showAlert("Please enter Candidate Full Name.");
    return;
  }

  if (!universityInput || !universityInput.value.trim()) {
    showAlert("Please enter your University / Institution Name.");
    return;
  }

  if (!roleInput || !roleInput.value.trim()) {
    showAlert("Please select or enter a Target Corporate Role.");
    return;
  }

  if (
    !fileInput ||
    !fileInput.files ||
    fileInput.files.length === 0
  ) {
    showAlert("Please upload a PDF resume file to proceed.");
    return;
  }


  const candidateName = nameInput.value.trim();

  const universityName = universityInput.value.trim();

  const selectedRole = roleInput.value.trim();

  const resumeFile = fileInput.files[0];


  /* ------------------------------------------------------------------------
     PDF Validation
     ------------------------------------------------------------------------ */

  const fileName = resumeFile.name.toLowerCase();

  const isPdf =
    resumeFile.type === "application/pdf" ||
    fileName.endsWith(".pdf");

  if (!isPdf) {
    showAlert("Only PDF resume files are supported.");
    return;
  }


  /* ------------------------------------------------------------------------
     UI Loading State
     ------------------------------------------------------------------------ */

  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add("opacity-70", "cursor-not-allowed");
  }

  if (btnText) {
    btnText.textContent =
      "Connecting... (first request may take up to 20s if the server was idle)";
  }


  /* ------------------------------------------------------------------------
     FormData
     ------------------------------------------------------------------------ */

  const formData = new FormData();

  formData.append("candidate_name", candidateName);

  formData.append("full_name", candidateName);

  formData.append("university_name", universityName);

  formData.append("target_role", selectedRole);

  formData.append("institution_id", "poornima");

  /*
     Backend accepts:
     resume
     resume_file

     We use only resume to keep the request clean.
  */

  formData.append("resume", resumeFile);


  /* ------------------------------------------------------------------------
     API Request
     ------------------------------------------------------------------------ */

  try {
    if (btnText) {
      btnText.textContent =
        "Auditing Resume against Corporate Benchmark...";
    }

    const result = await requestEvaluation(formData);

    if (!result.success || !result.data) {
      showAlert(
        result.error ||
          "Unable to connect to the evaluation engine."
      );

      return;
    }


    /* ----------------------------------------------------------------------
       Render Results
       ---------------------------------------------------------------------- */

    renderEvaluationResults(
      result.data,
      selectedRole
    );
  } catch (error) {
    console.error("Evaluation error:", error);

    showAlert(
      "Something went wrong while evaluating the resume. Please try again."
    );
  } finally {
    if (analyzeBtn) {
      analyzeBtn.disabled = false;

      analyzeBtn.classList.remove(
        "opacity-70",
        "cursor-not-allowed"
      );
    }

    if (btnText) {
      btnText.textContent =
        "Evaluate Readiness & Build SkillBank Roadmap";
    }
  }
}


/* ==========================================================================
   5. RENDER EVALUATION RESULTS
   ========================================================================== */

function renderEvaluationResults(data, requestedRole) {
  const safeData = data || {};


  /* ------------------------------------------------------------------------
     Core State
     ------------------------------------------------------------------------ */

  computedScore =
    Number(safeData.readiness_score) || 0;

  /*
     FIX (issue 1 — "job name and shown data don't match"):

     Previously this prioritized the backend's internally-resolved
     taxonomy title (role_title) over what the user actually typed
     or selected. If someone typed a slightly different phrasing of
     a role, the backend would silently map it to its closest known
     taxonomy title and show THAT instead — which looked like the
     result didn't match what was searched for.

     Now we always show exactly what the user typed/selected
     (requestedRole) as the headline role name. The backend's
     resolved taxonomy role is still used underneath to pick the
     correct skill list and benchmarks — only the DISPLAYED name
     changes to match the user's input exactly.
  */
  activeRoleTitle =
    requestedRole ||
    safeData.requested_role ||
    safeData.role_title ||
    "Industry Engineer";

  activeCertHash =
    safeData.cert_hash ||
    `SKB-2026-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}-IN`;

  activeTimestamp =
    safeData.timestamp ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });


  /* ------------------------------------------------------------------------
     Normalize Arrays
     ------------------------------------------------------------------------ */

  const acquiredSkills = Array.isArray(
    safeData.acquired_skills
  )
    ? safeData.acquired_skills
    : [];

  const missingSkills = Array.isArray(
    safeData.missing_skills
  )
    ? safeData.missing_skills
    : [];


  /* ------------------------------------------------------------------------
     1. Metrics Cards
     ------------------------------------------------------------------------ */

  const displayRole =
    document.getElementById("displayRoleName");

  const scorePercentage =
    document.getElementById("scorePercentage");

  const countAcquired =
    document.getElementById("countAcquired");

  const countMissing =
    document.getElementById("countMissing");

  const scoreTag =
    document.getElementById("scoreTag");


  if (displayRole) {
    displayRole.textContent = activeRoleTitle;
  }

  if (scorePercentage) {
    scorePercentage.textContent = `${computedScore}%`;
  }

  if (countAcquired) {
    countAcquired.textContent = acquiredSkills.length;
  }

  if (countMissing) {
    countMissing.textContent = missingSkills.length;
  }


  /* ------------------------------------------------------------------------
     Score Status
     ------------------------------------------------------------------------ */

  if (scoreTag) {
    if (computedScore >= 70) {
      scoreTag.textContent = "Corporate Ready";

      scoreTag.className =
        "text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    } else {
      scoreTag.textContent = "Skilling Gap Identified";

      scoreTag.className =
        "text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30";
    }
  }


  /* ------------------------------------------------------------------------
     2. Market Pulse
     ------------------------------------------------------------------------ */

  const pulseText =
    document.getElementById("marketPulseText");

  const badgeContainer =
    document.getElementById("marketTrendingBadges");


  if (pulseText) {
    pulseText.textContent =
      `Hiring Surge: ${
        safeData.hiring_surge || "+30% YoY"
      } • Corporate Benchmark Standard`;
  }


  if (badgeContainer) {
    const badges =
      Array.isArray(safeData.trending_tech) &&
      safeData.trending_tech.length
        ? safeData.trending_tech
        : ["Industry Standard", "Production Ready"];

    badgeContainer.innerHTML = badges
      .map(
        (badge) => `
          <span class="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300">
            ${sanitize(badge)}
          </span>
        `
      )
      .join("");
  }


  /* ------------------------------------------------------------------------
     3. Acquired Skills
     ------------------------------------------------------------------------ */

  const acquiredContainer =
    document.getElementById(
      "acquiredTagsContainer"
    );


  if (acquiredContainer) {
    if (acquiredSkills.length > 0) {
      acquiredContainer.innerHTML = acquiredSkills
        .map(
          (skill) => `
            <span class="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">
              ${sanitize(skill)}
            </span>
          `
        )
        .join("");
    } else {
      acquiredContainer.innerHTML = `
        <span class="text-xs text-slate-500">
          No matching domain skills identified in resume text.
        </span>
      `;
    }
  }


  /* ------------------------------------------------------------------------
     Missing Skills
     ------------------------------------------------------------------------ */

  const missingContainer =
    document.getElementById(
      "missingTagsContainer"
    );


  if (missingContainer) {
    if (missingSkills.length > 0) {
      missingContainer.innerHTML = missingSkills
        .map(
          (skill) => `
            <span class="bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">
              ${sanitize(skill)}
            </span>
          `
        )
        .join("");
    } else {
      missingContainer.innerHTML = `
        <span class="text-xs text-emerald-400">
          All key competencies successfully validated!
        </span>
      `;
    }
  }


  /* ------------------------------------------------------------------------
     4. Personalized Roadmap
     ------------------------------------------------------------------------ */

  const roadmapContainer =
    document.getElementById(
      "roadmapCardsContainer"
    );


  if (roadmapContainer) {
    const resources =
      safeData.resources || {};

    const roleKey =
      safeData.role_key || "frontend";

    const localRoleMeta =
      typeof REGISTRY !== "undefined" &&
      REGISTRY &&
      REGISTRY[roleKey]
        ? REGISTRY[roleKey].skills || {}
        : {};


    roadmapContainer.innerHTML = missingSkills
      .map((skill, index) => {
        const localSkill =
          localRoleMeta[skill] || {};

        const resourceItem =
          resources[skill] || {};


        const webUrl =
          resourceItem.docs ||
          localSkill.webUrl ||
          `https://www.google.com/search?q=${encodeURIComponent(
            skill
          )}+official+documentation`;


        const webPlatform =
          localSkill.webPlatform ||
          "Official Documentation";


        const youtubeUrl =
          resourceItem.video ||
          localSkill.ytUrl ||
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            skill
          )}+full+course`;


        const youtubePlatform =
          localSkill.ytPlatform ||
          "Verified Video Masterclass";


        const guide =
          localSkill.guide ||
          `Master production-grade workflows, foundational theory, and practical implementation of ${skill.toUpperCase()}.`;


        const hasQuiz =
          typeof QUIZZES !== "undefined" &&
          QUIZZES &&
          QUIZZES[skill];


        return `
          <div class="glass-panel p-5 rounded-2xl border-l-4 border-teal-400 flex flex-col md:flex-row md:items-center justify-between gap-5">

            <div class="space-y-1.5 max-w-2xl">

              <div class="flex items-center gap-2">

                <span class="bg-slate-800 text-teal-300 text-xs font-mono font-bold px-2 py-0.5 rounded border border-slate-700">
                  Module ${index + 1}
                </span>

                <h4 class="text-sm font-black uppercase tracking-wider text-white">
                  ${sanitize(skill)}
                </h4>

              </div>


              <p class="text-xs text-slate-300 leading-relaxed">
                ${sanitize(guide)}
              </p>


              <div class="flex flex-wrap items-center gap-4 pt-2">

                <a
                  href="${sanitize(webUrl)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 underline underline-offset-4 transition"
                >

                  <i
                    data-lucide="globe"
                    class="w-3.5 h-3.5 text-teal-400"
                  ></i>

                  <span>
                    Study on ${sanitize(webPlatform)}
                  </span>

                </a>


                <a
                  href="${sanitize(youtubeUrl)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 underline underline-offset-4 transition"
                >

                  <i
                    data-lucide="play-square"
                    class="w-3.5 h-3.5 text-rose-400"
                  ></i>

                  <span>
                    Watch on ${sanitize(youtubePlatform)}
                  </span>

                </a>

              </div>

            </div>


            <div class="flex-shrink-0">

              ${
                hasQuiz
                  ? `
                    <button
                      onclick="launchQuiz('${sanitize(skill)}')"
                      class="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
                    >

                      <i
                        data-lucide="help-circle"
                        class="w-4 h-4 text-teal-400"
                      ></i>

                      <span>
                        Take Diagnostic Test
                      </span>

                    </button>
                  `
                  : `
                    <span class="text-[11px] text-slate-500 font-mono italic">
                      Self-Guided Track
                    </span>
                  `
              }

            </div>

          </div>
        `;
      })
      .join("");
  }


  /* ------------------------------------------------------------------------
     5. Radar Chart
     ------------------------------------------------------------------------ */

  const allSkills = [
    ...new Set([
      ...acquiredSkills,
      ...missingSkills
    ])
  ];

  renderRadarChart(
    allSkills,
    acquiredSkills,
    safeData.benchmarks || {}
  );


  /* ------------------------------------------------------------------------
     Dashboard
     ------------------------------------------------------------------------ */

  const dashboard =
    document.getElementById(
      "analyticsDashboard"
    );


  if (dashboard) {
    dashboard.classList.remove("hidden");

    setTimeout(() => {
      dashboard.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }


  safeCreateIcons();
}


/* ==========================================================================
   6. RADAR CHART ENGINE
   ========================================================================== */

function renderRadarChart(
  skills,
  acquired,
  benchmarks
) {
  const chartElement =
    document.getElementById(
      "skillRadarChart"
    );


  if (
    !chartElement ||
    typeof Chart === "undefined"
  ) {
    return;
  }


  if (!Array.isArray(skills) || skills.length === 0) {
    return;
  }


  const context =
    chartElement.getContext("2d");


  if (!context) {
    return;
  }


  if (radarChartInstance) {
    radarChartInstance.destroy();

    radarChartInstance = null;
  }


  const candidateScores = skills.map(
    (skill) =>
      acquired.includes(skill)
        ? 90
        : 20
  );


  const benchmarkScores = skills.map(
    (skill) =>
      Number(benchmarks[skill]) || 85
  );


  radarChartInstance = new Chart(
    context,
    {
      type: "radar",

      data: {
        labels: skills.map((skill) =>
          String(skill).toUpperCase()
        ),

        datasets: [
          {
            label:
              "Candidate Evaluated Vector",

            data: candidateScores,

            backgroundColor:
              "rgba(16, 185, 129, 0.25)",

            borderColor: "#10b981",

            pointBackgroundColor:
              "#10b981",

            pointBorderColor:
              "#ffffff",

            borderWidth: 2
          },

          {
            label:
              "Corporate Benchmark Target",

            data: benchmarkScores,

            backgroundColor:
              "rgba(56, 189, 248, 0.08)",

            borderColor:
              "#38bdf8",

            pointBackgroundColor:
              "#38bdf8",

            borderDash: [4, 4],

            borderWidth: 1.5
          }
        ]
      },


      options: {
        responsive: true,

        maintainAspectRatio: false,

        scales: {
          r: {
            min: 0,

            max: 100,

            angleLines: {
              color:
                "rgba(255, 255, 255, 0.1)"
            },

            grid: {
              color:
                "rgba(255, 255, 255, 0.1)"
            },

            pointLabels: {
              color: "#94a3b8",

              font: {
                size: 10,

                weight: "bold",

                family: "monospace"
              }
            },

            ticks: {
              display: false
            }
          }
        },


        plugins: {
          legend: {
            labels: {
              color: "#cbd5e1",

              font: {
                size: 11,

                weight: "600"
              }
            }
          }
        }
      }
    }
  );
}


/* ==========================================================================
   7. DIAGNOSTIC TEST
   ========================================================================== */

function launchQuiz(skill) {
  if (
    typeof QUIZZES === "undefined" ||
    !QUIZZES ||
    !QUIZZES[skill]
  ) {
    return;
  }


  const question = QUIZZES[skill];

  const section =
    document.getElementById(
      "quizSection"
    );

  const title =
    document.getElementById(
      "quizTitle"
    );

  const content =
    document.getElementById(
      "quizContent"
    );


  if (!section || !title || !content) {
    return;
  }


  title.textContent =
    `In-House Diagnostic Verification: ${String(
      skill
    ).toUpperCase()}`;


  content.innerHTML = `
    <div class="p-5 bg-slate-900 rounded-2xl border border-slate-800">

      <p class="text-sm font-bold text-white mb-3">
        ${sanitize(question.q)}
      </p>


      <div class="space-y-2">

        ${question.options
          .map(
            (option, index) => `
              <button
                onclick="handleAnswer('${sanitize(
                  skill
                )}', ${index}, ${Number(
                  question.correct
                )})"
                class="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-700"
              >
                ${String.fromCharCode(
                  65 + index
                )}) ${sanitize(option)}
              </button>
            `
          )
          .join("")}

      </div>


      <div
        id="quizRes"
        class="mt-4 hidden text-xs font-bold p-3 rounded-xl"
      ></div>

    </div>
  `;


  section.classList.remove("hidden");


  section.scrollIntoView({
    behavior: "smooth"
  });


  safeCreateIcons();
}


/* ==========================================================================
   Quiz Answer Handler
   ========================================================================== */

function handleAnswer(
  skill,
  selected,
  correct
) {
  if (
    typeof QUIZZES === "undefined" ||
    !QUIZZES ||
    !QUIZZES[skill]
  ) {
    return;
  }


  const question =
    QUIZZES[skill];

  const result =
    document.getElementById(
      "quizRes"
    );


  if (!result) {
    return;
  }


  result.classList.remove("hidden");


  if (
    Number(selected) ===
    Number(correct)
  ) {
    result.className =
      "mt-4 text-xs text-emerald-300 bg-emerald-950/80 border border-emerald-700 p-3.5 rounded-xl space-y-1";


    result.innerHTML = `
      <p class="font-black text-emerald-400">
        ✓ Correct Answer! Competency Verified (+15% Score Boost).
      </p>

      <p class="text-slate-300 font-normal">
        <strong>Explanation:</strong>
        ${sanitize(question.explanation)}
      </p>
    `;


    computedScore = Math.min(
      100,
      computedScore + 15
    );


    const scorePercentage =
      document.getElementById(
        "scorePercentage"
      );


    if (scorePercentage) {
      scorePercentage.textContent =
        `${computedScore}%`;
    }
  } else {
    result.className =
      "mt-4 text-xs text-rose-300 bg-rose-950/80 border border-rose-700 p-3.5 rounded-xl space-y-1";


    result.innerHTML = `
      <p class="font-black text-rose-400">
        ✕ Incorrect Answer.
      </p>

      <p class="text-slate-300 font-normal">
        <strong>Explanation:</strong>
        ${sanitize(question.explanation)}
      </p>

      <p class="text-slate-400 font-normal">
        Review the Web Docs or YouTube modules above before re-attempting.
      </p>
    `;
  }
}


/* ==========================================================================
   8. DIGITAL CERTIFICATE MODAL
   ========================================================================== */

function openCertificateModal() {
  const candidateNameElement =
    document.getElementById(
      "candidateName"
    );


  const name =
    candidateNameElement &&
    candidateNameElement.value.trim()
      ? candidateNameElement.value.trim()
      : "Candidate";


  const certCandidateName =
    document.getElementById(
      "certCandidateName"
    );


  const certRoleName =
    document.getElementById(
      "certRoleName"
    );


  const certScore =
    document.getElementById(
      "certScore"
    );


  const certId =
    document.getElementById(
      "certId"
    );


  const certDate =
    document.getElementById(
      "certDate"
    );


  if (certCandidateName) {
    certCandidateName.textContent =
      name;
  }


  if (certRoleName) {
    certRoleName.textContent =
      activeRoleTitle ||
      "Industry Engineer";
  }


  if (certScore) {
    certScore.textContent =
      `${computedScore}%`;
  }


  if (certId) {
    certId.textContent =
      activeCertHash;
  }


  if (certDate) {
    certDate.textContent =
      activeTimestamp ||
      new Date().toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
  }


  const modal =
    document.getElementById(
      "certificateModal"
    );


  if (modal) {
    modal.classList.remove(
      "hidden"
    );
  }


  safeCreateIcons();
}


/* ==========================================================================
   Close Certificate Modal
   ========================================================================== */

function closeCertificateModal() {
  const modal =
    document.getElementById(
      "certificateModal"
    );


  if (modal) {
    modal.classList.add("hidden");
  }
}


/* ==========================================================================
   Global Error Protection
   ========================================================================== */

window.addEventListener(
  "error",
  (event) => {
    console.error(
      "SkillBank frontend error:",
      event.error || event.message
    );
  }
);


window.addEventListener(
  "unhandledrejection",
  (event) => {
    console.error(
      "SkillBank unhandled promise rejection:",
      event.reason
    );
  }
);
