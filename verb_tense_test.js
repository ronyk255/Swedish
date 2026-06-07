const verbs = window.VERB_TENSE_PRACTICE || [];
const tenses = [
  ["Past", "past"],
  ["Perfect", "perfect"],
  ["Present", "present"],
  ["Future", "future"]
];

let swedishVoice = null;
let recognition = null;
let activeSpeechButton = null;

function pickSwedishVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  swedishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("sv")) || null;
}

function speakSwedish(text) {
  if (!swedishVoice || !("speechSynthesis" in window)) return false;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "sv-SE";
  utterance.rate = 0.82;
  utterance.voice = swedishVoice;
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

function normalizeText(text) {
  return ` ${text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:"'()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function wordsIn(sentence) {
  return sentence
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:"'()[\]{}]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function containsPhrase(text, phrase) {
  return normalizeText(text).includes(normalizeText(phrase));
}

function finiteForm(sentence) {
  const words = wordsIn(sentence);
  return words[1] || words[0] || "";
}

function supineForm(sentence) {
  const words = wordsIn(sentence);
  const harIndex = words.indexOf("har");
  return harIndex >= 0 ? words[harIndex + 1] || "" : finiteForm(sentence);
}

function infinitiveBase(infinitive) {
  return infinitive.replace(/^att\s+/i, "").replace(/\s+sig$/i, "").trim();
}

function expectedForms(verb, tense) {
  if (tense === "present") return [finiteForm(verb.present[0])];
  if (tense === "past") return [finiteForm(verb.past[0])];
  if (tense === "perfect") return [`har ${supineForm(verb.perfect[0])}`];
  if (tense === "future") {
    const base = infinitiveBase(verb.infinitive);
    return [`ska ${base}`, `kommer att ${base}`];
  }
  return [];
}

function checkAnswer(value, verb, tense) {
  const forms = expectedForms(verb, tense).filter(Boolean);
  const ok = forms.some((form) => containsPhrase(value, form));
  return { ok, forms };
}

function feedbackText(forms) {
  return `Expected: ${forms.join(" or ")}`;
}

function updateCell(cell, input, verb, tense) {
  const feedback = cell.querySelector(".verbTestFeedback");
  if (!input.value.trim()) {
    cell.classList.remove("correct", "wrong");
    feedback.textContent = "";
    return null;
  }

  const result = checkAnswer(input.value, verb, tense);
  cell.classList.toggle("correct", result.ok);
  cell.classList.toggle("wrong", !result.ok);
  feedback.textContent = result.ok ? "Correct tense form" : feedbackText(result.forms);
  return result;
}

function summarizeTest() {
  let attempted = 0;
  let correct = 0;
  const wrong = [];

  document.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
    const input = cell.querySelector("input");
    const verb = verbs[Number(cell.dataset.verbIndex)];
    const tense = cell.dataset.tense;
    const result = updateCell(cell, input, verb, tense);
    if (!result) return;
    attempted += 1;
    if (result.ok) {
      correct += 1;
    } else {
      wrong.push({
        infinitive: verb.infinitive,
        tense,
        answer: input.value.trim(),
        expected: result.forms.join(" or ")
      });
    }
  });

  document.getElementById("verbTestScore").textContent = `${correct}/${attempted}`;
  document.getElementById("verbTestPercent").textContent = attempted
    ? `${Math.round((correct / attempted) * 100)}% correct`
    : "No answers checked yet";
  document.getElementById("verbTestWrongCount").textContent = wrong.length;

  const wrongList = document.getElementById("verbTestWrongList");
  wrongList.innerHTML = "";
  if (!wrong.length && attempted) {
    wrongList.innerHTML = "<strong>Everything you tried is correct.</strong>";
    return;
  }
  wrong.forEach((item) => {
    const row = document.createElement("div");
    row.className = "verbWrongItem";
    row.innerHTML = `
      <strong>${item.infinitive} - ${item.tense}</strong>
      <span>Your sentence: ${item.answer}</span>
      <small>${item.expected}</small>
    `;
    wrongList.appendChild(row);
  });
}

function clearTest() {
  document.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
    cell.classList.remove("correct", "wrong");
    cell.querySelector("input").value = "";
    cell.querySelector(".verbTestFeedback").textContent = "";
  });
  document.getElementById("verbTestScore").textContent = "0/0";
  document.getElementById("verbTestPercent").textContent = "No answers checked yet";
  document.getElementById("verbTestWrongCount").textContent = "0";
  document.getElementById("verbTestWrongList").innerHTML = "";
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const status = document.getElementById("speechSupportStatus");
  if (!SpeechRecognition) {
    status.textContent = "Speech checking is not available in this browser.";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "sv-SE";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  status.textContent = "Use Speak buttons to check pronunciation.";

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    const cell = activeSpeechButton?.closest(".verbTestCell");
    if (!cell) return;
    const input = cell.querySelector("input");
    input.value = transcript;
    updateCell(cell, input, verbs[Number(cell.dataset.verbIndex)], cell.dataset.tense);
  });

  recognition.addEventListener("end", () => {
    if (activeSpeechButton) activeSpeechButton.textContent = "Speak";
    activeSpeechButton = null;
  });
}

function startSpeech(button) {
  if (!recognition) return;
  if (activeSpeechButton) recognition.stop();
  activeSpeechButton = button;
  button.textContent = "Listening...";
  recognition.start();
}

function renderTest() {
  const root = document.getElementById("verbTestRows");
  root.innerHTML = "";

  const header = document.createElement("div");
  header.className = "verbTestHeader";
  header.innerHTML = "<strong>Verb</strong><strong>Past</strong><strong>Perfect</strong><strong>Present</strong><strong>Future</strong>";
  root.appendChild(header);

  verbs.forEach((verb, verbIndex) => {
    const row = document.createElement("div");
    row.className = "verbTestRow";

    const verbCell = document.createElement("div");
    verbCell.className = "verbTestVerb";
    verbCell.innerHTML = `<strong>${verb.infinitive}</strong><small>${verb.meaning}</small>`;
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "verbListenButton";
    listen.textContent = "Listen";
    listen.addEventListener("click", () => play(verb.infinitive));
    verbCell.appendChild(listen);
    row.appendChild(verbCell);

    tenses.forEach(([label, tense]) => {
      const cell = document.createElement("div");
      cell.className = "verbTestCell";
      cell.dataset.verbIndex = String(verbIndex);
      cell.dataset.tense = tense;

      const input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.placeholder = `${label} sentence`;
      input.setAttribute("aria-label", `${verb.infinitive} ${label}`);
      input.addEventListener("input", () => {
        cell.classList.remove("correct", "wrong");
        cell.querySelector(".verbTestFeedback").textContent = "";
      });

      const speak = document.createElement("button");
      speak.type = "button";
      speak.className = "verbSpeakButton";
      speak.textContent = "Speak";
      speak.disabled = !recognition;
      speak.addEventListener("click", () => startSpeech(speak));

      const feedback = document.createElement("small");
      feedback.className = "verbTestFeedback";
      cell.append(input, speak, feedback);
      row.appendChild(cell);
    });

    root.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pickSwedishVoice();
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = pickSwedishVoice;
  setupSpeechRecognition();
  renderTest();
  document.getElementById("checkVerbTest").addEventListener("click", summarizeTest);
  document.getElementById("clearVerbTest").addEventListener("click", clearTest);
});
