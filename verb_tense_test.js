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
let speechUnsupportedMessage = "Speech checking is not available in this browser. Try Chrome or Edge and allow microphone access.";

const phraseTranslations = [
  ["i går", "yesterday"],
  ["igår", "yesterday"],
  ["i dag", "today"],
  ["idag", "today"],
  ["i morgon", "tomorrow"],
  ["imorgon", "tomorrow"],
  ["i kväll", "tonight"],
  ["ikväll", "tonight"],
  ["just nu", "right now"],
  ["snart", "soon"],
  ["nu", "now"],
  ["hemma", "at home"],
  ["hem", "home"],
  ["här", "here"],
  ["där", "there"],
  ["kaffe", "coffee"],
  ["te", "tea"],
  ["vatten", "water"],
  ["mjölk", "milk"],
  ["lunch", "lunch"],
  ["middag", "dinner"],
  ["frukost", "breakfast"],
  ["boken", "the book"],
  ["brevet", "the letter"],
  ["sidan", "the page"],
  ["svaret", "the answer"],
  ["svenska", "Swedish"]
];

const wordTranslations = {
  jag: "I",
  du: "you",
  han: "he",
  hon: "she",
  vi: "we",
  ni: "you",
  de: "they",
  det: "it",
  en: "a",
  ett: "a",
  och: "and",
  inte: "not",
  mycket: "a lot",
  lite: "a little",
  med: "with",
  på: "on",
  i: "in",
  till: "to",
  från: "from",
  för: "for",
  efter: "after",
  före: "before",
  igen: "again",
  redan: "already"
};

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

function translationKey(text) {
  return normalizeText(text)
    .replace(/\bigår\b/g, "i går")
    .replace(/\bidag\b/g, "i dag")
    .replace(/\bimorgon\b/g, "i morgon")
    .replace(/\bikväll\b/g, "i kväll")
    .trim();
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

function exactTranslationFor(value) {
  const key = translationKey(value);
  for (const verb of verbs) {
    const examples = [verb.present, verb.past, verb.perfect, verb.future];
    for (const [swedish, english] of examples) {
      if (translationKey(swedish) === key) return english;
    }
  }
  return "";
}

function englishVerbPhrase(verb, tense) {
  const meaning = verb.meaning.replace(/^to\s+/i, "");
  if (tense === "past") return `${meaning} - past`;
  if (tense === "perfect") return `have ${meaning} / has ${meaning}`;
  if (tense === "future") return `will ${meaning}`;
  return meaning;
}

function roughTranslationFor(value, verb, tense) {
  const exact = exactTranslationFor(value);
  if (exact) return exact;

  let text = normalizeText(value).trim();
  phraseTranslations.forEach(([sv, en]) => {
    text = text.replace(new RegExp(`\\b${sv}\\b`, "g"), en);
  });
  expectedForms(verb, tense).forEach((form) => {
    text = text.replace(new RegExp(`\\b${form}\\b`, "g"), englishVerbPhrase(verb, tense));
  });

  const translatedWords = text.split(/\s+/).map((word) => wordTranslations[word] || word);
  const rough = translatedWords.join(" ").replace(/\s+/g, " ").trim();
  return rough ? `Rough: ${rough}` : "";
}

function updateTranslation(cell, value, verb, tense) {
  const translation = cell.querySelector(".verbTranslation");
  if (!translation) return;
  if (!value.trim()) {
    translation.textContent = "";
    return;
  }
  translation.textContent = roughTranslationFor(value, verb, tense);
}

function updateCell(cell, input, verb, tense) {
  const feedback = cell.querySelector(".verbTestFeedback");
  if (!input.value.trim()) {
    cell.classList.remove("correct", "wrong");
    feedback.textContent = "";
    updateTranslation(cell, input.value, verb, tense);
    return null;
  }

  const result = checkAnswer(input.value, verb, tense);
  cell.classList.toggle("correct", result.ok);
  cell.classList.toggle("wrong", !result.ok);
  feedback.textContent = result.ok ? "Correct tense form" : feedbackText(result.forms);
  updateTranslation(cell, input.value, verb, tense);
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

function summarizeRow(row) {
  let attempted = 0;
  let correct = 0;
  const wrong = [];

  row.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
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
    ? `${Math.round((correct / attempted) * 100)}% correct for this row`
    : "No answers in this row yet";
  document.getElementById("verbTestWrongCount").textContent = wrong.length;

  const wrongList = document.getElementById("verbTestWrongList");
  wrongList.innerHTML = "";
  if (!attempted) {
    wrongList.innerHTML = "<strong>Type or speak at least one answer in this row.</strong>";
    return;
  }
  if (!wrong.length) {
    wrongList.innerHTML = "<strong>This row is correct.</strong>";
    return;
  }
  wrong.forEach((item) => {
    const wrongRow = document.createElement("div");
    wrongRow.className = "verbWrongItem";
    wrongRow.innerHTML = `
      <strong>${item.infinitive} - ${item.tense}</strong>
      <span>Your sentence: ${item.answer}</span>
      <small>${item.expected}</small>
    `;
    wrongList.appendChild(wrongRow);
  });
}

function clearTest() {
  document.querySelectorAll(".verbTestCell[data-tense]").forEach((cell) => {
    cell.classList.remove("correct", "wrong");
    cell.querySelector("input").value = "";
    cell.querySelector(".verbTestFeedback").textContent = "";
    cell.querySelector(".verbTranslation").textContent = "";
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
    status.textContent = speechUnsupportedMessage;
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
    const result = updateCell(cell, input, verbs[Number(cell.dataset.verbIndex)], cell.dataset.tense);
    document.getElementById("speechSupportStatus").textContent = result?.ok
      ? `Heard: "${transcript}" - correct.`
      : `Heard: "${transcript}" - check the tense form.`;
    summarizeRow(cell.closest(".verbTestRow"));
  });

  recognition.addEventListener("error", (event) => {
    const message = event.error === "not-allowed"
      ? "Microphone permission was blocked. Allow microphone access, then try Speak again."
      : `Speech check stopped: ${event.error}.`;
    document.getElementById("speechSupportStatus").textContent = message;
    if (activeSpeechButton) activeSpeechButton.textContent = "Speak";
    activeSpeechButton = null;
  });

  recognition.addEventListener("end", () => {
    if (activeSpeechButton) activeSpeechButton.textContent = "Speak";
    activeSpeechButton = null;
  });
}

function startSpeech(button) {
  if (!recognition) {
    const cell = button.closest(".verbTestCell");
    cell.querySelector(".verbTestFeedback").textContent = speechUnsupportedMessage;
    document.getElementById("speechSupportStatus").textContent = speechUnsupportedMessage;
    return;
  }
  if (activeSpeechButton) recognition.stop();
  activeSpeechButton = button;
  button.textContent = "Listening...";
  document.getElementById("speechSupportStatus").textContent = "Listening...";
  try {
    recognition.start();
  } catch (error) {
    document.getElementById("speechSupportStatus").textContent = "Speech recognition is already listening.";
  }
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
    const checkRow = document.createElement("button");
    checkRow.type = "button";
    checkRow.className = "verbRowCheckButton primary";
    checkRow.textContent = "Check row";
    checkRow.addEventListener("click", () => summarizeRow(row));
    verbCell.appendChild(listen);
    verbCell.appendChild(checkRow);
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
        updateTranslation(cell, input.value, verb, tense);
      });

      const speak = document.createElement("button");
      speak.type = "button";
      speak.className = "verbSpeakButton";
      speak.textContent = "Speak";
      speak.title = recognition
        ? "Click, speak your Swedish sentence, and the page will check this tense form"
        : speechUnsupportedMessage;
      speak.addEventListener("click", () => startSpeech(speak));

      const feedback = document.createElement("small");
      feedback.className = "verbTestFeedback";
      const translation = document.createElement("small");
      translation.className = "verbTranslation";
      cell.append(input, speak, feedback, translation);
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
