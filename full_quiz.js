const modules = Object.fromEntries(window.COURSE_MODULES.map((item) => [item.id, item.title]));
const quiz = window.COURSE_QUIZ;
let swedishVoice = null;

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
  if (!src) {
    speakSwedish(text);
    return;
  }
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  const audio = document.getElementById("pageAudio");
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function renderFilter() {
  const select = document.getElementById("moduleFilter");
  select.innerHTML = `<option value="all">All modules (${quiz.length})</option>`;
  Object.entries(modules).forEach(([id, name]) => {
    const count = quiz.filter((item) => item.module === id).length;
    select.innerHTML += `<option value="${id}">${name} (${count})</option>`;
  });
  select.addEventListener("change", renderQuiz);
}

function renderQuiz() {
  const selected = document.getElementById("moduleFilter").value || "all";
  const items = selected === "all" ? quiz : quiz.filter((item) => item.module === selected);
  const root = document.getElementById("quizLibrary");
  root.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "quizCard";
    const answerAudio = item.audio || item.answer;
    const answerButton = looksSwedish(answerAudio) && (audioFor(answerAudio) || swedishVoice)
      ? `<button type="button" data-audio="${encodeURIComponent(answerAudio)}">Play answer</button>`
      : `<button type="button" disabled>No Swedish audio</button>`;
    const options = item.options.map((option) => {
      const correct = option === item.answer ? " correctOption" : "";
      const optionButton = looksSwedish(option) && (audioFor(option) || swedishVoice)
        ? `<button type="button" data-audio="${encodeURIComponent(option)}">Play</button>`
        : `<button type="button" disabled>Audio</button>`;
      return `<li class="${correct}"><span>${option}</span>${optionButton}</li>`;
    }).join("");
    card.innerHTML = `
      <div class="quizCardHead">
        <span>${modules[item.module]}</span>
        <strong>Question ${index + 1}</strong>
      </div>
      <h2>${item.q}</h2>
      <ul class="answerOptions">${options}</ul>
      <div class="answerReveal"><strong>Answer:</strong> ${item.answer} ${answerButton}</div>
      <a class="buttonLink" href="quiz.html?module=${encodeURIComponent(item.module)}">Take this module quiz</a>
    `;
    card.querySelectorAll("[data-audio]").forEach((button) => {
      button.addEventListener("click", () => play(decodeURIComponent(button.dataset.audio)));
    });
    root.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  renderFilter();
  renderQuiz();
});
