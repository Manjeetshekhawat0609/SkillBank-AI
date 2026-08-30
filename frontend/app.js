pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let computedScore = 0;
let activeRoleTitle = "";
let radarChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  populateRoleDropdown("");
  updateInstitutionData();
  lucide.createIcons();
});

// ----------------------------------------------------
// 1. Student vs Institutional HOD View Controller
// ----------------------------------------------------
function switchView(view) {
  const studentView = document.getElementById("studentViewContainer");
  const hodView = document.getElementById("hodViewContainer");
  const btnStudent = document.getElementById("btnStudentView");
  const btnHod = document.getElementById("btnHodView");

  if (view === "student") {
    studentView.classList.remove("hidden");
    hodView.classList.add("hidden");
    btnStudent.className = "px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold transition flex items-center gap-1.5";
    btnHod.className = "px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
  } else {
    studentView.classList.add("hidden");
    hodView.classList.remove("hidden");
    btnHod.className = "px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold transition flex items-center gap-1.5";
    btnStudent.className = "px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5";
  }
  lucide.createIcons();
}

// ----------------------------------------------------
// 2. Institutional Analytics Dataset
// ----------------------------------------------------
const INSTITUTION_REGISTRY = {
  poornima: {
    heading: "Poornima University, Jaipur • Department of Computer Science & AI",
    sub: "Continuous Internal Evaluation (CIE) & Placement Readiness Matrix",
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
    heading: "Rajasthan Technical University (RTU), Kota • State Engineering Faculty",
    sub: "Affiliated Colleges Technical Skilling Audit & Curriculum Feedback",
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
    heading: "IIT Delhi / Premier Institutes • Advanced Research & Skilling Hub",
    sub: "Deep Tech, GenAI & Advanced Systems Employment Alignment",
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
    heading: "University of Mumbai • Faculty of Technology & Engineering",
    sub: "Corporate Financial Tech & Software Development Readiness Index",
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
    heading: "Anna University, Chennai • Technical Education Directorate",
    sub: "Automotive Embedded Systems & Software Engineering Matrix",
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
    heading: "Delhi University (DU) • Faculty of Applied Sciences & Informatics",
    sub: "Data Science, Analytics & Software Readiness Index",
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
    heading: "Ministry of Statistics & PI (MoSPI) • Official Statistical Cadre",
    sub: "National Statistical Capacity Building & iGOT Ecosystem Alignment",
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
    heading: "Govt of Maharashtra • State Technical Skilling Directorate",
    sub: "District Skilling Initiatives & Employment Outcome Tracking",
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
    heading: "National Skill Development Corporation (NSDC) • All-India Portal",
    sub: "National Qualification Framework (NQF) & Industry Alignment",
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

function handleInstitutionChange() {
  const select = document.getElementById("institutionSelect");
  const customInput = document.getElementById("customUnivInput");

  if (select.value === "custom") {
    customInput.classList.remove("hidden");
    customInput.focus();
    applyCustomUniversity();
  } else {
    customInput.classList.add("hidden");
    updateInstitutionData();
  }
}

function applyCustomUniversity() {
  const customInput = document.getElementById("customUnivInput");
  const name = customInput.value.trim() || "Custom University / Institute";

  document.getElementById("institutionHeading").textContent = `${name} • Skill Gap & Readiness Audit`;
  document.getElementById("institutionSub").textContent = "Live Custom Evaluation & Institutional Placement Matrix";
  
  document.getElementById("statAvgMatch").textContent = "65.0%";
  document.getElementById("statAvgDiff").textContent = "Evaluated Live";
  document.getElementById("statTopGap").textContent = "Cloud & DevOps";
  document.getElementById("statGapPercent").textContent = "68% Candidates Missing";
  document.getElementById("statStrongDomain").textContent = "Core Web / Python";
  document.getElementById("statStrongPercent").textContent = "81% Proficiency";
  document.getElementById("statCerts").textContent = "85";

  const recContainer = document.getElementById("recommendationList");
  recContainer.innerHTML = `
    <li class="flex items-center gap-2">
      <i data-lucide="arrow-right-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
      <span>Schedule customized technical workshops based on candidate resume gap analytics.</span>
    </li>
    <li class="flex items-center gap-2">
      <i data-lucide="arrow-right-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
      <span>Track verified skill badges to bridge corporate recruitment gaps for ${name}.</span>
    </li>
  `;
  lucide.createIcons();
}

function updateInstitutionData() {
  const select = document.getElementById("institutionSelect");
  if (!select) return;
  const data = INSTITUTION_REGISTRY[select.value] || INSTITUTION_REGISTRY.poornima;

  document.getElementById("institutionHeading").textContent = data.heading;
  document.getElementById("institutionSub").textContent = data.sub;
  document.getElementById("statAvgMatch").textContent = data.avgMatch;
  document.getElementById("statAvgDiff").textContent = data.avgDiff;
  document.getElementById("statTopGap").textContent = data.topGap;
  document.getElementById("statGapPercent").textContent = data.gapPercent;
  document.getElementById("statStrongDomain").textContent = data.strongDomain;
  document.getElementById("statStrongPercent").textContent = data.strongPercent;
  document.getElementById("statCerts").textContent = data.certs;

  const recContainer = document.getElementById("recommendationList");
  recContainer.innerHTML = data.recommendations.map(r => `
    <li class="flex items-center gap-2">
      <i data-lucide="arrow-right-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
      <span>${r}</span>
    </li>
  `).join('');

  lucide.createIcons();
}

// ----------------------------------------------------
// 3. Dynamic Acronym & Role Search Engine
// ----------------------------------------------------
function populateRoleDropdown(filterText = "") {
  const select = document.getElementById("targetRole");
  if (!select) return;

  select.innerHTML = "";
  const categories = {};
  const query = filterText.toLowerCase().trim();

  Object.keys(REGISTRY).forEach(key => {
    const role = REGISTRY[key];
    const cat = role.category || "General Corporate";
    const tags = role.searchTags || [];
    
    const matches = !query || 
                    role.title.toLowerCase().includes(query) || 
                    cat.toLowerCase().includes(query) ||
                    key.toLowerCase().includes(query) ||
                    tags.some(tag => tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase()));

    if (matches) {
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push({ key, title: role.title });
    }
  });

  const categoryKeys = Object.keys(categories);
  if (categoryKeys.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = `No role found for "${filterText}"`;
    select.appendChild(opt);
    return;
  }

  categoryKeys.forEach(catName => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = catName;
    optgroup.className = "bg-slate-900 text-slate-300 font-semibold";

    categories[catName].forEach(role => {
      const opt = document.createElement("option");
      opt.value = role.key;
      opt.textContent = role.title;
      opt.className = "bg-slate-900 text-white font-normal";
      optgroup.appendChild(opt);
    });

    select.appendChild(optgroup);
  });
}

function filterRoleDropdown() {
  const query = document.getElementById("roleSearchInput").value;
  populateRoleDropdown(query);
}

function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text || "";
  return div.innerHTML;
}

function showAlert(msg) {
  const box = document.getElementById('alertBox');
  const msgEl = document.getElementById('alertMsg');
  msgEl.textContent = msg;
  box.classList.remove('hidden');
  lucide.createIcons();
}

// ----------------------------------------------------
// 4. Fast Backend API Execution & Dynamic Renderer
// ----------------------------------------------------
async function runAnalysis() {
  const fileInput = document.getElementById('resumeFile');
  const roleSelect = document.getElementById('targetRole');
  const nameInput = document.getElementById('candidateName');
  const btnText = document.getElementById('btnText');
  document.getElementById('alertBox').classList.add('hidden');

  if (!nameInput.value.trim()) {
    showAlert("Please enter candidate full name.");
    return;
  }

  if (!roleSelect.value) {
    showAlert("Please choose a valid corporate role from the list.");
    return;
  }

  if (!fileInput.files || fileInput.files.length === 0) {
    showAlert("Please upload a PDF resume file to continue.");
    return;
  }

  btnText.textContent = "AI Vector Server Evaluating...";

  const formData = new FormData();
  formData.append("full_name", nameInput.value.trim());
  formData.append("target_role", roleSelect.value || "frontend");
  formData.append("institution_id", "poornima");
  formData.append("resume_file", fileInput.files[0]);

  try {
    const res = await fetch("https://skillbank-ai.onrender.com/api/v1/evaluate-resume", {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const errorDetail = await res.json();
    console.error("422 Details from Backend:", errorDetail);
    throw new Error(`Server returned status ${res.status}`);
  }

    const data = await res.json();

    // 1. Update Metrics
    computedScore = data.readiness_score;
    activeRoleTitle = data.role_title;

    document.getElementById('displayRoleName').textContent = data.role_title;
    document.getElementById('scorePercentage').textContent = computedScore + "%";
    document.getElementById('countAcquired').textContent = data.acquired_skills.length;
    document.getElementById('countMissing').textContent = data.missing_skills.length;

    const tag = document.getElementById('scoreTag');
    if (computedScore >= 70) {
      tag.textContent = "High Match • Corporate Ready";
      tag.className = "text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    } else {
      tag.textContent = "Skilling Gap Identified";
      tag.className = "text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30";
    }

    // 2. Acquired & Missing Tags
    document.getElementById('acquiredTagsContainer').innerHTML = data.acquired_skills.length > 0
      ? data.acquired_skills.map(s => `<span class="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">${sanitize(s)}</span>`).join('')
      : `<span class="text-xs text-slate-500">No matching skills detected.</span>`;

    document.getElementById('missingTagsContainer').innerHTML = data.missing_skills.length > 0
      ? data.missing_skills.map(s => `<span class="bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">${sanitize(s)}</span>`).join('')
      : `<span class="text-xs text-emerald-400">All mandatory competencies fulfilled!</span>`;

    // 3. Dynamic Dual-Learning Path Cards
    const roadmapContainer = document.getElementById('roadmapCardsContainer');
    roadmapContainer.innerHTML = (data.missing_details || []).map((item, idx) => {
      const hasQuiz = Boolean(QUIZZES && QUIZZES[item.skill]);

      return `
        <div class="glass-panel p-5 rounded-2xl border-l-4 border-teal-400 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div class="space-y-1.5 max-w-2xl">
            <div class="flex items-center gap-2">
              <span class="bg-slate-800 text-teal-300 text-xs font-mono font-bold px-2 py-0.5 rounded border border-slate-700">Module ${idx + 1}</span>
              <h4 class="text-sm font-black uppercase tracking-wider text-white">${sanitize(item.skill)}</h4>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${sanitize(item.guide)}</p>
            
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a href="${sanitize(item.webUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 underline underline-offset-4 transition">
                <i data-lucide="globe" class="w-3.5 h-3.5 text-teal-400"></i>
                <span>Study on ${sanitize(item.webPlatform)}</span>
              </a>
              <a href="${sanitize(item.ytUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 underline underline-offset-4 transition">
                <i data-lucide="play-square" class="w-3.5 h-3.5 text-rose-400"></i>
                <span>Watch on ${sanitize(item.ytPlatform)}</span>
              </a>
            </div>
          </div>

          <div class="flex-shrink-0">
            ${hasQuiz ? `
              <button onclick="launchQuiz('${item.skill}')" class="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm">
                <i data-lucide="help-circle" class="w-4 h-4 text-teal-400"></i>
                <span>Take Diagnostic Test</span>
              </button>
            ` : `
              <span class="text-[11px] text-slate-500 font-mono italic">Self-Guided Track</span>
            `}
          </div>
        </div>
      `;
    }).join('');

    // 4. Render Dynamic Radar Graph
    const allSkills = [...data.acquired_skills, ...data.missing_skills];
    renderRadarChart(allSkills, data.acquired_skills);

    document.getElementById('analyticsDashboard').classList.remove('hidden');
    lucide.createIcons();

  } catch (err) {
    console.error(err);
    showAlert("Server connection failed. Make sure your Python backend is running on port 8000.");
  } finally {
    btnText.textContent = "Evaluate Readiness & Build SkillBank Roadmap";
  }
}

// ----------------------------------------------------
// 5. Radar Chart Engine
// ----------------------------------------------------
function renderRadarChart(skills, acquired) {
  const ctx = document.getElementById('skillRadarChart').getContext('2d');
  
  if (radarChartInstance) {
    radarChartInstance.destroy();
  }

  const candidateScores = skills.map(s => acquired.includes(s) ? 95 : 20);
  const benchmarkScores = skills.map(() => 90);

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: skills.map(s => s.toUpperCase()),
      datasets: [
        {
          label: 'Candidate Evaluated Vector',
          data: candidateScores,
          backgroundColor: 'rgba(16, 185, 129, 0.25)',
          borderColor: '#10b981',
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#ffffff',
          borderWidth: 2
        },
        {
          label: 'Corporate Benchmark Target',
          data: benchmarkScores,
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          borderColor: '#38bdf8',
          pointBackgroundColor: '#38bdf8',
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
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: {
            color: '#94a3b8',
            font: { size: 10, weight: 'bold' }
          },
          ticks: { display: false, min: 0, max: 100 }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#cbd5e1', font: { size: 11, weight: '600' } }
        }
      }
    }
  });
}

// ----------------------------------------------------
// 6. Diagnostic Test & Interactive Grading
// ----------------------------------------------------
function launchQuiz(skill) {
  const q = QUIZZES[skill];
  if (!q) return;

  const s = document.getElementById('quizSection');
  document.getElementById('quizTitle').textContent = `In-House Diagnostic Verification: ${skill.toUpperCase()}`;
  document.getElementById('quizContent').innerHTML = `
    <div class="p-5 bg-slate-900 rounded-2xl border border-slate-800">
      <p class="text-sm font-bold text-white mb-3">${sanitize(q.q)}</p>
      <div class="space-y-2">
        ${q.options.map((opt, i) => `
          <button onclick="handleAnswer('${skill}', ${i}, ${q.correct})" class="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition border border-slate-700">
            ${String.fromCharCode(65 + i)}) ${sanitize(opt)}
          </button>
        `).join('')}
      </div>
      <div id="quizRes" class="mt-4 hidden text-xs font-bold p-3 rounded-xl"></div>
    </div>
  `;
  s.classList.remove('hidden');
  s.scrollIntoView({ behavior: 'smooth' });
  lucide.createIcons();
}

function handleAnswer(skill, selected, correct) {
  const q = QUIZZES[skill];
  const res = document.getElementById('quizRes');
  res.classList.remove('hidden');

  if (selected === correct) {
    res.className = "mt-4 text-xs text-emerald-300 bg-emerald-950/80 border border-emerald-700 p-3.5 rounded-xl space-y-1";
    res.innerHTML = `
      <p class="font-black text-emerald-400">✓ Correct Answer! Competency Verified (+15% Score Boost).</p>
      <p class="text-slate-300 font-normal"><strong>Explanation:</strong> ${sanitize(q.explanation)}</p>
    `;
    computedScore = Math.min(100, computedScore + 15);
    document.getElementById('scorePercentage').textContent = computedScore + "%";
  } else {
    res.className = "mt-4 text-xs text-rose-300 bg-rose-950/80 border border-rose-700 p-3.5 rounded-xl space-y-1";
    res.innerHTML = `
      <p class="font-black text-rose-400">✕ Incorrect Answer.</p>
      <p class="text-slate-300 font-normal"><strong>Explanation:</strong> ${sanitize(q.explanation)}</p>
      <p class="text-slate-400 font-normal">Review the Web Docs or YouTube modules above before re-attempting.</p>
    `;
  }
}

// ----------------------------------------------------
// 7. Executive White A4 Certificate Modal
// ----------------------------------------------------
function openCertificateModal() {
  const name = document.getElementById('candidateName').value.trim() || "Candidate";
  document.getElementById('certCandidateName').textContent = name;
  document.getElementById('certRoleName').textContent = activeRoleTitle || "Industry Engineer";
  document.getElementById('certScore').textContent = computedScore + "%";
  
  const token = "SKB-2026-" + Math.random().toString(36).substring(2, 7).toUpperCase() + "-IN";
  document.getElementById('certId').textContent = token;
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('certDate').textContent = new Date().toLocaleDateString('en-US', options);

  document.getElementById('certificateModal').classList.remove('hidden');
  lucide.createIcons();
}

function closeCertificateModal() {
  document.getElementById('certificateModal').classList.add('hidden');
}