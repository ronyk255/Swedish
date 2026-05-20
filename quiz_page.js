const params = new URLSearchParams(location.search);
const moduleId = params.get("module") || "alphabet";
const moduleData = window.COURSE_MODULES.find((item) => item.id === moduleId) || window.COURSE_MODULES[0];
const questions = window.COURSE_QUIZ.filter((item) => item.module === moduleData.id);
let index = 0;
let running = false;
let answers = [];
let shuffledQuestions = [];
let currentProfile = localStorage.getItem("swedishServerProfile") || "Rony";
let swedishVoice = null;

function storageKey(base) {
  return `${base}:${currentProfile}`;
}

function defaultMetrics() {
  return { attempts: 0, correct: 0, completedModules: {}, moduleStats: {}, answerHistory: [], studyDays: {}, lastStudy: "" };
}

function getMetrics() {
  return JSON.parse(localStorage.getItem(storageKey("swedishLearningMetrics")) || JSON.stringify(defaultMetrics()));
}

function saveMetrics(metrics) {
  localStorage.setItem(storageKey("swedishLearningMetrics"), JSON.stringify(metrics));
  saveServer(metrics);
}

async function loadServerProfile() {
  try {
    const state = await fetch(`/api/state?profile=${encodeURIComponent(currentProfile)}`).then((res) => res.json());
    currentProfile = state.profile || currentProfile;
    localStorage.setItem("swedishServerProfile", currentProfile);
    localStorage.setItem(storageKey("swedishLearningMetrics"), JSON.stringify(state.metrics || defaultMetrics()));
  } catch {
    // File mode or server unavailable.
  }
}

async function saveServer(metrics) {
  try {
    const archives = JSON.parse(localStorage.getItem(storageKey("swedishArchivedReports")) || "[]");
    const plan = JSON.parse(localStorage.getItem(storageKey("swedishPlan")) || "{}");
    await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: currentProfile, metrics, archives, plan })
    });
  } catch {
    // File mode.
  }
}

function pickSwedishVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  swedishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("sv")) || null;
}

function looksSwedish(text) {
  const clean = (text || "").trim();
  if (!clean) return false;
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  if (generated[clean.normalize("NFC")]) return true;
  if (/\b(before|after|use|with|they|everyday|pronounced|number|basic|price|nouns|possible|study|session|spend|minutes|which|what|where|translate|choose|means|answer|question|only|book)\b/i.test(clean)) return false;
  if (/[åäöÅÄÖÃ]/.test(clean)) return true;
  return /\b(jag|du|han|hon|vi|ni|de|hej|tack|heter|kommer|från|talar|svenska|engelska|lite|trevligt|träffas|förstår|ursäkta|vad|var|varifrån|språk|klockan|skulle|vilja|kaffe|bor|studerar|varsågod|vatten|bröd|mjölk|noll|en|ett|två|tre|fyra|fem|sex|sju|åtta|nio|tio|elva|tolv|tjugo|trettio|fyrtio|femtio|kostar|kronor|smörgås|äpple|svar|fråga|övningar|här|men|och|kan|säger|svar|felet|rätt)\b/i.test(clean);
}

function speakSwedish(text) {
  if (!swedishVoice || !looksSwedish(text) || !("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  utterance.rate = 0.82;
  if (swedishVoice) utterance.voice = swedishVoice;
  speechSynthesis.speak(utterance);
  return true;
}

function audioFor(text) {
  const clean = text.trim().normalize("NFC");
  const generated = window.GENERATED_SWEDISH_AUDIO || {};
  return generated[clean] || generated[clean.toLowerCase()];
}

function play(text) {
  const src = audioFor(text);
  if (!src) return speakSwedish(text);
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  const audio = document.getElementById("pageAudio");
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
  return true;
}

function shuffle(list) {
  return list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}

function hasExistingModuleAnswers() {
  return (getMetrics().answerHistory || []).some((entry) => entry.module === moduleData.id);
}

function clearModuleAnswers(metrics) {
  metrics.moduleStats ||= {};
  metrics.completedModules ||= {};
  metrics.answerHistory = (metrics.answerHistory || []).filter((entry) => entry.module !== moduleData.id);
  delete metrics.moduleStats[moduleData.id];
  delete metrics.completedModules[moduleData.id];
  return metrics;
}

function startQuiz() {
  if (hasExistingModuleAnswers()) {
    const ok = confirm("You already completed or started this module quiz. Retaking it will replace the previous answers for this module. Continue?");
    if (!ok) return;
    const metrics = clearModuleAnswers(getMetrics());
    saveMetrics(metrics);
  }
  running = true;
  index = 0;
  answers = [];
  shuffledQuestions = shuffle(questions).map((item) => ({ ...item, options: shuffle(item.options) }));
  document.getElementById("completeModule").classList.add("hiddenPanel");
  document.getElementById("dashboardLink").classList.add("hiddenPanel");
  document.getElementById("completeModule").disabled = false;
  document.getElementById("completeModule").textContent = "Mark module complete";
  document.getElementById("startQuiz").style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  const item = shuffledQuestions[index];
  document.getElementById("quizMeta").textContent = `${moduleData.title} - Question ${index + 1} of ${shuffledQuestions.length}`;
  document.getElementById("quizQuestion").textContent = item.q;
  document.getElementById("quizResult").textContent = "";
  const root = document.getElementById("quizOptions");
  root.innerHTML = "";
  item.options.forEach((option) => {
    const row = document.createElement("div");
    row.className = "quizOptionRow";
    const choose = document.createElement("button");
    choose.textContent = option;
    choose.addEventListener("click", () => answerQuestion(option));
    const audio = document.createElement("button");
    audio.textContent = looksSwedish(option) && (audioFor(option) || swedishVoice) ? "Play audio" : "No audio";
    audio.disabled = !(looksSwedish(option) && (audioFor(option) || swedishVoice));
    audio.addEventListener("click", () => play(option));
    row.appendChild(choose);
    row.appendChild(audio);
    root.appendChild(row);
  });
}

function playCurrentQuestion() {
  if (!running || !questions.length) return;
  const item = shuffledQuestions[index];
  const audioText = item.audio || (looksSwedish(item.answer) && audioFor(item.answer) ? item.answer : "");
  const played = audioText ? play(audioText) : false;
  document.getElementById("quizResult").textContent = played ? "" : "No local Swedish audio is available for this question.";
}

function answerQuestion(selected) {
  const item = shuffledQuestions[index];
  const ok = selected === item.answer;
  answers.push({ ...item, selected, ok, at: new Date().toLocaleString(), tries: 1 });
  document.getElementById("quizResult").textContent = ok ? "Correct. Bra!" : `Review: ${item.answer}`;
  setTimeout(() => {
    index += 1;
    if (index >= shuffledQuestions.length) finishQuiz();
    else renderQuestion();
  }, ok ? 700 : 1200);
}

function finishQuiz() {
  const metrics = clearModuleAnswers(getMetrics());
  const today = new Date().toISOString().slice(0, 10);
  metrics.studyDays ||= {};
  metrics.completedModules ||= {};
  metrics.moduleStats ||= {};
  metrics.answerHistory ||= [];
  metrics.studyDays[today] = true;
  metrics.lastStudy = today;
  const correct = answers.filter((answer) => answer.ok).length;
  metrics.moduleStats[moduleData.id] = { attempts: shuffledQuestions.length, correct };
  answers.slice().reverse().forEach((answer) => {
    metrics.answerHistory.unshift({
      at: answer.at,
      module: answer.module,
      question: answer.q,
      selected: answer.selected,
      answer: answer.answer,
      ok: answer.ok,
      tries: 1
    });
  });
  metrics.attempts = (metrics.answerHistory || []).length;
  metrics.correct = (metrics.answerHistory || []).filter((entry) => entry.ok).length;
  saveMetrics(metrics);
  document.getElementById("quizQuestion").textContent = "Quiz complete";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("quizResult").textContent = `Score: ${correct}/${shuffledQuestions.length}. Review anything missed, then mark the module complete when you are ready.`;
  document.getElementById("completeModule").classList.remove("hiddenPanel");
  document.getElementById("dashboardLink").classList.remove("hiddenPanel");
  document.getElementById("startQuiz").textContent = "Retake quiz";
  document.getElementById("startQuiz").style.display = "inline-flex";
}

function markModuleComplete() {
  const metrics = getMetrics();
  metrics.completedModules ||= {};
  metrics.studyDays ||= {};
  metrics.completedModules[moduleData.id] = true;
  const today = new Date().toISOString().slice(0, 10);
  metrics.studyDays[today] = true;
  metrics.lastStudy = today;
  saveMetrics(metrics);
  document.getElementById("completeModule").textContent = "Module complete";
  document.getElementById("completeModule").disabled = true;
  document.getElementById("quizResult").textContent = "Module complete. Your dashboard is updated.";
}

document.addEventListener("DOMContentLoaded", async () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  await loadServerProfile();
  document.title = `${moduleData.title} Quiz`;
  document.getElementById("quizPageTitle").textContent = `${moduleData.title} Quiz`;
  document.getElementById("lessonLink").href = `module.html?module=${encodeURIComponent(moduleData.id)}`;
  document.getElementById("startQuiz").addEventListener("click", startQuiz);
  document.getElementById("playQuestion").addEventListener("click", playCurrentQuestion);
  document.getElementById("completeModule").addEventListener("click", markModuleComplete);
});
