const alphabet = [
  ["A", "a", "ah"], ["B", "be", "beh"], ["C", "se", "seh"], ["D", "de", "deh"],
  ["E", "e", "eh"], ["F", "eff", "eff"], ["G", "ge", "yeh/geh"], ["H", "hå", "haw"],
  ["I", "i", "ee"], ["J", "ji", "yee"], ["K", "kå", "kaw"], ["L", "ell", "ell"],
  ["M", "emm", "emm"], ["N", "enn", "enn"], ["O", "o", "oo"], ["P", "pe", "peh"],
  ["Q", "ku", "koo"], ["R", "err", "err"], ["S", "ess", "ess"], ["T", "te", "teh"],
  ["U", "u", "rounded oo"], ["V", "ve", "veh"], ["W", "dubbel-ve", "double v"],
  ["X", "eks", "eks"], ["Y", "y", "rounded ee"], ["Z", "säta", "seh-ta"],
  ["Å", "å", "awe"], ["Ä", "ä", "air"], ["Ö", "ö", "rounded er"]
];

const phrases = [
  ["Hej!", "Hi!"],
  ["Vad heter du?", "What is your name?"],
  ["Jag heter Rony.", "My name is Rony."],
  ["Varifrån kommer du?", "Where are you from?"],
  ["Jag kommer från Indien.", "I come from India."],
  ["Vad talar du för språk?", "What languages do you speak?"],
  ["Jag talar engelska och lite svenska.", "I speak English and a little Swedish."],
  ["Trevligt att träffas.", "Nice to meet you."],
  ["Jag förstår lite.", "I understand a little."],
  ["Ursäkta, vad betyder det?", "Excuse me, what does that mean?"],
  ["Vad är klockan?", "What time is it?"],
  ["Jag skulle vilja ha kaffe.", "I would like coffee."]
];

const recordedAudio = {
  "hej": "assets/audio/Sv-hej.ogg",
  "hej!": "assets/audio/Sv-hej.ogg",
  "tack": "assets/audio/Sv-tack.ogg",
  "tack.": "assets/audio/Sv-tack.ogg"
};

const nonSwedishAudioTexts = new Set([
  "Play the alphabet, then click the individual letter cards below.",
  "Compare tak and tack. The double consonant usually shortens the vowel.",
  "Spend 3 minutes on Å, Ä, Ö before each study session.",
  "Write, check, then speak aloud",
  "Say it aloud",
  "Review missed items tomorrow",
  "Clear and slow"
]);

const flashcards = [
  ["What is your name?", "Vad heter du?"],
  ["My name is ...", "Jag heter ..."],
  ["Where are you from?", "Varifrån kommer du?"],
  ["I come from ...", "Jag kommer från ..."],
  ["I speak English.", "Jag talar engelska."],
  ["Do you speak Swedish?", "Talar du svenska?"],
  ["I live in Stockholm.", "Jag bor i Stockholm."],
  ["I study Swedish.", "Jag studerar svenska."],
  ["What time is it?", "Vad är klockan?"],
  ["Thank you.", "Tack."]
];

const quiz = [
  { module: "verbs", q: "Which means 'I'?", options: ["jag", "du", "vi"], answer: "jag" },
  { module: "wordorder", q: "Choose the yes/no question.", options: ["Du talar svenska.", "Talar du svenska?", "Vad talar du?"], answer: "Talar du svenska?" },
  { module: "intro", q: "What does 'Varifrån kommer du?' mean?", options: ["Where are you from?", "Where do you live?", "What is your name?"], answer: "Where are you from?" },
  { module: "intro", q: "Which noun is neuter?", options: ["ett språk", "en bok", "en dator"], answer: "ett språk" },
  { module: "food", q: "What is 'thank you'?", options: ["Tack", "Hej", "Varsågod"], answer: "Tack" },
  { module: "numbers", q: "What does 'Vad är klockan?' mean?", options: ["What time is it?", "What does it cost?", "Where do you live?"], answer: "What time is it?" },
  { module: "alphabet", q: "Which letters come at the end of the Swedish alphabet?", options: ["Å, Ä, Ö", "Ä, Ö, Å", "Ö, Å, Ä"], answer: "Å, Ä, Ö" },
  { module: "workbook", q: "Best workbook habit?", options: ["Write, check, then speak aloud", "Only read the answer key", "Skip missed items"], answer: "Write, check, then speak aloud" },
  { module: "alphabet", q: "How do you say the letter W in Swedish?", options: ["dubbel-ve", "ve", "ess"], answer: "dubbel-ve", audio: "dubbel-ve" },
  { module: "alphabet", q: "Which word has Å?", options: ["språk", "svenska", "tack"], answer: "språk", audio: "språk" },
  { module: "alphabet", q: "Which word has Ä?", options: ["träffas", "kommer", "bok"], answer: "träffas", audio: "träffas" },
  { module: "alphabet", q: "Which word has Ö?", options: ["förstår", "kaffe", "penna"], answer: "förstår", audio: "förstår" },
  { module: "intro", q: "Translate: My name is Rony.", options: ["Jag heter Rony.", "Jag kommer Rony.", "Jag bor Rony."], answer: "Jag heter Rony.", audio: "Jag heter Rony." },
  { module: "intro", q: "Translate: I come from India.", options: ["Jag kommer från Indien.", "Jag talar Indien.", "Jag heter Indien."], answer: "Jag kommer från Indien.", audio: "Jag kommer från Indien." },
  { module: "intro", q: "Translate: What languages do you speak?", options: ["Vad talar du för språk?", "Var bor du?", "Vad heter du?"], answer: "Vad talar du för språk?", audio: "Vad talar du för språk?" },
  { module: "intro", q: "Choose the reply to 'Trevligt att träffas.'", options: ["Trevligt att träffas.", "Jag bor.", "Vad kostar det?"], answer: "Trevligt att träffas.", audio: "Trevligt att träffas." },
  { module: "wordorder", q: "Choose the correct statement.", options: ["Jag bor i Stockholm.", "Bor jag i Stockholm?", "I Stockholm jag bor."], answer: "Jag bor i Stockholm.", audio: "Jag bor i Stockholm." },
  { module: "wordorder", q: "Choose the correct question.", options: ["Bor du i Stockholm?", "Du bor i Stockholm?", "I Stockholm bor du."], answer: "Bor du i Stockholm?", audio: "Bor du i Stockholm?" },
  { module: "wordorder", q: "What comes second in many Swedish main clauses?", options: ["The verb", "The adjective", "The country"], answer: "The verb" },
  { module: "wordorder", q: "Choose the question-word pattern.", options: ["Vad heter du?", "Du heter vad?", "Heter vad du?"], answer: "Vad heter du?", audio: "Vad heter du?" },
  { module: "verbs", q: "Translate: I live in Stockholm.", options: ["Jag bor i Stockholm.", "Jag är i Stockholm.", "Jag har Stockholm."], answer: "Jag bor i Stockholm.", audio: "Jag bor i Stockholm." },
  { module: "verbs", q: "Translate: I study Swedish.", options: ["Jag studerar svenska.", "Jag talar svenska.", "Jag kommer svenska."], answer: "Jag studerar svenska.", audio: "Jag studerar svenska." },
  { module: "verbs", q: "Which means 'we'?", options: ["vi", "ni", "de"], answer: "vi", audio: "vi" },
  { module: "verbs", q: "Which present tense verb means 'understand'?", options: ["förstår", "kommer", "heter"], answer: "förstår", audio: "förstår" },
  { module: "numbers", q: "What is 2 in Swedish?", options: ["två", "tre", "tio"], answer: "två", audio: "två" },
  { module: "numbers", q: "What is 7 in Swedish?", options: ["sju", "sex", "åtta"], answer: "sju", audio: "sju" },
  { module: "numbers", q: "Translate: It is one o'clock.", options: ["Klockan är ett.", "Klockan är tio.", "Vad är klockan?"], answer: "Klockan är ett.", audio: "Klockan är ett." },
  { module: "numbers", q: "What is 10 in Swedish?", options: ["tio", "tolv", "tre"], answer: "tio", audio: "tio" },
  { module: "food", q: "Translate: I would like coffee.", options: ["Jag skulle vilja ha kaffe.", "Jag heter kaffe.", "Vad kostar kaffe?"], answer: "Jag skulle vilja ha kaffe.", audio: "Jag skulle vilja ha kaffe." },
  { module: "food", q: "Translate: How much does it cost?", options: ["Vad kostar det?", "Vad heter det?", "Varifrån kommer det?"], answer: "Vad kostar det?", audio: "Vad kostar det?" },
  { module: "food", q: "Which means 'water'?", options: ["vatten", "bröd", "mjölk"], answer: "vatten", audio: "vatten" },
  { module: "food", q: "Which means 'please / here you go'?", options: ["Varsågod", "Ursäkta", "Hej"], answer: "Varsågod", audio: "Varsågod" },
  { module: "workbook", q: "After checking an answer, what should you do?", options: ["Say it aloud", "Delete it", "Skip the chapter"], answer: "Say it aloud" },
  { module: "workbook", q: "What should you learn with each noun?", options: ["Its article: en or ett", "Only its first letter", "Only its English translation"], answer: "Its article: en or ett" },
  { module: "workbook", q: "Best review timing?", options: ["Review missed items tomorrow", "Wait one month", "Never repeat"], answer: "Review missed items tomorrow" },
  { module: "workbook", q: "What is the best first speaking goal?", options: ["Clear and slow", "Fast and perfect", "Silent reading only"], answer: "Clear and slow" }
];

const modules = [
  {
    id: "alphabet",
    title: "Alphabet and Pronunciation",
    goal: "Learn the 29 Swedish letters, especially Å, Ä, Ö, and warm up with short everyday words.",
    tags: ["Uttal", "Å Ä Ö", "browser audio"],
    phrase: "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, Å, Ä, Ö",
    pdf: "/materials/textbook/Uttal%20%26%20Grammatik.pdf",
    cards: [
      ["Listen and repeat", "Play the alphabet, then click the individual letter cards below."],
      ["Long vs short", "Compare tak and tack. The double consonant usually shortens the vowel."],
      ["Daily habit", "Spend 3 minutes on Å, Ä, Ö before each study session."]
    ]
  },
  {
    id: "intro",
    title: "Names, Languages, and Countries",
    goal: "Introduce yourself, ask someone's name, say where you are from, and say which languages you speak.",
    tags: ["Kapitel 1", "speaking", "dialogue"],
    phrase: "Hej! Jag heter Rony. Jag kommer från Indien. Jag talar engelska och lite svenska.",
    pdf: "/materials/textbook/Kapitel%2001.pdf",
    cards: [
      ["Question", "Vad heter du?"],
      ["Answer", "Jag heter ..."],
      ["Question", "Varifrån kommer du?"],
      ["Answer", "Jag kommer från ..."]
    ]
  },
  {
    id: "wordorder",
    title: "Word Order and Questions",
    goal: "Understand Swedish verb position: statements use subject + verb, while questions often start with the verb or question word.",
    tags: ["grammar", "verb position", "questions"],
    phrase: "Vad heter du? Talar du svenska? Jag talar engelska.",
    pdf: "/materials/textbook/Kapitel%2001.pdf",
    cards: [
      ["Statement", "Jag heter Rony."],
      ["Question word", "Vad heter du?"],
      ["Yes/no question", "Talar du svenska?"],
      ["Practice", "Turn Du bor i Stockholm into Bor du i Stockholm?"]
    ]
  },
  {
    id: "verbs",
    title: "Pronouns and Present Tense",
    goal: "Use jag, du, han, hon, vi, ni, de with high-frequency present tense verbs.",
    tags: ["pronouns", "verbs", "present tense"],
    phrase: "Jag bor i Stockholm. Jag studerar svenska. Jag förstår lite.",
    pdf: "/materials/textbook/Kapitel%2001.pdf",
    cards: [
      ["Pronouns", "jag, du, han, hon, vi, ni, de"],
      ["Verbs", "heter, kommer, talar, förstår, bor, studerar"],
      ["Sentence", "Jag studerar svenska."],
      ["Sentence", "Vi talar engelska."]
    ]
  },
  {
    id: "numbers",
    title: "Numbers and Time",
    goal: "Learn basic numbers and ask or answer what time it is.",
    tags: ["Kapitel 3", "numbers", "time"],
    phrase: "Vad är klockan? Klockan är ett. Klockan är två.",
    pdf: "/materials/textbook/Kapitel%2003.pdf",
    cards: [
      ["0-5", "noll, en, två, tre, fyra, fem"],
      ["6-10", "sex, sju, åtta, nio, tio"],
      ["Question", "Vad är klockan?"],
      ["Answer", "Klockan är ..."]
    ]
  },
  {
    id: "food",
    title: "Cafe and Shopping Basics",
    goal: "Order something simple, ask the price, and use polite phrases.",
    tags: ["Kapitel 4", "food", "shopping"],
    phrase: "Jag skulle vilja ha kaffe, tack. Vad kostar det?",
    pdf: "/materials/textbook/Kapitel%2004.pdf",
    cards: [
      ["Order", "Jag skulle vilja ha kaffe."],
      ["Price", "Vad kostar det?"],
      ["Thanks", "Tack."],
      ["Polite reply", "Varsågod."]
    ]
  },
  {
    id: "workbook",
    title: "Workbook Practice",
    goal: "Use the workbook to lock in grammar and vocabulary from each textbook chapter.",
    tags: ["Övningsbok", "writing", "review"],
    phrase: "Jag övar svenska varje dag.",
    pdf: "/materials/workbook/Kapitel%2001.pdf",
    cards: [
      ["Routine", "Read the textbook model first."],
      ["Write", "Do the matching workbook exercises."],
      ["Speak", "Read your answers aloud."],
      ["Review", "Repeat missed items the next day."]
    ]
  }
];

const plan = [
  ["Day 1", "Learn the alphabet. Play each Swedish letter aloud twice."],
  ["Day 2", "Read textbook chapter 1 and write your self-introduction."],
  ["Day 3", "Practice word order: subject + verb, question word + verb + subject."],
  ["Day 4", "Do workbook chapter 1 exercises."],
  ["Day 5", "Memorize pronouns and ten present tense verbs."],
  ["Day 6", "Speak five sentences about yourself without looking."],
  ["Day 7", "Learn en/ett nouns and definite endings."],
  ["Day 8", "Do textbook chapter 2 and workbook chapter 2 review."],
  ["Day 9", "Learn numbers 0-20 and ask for the time."],
  ["Day 10", "Practice a daily routine with present tense verbs."],
  ["Day 11", "Learn food and cafe phrases."],
  ["Day 12", "Make a tiny shopping dialogue."],
  ["Day 13", "Record a 60-second introduction."],
  ["Day 14", "Review flashcards and reread chapters 1-3 aloud."]
];

let swedishVoice = null;
let currentCard = 0;
let currentQuiz = 0;
let currentModuleId = "alphabet";
let activeQuizModule = "all";
let currentProfile = "Rony";
let serverMode = false;
let serverSyncTimer = null;

function storageKey(base) {
  return `${base}:${currentProfile}`;
}

function displayName() {
  return currentProfile || "Rony";
}

function updatePersonalization() {
  const title = `${displayName()} Swedish Learning Journey`;
  document.title = title;
  const appTitle = document.getElementById("appTitle");
  const heroTitle = document.getElementById("heroTitle");
  const progressTitle = document.getElementById("progressTitle");
  if (appTitle) appTitle.textContent = title;
  if (heroTitle) heroTitle.textContent = title;
  if (progressTitle) progressTitle.textContent = `${displayName()} Progress`;
}

function looksSwedish(text) {
  const clean = text.trim();
  if (!clean) return false;
  if (/[åäöÅÄÖ]/.test(clean)) return true;
  const swedishWords = /\b(jag|du|han|hon|vi|ni|de|hej|tack|heter|kommer|från|talar|svenska|engelska|lite|trevligt|träffas|förstår|ursäkta|vad|varifrån|språk|klockan|skulle|vilja|kaffe|bor|studerar|varsågod|vatten|bröd|mjölk|två|tre|tio|sju|sex|åtta)\b/i;
  return swedishWords.test(clean);
}

function activeQuizItems() {
  if (activeQuizModule === "all") return quiz;
  return quiz.filter((item) => item.module === activeQuizModule);
}

function openLearningDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ronsSwedishLearningJourney", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("answers")) {
        db.createObjectStore("answers", { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveAnswerToDb(record) {
  try {
    const db = await openLearningDb();
    const tx = db.transaction("answers", "readwrite");
    tx.objectStore("answers").add({ ...record, scope: "active" });
  } catch {
    // The local score report still works through localStorage if IndexedDB is blocked.
  }
}

async function saveArchiveToDb(report) {
  try {
    const db = await openLearningDb();
    const tx = db.transaction("answers", "readwrite");
    const store = tx.objectStore("answers");
    store.add({ scope: "archive-summary", ...report });
    (report.answerHistory || []).forEach((entry) => {
      store.add({ ...entry, scope: "archived-answer", archiveId: report.id, archivedAt: report.archivedAt });
    });
  } catch {
    // Archived reports remain available through localStorage if IndexedDB is blocked.
  }
}

async function clearAnswerDb() {
  try {
    const db = await openLearningDb();
    const tx = db.transaction("answers", "readwrite");
    tx.objectStore("answers").clear();
  } catch {
    // Nothing else to clear if the browser database is unavailable.
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getMetrics() {
  return JSON.parse(localStorage.getItem(storageKey("swedishLearningMetrics")) || JSON.stringify({
    attempts: 0,
    correct: 0,
    completedModules: {},
    moduleStats: {},
    answerHistory: [],
    studyDays: {},
    lastStudy: ""
  }));
}

function saveMetrics(metrics) {
  localStorage.setItem(storageKey("swedishLearningMetrics"), JSON.stringify(metrics));
  scheduleServerSync();
}

function getArchivedReports() {
  return JSON.parse(localStorage.getItem(storageKey("swedishArchivedReports")) || "[]");
}

function saveArchivedReports(reports) {
  localStorage.setItem(storageKey("swedishArchivedReports"), JSON.stringify(reports));
  scheduleServerSync();
}

function getPlanProgress() {
  return JSON.parse(localStorage.getItem(storageKey("swedishPlan")) || "{}");
}

function savePlanProgress(planProgress) {
  localStorage.setItem(storageKey("swedishPlan"), JSON.stringify(planProgress));
  scheduleServerSync();
}

function scheduleServerSync() {
  if (!serverMode) return;
  clearTimeout(serverSyncTimer);
  serverSyncTimer = setTimeout(saveStateToServer, 250);
}

async function saveStateToServer() {
  if (!serverMode) return;
  try {
    await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: currentProfile,
        metrics: getMetrics(),
        archives: getArchivedReports(),
        plan: getPlanProgress()
      })
    });
  } catch {
    document.getElementById("serverStatus").textContent = "Server save failed. Your browser still has a local copy.";
  }
}

async function initServerProfiles() {
  try {
    const info = await fetch("/api/server-info").then((res) => res.json());
    serverMode = true;
    document.getElementById("serverProfiles").classList.remove("hiddenPanel");
    document.getElementById("serverStatus").textContent = `Server save is on. Wife can connect at ${info.lanUrl}/index.html`;
    const profiles = await fetch("/api/profiles").then((res) => res.json());
    const savedProfile = localStorage.getItem("swedishServerProfile") || "Rony";
    await renderProfileSelect(profiles.profiles || ["Rony", "Lincy"], savedProfile);
  } catch {
    serverMode = false;
  }
}

async function renderProfileSelect(profiles, preferred) {
  const select = document.getElementById("profileSelect");
  select.innerHTML = "";
  profiles.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
  currentProfile = profiles.includes(preferred) ? preferred : profiles[0] || "Rony";
  select.value = currentProfile;
  await loadProfileState(currentProfile);
  select.onchange = async () => {
    currentProfile = select.value;
    localStorage.setItem("swedishServerProfile", currentProfile);
    await loadProfileState(currentProfile);
    renderAll();
  };
  document.getElementById("addProfile").onclick = addServerProfile;
  document.getElementById("deleteProfile").onclick = deleteServerProfile;
}

async function addServerProfile() {
  const input = document.getElementById("newProfileName");
  const name = input.value.trim();
  if (!name) return;
  await fetch("/api/profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  input.value = "";
  const profiles = await fetch("/api/profiles").then((res) => res.json());
  await renderProfileSelect(profiles.profiles || [name], name);
  renderAll();
}

async function deleteServerProfile() {
  const select = document.getElementById("profileSelect");
  const profile = select.value;
  if (!profile) return;
  const ok = confirm(`Delete profile "${profile}"? Default profiles Rony and Lincy will be recreated if deleted.`);
  if (!ok) return;
  await fetch(`/api/profiles?profile=${encodeURIComponent(profile)}`, { method: "DELETE" });
  localStorage.removeItem(storageKey("swedishLearningMetrics"));
  localStorage.removeItem(storageKey("swedishArchivedReports"));
  localStorage.removeItem(storageKey("swedishPlan"));
  const profiles = await fetch("/api/profiles").then((res) => res.json());
  const nextProfile = profiles.profiles?.find((name) => name !== profile) || "Rony";
  await renderProfileSelect(profiles.profiles || ["Rony", "Lincy"], nextProfile);
  renderAll();
}

async function loadProfileState(profile) {
  if (!serverMode) return;
  const state = await fetch(`/api/state?profile=${encodeURIComponent(profile)}`).then((res) => res.json());
  currentProfile = state.profile;
  localStorage.setItem("swedishServerProfile", currentProfile);
  localStorage.setItem(storageKey("swedishLearningMetrics"), JSON.stringify(state.metrics || getMetrics()));
  localStorage.setItem(storageKey("swedishArchivedReports"), JSON.stringify(state.archives || []));
  localStorage.setItem(storageKey("swedishPlan"), JSON.stringify(state.plan || {}));
  updatePersonalization();
  document.getElementById("serverStatus").textContent = `Saving as ${currentProfile}. Other laptops use this server URL from the same Wi-Fi.`;
}

function createProgressSnapshot(reason = "Manual reset") {
  const metrics = getMetrics();
  if (!metrics.attempts && !metrics.correct && !Object.keys(metrics.completedModules || {}).length && !Object.keys(metrics.studyDays || {}).length) {
    return null;
  }
  const reports = getArchivedReports();
  const summary = summarizeMetrics(metrics);
  const completed = Object.values(metrics.completedModules || {}).filter(Boolean).length;
  const snapshot = {
    id: Date.now(),
    reason,
    archivedAt: new Date().toLocaleString(),
    attempts: summary.attempts || 0,
    correct: summary.correct || 0,
    accuracy: pct(summary.correct || 0, summary.attempts || 0),
    completedModules: completed,
    totalModules: modules.length,
    studyDays: Object.keys(metrics.studyDays || {}).length,
    lastStudy: metrics.lastStudy || "",
    moduleStats: summary.moduleStats || {},
    answerHistory: (metrics.answerHistory || []).slice(0, 80)
  };
  reports.unshift(snapshot);
  saveArchivedReports(reports.slice(0, 25));
  saveArchiveToDb(snapshot);
  return snapshot;
}

function recordStudy(metrics) {
  const today = todayKey();
  metrics.studyDays[today] = true;
  metrics.lastStudy = today;
}

function recordQuizAnswer(moduleId, ok, question, selected, answer) {
  const metrics = getMetrics();
  metrics.answerHistory ||= [];
  const previousAttempts = (metrics.answerHistory || []).filter((entry) => entry.question === question).length;
  metrics.attempts += 1;
  if (ok) metrics.correct += 1;
  metrics.moduleStats[moduleId] ||= { attempts: 0, correct: 0 };
  metrics.moduleStats[moduleId].attempts += 1;
  if (ok) metrics.moduleStats[moduleId].correct += 1;
  metrics.answerHistory.unshift({
    at: new Date().toLocaleString(),
    module: moduleId,
    question,
    selected,
    answer,
    ok,
    tries: previousAttempts + 1
  });
  metrics.answerHistory = metrics.answerHistory.slice(0, 80);
  recordStudy(metrics);
  saveMetrics(metrics);
  saveAnswerToDb(metrics.answerHistory[0]);
  renderMetrics();
}

function completeModule(moduleId) {
  const metrics = getMetrics();
  metrics.completedModules[moduleId] = true;
  recordStudy(metrics);
  saveMetrics(metrics);
  renderMetrics();
  renderModules();
  const detail = document.getElementById("metricDrilldown");
  if (detail?.querySelector("#markModuleComplete")) renderModuleDetail(moduleId);
}

function resetLearningMetrics() {
  createProgressSnapshot("Progress reset");
  localStorage.removeItem(storageKey("swedishLearningMetrics"));
  clearAnswerDb();
  document.getElementById("metricDrilldown").innerHTML = "";
  renderMetrics();
  renderModules();
  scheduleServerSync();
}

function clearCurrentProgress() {
  localStorage.removeItem(storageKey("swedishLearningMetrics"));
  clearAnswerDb();
  document.getElementById("metricDrilldown").innerHTML = "";
  renderMetrics();
  renderModules();
  scheduleServerSync();
}

function resetModuleProgress(moduleId) {
  const metrics = getMetrics();
  const moduleEntries = (metrics.answerHistory || []).filter((entry) => entry.module === moduleId);
  const correctToRemove = moduleEntries.filter((entry) => entry.ok).length;
  metrics.answerHistory = (metrics.answerHistory || []).filter((entry) => entry.module !== moduleId);
  metrics.attempts = Math.max(0, (metrics.attempts || 0) - moduleEntries.length);
  metrics.correct = Math.max(0, (metrics.correct || 0) - correctToRemove);
  delete metrics.moduleStats[moduleId];
  delete metrics.completedModules[moduleId];
  if (!metrics.answerHistory.length) {
    metrics.studyDays = {};
    metrics.lastStudy = "";
  }
  saveMetrics(metrics);
  renderMetrics();
  renderModules();
  renderModuleDetail(moduleId);
}

function startModuleQuiz(moduleId) {
  window.location.href = `quiz.html?module=${encodeURIComponent(moduleId)}`;
}

function clearArchivedReports() {
  localStorage.removeItem(storageKey("swedishArchivedReports"));
  document.getElementById("archivedReportDetail").innerHTML = "";
  renderArchivedReports();
  scheduleServerSync();
}

function clearAnswerHistory() {
  const metrics = getMetrics();
  metrics.answerHistory = [];
  metrics.attempts = 0;
  metrics.correct = 0;
  metrics.moduleStats = {};
  metrics.completedModules = {};
  metrics.studyDays = {};
  metrics.lastStudy = "";
  saveMetrics(metrics);
  clearAnswerDb();
  document.getElementById("metricDrilldown").innerHTML = "";
  renderMetrics();
  renderModules();
}

function moduleState(metrics, stats, moduleId) {
  if (metrics.completedModules?.[moduleId]) return "complete";
  if ((stats.attempts || 0) > 0) return "in-progress";
  return "not-started";
}

function moduleStateLabel(state) {
  if (state === "complete") return "Complete";
  if (state === "in-progress") return "In progress";
  return "Not started";
}

function pct(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}

function summarizeMetrics(metrics) {
  const latestByQuestion = new Map();
  (metrics.answerHistory || []).forEach((entry) => {
    if (!latestByQuestion.has(entry.question)) latestByQuestion.set(entry.question, entry);
  });
  const latest = Array.from(latestByQuestion.values());
  const moduleStats = {};
  latest.forEach((entry) => {
    moduleStats[entry.module] ||= { attempts: 0, correct: 0 };
    moduleStats[entry.module].attempts += 1;
    if (entry.ok) moduleStats[entry.module].correct += 1;
  });
  return {
    attempts: latest.length,
    correct: latest.filter((entry) => entry.ok).length,
    moduleStats,
    latest
  };
}

function renderMetrics() {
  const metrics = getMetrics();
  const summary = summarizeMetrics(metrics);
  const accuracy = pct(summary.correct, summary.attempts);
  const completed = Object.values(metrics.completedModules).filter(Boolean).length;
  const studyDays = Object.keys(metrics.studyDays).length;
  document.getElementById("accuracyMetric").textContent = `${accuracy}%`;
  document.getElementById("accuracyBar").style.width = `${accuracy}%`;
  document.getElementById("correctMetric").textContent = summary.correct;
  document.getElementById("attemptMetric").textContent = `${summary.attempts} questions`;
  document.getElementById("moduleMetric").textContent = `${completed}/${modules.length}`;
  document.getElementById("moduleBar").style.width = `${pct(completed, modules.length)}%`;
  document.getElementById("studyDaysMetric").textContent = studyDays;
  document.getElementById("lastStudyMetric").textContent = metrics.lastStudy ? `Last activity: ${metrics.lastStudy}` : "No activity yet";

  let level = "Start with one quiz answer. The page will estimate your level as you practice.";
  if (summary.attempts >= 1 && accuracy < 60) level = "Foundation: keep repeating phrases and use the Play buttons before answering.";
  if (summary.attempts >= 3 && accuracy >= 60) level = "Building: you are recognizing beginner patterns. Add workbook writing practice.";
  if (summary.attempts >= 6 && accuracy >= 80) level = "Strong start: move between modules and answer without audio first.";
  if (summary.attempts >= 10 && accuracy >= 90 && completed >= 4) level = "Excellent A1 momentum: start making your own dialogues from the textbook themes.";
  document.getElementById("levelMetric").textContent = level;

  const list = document.getElementById("moduleScoreList");
  list.innerHTML = "";
  modules.forEach((module) => {
    const stats = summary.moduleStats[module.id] || { attempts: 0, correct: 0 };
    const moduleAccuracy = pct(stats.correct, stats.attempts);
    const state = moduleState(metrics, stats, module.id);
    const done = moduleStateLabel(state);
    const row = document.createElement("button");
    row.type = "button";
    row.className = `moduleScore moduleScoreButton ${state}`;
    row.innerHTML = `<div><strong>${module.title}</strong><small>${stats.correct}/${stats.attempts} quiz correct - ${done}</small></div><span>${moduleAccuracy}%</span>`;
    row.addEventListener("click", () => {
      window.location.href = `module.html?module=${encodeURIComponent(module.id)}`;
    });
    list.appendChild(row);
  });

  const history = document.getElementById("answerHistory");
  history.innerHTML = "";
  const entries = metrics.answerHistory || [];
  if (!entries.length) {
    history.innerHTML = `<div class="historyRow"><div><strong>No quiz answers yet</strong><small>Answer a few questions to build your report.</small></div><span class="historyBadge">0</span></div>`;
    return;
  }
  entries.slice(0, 20).forEach((entry) => {
    const module = modules.find((item) => item.id === entry.module);
    const row = document.createElement("div");
    row.className = "historyRow";
    const actionLabel = entry.ok ? "Correct" : "Review";
    row.innerHTML = `<div><strong>${entry.question}</strong><small>${module ? module.title : entry.module} - Your answer: ${entry.selected} - Correct: ${entry.answer} - Attempt ${entry.tries || 1}/3 - ${entry.at}</small></div><button type="button" class="historyBadge ${entry.ok ? "pass" : "fail"}">${actionLabel}</button>`;
    row.querySelector("button").addEventListener("click", () => openAnswerReview(entry));
    history.appendChild(row);
  });
  renderArchivedReports();
}

function renderArchivedReports() {
  const list = document.getElementById("archivedReports");
  if (!list) return;
  const reports = getArchivedReports();
  list.innerHTML = "";
  if (!reports.length) {
    list.innerHTML = `<div class="historyRow"><div><strong>No archived reports yet</strong><small>Use Reset quiz metrics after a study round to archive a snapshot.</small></div><span class="historyBadge">0</span></div>`;
    return;
  }
  reports.forEach((report) => {
    const row = document.createElement("div");
    row.className = "historyRow";
    row.innerHTML = `<div><strong>${report.archivedAt}</strong><small>${report.reason} - ${report.correct}/${report.attempts} correct - ${report.accuracy}% accuracy - ${report.completedModules}/${report.totalModules} modules</small></div><button type="button">Open</button>`;
    row.querySelector("button").addEventListener("click", () => renderArchivedReportDetail(report.id));
    list.appendChild(row);
  });
}

function renderArchivedReportDetail(reportId) {
  const reports = getArchivedReports();
  const report = reports.find((item) => item.id === reportId);
  const detail = document.getElementById("archivedReportDetail");
  if (!report) {
    detail.innerHTML = "";
    return;
  }
  const moduleRows = modules.map((module) => {
    const stats = report.moduleStats[module.id] || { attempts: 0, correct: 0 };
    return `<div class="moduleScore"><div><strong>${module.title}</strong><small>${stats.correct}/${stats.attempts} correct</small></div><span>${pct(stats.correct, stats.attempts)}%</span></div>`;
  }).join("");
  const answerRows = (report.answerHistory || []).slice(0, 10).map((entry) => {
    return `<div class="historyRow"><div><strong>${entry.question}</strong><small>Your answer: ${entry.selected} - Correct: ${entry.answer} - ${entry.at}</small></div><span class="historyBadge ${entry.ok ? "pass" : "fail"}">${entry.ok ? "Correct" : "Review"}</span></div>`;
  }).join("");
  detail.innerHTML = `
    <h3>Report from ${report.archivedAt}</h3>
    <div class="archiveStats">
      <div><span>Accuracy</span><strong>${report.accuracy}%</strong></div>
      <div><span>Score</span><strong>${report.correct}/${report.attempts}</strong></div>
      <div><span>Modules</span><strong>${report.completedModules}/${report.totalModules}</strong></div>
      <div><span>Study days</span><strong>${report.studyDays}</strong></div>
    </div>
    <div class="moduleScoreList">${moduleRows}</div>
    <h3>Recent answers in this report</h3>
    <div class="answerHistory">${answerRows || "<p>No answer history in this report.</p>"}</div>
  `;
}

function renderMetricDrilldown(kind) {
  const metrics = getMetrics();
  const entries = metrics.answerHistory || [];
  const detail = document.getElementById("metricDrilldown");
  const wrong = entries.filter((entry) => !entry.ok);
  const correct = entries.filter((entry) => entry.ok);
  const completed = modules.filter((module) => metrics.completedModules?.[module.id]);
  const incomplete = modules.filter((module) => !metrics.completedModules?.[module.id]);

  if (kind === "accuracy") {
    detail.innerHTML = `
      <h3>Quiz Accuracy Details</h3>
      <div class="archiveStats">
        <div><span>Correct</span><strong>${correct.length}</strong></div>
        <div><span>Wrong</span><strong>${wrong.length}</strong></div>
        <div><span>Total</span><strong>${entries.length}</strong></div>
      </div>
      <h3>Wrong answers to review</h3>
      <div class="answerHistory">${renderAnswerRows(wrong, "No wrong answers in current progress.")}</div>
    `;
    attachReviewButtons(detail);
    return;
  }

  if (kind === "correct") {
    detail.innerHTML = `
      <h3>Correct Answers</h3>
      <div class="answerHistory">${renderAnswerRows(correct, "No correct answers yet.")}</div>
    `;
    attachReviewButtons(detail);
    return;
  }

  if (kind === "modules") {
    const completedRows = completed.map((module) => `<div class="moduleScore"><div><strong>${module.title}</strong><small>Marked complete in this progress version</small></div><span>Done</span></div>`).join("");
    const incompleteRows = incomplete.map((module) => `<div class="moduleScore"><div><strong>${module.title}</strong><small>Not completed yet</small></div><span>Open</span></div>`).join("");
    detail.innerHTML = `
      <h3>Module Completion</h3>
      <div class="archiveStats">
        <div><span>Completed</span><strong>${completed.length}</strong></div>
        <div><span>Remaining</span><strong>${incomplete.length}</strong></div>
      </div>
      <div class="moduleScoreList">${completedRows || "<p>No modules marked complete yet.</p>"}${incompleteRows}</div>
    `;
    attachReviewButtons(detail);
    return;
  }

  detail.innerHTML = `
    <h3>Study Activity</h3>
    <div class="archiveStats">
      <div><span>Study days</span><strong>${Object.keys(metrics.studyDays || {}).length}</strong></div>
      <div><span>Last activity</span><strong>${metrics.lastStudy || "None"}</strong></div>
    </div>
    <div class="answerHistory">${renderAnswerRows(entries.slice(0, 20), "No activity yet.")}</div>
  `;
  attachReviewButtons(detail);
}

function renderModuleDetail(moduleId) {
  const module = modules.find((item) => item.id === moduleId);
  if (!module) return;
  const metrics = getMetrics();
  const stats = metrics.moduleStats[moduleId] || { attempts: 0, correct: 0 };
  const entries = (metrics.answerHistory || []).filter((entry) => entry.module === moduleId);
  const wrong = entries.filter((entry) => !entry.ok);
  const moduleQuestions = quiz.filter((item) => item.module === moduleId);
  const detail = document.getElementById("metricDrilldown");
  const lessonCards = module.cards.map(([title, body]) => {
    const audioButton = hasSwedishAudio(body) ? `<button type="button" data-audio="${encodeURIComponent(body)}">Swedish audio</button>` : "";
    return `<article class="moduleCard"><strong>${title}</strong><p>${body}</p>${audioButton}</article>`;
  }).join("");
  const questionCards = moduleQuestions.map((item, index) => {
    const options = item.options.map((option) => {
      const cls = option === item.answer ? " class=\"correctText\"" : "";
      return `<li${cls}>${option}</li>`;
    }).join("");
    const audioText = item.audio || item.answer;
    const audioButton = hasSwedishAudio(audioText) ? `<button type="button" data-audio="${encodeURIComponent(audioText)}">Play answer</button>` : "";
    const latest = entries.find((entry) => entry.question === item.q);
    const progress = latest
      ? `<p><strong>Your latest answer:</strong> ${latest.selected} (${latest.ok ? "correct" : "review"})</p>`
      : `<p><strong>Your latest answer:</strong> Not answered yet</p>`;
    return `<article class="moduleQuestionCard"><h4>${index + 1}. ${item.q}</h4><ul>${options}</ul><p><strong>Answer:</strong> ${item.answer}</p>${progress}${audioButton}</article>`;
  }).join("");
  detail.innerHTML = `
    <h3>${module.title}</h3>
    <div class="archiveStats">
      <div><span>Score</span><strong>${stats.correct}/${stats.attempts}</strong></div>
      <div><span>Accuracy</span><strong>${pct(stats.correct, stats.attempts)}%</strong></div>
      <div><span>Status</span><strong>${metrics.completedModules[moduleId] ? "Complete" : "Open"}</strong></div>
      <div><span>Wrong</span><strong>${wrong.length}</strong></div>
    </div>
    <div class="actions">
      <button type="button" id="startModuleQuiz">Start this quiz</button>
      <button type="button" id="markModuleComplete">Mark complete</button>
      <button type="button" id="resetModuleProgress">Reset this module</button>
      <button type="button" id="openModulePdf">Open PDF</button>
    </div>
    <div class="moduleLessonGrid">
      <div>
        <h3>Learning Material</h3>
        <div class="moduleContent">${lessonCards}</div>
      </div>
      <div>
        <h3>Quiz + Your Progress</h3>
        <div class="moduleQuizList">${questionCards}</div>
      </div>
    </div>
    <h3>Wrong answers in this module</h3>
    <div class="answerHistory">${renderAnswerRows(wrong, "No wrong answers in this module.")}</div>
  `;
  detail.querySelectorAll("[data-audio]").forEach((button) => {
    button.addEventListener("click", () => playRecordedOrSpeak(decodeURIComponent(button.dataset.audio)));
  });
  attachReviewButtons(detail);
  document.getElementById("startModuleQuiz").addEventListener("click", () => startModuleQuiz(moduleId));
  document.getElementById("markModuleComplete").addEventListener("click", () => completeModule(moduleId));
  document.getElementById("resetModuleProgress").addEventListener("click", () => resetModuleProgress(moduleId));
  document.getElementById("openModulePdf").addEventListener("click", () => window.open(module.pdf, "_blank"));
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function attachReviewButtons(root = document) {
  root.querySelectorAll("[data-review-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = findLatestEntryByQuestion(decodeURIComponent(button.dataset.reviewQuestion));
      if (entry) openAnswerReview(entry);
    });
  });
}

function findLatestEntryByQuestion(question) {
  const metrics = getMetrics();
  return (metrics.answerHistory || []).find((entry) => entry.question === question);
}

function openAnswerReview(entry) {
  const item = quiz.find((question) => question.q === entry.question);
  if (!item) return;
  const detail = document.getElementById("metricDrilldown");
  const attempts = (getMetrics().answerHistory || []).filter((history) => history.question === entry.question).length;
  const locked = entry.ok || attempts >= 3;
  const options = item.options.map((option) => {
    const selected = option === entry.selected ? " selected" : "";
    const correct = option === item.answer ? " correctText" : "";
    const disabled = locked ? " disabled" : "";
    return `<button type="button" class="reviewOption${selected}${correct}" data-answer="${encodeURIComponent(option)}"${disabled}>${option}</button>`;
  }).join("");
  detail.innerHTML = `
    <h3>${entry.ok ? "Correct Answer Review" : "Review and Reattempt"}</h3>
    <div class="moduleQuestionCard">
      <p class="eyebrow">${modules.find((module) => module.id === item.module)?.title || item.module}</p>
      <h4>${item.q}</h4>
      <p><strong>Your latest answer:</strong> ${entry.selected}</p>
      <p><strong>Correct answer:</strong> ${entry.answer}</p>
      <p><strong>Attempts:</strong> ${attempts}/3 ${locked && !entry.ok ? "- locked" : ""}</p>
      <div class="reviewOptions">${options}</div>
      <div class="actions">
        <button type="button" id="reviewPlayAnswer"${hasSwedishAudio(item.audio || item.answer) ? "" : " disabled"}>Play answer</button>
        <button type="button" id="reviewBack">Back to report</button>
      </div>
    </div>
  `;
  detail.querySelectorAll(".reviewOption").forEach((button) => {
    button.addEventListener("click", () => {
      if (locked) return;
      const selected = decodeURIComponent(button.dataset.answer);
      const ok = selected === item.answer;
      recordQuizAnswer(item.module, ok, item.q, selected, item.answer);
      openAnswerReview(findLatestEntryByQuestion(item.q));
    });
  });
  document.getElementById("reviewPlayAnswer").addEventListener("click", () => playRecordedOrSpeak(item.audio || item.answer));
  document.getElementById("reviewBack").addEventListener("click", () => renderMetricDrilldown(entry.ok ? "correct" : "accuracy"));
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderAnswerRows(entries, emptyText) {
  if (!entries.length) {
    return `<div class="historyRow"><div><strong>${emptyText}</strong><small>Keep practicing to build this report.</small></div><span class="historyBadge">0</span></div>`;
  }
  return entries.map((entry) => {
    const module = modules.find((item) => item.id === entry.module);
    return `<div class="historyRow"><div><strong>${entry.question}</strong><small>${module ? module.title : entry.module} - Your answer: ${entry.selected} - Correct: ${entry.answer} - Attempt ${entry.tries || 1}/3 - ${entry.at}</small></div><button type="button" class="historyBadge ${entry.ok ? "pass" : "fail"}" data-review-question="${encodeURIComponent(entry.question)}">${entry.ok ? "Correct" : "Review"}</button></div>`;
  }).join("");
}

function pickVoice() {
  const voices = speechSynthesis.getVoices();
  swedishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("sv")) || null;
  document.getElementById("voiceStatus").textContent = swedishVoice
    ? `Local MP3 audio + ${swedishVoice.name} backup`
    : "Local Swedish MP3 audio ready";
}

function speak(text, rate = 0.82) {
  if (!swedishVoice) return false;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  utterance.rate = rate;
  if (swedishVoice) utterance.voice = swedishVoice;
  speechSynthesis.speak(utterance);
  return true;
}

function playNativeAlphabet() {
  const audio = document.getElementById("nativeAlphabetAudio");
  if (!audio) return;
  speechSynthesis.cancel();
  audio.currentTime = 0;
  audio.play();
}

function playRecordedOrSpeak(text) {
  const clean = text.trim().normalize("NFC");
  const key = clean.toLowerCase();
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  const src = nonSwedishAudioTexts.has(clean) ? recordedAudio[key] : generated[clean] || recordedAudio[key];
  if (!src) {
    speak(text);
    return;
  }
  speechSynthesis.cancel();
  const audio = document.getElementById("wordAudio");
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function hasSwedishAudio(text) {
  const clean = text.trim().normalize("NFC");
  const key = clean.toLowerCase();
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  return Boolean((generated[clean] && !nonSwedishAudioTexts.has(clean)) || recordedAudio[key]);
}

function playOnlyGeneratedSwedish(text) {
  if (!hasSwedishAudio(text)) return false;
  playRecordedOrSpeak(text);
  return true;
}

function addDashboardCollapseControls() {
  document.querySelectorAll("main > .section").forEach((section) => {
    const head = section.querySelector(":scope > .sectionHead");
    if (!head || head.querySelector(".collapseSection")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "collapseSection";
    button.textContent = "Minimize";
    button.addEventListener("click", () => {
      section.classList.toggle("collapsed");
      button.textContent = section.classList.contains("collapsed") ? "Expand" : "Minimize";
    });
    head.appendChild(button);
  });
}

function renderAlphabet() {
  const grid = document.getElementById("alphabetGrid");
  grid.innerHTML = "";
  alphabet.forEach(([letter, spoken, cue]) => {
    const card = document.createElement("div");
    card.className = "letterCard";
    card.innerHTML = `<strong>${letter}</strong><span>${spoken} · ${cue}</span>`;
    const button = document.createElement("button");
    button.textContent = "Swedish audio";
    button.addEventListener("click", () => playRecordedOrSpeak(spoken));
    card.appendChild(button);
    grid.appendChild(card);
  });
}

function renderPhrases(list = phrases) {
  const phraseList = document.getElementById("phraseList");
  phraseList.innerHTML = "";
  list.forEach(([sv, en]) => {
    const item = document.createElement("div");
    item.className = "phrase";
    item.innerHTML = `<strong>${sv}</strong><small>${en}</small>`;
    const button = document.createElement("button");
    button.textContent = "Swedish audio";
    button.addEventListener("click", () => playRecordedOrSpeak(sv));
    item.appendChild(button);
    phraseList.appendChild(item);
  });
}

function renderModules() {
  const launcher = document.getElementById("moduleLaunchList");
  if (launcher) {
    const metrics = getMetrics();
    launcher.innerHTML = "";
    modules.forEach((module, index) => {
      const stats = summarizeMetrics(metrics).moduleStats[module.id] || { attempts: 0, correct: 0 };
      const state = moduleState(metrics, stats, module.id);
      const link = document.createElement("a");
      link.className = `moduleLaunchButton ${state}`;
      link.href = `module.html?module=${encodeURIComponent(module.id)}`;
      link.innerHTML = `
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${module.title}</strong>
        <small>${state === "complete" ? "Complete" : `${stats.correct}/${stats.attempts} quiz correct - ${moduleStateLabel(state)}`}</small>
      `;
      launcher.appendChild(link);
    });
    return;
  }

  const select = document.getElementById("moduleSelect");
  if (!select) return;
  select.innerHTML = "";
  modules.forEach((module) => {
    const option = document.createElement("option");
    option.value = module.id;
    option.textContent = module.title;
    select.appendChild(option);
  });
  select.onchange = () => showModule(select.value);
  showModule(modules[0].id);
}

function renderQuizSelector() {
  const select = document.getElementById("quizModuleSelect");
  select.innerHTML = `<option value="all">All quiz questions (${quiz.length})</option>`;
  modules.forEach((module) => {
    const count = quiz.filter((item) => item.module === module.id).length;
    const option = document.createElement("option");
    option.value = module.id;
    option.textContent = `${module.title} (${count})`;
    select.appendChild(option);
  });
  select.value = activeQuizModule;
  select.onchange = () => {
    activeQuizModule = select.value;
    currentQuiz = 0;
    renderQuiz();
  };
}

function showModule(id) {
  const module = modules.find((item) => item.id === id) || modules[0];
  currentModuleId = module.id;
  document.getElementById("moduleTitle").textContent = module.title;
  document.getElementById("moduleGoal").textContent = module.goal;
  document.getElementById("moduleChips").innerHTML = module.tags.map((tag) => `<span>${tag}</span>`).join("");
  const content = document.getElementById("moduleContent");
  content.innerHTML = "";
  module.cards.forEach(([title, body]) => {
    const card = document.createElement("div");
    card.className = "moduleCard";
    card.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
    if (hasSwedishAudio(body)) {
      const button = document.createElement("button");
      button.textContent = "Swedish audio";
      button.addEventListener("click", () => playRecordedOrSpeak(body));
      card.appendChild(button);
    }
    content.appendChild(card);
  });
  const openLesson = document.createElement("a");
  openLesson.className = "buttonLink";
  openLesson.href = `module.html?module=${encodeURIComponent(module.id)}`;
  openLesson.textContent = "Open full lesson";
  content.appendChild(openLesson);
  document.getElementById("moduleSpeak").onclick = () => {
    if (module.id === "alphabet") {
      playNativeAlphabet();
      return;
    }
    playRecordedOrSpeak(module.phrase);
  };
  document.getElementById("moduleQuiz").onclick = () => {
    window.location.href = `quiz.html?module=${encodeURIComponent(module.id)}`;
  };
  document.getElementById("moduleComplete").onclick = () => {
    completeModule(module.id);
  };
  document.getElementById("modulePdf").onclick = () => {
    window.open(module.pdf, "_blank");
  };
}

function renderCard() {
  const [prompt, answer] = flashcards[currentCard];
  document.getElementById("cardPrompt").textContent = prompt;
  const answerEl = document.getElementById("cardAnswer");
  answerEl.textContent = answer;
  answerEl.classList.add("hidden");
}

function playCurrentFlashcardAnswer() {
  const [, answer] = flashcards[currentCard];
  playRecordedOrSpeak(answer);
}

function renderQuiz() {
  const items = activeQuizItems();
  if (!items.length) return;
  const item = items[currentQuiz % items.length];
  document.getElementById("quizQuestion").textContent = item.q;
  document.getElementById("playQuizAudio").disabled = !looksSwedish(item.audio || item.answer || "");
  const options = document.getElementById("quizOptions");
  const result = document.getElementById("quizResult");
  result.textContent = `Question ${(currentQuiz % items.length) + 1} of ${items.length}`;
  options.innerHTML = "";
  item.options.forEach((option) => {
    const wrapper = document.createElement("div");
    wrapper.className = "quizOptionRow";
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => {
      const ok = option === item.answer;
      recordQuizAnswer(item.module || currentModuleId, ok, item.q, option, item.answer);
      button.classList.add(ok ? "correct" : "wrong");
      result.textContent = ok ? "Correct. Bra!" : `Not quite. Answer: ${item.answer}`;
      Array.from(options.querySelectorAll("button")).forEach((choice) => {
        choice.disabled = true;
      });
      setTimeout(() => {
        currentQuiz = (currentQuiz + 1) % items.length;
        renderQuiz();
      }, ok ? 800 : 1400);
    });
    const audioButton = document.createElement("button");
    audioButton.textContent = "Play";
    audioButton.disabled = !hasSwedishAudio(option) || !looksSwedish(option);
    audioButton.addEventListener("click", () => playRecordedOrSpeak(option));
    wrapper.appendChild(button);
    wrapper.appendChild(audioButton);
    options.appendChild(wrapper);
  });
}

function renderPlan() {
  const planList = document.getElementById("planList");
  planList.innerHTML = "";
  const saved = getPlanProgress();
  plan.forEach(([day, task], index) => {
    const item = document.createElement("label");
    item.className = "planItem";
    const checked = saved[index] ? "checked" : "";
    item.innerHTML = `<input type="checkbox" ${checked}><span><strong>${day}</strong>${task}</span>`;
    item.querySelector("input").addEventListener("change", (event) => {
      saved[index] = event.target.checked;
      savePlanProgress(saved);
    });
    planList.appendChild(item);
  });
}

function updateIntro() {
  const name = document.getElementById("nameInput").value.trim() || "...";
  const country = document.getElementById("countryInput").value.trim() || "...";
  const city = document.getElementById("cityInput").value.trim() || "...";
  const languages = document.getElementById("languagesInput").value.trim() || "...";
  document.getElementById("builtIntro").value =
    `Hej! Jag heter ${name}.\nJag kommer från ${country}.\nNu bor jag i ${city}.\nJag talar ${languages}.\nJag studerar svenska.`;
  updateBuiltIntroAudioState();
}

function updateBuiltIntroAudioState() {
  const text = document.getElementById("builtIntro").value;
  const hasAudio = hasSwedishAudio(text);
  const button = document.getElementById("speakBuilt");
  const status = document.getElementById("builtIntroAudioStatus");
  button.disabled = !hasAudio;
  status.textContent = hasAudio
    ? "Swedish MP3 audio is available for this introduction."
    : "No generated Swedish audio for this custom text yet. Edit back to the default text or ask me to generate audio for your exact introduction.";
}

function renderAll() {
  updatePersonalization();
  renderAlphabet();
  renderQuizSelector();
  renderModules();
  renderPhrases();
  renderCard();
  renderQuiz();
  renderMetrics();
  renderArchivedReports();
  renderPlan();
  updateIntro();
}

document.addEventListener("DOMContentLoaded", async () => {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
  await initServerProfiles();
  renderAll();
  addDashboardCollapseControls();

  document.getElementById("speakIntro").addEventListener("click", () => {
    playRecordedOrSpeak("Hej! Jag heter Rony. Jag kommer från Indien. Jag talar engelska och lite svenska.");
  });
  document.getElementById("playAlphabet").addEventListener("click", playNativeAlphabet);
  document.getElementById("shufflePhrases").addEventListener("click", () => renderPhrases([...phrases].sort(() => Math.random() - 0.5)));
  document.getElementById("playQuizAudio").addEventListener("click", () => {
    const items = activeQuizItems();
    const item = items[currentQuiz % items.length];
    const audioText = item.audio || item.answer || "";
    if (looksSwedish(audioText)) playRecordedOrSpeak(audioText);
  });
  document.getElementById("restartQuiz").addEventListener("click", () => {
    currentQuiz = 0;
    renderQuiz();
  });
  document.getElementById("showAnswer").addEventListener("click", () => document.getElementById("cardAnswer").classList.remove("hidden"));
  document.getElementById("speakCard").addEventListener("click", playCurrentFlashcardAnswer);
  document.getElementById("nextCard").addEventListener("click", () => {
    currentCard = (currentCard + 1) % flashcards.length;
    renderCard();
  });
  document.getElementById("speakBuilt").addEventListener("click", () => {
    playOnlyGeneratedSwedish(document.getElementById("builtIntro").value);
  });
  document.getElementById("resetProgress").addEventListener("click", () => {
    localStorage.removeItem(storageKey("swedishPlan"));
    scheduleServerSync();
    renderPlan();
  });
  document.getElementById("resetLearningMetrics").addEventListener("click", resetLearningMetrics);
  document.getElementById("clearCurrentProgress").addEventListener("click", clearCurrentProgress);
  document.getElementById("clearAnswerHistory").addEventListener("click", clearAnswerHistory);
  document.getElementById("clearArchivedReports").addEventListener("click", clearArchivedReports);
  document.getElementById("showAccuracyReport").addEventListener("click", () => renderMetricDrilldown("accuracy"));
  document.getElementById("showCorrectReport").addEventListener("click", () => renderMetricDrilldown("correct"));
  document.getElementById("showModulesReport").addEventListener("click", () => renderMetricDrilldown("modules"));
  document.getElementById("showStudyReport").addEventListener("click", () => renderMetricDrilldown("study"));
  ["nameInput", "countryInput", "cityInput", "languagesInput"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updateIntro);
  });
  document.getElementById("builtIntro").addEventListener("input", updateBuiltIntroAudioState);
});
